import type { IResponse, IResponseList } from '~~/shared/interface/IResponse'
import type { ITripDetail, ITripRating } from '~~/shared/interface/ITrip'
import type { IAdditionalInfo } from '~~/shared/interface/IAdditionalInfo'
import type { IImage } from '~~/shared/interface/IImage'

export const useTripDetail = () => {
  const baseUrl = useRuntimeConfig().public.apiBase
  const route = useRoute()
  const router = useRouter()
  const { width } = useWindowSize()
  const { sanitizeHtml } = useSanitize()

  const tripId = computed(() => route.params.tripId as string)

  const sections = [
    { id: 'summary-trip-section', title: 'Ringkasan' },
    { id: 'suitability-section', title: 'Apakah sesuai untukmu?' },
    { id: 'itinerary-section', title: 'Itinerary' },
    { id: 'included-section', title: 'Termasuk & Tidak Termasuk' },
    { id: 'accommodation-section', title: 'Akomodasi' },
    { id: 'reviews-section', title: 'Ulasan' },
    { id: 'faqs-section', title: 'FAQs' },
    { id: 'schedule-section', title: 'Jadwal Trip' }
  ]

  const bentoSize = computed(() => {
    return width.value > 768 ? 'medium' : 'small'
  })

  // Data Fetching
  const {
    data: tripDetailData,
    pending: tripPending,
    error: tripError
  } = useFetch<IResponse<ITripDetail>>(`${baseUrl}/Trip/trip.detail/${tripId.value}`, {
    key: `trip-detail-${tripId.value}`
  })

  const {
    data: tripRatingData,
    pending: ratingPending,
    error: ratingError
  } = useLazyFetch<IResponseList<ITripRating>>(`${baseUrl}/Trip/trip.rating?TripUid=${tripId.value}`)

  const {
    data: additionalInfoData,
    pending: additionalInfoPending,
    error: additionalInfoError
  } = useLazyFetch<IResponseList<IAdditionalInfo>>(`${baseUrl}/Booking/additional-list/${tripId.value}`)

  // Computed Data
  const trip = computed(() => tripDetailData.value?.data)

  const ratings = computed(() =>
    Array.isArray(tripRatingData.value?.data) ? tripRatingData.value?.data : []
  )

  const additionalInfoList = computed(() =>
    Array.isArray(additionalInfoData.value?.data) ? additionalInfoData.value?.data : []
  )

  const reformattedUniqueExperiences = computed(() => {
    const result: IImage[] = []
    const experiences: Array<{ uid: string, name: string, bannerImages: string }> = Array.isArray(trip.value?.experience) ? trip.value!.experience.slice(0, 12) : []

    experiences.forEach((experience: any) => {
      result.push({
        uid: experience.uid || '',
        src: experience.bannerImages ? `/unique-experience/${experience.bannerImages}.jpeg` : '',
        alt: experience.name,
        caption: experience.name,
        url: `/pengalaman-unik/${encodeURIComponent(experience.name.trim().replace(/\s+/g, '-').toLowerCase())}_${experience.uid}`,
        name: experience.name
      })
    })
    return result
  })

  const accommodationList = computed(() => {
    if (!trip.value?.accomodation) return []

    if (Array.isArray(trip.value.accomodation)) {
      return trip.value.accomodation.map((item: any) => {
        const image = item.thumbnail?.[0]
          ? `/accommodation/${item.thumbnail[0]}.jpeg`
          : item.image || '/placeholder-accommodation.jpg'

        return {
          image,
          name: item.name || 'Unnamed Accommodation',
          location: item.location || '',
          rating: item.rating || 0,
          reviewCount: item.reviewCount || 0,
          description: item.content || '',
          images: Array.isArray(item.thumbnail) ? item.thumbnail : [],
          basic: item.basic
        }
      })
    }

    if (typeof trip.value.accomodation === 'object') {
      const accommodation = trip.value.accomodation as any
      const image = accommodation.thumbnail?.[0]
        ? `/accommodation/${accommodation.thumbnail[0]}.jpeg`
        : accommodation.image || '/placeholder-accommodation.jpg'

      return [
        {
          image,
          name: accommodation.name || 'Unnamed Accommodation',
          location: accommodation.location || '',
          rating: accommodation.rating || 0,
          reviewCount: accommodation.reviewCount || 0,
          description: accommodation.content || '',
          facilities: Array.isArray(accommodation.facilities) ? accommodation.facilities : [],
          images: Array.isArray(accommodation.thumbnail) ? accommodation.thumbnail : [],
          basic: accommodation.basic
        }
      ]
    }

    return []
  })

  const suitAbility = computed(() => {
    return sanitizeHtml(trip.value?.suitability || '')
  })

  // Mobile Sticky Info Logic
  const firstAvailablePrice = ref(0)
  const showStickyMobileInfo = ref(true)

  watchEffect(() => {
    if (trip.value?.price) {
      firstAvailablePrice.value = trip.value.price
    }
  })

  const scrollToSchedule = () => {
    const scheduleSection = document.getElementById('schedule-section')
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navigateToExperience = async (experience: any) => {
    const slug = experience.name.toLowerCase().replace(/\s+/g, '-')
    await router.push(`/pengalaman-unik/${slug}_${experience.uid}`)
  }

  onMounted(() => {
    const scheduleSection = document.getElementById('schedule-section')
    if (scheduleSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            showStickyMobileInfo.value = !entry.isIntersecting
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(scheduleSection)
    }
  })

  return {
    tripId,
    width,
    sections,
    bentoSize,
    // Data
    trip,
    tripPending,
    tripError,
    ratings,
    ratingPending,
    ratingError,
    additionalInfoList,
    additionalInfoPending,
    additionalInfoError,
    // Computed
    reformattedUniqueExperiences,
    accommodationList,
    suitAbility,
    // Actions/State
    firstAvailablePrice,
    showStickyMobileInfo,
    scrollToSchedule,
    navigateToExperience,
    sanitizeHtml // Re-export if needed in template
  }
}
