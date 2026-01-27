import { _ as __nuxt_component_2$1 } from './AnchorNav-Cdr332j2.mjs';
import { _ as __nuxt_component_1 } from './Responsive-BjUdJ6QZ.mjs';
import { e as _export_sfc, q as useRoute, h as useRouter, _ as _sfc_main$f, d as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, ref, watchEffect, resolveComponent, unref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_3 } from './htmlRender-C6FQn9zU.mjs';
import { _ as _sfc_main$2 } from './Accordion-D-iHN-ul.mjs';
import { _ as _sfc_main$3 } from './Carousel-CrWM6JLN.mjs';
import { u as useWindowSize } from './index-B3YyvcOz.mjs';
import { a as useFetch, u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
import 'vue-router';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'pinia';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'dompurify';
import 'embla-carousel-vue';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Thumbnail",
  __ssrInlineRender: true,
  props: {
    imgUrl: { type: String, required: true },
    title: { type: String, required: false },
    url: { type: String, required: false },
    aspectAuto: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const imgSrc = computed(() => props.imgUrl);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "relative rounded-2xl overflow-hidden shadow-lg transition-transform",
          "duration-200 group bg-black/5 hover:scale-99",
          !__props.aspectAuto ? "aspect-square" : "",
          __props.url ? "cursor-pointer" : ""
        ]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        provider: "peponi",
        src: unref(imgSrc),
        alt: __props.title,
        loading: "lazy",
        class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-200",
        placeholder: "/assets/image-crashed.png",
        onContextmenu: () => {
        }
      }, null, _parent));
      if (__props.title) {
        _push(`<div class="absolute inset-0 flex items-end" style="${ssrRenderStyle({ "background": "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 10%, transparent 30%)" })}"><h2 class="text-white text-xl lg:text-2xl font-bold drop-shadow-lg p-4">${ssrInterpolate(__props.title)}</h2></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/image/Thumbnail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "ImageThumbnail" });
const useSanitize = () => {
  const sanitizeHtml = (html) => {
    if (!html) return "";
    return html;
  };
  return {
    sanitizeHtml
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[tripId]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const tripId = computed(() => route.params.tripId);
    const { width } = useWindowSize();
    const { sanitizeHtml } = useSanitize();
    const sections = [
      { id: "summary-trip-section", title: "Ringkasan" },
      { id: "suitability-section", title: "Apakah sesuai untukmu?" },
      { id: "itinerary-section", title: "Itinerary" },
      { id: "included-section", title: "Termasuk & Tidak Termasuk" },
      { id: "accommodation-section", title: "Akomodasi" },
      { id: "reviews-section", title: "Ulasan" },
      { id: "faqs-section", title: "FAQs" },
      { id: "schedule-section", title: "Jadwal Trip" }
    ];
    const {
      data: tripDetailData,
      pending: tripPending,
      error: tripError
    } = useFetch(`/api/trips/${tripId.value}`, "$5uhvQih_2W");
    const {
      data: tripRatingData,
      pending: ratingPending,
      error: ratingError
    } = useLazyFetch(`/api/trips/review/${tripId.value}`, "$wv8FBoAHa8");
    const trip = computed(() => tripDetailData.value?.data);
    const ratings = computed(
      () => Array.isArray(tripRatingData.value?.data) ? tripRatingData.value?.data : []
    );
    const accommodationList = computed(() => {
      if (!trip.value?.accomodation) return [];
      console.log("asd", trip.value.accomodation);
      if (Array.isArray(trip.value.accomodation)) {
        return trip.value.accomodation.map((item) => {
          const image = item.thumbnail?.[0] ? `/accommodation/${item.thumbnail[0]}.jpeg` : item.image || "/placeholder-accommodation.jpg";
          return {
            image,
            name: item.name || "Unnamed Accommodation",
            location: item.location || "",
            rating: item.rating || 0,
            reviewCount: item.reviewCount || 0,
            description: item.content || "",
            images: Array.isArray(item.thumbnail) ? item.thumbnail : [],
            basic: item.basic
          };
        });
      }
      if (typeof trip.value.accomodation === "object") {
        const accommodation = trip.value.accomodation;
        const image = accommodation.thumbnail?.[0] ? `/accommodation/${accommodation.thumbnail[0]}.jpeg` : accommodation.image || "/placeholder-accommodation.jpg";
        return [
          {
            image,
            name: accommodation.name || "Unnamed Accommodation",
            location: accommodation.location || "",
            rating: accommodation.rating || 0,
            reviewCount: accommodation.reviewCount || 0,
            description: accommodation.content || "",
            facilities: Array.isArray(accommodation.facilities) ? accommodation.facilities : [],
            images: Array.isArray(accommodation.thumbnail) ? accommodation.thumbnail : [],
            basic: accommodation.basic
          }
        ];
      }
      return [];
    });
    const suitAbility = computed(() => sanitizeHtml(trip.value?.suitability || ""));
    const tripScheduleRef = ref();
    const firstAvailablePrice = ref(0);
    const showStickyMobileInfo = ref(true);
    watchEffect(() => {
      if (trip.value?.price) {
        firstAvailablePrice.value = trip.value.price;
      }
    });
    const scrollToSchedule = () => {
      const scheduleSection = (void 0).getElementById("schedule-section");
      if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarouselTripBanner = resolveComponent("CarouselTripBanner");
      const _component_NavigationAnchorNav = __nuxt_component_2$1;
      const _component_CardTripSummary = resolveComponent("CardTripSummary");
      const _component_ImageResponsive = __nuxt_component_1;
      const _component_ImageThumbnail = __nuxt_component_2;
      const _component_UtilHtmlRender = __nuxt_component_3;
      const _component_UAccordion = _sfc_main$2;
      const _component_UCarousel = _sfc_main$3;
      const _component_UIcon = _sfc_main$f;
      const _component_CarouselAccommodation = resolveComponent("CarouselAccommodation");
      const _component_GridRating = resolveComponent("GridRating");
      const _component_TripSchedule = resolveComponent("TripSchedule");
      const _component_UtilStickyMobileInfo = resolveComponent("UtilStickyMobileInfo");
      if (unref(tripPending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-[50dvh] md:h-[75dvh]" }, _attrs))} data-v-be287c3e><span class="text-gray-500" data-v-be287c3e>Loading trip details...</span></div>`);
      } else if (unref(tripError)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-[50dvh] md:h-[75dvh]" }, _attrs))} data-v-be287c3e><span class="text-red-500" data-v-be287c3e>${ssrInterpolate(unref(tripError).message || unref(tripError))}</span></div>`);
      } else if (!unref(trip)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-[50dvh] md:h-[75dvh]" }, _attrs))} data-v-be287c3e><span class="text-gray-500" data-v-be287c3e>Trip not found.</span></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-be287c3e>`);
        _push(ssrRenderComponent(_component_CarouselTripBanner, {
          images: unref(trip).bannerImages,
          "trip-name": unref(trip).name
        }, null, _parent));
        _push(ssrRenderComponent(_component_NavigationAnchorNav, { sections }, null, _parent));
        _push(`<div class="py-8 px-3 md:px-28 flex flex-col gap-8" data-v-be287c3e><div class="flex flex-col gap-1" data-v-be287c3e><h1 class="text-3xl font-bold" data-v-be287c3e>${ssrInterpolate(unref(trip).name)}</h1><div class="text-xl text-primary font-semibold" data-v-be287c3e> Destinasi <span class="text-gray-800" data-v-be287c3e>${ssrInterpolate(unref(trip).country)}</span></div><p class="text-lg font-medium" data-v-be287c3e>${ssrInterpolate(unref(trip).headline)}</p><p class="text-lg font-medium" data-v-be287c3e>${ssrInterpolate(unref(trip).summary)}</p></div><section id="summary-trip-section" data-v-be287c3e><h1 class="text-3xl font-bold mb-6" data-v-be287c3e> Ringkasan Trip </h1><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6" data-v-be287c3e>`);
        if (unref(width) <= 768) {
          _push(`<div class="flex flex-col" data-v-be287c3e><table data-v-be287c3e><tbody data-v-be287c3e><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Durasi </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).days)} hari</td></tr><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Destinasi </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).destination)}</td></tr><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Transportasi </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).transportation)}</td></tr><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Meeting Point </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).meetingPoint)}</td></tr><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Ukuran Group </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).groupSize)} orang</td></tr><tr data-v-be287c3e><td class="font-semibold w-36" data-v-be287c3e> Tim </td><td data-v-be287c3e>${ssrInterpolate(unref(trip).team)}</td></tr></tbody></table></div>`);
        } else {
          _push(`<div class="space-y-4" data-v-be287c3e><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-be287c3e>`);
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Durasi",
            value: `${unref(trip).days} hari`,
            icon: "calendar"
          }, null, _parent));
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Destinasi",
            value: unref(trip).destination,
            icon: "destinasi"
          }, null, _parent));
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Transportasi",
            value: unref(trip).transportation,
            icon: "transportation"
          }, null, _parent));
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Meeting Point",
            value: unref(trip).meetingPoint,
            icon: "meeting-point"
          }, null, _parent));
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Ukuran Group",
            value: `${unref(trip).groupSize} orang`,
            icon: "group"
          }, null, _parent));
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Tim",
            value: unref(trip).team,
            icon: "team"
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_CardTripSummary, {
            label: "Dokumentasi",
            value: unref(trip).documentation,
            icon: "dokumentasi"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<div class="flex items-center justify-center" data-v-be287c3e>`);
        _push(ssrRenderComponent(_component_ImageResponsive, {
          "img-url": `/trip/${unref(trip).mapImage}.jpeg`,
          alt: "Trip Map",
          class: "rounded-xl w-full h-auto max-h-96 object-cover"
        }, null, _parent));
        _push(`</div></div></section><section data-v-be287c3e><div class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-2" data-v-be287c3e> Pengalaman utama </h2><div class="grid grid-cols-3 gap-5" data-v-be287c3e><!--[-->`);
        ssrRenderList(unref(trip).uniqueExperience.slice(0, 9), (item, i) => {
          _push(`<div class="cursor-pointer" data-v-be287c3e>`);
          _push(ssrRenderComponent(_component_ImageThumbnail, mergeProps({ ref_for: true }, item, {
            title: item.name,
            "aspect-auto": "",
            "img-url": `/unique-experience/512_${item.uid}.webp`
          }), null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></section><section id="suitability-section" data-v-be287c3e><div class="mb-6 md:grid md:grid-cols-2" data-v-be287c3e><h2 class="text-2xl font-semibold mb-2" data-v-be287c3e> Apakah trip ini sesuai untukmu? </h2>`);
        _push(ssrRenderComponent(_component_UtilHtmlRender, { content: unref(suitAbility) }, null, _parent));
        _push(`</div></section><section id="itinerary-section" data-v-be287c3e><div class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-2" data-v-be287c3e> Itinerary </h2>`);
        if (unref(trip).itineraries && unref(trip).itineraries.length) {
          _push(ssrRenderComponent(_component_UAccordion, {
            items: unref(trip).itineraries.map((item, i) => ({
              label: `Day ${i + 1} ${item.title}`,
              content: unref(sanitizeHtml)(item.content || ""),
              banners: item.banners || []
            })),
            ui: {
              trigger: "cursor-pointer",
              label: "text-xl font-bold",
              trailingIcon: "text-primary h-8 w-8"
            }
          }, {
            content: withCtx(({ item }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (item.banners && item.banners.length > 0) {
                  _push2(`<div class="mb-4" data-v-be287c3e${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UCarousel, {
                    arrows: "",
                    items: item.banners,
                    prev: { icon: "i-heroicons-chevron-left-20-solid", size: "lg", color: "neutral", class: "hover:opacity-100 opacity-70" },
                    next: { icon: "i-heroicons-chevron-right-20-solid", size: "lg", color: "neutral", class: "hover:opacity-100 opacity-70" },
                    ui: {
                      item: "basis-full md:basis-1/2",
                      container: "rounded-lg",
                      prev: "absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg",
                      next: "absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg"
                    },
                    class: "rounded-lg overflow-hidden"
                  }, {
                    default: withCtx(({ item: banner }, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img${ssrRenderAttr("src", `http://103.189.234.243/img-asset/trip/${banner}.jpeg`)}${ssrRenderAttr("alt", `Banner for Day ${item.label}`)} class="w-full h-96 object-cover" draggable="false" data-v-be287c3e${_scopeId2}>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: `http://103.189.234.243/img-asset/trip/${banner}.jpeg`,
                            alt: `Banner for Day ${item.label}`,
                            class: "w-full h-96 object-cover",
                            draggable: "false"
                          }, null, 8, ["src", "alt"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="prose prose-sm max-w-none text-gray-700" data-v-be287c3e${_scopeId}>${unref(sanitizeHtml)(item.content || "") ?? ""}</div>`);
              } else {
                return [
                  item.banners && item.banners.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4"
                  }, [
                    createVNode(_component_UCarousel, {
                      arrows: "",
                      items: item.banners,
                      prev: { icon: "i-heroicons-chevron-left-20-solid", size: "lg", color: "neutral", class: "hover:opacity-100 opacity-70" },
                      next: { icon: "i-heroicons-chevron-right-20-solid", size: "lg", color: "neutral", class: "hover:opacity-100 opacity-70" },
                      ui: {
                        item: "basis-full md:basis-1/2",
                        container: "rounded-lg",
                        prev: "absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg",
                        next: "absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg"
                      },
                      class: "rounded-lg overflow-hidden"
                    }, {
                      default: withCtx(({ item: banner }) => [
                        createVNode("img", {
                          src: `http://103.189.234.243/img-asset/trip/${banner}.jpeg`,
                          alt: `Banner for Day ${item.label}`,
                          class: "w-full h-96 object-cover",
                          draggable: "false"
                        }, null, 8, ["src", "alt"])
                      ]),
                      _: 2
                    }, 1032, ["items"])
                  ])) : createCommentVNode("", true),
                  createVNode("div", {
                    class: "prose prose-sm max-w-none text-gray-700",
                    innerHTML: unref(sanitizeHtml)(item.content || "")
                  }, null, 8, ["innerHTML"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div data-v-be287c3e> Tidak ada itinerary. </div>`);
        }
        _push(`</div></section><section id="included-section" class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-6" data-v-be287c3e> Termasuk &amp; Tidak Termasuk </h2>`);
        if (unref(trip).included && unref(trip).included.length) {
          _push(`<div data-v-be287c3e><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-be287c3e><!--[-->`);
          ssrRenderList(unref(trip).included, (item) => {
            _push(`<div class="flex items-start gap-3" data-v-be287c3e>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: item.isIncluded ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
              class: [
                item.isIncluded ? "text-green-500" : "text-red-500",
                "text-lg mt-0.5"
              ]
            }, null, _parent));
            _push(`<div data-v-be287c3e><h4 class="font-semibold text-gray-900" data-v-be287c3e>${ssrInterpolate(item.title)}</h4><p class="text-gray-600 text-sm" data-v-be287c3e>${ssrInterpolate(item.content)}</p></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<div class="text-gray-500" data-v-be287c3e> Tidak ada informasi termasuk/tidak termasuk. </div>`);
        }
        _push(`</section><section id="accommodation-section" class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-6" data-v-be287c3e> Akomodasi </h2>`);
        if (unref(accommodationList).length) {
          _push(`<div data-v-be287c3e>`);
          _push(ssrRenderComponent(_component_CarouselAccommodation, { "accommodation-list": unref(accommodationList) }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="text-gray-500" data-v-be287c3e> Tidak ada informasi akomodasi. </div>`);
        }
        _push(`</section><section id="reviews-section" class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-6" data-v-be287c3e> Ulasan Trip </h2>`);
        _push(ssrRenderComponent(_component_GridRating, {
          ratings: unref(ratings),
          loading: unref(ratingPending),
          error: unref(ratingError)
        }, null, _parent));
        _push(`</section><section id="faqs-section" class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-6" data-v-be287c3e> FAQs </h2>`);
        if (unref(trip).faq && unref(trip).faq.length) {
          _push(ssrRenderComponent(_component_UAccordion, {
            items: unref(trip).faq.map((faq, i) => ({
              label: faq.title || `FAQ ${i + 1}`,
              content: unref(sanitizeHtml)(faq.content || "")
            })),
            ui: {
              trigger: "cursor-pointer",
              label: "text-xl font-bold",
              trailingIcon: "text-primary h-8 w-8"
            }
          }, {
            content: withCtx(({ item }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="prose prose-sm max-w-none text-gray-700" data-v-be287c3e${_scopeId}>${unref(sanitizeHtml)(item.content || "") ?? ""}</div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "prose prose-sm max-w-none text-gray-700",
                    innerHTML: unref(sanitizeHtml)(item.content || "")
                  }, null, 8, ["innerHTML"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div data-v-be287c3e> Tidak ada FAQ. </div>`);
        }
        _push(`</section><section id="schedule-section" data-v-be287c3e><div class="mb-6" data-v-be287c3e><h2 class="text-2xl font-semibold mb-2" data-v-be287c3e> Jadwal Ketersediaan </h2>`);
        _push(ssrRenderComponent(_component_TripSchedule, {
          ref_key: "tripScheduleRef",
          ref: tripScheduleRef,
          "trip-uid": unref(tripId)
        }, null, _parent));
        _push(`</div></section><section id="more-info-section" data-v-be287c3e><div class="mb-6 md:max-w-5xl" data-v-be287c3e><h2 class="text-2xl font-semibold mb-2" data-v-be287c3e> Informasi Tambahan </h2>`);
        _push(ssrRenderComponent(_component_UtilHtmlRender, {
          content: unref(trip).moreInformation || ""
        }, null, _parent));
        _push(`</div></section></div>`);
        _push(ssrRenderComponent(_component_UtilStickyMobileInfo, {
          style: unref(showStickyMobileInfo) ? null : { display: "none" },
          price: unref(firstAvailablePrice),
          onButtonClick: scrollToSchedule
        }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trip/[tripId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _tripId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-be287c3e"]]);

export { _tripId_ as default };
//# sourceMappingURL=_tripId_-BwzssrH3.mjs.map
