# Plan: Tempat Favorit — Load More Pagination

## Overview

The `/FavouriteLocation` API now returns paginated results. The response shape has also changed: `banner` is now `string[]` instead of `string`. This plan updates the page to:

1. Fix the `IFavoriteLocation` interface (`banner: string[]`)
2. Add `page` and `limit` query params to the fetch
3. Accumulate results in a local list instead of replacing on each fetch
4. Show a **Load More** button when there are more items to fetch

---

## API Response Shape (new)

```json
{
  "data": [
    {
      "banner": ["filename-1", "filename-2", "filename-3"],
      "uid": "7542e29b-a9ed-4d37-b152-f949aa24cefd",
      "name": "Oslo",
      "summary": ""
    }
  ],
  "meta": {
    "status": true,
    "message": "Success",
    "totalItem": 143
  }
}
```

---

## Files to Modify

### 1. `shared/interface/IFavoriteLocation.ts`

Fix the `banner` field type on `IFavoriteLocation`:

```ts
// Before
banner: string

// After
banner: string[]
```

---

### 2. `app/pages/tempat-favorite/index.vue`

#### Reactive state additions

```ts
const page = ref(1)
const limit = 12 // items per page
const allLocations = ref<IFavoriteLocation[]>([]) // accumulated list
```

#### Reset list on filter change

When `selectedCountryUid` changes, reset pagination and the accumulated list:

```ts
watch(selectedCountryUid, () => {
  page.value = 1
  allLocations.value = []
})
```

#### Switch from `useFetch` to `useLazyAsyncData`

`useFetch` with `watch` replaces data on each call. Switch to `useLazyAsyncData` so we can manually append results:

```ts
const { data: fetchedPage, pending, error, execute } = await useLazyAsyncData(
  computed(() => `tempat-favorite-${selectedCountryUid.value ?? 'all'}-page-${page.value}`),
  () => $fetch<IResponseList<IFavoriteLocation>>(`${baseUrl}/FavouriteLocation`, {
    query: {
      ...(selectedCountryUid.value ? { countryUid: selectedCountryUid.value } : {}),
      page: page.value,
      limit
    }
  }),
  { watch: false } // we trigger manually
)
```

Append new results when data arrives:

```ts
watch(fetchedPage, (newPage) => {
  if (!newPage?.data) return
  allLocations.value = [...allLocations.value, ...newPage.data]
})
```

#### Computed: total items & has more

```ts
const totalItem = computed(() => fetchedPage.value?.meta?.totalItem ?? 0)
const hasMore = computed(() => allLocations.value.length < totalItem.value)
```

#### Load More handler

```ts
function loadMore() {
  page.value++
  execute()
}
```

#### Update `reformattedFavoriteLocations`

Change the source from `favoriteLocationsData.value?.data` to `allLocations.value`, and fix `banner[0]` access (already array-indexed, no change needed there):

```ts
const reformattedFavoriteLocations = computed(() => {
  return allLocations.value.map((location: IFavoriteLocation) => ({
    uid: location.uid || '',
    src: location.banner?.[0] ? `/favorite-location/${location.banner[0]}.jpeg` : '',
    alt: location.name,
    caption: location.name,
    url: `/tempat-favorite/${encodeURIComponent(location.name.trim().replace(/\s+/g, '-').toLowerCase())}_${location.uid}`,
    name: location.name
  }))
})
```

#### Template: Add Load More button

Below `<GridBento>`, add:

```html
<!-- Load More button -->
<div v-if="hasMore" class="flex justify-center mt-8">
  <button
    :disabled="pending"
    class="px-8 py-3 rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
    @click="loadMore"
  >
    <span v-if="pending">Memuat...</span>
    <span v-else>Muat Lebih Banyak</span>
  </button>
</div>
```

---

## Behaviour Summary

| Action | Result |
|---|---|
| Page load | First page fetched, `allLocations` populated |
| Click country filter | `page` resets to 1, `allLocations` cleared, first page re-fetched |
| Click "Muat Lebih Banyak" | `page` incremented, next page fetched, results appended to `allLocations` |
| All items loaded | Load More button hidden (`hasMore` = false) |
| Loading in progress | Button shows "Memuat..." and is disabled |

---

## Notes

- `IResponseList<IFavoriteLocation>` already has `meta.totalItem` so no interface change needed for `IResponse`.
- The existing skeleton loader only shows on `pending` when `allLocations` is empty (first load). Subsequent `pending` states are handled by the button's disabled state.
- Keep the existing `useLazyAsyncData` for countries — no change needed there.
- `IFavoriteLocation.banner` must be `string[]` to match the new API; fix this before updating the page logic.
