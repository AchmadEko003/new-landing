# Plan: Destinasi Populer Filter on Tempat Favorit Page

## Overview

Add a `Destinasi Populer` carousel to `app/pages/tempat-favorite/index.vue` that acts as a country filter for the `Tempat Favorit` grid. Clicking a country card re-fetches favorite locations filtered by `countryUid`. A green outline indicates the active selection.

---

## Files to Create

### `app/components/carousel/SliderImageFilter.vue`

New component derived from `SliderImage.vue` with two key differences:
- No page navigation on click — emits `update:modelValue` with the item's `uid` instead
- Green outline (`ring-2 ring-green-500`) on the item whose `uid` matches `modelValue`

**Props:**
```ts
images?: IImage[]
modelValue?: string   // currently selected uid
```

**Emits:**
```ts
update:modelValue: (uid: string | null) => void
```

**Template structure** — same `UCarousel` config as `SliderImage.vue`:
- `basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 2xl:basis-1/7`
- `container: 'px-2 md:px-25'`

Each item wraps `ImageThumbnail` (without `url` prop to disable router navigation) inside a `div` that:
- Handles `@click` → emit `update:modelValue` with `item.uid` (or `null` to deselect if already selected)
- Applies `ring-2 ring-green-500 rounded-2xl` when `item.uid === modelValue`

Keep the prev/next arrow buttons from `SliderImage.vue`.

---

## Files to Modify

### `app/pages/tempat-favorite/index.vue`

**1. Add imports**
```ts
import type { ICountry } from '~~/shared/interface/ICountry'
import type { IResponseList } from '~~/shared/interface/IResponse'
```

**2. Add reactive state**
```ts
const selectedCountryUid = ref<string | null>(null)
```

**3. Fetch country list** (alongside existing fetch)
```ts
const { data: countriesData } = await useLazyAsyncData('tempat-favorite-countries', () =>
  $fetch<IResponseList<ICountry>>(`${baseUrl}/Country/country.list`)
)
```

**4. Make FavouriteLocation fetch reactive**

Replace the static `useFetch` with a computed URL so the fetch re-runs when `selectedCountryUid` changes:
```ts
const favUrl = computed(() => {
  const base = `${baseUrl}/FavouriteLocation`
  return selectedCountryUid.value ? `${base}?countryUid=${selectedCountryUid.value}` : base
})

const { data: favoriteLocationsData, pending, error } = useFetch<IResponse<IFavoriteLocation[]>>(favUrl, {
  key: 'tempat-favorite'
})
```

**5. Map countries to `IImage[]`** (no `url` — prevents navigation)
```ts
const countryImages = computed<IImage[]>(() => {
  const list = countriesData.value?.data ?? []
  return list.map((c: ICountry) => ({
    uid: c.uid,
    src: `/country/512_${c.imageName}.webp`,
    alt: c.imageName,
    caption: c.name,
    name: c.name
    // no url intentionally
  }))
})
```

**6. Update template** — add the filter section before the existing `GridBento`:
```html
<div class="py-10">
  <!-- NEW: Destinasi Populer filter -->
  <section class="mb-8">
    <NavigationSectionHeader title="Destinasi Populer" />
    <CarouselSliderImageFilter
      :images="countryImages"
      v-model="selectedCountryUid"
    />
  </section>

  <!-- EXISTING: Tempat Favorit grid -->
  <NavigationSectionHeader title="Tempat Favorit" />
  <div v-if="pending">Loading...</div>
  <div v-else-if="error" class="text-red-500">{{ error.message || error }}</div>
  <GridBento
    v-else
    class="w-[95%] md:w-[70%] mx-auto"
    :items="reformattedFavoriteLocations"
    :size="width > 768 ? 'medium' : 'small'"
  />
</div>
```

---

## Behaviour Summary

| Action | Result |
|---|---|
| Page load | All favorite locations shown, no country selected |
| Click a country card | `selectedCountryUid` set → `favUrl` recomputes → `useFetch` re-runs with `?countryUid=...` → grid updates |
| Click the same card again | `selectedCountryUid` set to `null` → fetch reverts to unfiltered endpoint |
| Selected card visual | `ring-2 ring-green-500` outline via wrapper div |

---

## Notes

- `ImageThumbnail.vue` already skips `router.push` when `url` prop is absent, so no changes needed to that component.
- The `useFetch` reactive URL pattern is idiomatic in Nuxt 4 — passing a `computed` ref as the URL triggers an automatic re-fetch on change.
- Keep existing `reformattedFavoriteLocations` computed as-is; it already handles the `favoriteLocationsData` shape.
