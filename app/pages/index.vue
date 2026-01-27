<script setup lang="ts">
import type { ICountry } from '~~/shared/interface/ICountry'
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { IFavoriteLocation } from '~~/shared/interface/IFavoriteLocation'
import type { IImage } from '~~/shared/interface/IImage'
import type { IUniqueExperience } from '~~/shared/interface/IUniqueExperience'
import type { ITrip, ITripCard } from '~~/shared/interface/ITrip'

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiBase
const { width } = useWindowSize()

const store = useCountryStore()

const { data } = await useAsyncData('home', async () => {
  const [countryRes, favLocationRes, uniqueRes, tripRes] = await Promise.allSettled([
    $fetch<IResponseList<ICountry>>(`${baseUrl}/Country/country.list`),
    $fetch<IResponseList<IFavoriteLocation>>(`${baseUrl}/FavouriteLocation`),
    $fetch<IResponseList<IUniqueExperience>>(`${baseUrl}/UniqueExperience`),
    $fetch<IResponseList<ITrip>>(
      `${baseUrl}/Trip/trip.list`
    )
  ])

  const countryTemp: ICountry[] | undefined
    = countryRes.status === 'fulfilled' ? countryRes.value?.data : []
  const favLocationTemp: IFavoriteLocation[] | undefined
    = favLocationRes.status === 'fulfilled'
      ? favLocationRes.value?.data?.slice(0, 20)
      : []
  const uniqueExperienceTemp: IUniqueExperience[] | undefined
    = uniqueRes.status === 'fulfilled' ? uniqueRes.value?.data?.slice(0, 14) : []
  const tripTemp: ITrip[] | undefined
    = tripRes.status === 'fulfilled' ? tripRes.value?.data?.slice(0, 10): []

  store.countryList = countryTemp

  let country: IImage[] = []
  if (countryTemp && countryTemp.length > 0) {
    country = countryTemp.map((country: ICountry) => ({
      uid: country.uid || '',
      src: `/country/512_${country.imageName}.webp`,
      alt: country.imageName,
      url: `/destinasi-populer/${encodeURIComponent(country.name.trim().replace(/\s+/g, '-').toLowerCase())}_${country.uid}`,
      caption: country.name,
      name: country.name
    }))
  }

  let favLocation: IImage[] = []
  if (favLocationTemp && favLocationTemp.length > 0) {
    favLocation = favLocationTemp.map((item: IFavoriteLocation) => ({
      uid: item.uid || '',
      src: item.banner?.[0]
        ? `/favorite-location/512_${item.banner[0]}.webp`
        : '',
      alt: item.banner?.[0] || '',
      caption: item.name,
      name: item.name,
      url: `/tempat-favorite/${encodeURIComponent(item.name.trim().replace(/\s+/g, '-').toLowerCase())}_${item.uid}`
    }))
  }

  let uniqueExperience: IImage[] = []
  if (uniqueExperienceTemp && uniqueExperienceTemp.length > 0) {
    uniqueExperience = uniqueExperienceTemp.map((item: IUniqueExperience) => ({
      uid: item.uid || '',
      src: item.bannerList?.[0]
        ? `/unique-experience/512_${item.bannerList[0]}.webp`
        : '',
      alt: item.bannerList?.[0] || '',
      caption: item.name,
      name: item.name,
      url: `/pengalaman-unik/${encodeURIComponent(item.name.trim().replace(/\s+/g, '-').toLowerCase())}_${item.uid}`
    }))
  }

  let trip: ITripCard[] = []
  if (tripTemp && tripTemp.length > 0) {
    trip = tripTemp.map((item: ITrip) => ({
      imageSrc: item.banner?.[0] || '',
      url: `/trip/${item.uid}`,
      title: item.name,
      days: String(item.days),
      startPrice: parseInt(item.price) || 0,
      tripId: item.uid
    }))
  }

  return { country, favLocation, uniqueExperience, trip }
})
</script>

<template>
  <div class="flex flex-col gap-12">
    <CarouselBanner />

    <section>
      <NavigationSectionHeader
        title="Destinasi Populer"
        url="/destinasi-populer"
      />
      <CarouselSliderImage :images="data?.country" />
    </section>

    <section>
      <NavigationSectionHeader
        title="Tempat Favorit"
        url="/tempat-favorite"
      />
      <CarouselSliderImage :images="data?.favLocation" />
    </section>

    <section>
      <NavigationSectionHeader
        title="Pengalaman Unik"
        url="/pengalaman-unik"
      />
      <GridBento
        class="w-[95%] md:w-[70%] mx-auto"
        :items="data?.uniqueExperience"
        :size="width > 768 ? 'medium' : 'small'"
      />
    </section>

    <section>
      <NavigationSectionHeader title="Mengapa Peponi ?" />
      <p class="px-6 md:px-24 text-[1.3em] font-semibold">
        Sebagai pionir perjalanan seperti orang lokal pertama di indonesia, kami
        terus berkomitmen untuk menghadirkan berbagai perjalanan unik yang akan
        mengajak kamu terhubung lebih dalam dengan destinasi.
      </p>
    </section>

    <section>
      <CarouselAboutBanner />
    </section>

    <section v-if="data">
      <NavigationSectionHeader title="Trip Tersedia" url="/trip" />
      <CarouselTrip :items="data?.trip" />
    </section>

    <section>
      <div class="flex flex-col items-center px-4 md:w-[60%] mx-auto">
        <div class="flex flex-col items-center justify-center w-full mb-6">
          <NavigationSectionHeader title="Peponi telah diakui sebagai" />

          <p class="text-gray-600 text-lg mt-4">
            Kepercayaan dan pengakuan dari berbagai institusi membuktikan komitmen kami dalam memberikan pelayanan
            terbaik
          </p>
        </div>
        <!-- <GridCertificateGrid :certificates="reformattedCertificates" /> -->
      </div>
    </section>
  </div>
</template>
