<script setup lang="ts">
import type { ITripScheduleList, ITripAvailableSchedule } from '~~/shared/interface/ITrip'
import type { IResponseList } from '~~/shared/interface/IResponse'
import { select } from '#build/ui';

interface Props {
  tripUid: string
}

const props = defineProps<Props>()

const baseUrl = useRuntimeConfig().public.apiBase
const { sanitizeHtml } = useSanitize()

const availableSchedules = ref<ITripAvailableSchedule[]>([])
const scheduleList = ref<ITripScheduleList[]>([])
const selectedYear = ref<number | null>(null)
const selectedMonth = ref<number | null>(null)
const loadingSchedules = ref(false)
// const expandedItems = ref<Set<string>>(new Set()) // Removed as we're using the new collapsible component

// Computed properties
const currentYear = new Date().getFullYear()
const displayYears = computed((): number[] => {
  return [currentYear, currentYear + 1]
})

const allMonths = computed(() => {
  const shortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return shortNames.map((name, index) => ({ value: index + 1, name }))
})

const formatDateRange = (startDate: string | undefined, endDate: string | undefined): string => {
  if (!startDate || !endDate) return ''
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const startDay = start.getDate()
    const endDay = end.getDate()
    const month = start.toLocaleDateString('id-ID', { month: 'long' })
    const year = start.getFullYear()

    // Check if start and end dates are in the same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${startDay} - ${endDay} ${month} ${year}`
    } else {
      // If different months, show full dates
      const startMonth = start.toLocaleDateString('id-ID', { month: 'long' })
      const endMonth = end.toLocaleDateString('id-ID', { month: 'long' })
      const endYear = end.getFullYear()

      if (start.getFullYear() === end.getFullYear()) {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`
      } else {
        return `${startDay} ${startMonth} ${year} - ${endDay} ${endMonth} ${endYear}`
      }
    }
  } catch (err) {
    console.error('Error formatting date range:', err)
    return startDate || ''
  }
}

const toNumber = (val: unknown): number => {
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    const n = Number(val)
    return Number.isNaN(n) ? 0 : n
  }
  return 0
}

const isMonthAvailable = (month: number): boolean => {
  if (!selectedYear.value) return false
  return availableSchedules.value.some((s: ITripAvailableSchedule) => s.year === selectedYear.value && s.month === month)
}

const selectYear = (year: number) => {
  selectedYear.value = year
  selectedMonth.value = null
  scheduleList.value = []

  // Auto-select first available month for the selected year
  const yearSchedules = availableSchedules.value.filter(schedule => schedule.year === year)
  if (yearSchedules.length > 0) {
    const firstAvailableMonth = Math.min(...yearSchedules.map(s => s.month))
    selectedMonth.value = firstAvailableMonth
    nextTick(() => {
      fetchScheduleList()
    })
  }
}

const selectMonth = async (month: number) => {
  if (!isMonthAvailable(month)) return
  selectedMonth.value = month
  // expandedItems.value.clear() // Removed as we're using the new collapsible component
  await fetchScheduleList()
}

// Removed toggleExpand and isExpanded functions as we're using the new collapsible component

const fetchScheduleList = async () => {
  if (!selectedYear.value || !selectedMonth.value) return

  loadingSchedules.value = true
  try {
    const response = await $fetch<IResponseList<ITripScheduleList>>(
      `${baseUrl}/Trip/trip.available-schedule-month/${props.tripUid}`,
      {
        method: 'GET',
        query: {
          month: selectedMonth.value,
          year: selectedYear.value
        }
      }
    )
    console.log(response)
    scheduleList.value = response.data || []
  } catch (error) {
    console.error('Error fetching schedule list:', error)
    scheduleList.value = []
  } finally {
    loadingSchedules.value = false
  }
}

// Fetch available schedules using useLazyFetch
const { data: rawSchedulesData, pending: _schedulesLoading, error: schedulesError } = useLazyFetch<IResponseList<ITripAvailableSchedule>>(
  `${baseUrl}/Trip/trip.available-schedule/${props.tripUid}`
)

// Set initial selected year to current year
onMounted(() => {
  selectedYear.value = currentYear
})

// Watch for data changes and process the data
watch(rawSchedulesData, (response) => {
  if (response?.data) {
    let dataArray: ITripAvailableSchedule[] = []

    if (Array.isArray(response.data)) {
      dataArray = response.data as ITripAvailableSchedule[]
    } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      const nestedResponse = response.data as { data?: unknown }
      const nestedData = nestedResponse.data
      if (Array.isArray(nestedData)) {
        dataArray = nestedData as ITripAvailableSchedule[]
      }
    }

    if (dataArray.length === 0) {
      availableSchedules.value = []
      return
    }

    // Normalize and Sort
    const normalized: ITripAvailableSchedule[] = dataArray.map((item: unknown) => {
      const rec = item as Record<string, unknown>
      return {
        year: toNumber(rec.year),
        month: toNumber(rec.month)
      }
    }).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })

    availableSchedules.value = normalized

    // Auto-select logic: Find closest upcoming date
    const now = new Date()
    const currentYearVal = now.getFullYear()
    const currentMonthVal = now.getMonth() + 1 // 1-indexed

    let targetSchedule = normalized.find(s =>
      (s.year > currentYearVal)
      || (s.year === currentYearVal && s.month >= currentMonthVal)
    )

    // Fallback if no upcoming schedule (e.g., all are in the past)
    if (!targetSchedule && normalized.length > 0) {
      targetSchedule = normalized[0]
    }

    if (targetSchedule) {
      selectedYear.value = targetSchedule.year
      selectedMonth.value = targetSchedule.month

      nextTick(() => {
        fetchScheduleList()
      })
    }
  }
}, { immediate: true })

watch(schedulesError, (error) => {
  if (error) {
    console.error('Error fetching available schedules:', error)
    availableSchedules.value = []
  }
})
</script>

<template>
  <div class="trip-schedule">
    <div class="schedule-selector mb-8">
      <!-- Year Selection -->
      <div class="year-selector mb-6">
        <div class="flex flex-wrap gap-3">
          <UtilSelectedItem
            v-for="year in displayYears"
            :key="year"
            :selected="selectedYear === year"
            @click="selectYear(year)"
          >
            {{ year }}
          </UtilSelectedItem>
        </div>
      </div>

      <!-- Month Selection -->
      <div class="month-selector mb-6">
        <div class="flex flex-wrap gap-3">
          <UtilSelectedItem
            v-for="month in allMonths"
            :key="month.value"
            :selected="selectedMonth === month.value"
            :disabled="!isMonthAvailable(month.value)"
            :class="[!isMonthAvailable(month.value) ? 'opacity-30 cursor-not-allowed' : '']"
            @click="selectMonth(month.value)"
          >
            {{ month.name }}
          </UtilSelectedItem>
        </div>
      </div>
    </div>

    <!-- Schedule List -->
    <div
      v-if="selectedYear && selectedMonth"
      class="schedule-list"
    >
      <div class="flex justify-between mb-3 px-3 font-bold text-base md:text-xl">
        <h5>Keberangkatan</h5>
        <h5>Biaya mulai dari</h5>
      </div>

      <div
        v-if="loadingSchedules"
        class="flex items-center justify-center py-12"
      >
        <div class="flex items-center space-x-2">
          <UIcon
            name="i-heroicons-arrow-path"
            class="animate-spin w-5 h-5"
          />
          <span class="text-gray-600">Memuat jadwal...</span>
        </div>
      </div>

      <UAlert
        v-else-if="scheduleList.length === 0"
        icon="i-heroicons-exclamation-triangle"
        color="warning"
        variant="soft"
        title="Tidak ada jadwal tersedia"
        description="Maaf, belum ada jadwal perjalanan untuk periode ini. Silakan pilih bulan lain atau hubungi kami untuk informasi lebih lanjut."
        class="mb-8"
      />

      <div
        v-else
        class="grid gap-4"
      >
        <UtilCollapsible
          v-for="(schedule, index) in scheduleList"
          :id="schedule.uidSchedule"
          :key="schedule.uidSchedule"
          :title="formatDateRange(schedule.startDate, schedule.endDate)"
          :price="schedule.price"
          :badge="schedule.quota > 10 ? `Kursi tersedia` : schedule.quota <= 10 && schedule.quota > 0 ? `Tinggal ${schedule.quota} Kursi` : 'Kursi habis'"
          :badge-variant="schedule.quota > 10 ? 'green' : schedule.quota <= 10 && schedule.quota > 0 ? 'red' : 'gray'"
          class="animate-fade-in"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <template #content>
            <div class="space-y-6">
              <!-- Timeline/Itinerary -->
              <div
                v-if="schedule.timelines"
                class="timeline-content"
              >
                <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div v-html="sanitizeHtml(schedule.timelines)" />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="pt-6 border-t border-gray-100">
                <div class="flex flex-col sm:flex-row gap-3">
                  <UButton
                    v-if="schedule.quota > 0"
                    color="primary"
                    size="lg"
                    :to="`/book/${schedule.uidSchedule}`"
                    :class="['flex-1 font-semibold rounded-xl', schedule.quota === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] transition-transform duration-200']"
                    :disabled="schedule.quota === 0"
                  >
                    <!-- <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" /> -->
                    <ImageIcon
                      name="appointment"
                      folder="assets/icon"
                      class="text-white"
                    />
                    Lanjutkan Booking
                  </UButton>
                  <UButton
                    variant="outline"
                    color="primary"
                    size="lg"
                    to="/contact-us"
                    class="font-semibold rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    :block="schedule.quota === 0"
                  >
                    <UIcon
                      name="i-heroicons-chat-bubble-left-right"
                      class="w-5 h-5 mr-2"
                    />
                    Tanya Detail
                  </UButton>
                </div>
              </div>
            </div>
          </template>
        </UtilCollapsible>
      </div>
    </div>

    <!-- Empty state when no year/month selected -->
    <div
      v-else
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-calendar-days"
        class="w-16 h-16 mx-auto text-gray-400 mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Pilih Tahun dan Bulan
      </h3>
      <p class="text-gray-600">
        Pilih tahun dan bulan untuk melihat jadwal tersedia.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for prose content */
.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 0.75rem;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.prose ul,
.prose ol {
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
