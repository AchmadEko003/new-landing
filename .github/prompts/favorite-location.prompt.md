## Goals

Add `Destinasi Populer` component from `app/pages/index.vue` to `app/pages/tempat-favorite/index.vue` before `Tempat Favorit` component data. This destinasi populer component should be placed before the tempat favorit component in the tempat-favorite page. The data for the destinasi populer component should be fetched from the same API endpoint as the one used in the index page, which is `${baseUrl}/Country/country.list`. The data should be displayed in a similar format as it is displayed in the index page, with the same styling and layout. The component should also include a title that says "Destinasi Populer" to differentiate it from the tempat favorit component.

## Requirements
1. The `Destinasi Populer` component should be added to the `app/pages/tempat-favorite/index.vue` file.
2. The data for the `Destinasi Populer` component should be fetched from the `${baseUrl}/Country/country.list` API endpoint.
3. The `Destinasi Populer` component should be styled and laid out similarly to how it is displayed in the `app/pages/index.vue` file.
4. The `Destinasi Populer` component should include a title that says "Destinasi Populer" to differentiate it from the `Tempat Favorit` component.
5. When the component is clicked, it should trigger fetching the data for the `Tempat Favorit` to filter the data based on the selected destination.
6. The value used for filtering the `Tempat Favorit` data should be the `countryUid` of the selected destination from the `Destinasi Populer` component.
7. I prefer to make new component for `Destinasi Populer` and import it to `app/pages/tempat-favorite/index.vue` for better code organization and reusability. The different from eksisting component (app/components/carousel/SliderImage.vue) is no navigation to other page when the component is clicked, but instead it will trigger fetching the data for the `Tempat Favorit` to filter the data based on the selected destination. The value used for filtering the `Tempat Favorit` data should be the `countryUid` of the selected destination from the `Destinasi Populer` component and give style like green outline to indicate that the destination is selected.

## Reference
- /FavouriteLocation // if no filter
- /FavouriteLocation?countryUid=eb80de1e38aa40a7bb2f263ed02848ed // if filter by countryUid
