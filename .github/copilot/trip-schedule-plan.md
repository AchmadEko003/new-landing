# Trip Schedule Auto-Selection Styling Fix Plan

## Problem Analysis

### Current Behavior
- **On Page Refresh**: Year and Month selections work functionally (correct values are selected) but the styling doesn't apply correctly to the `UtilSelectedItem` components
- **On Navigation**: When navigating from another page, both functionality and styling work correctly

### Root Cause Analysis

After analyzing the code in `TripSchedule.vue`, the issue is a **race condition and reactivity timing problem**:

1. **Conflicting Initialization**:
   - `onMounted()` hook sets `selectedYear.value = currentYear` immediately
   - `watch(rawSchedulesData)` with `{ immediate: true }` also tries to set selections
   - These two can conflict, especially on refresh when data might not be ready

2. **Data Fetch Timing**:
   - `useLazyFetch` behaves differently on refresh vs navigation
   - On refresh: Data might arrive after component is mounted and rendered
   - On navigation: Data might be cached/faster, arriving before mount completes

3. **Reactive Update Propagation**:
   - When selections are set before `availableSchedules.value` is populated, the computed `isMonthAvailable()` function returns `false` for all months
   - Template renders with `:disabled="true"` for all months initially
   - Even after data arrives and selections update, Vue might not re-evaluate the bindings properly

4. **Watch Execution Order**:
   - The watch with `immediate: true` runs during component setup
   - But `availableSchedules.value` is empty at that time
   - Later when data arrives, it updates selections, but child components may not reactively update their styling

## Solution Strategy

### Phase 1: Fix Initialization Race Condition
- Remove the redundant `onMounted()` hook that sets `selectedYear.value = currentYear`
- Let the watch handle all initial selection logic
- Remove `immediate: true` from watch since data won't be available immediately anyway

### Phase 2: Ensure Proper Data Flow
- Add a loading state to track when initial data is being processed
- Only set selections after `availableSchedules.value` is populated
- Use `nextTick()` to ensure reactive updates propagate to child components

### Phase 3: Force Reactivity Updates
- Add a computed property or ref that ensures child components re-render when data changes
- Potentially use `:key` bindings on the selector sections to force re-render when data loads

### Phase 4: Add Defensive Checks
- Add guards to ensure selections are only made when data is available
- Validate that selected values exist in available schedules

## Implementation Plan

### Step 1: Remove Conflicting Initialization
```javascript
// REMOVE this onMounted hook entirely
onMounted(() => {
  selectedYear.value = currentYear
})
```

### Step 2: Update Watch Logic
```javascript
// Change from immediate: true to explicit handling
watch(rawSchedulesData, (response) => {
  if (response?.data) {
    // ... existing data processing logic ...
    
    availableSchedules.value = normalized

    // Only auto-select if not already selected
    // This prevents re-selection on subsequent data updates
    if (!selectedYear.value || !selectedMonth.value) {
      // Auto-select logic...
      if (targetSchedule) {
        selectedYear.value = targetSchedule.year
        selectedMonth.value = targetSchedule.month

        // Use nextTick to ensure DOM updates with the new values
        nextTick(() => {
          fetchScheduleList()
        })
      }
    }
  }
})
```

### Step 3: Add Reactive Keys (Optional but Recommended)
Add a computed property to track when data is ready and use it as a key:

```javascript
const isDataReady = computed(() => availableSchedules.value.length > 0)
```

Then in template:
```vue
<div class="year-selector mb-6" :key="`year-${isDataReady}`">
  <!-- Year selection items -->
</div>

<div class="month-selector mb-6" :key="`month-${isDataReady}`">
  <!-- Month selection items -->
</div>
```

### Step 4: Improve isMonthAvailable Function
Add defensive check:
```javascript
const isMonthAvailable = (month: number): boolean => {
  if (!selectedYear.value || availableSchedules.value.length === 0) return false
  return availableSchedules.value.some(
    (s: ITripAvailableSchedule) => s.year === selectedYear.value && s.month === month
  )
}
```

## Expected Outcomes

After implementing these fixes:
1. ✅ Year and Month selections will have correct styling on page refresh
2. ✅ Auto-selection will work reliably in all navigation scenarios
3. ✅ No race conditions between initialization and data loading
4. ✅ Reactive updates will properly propagate to child components
5. ✅ Component will handle edge cases (no data, slow network, etc.)

## Testing Checklist

- [ ] Refresh page multiple times and verify styling appears correctly
- [ ] Navigate from another page and verify styling works
- [ ] Test with slow network (throttle in DevTools)
- [ ] Test with no available schedules
- [ ] Test with schedules only in future years
- [ ] Test with schedules only in past dates
- [ ] Verify that selections persist correctly when changing between years/months

## Technical Notes

- **Vue 3 Reactivity**: The issue is related to how Vue 3 tracks reactive dependencies and updates child components
- **Nuxt SSR**: If this is SSR, hydration mismatches could also contribute to styling issues
- **Lazy Loading**: `useLazyFetch` doesn't guarantee immediate data availability, which is why we need careful handling
- *Don't make mistake*
