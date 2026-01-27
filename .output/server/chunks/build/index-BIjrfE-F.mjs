import { u as useRuntimeConfig, f as useLazyAsyncData, e as _export_sfc, c as __nuxt_component_2$1, d as __nuxt_component_1$1, b as _sfc_main$9, _ as _sfc_main$f } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, ref, computed, withCtx, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
import { _ as __nuxt_component_0$1 } from './SectionHeader-Bns2bykH.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_4$1 } from './Trip-CAZ4wUCu.mjs';
import { _ as __nuxt_component_1 } from './Bento-e23fzcFP.mjs';
import { _ as _sfc_main$3 } from './Carousel-CrWM6JLN.mjs';
import { u as useWindowSize } from './index-B3YyvcOz.mjs';
import { u as useCountryStore } from './country-BYvzu9r4.mjs';
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
import 'vue-router';
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
import '@vue/shared';
import './Responsive-BjUdJ6QZ.mjs';
import 'embla-carousel-vue';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Banner",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const width = ref(1024);
    computed(() => {
      return width.value > 768 ? "3.5em" : "3em";
    });
    const carousel = ref(null);
    computed(() => carousel.value?.emblaApi);
    const { data: bannersData, pending } = useLazyFetch(`${baseUrl}/Banner`, "$ynq_jsPuE6");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center w-full h-[75dvh] bg-gray-100"${_scopeId}><span class="text-gray-500"${_scopeId}>Loading banners...</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center w-full h-[75dvh] bg-gray-100" }, [
                createVNode("span", { class: "text-gray-500" }, "Loading banners...")
              ])
            ];
          }
        })
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/Banner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "CarouselBanner" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AboutBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const { width } = useWindowSize();
    const computedWidth = computed(() => width.value || 0);
    const carousel = ref(null);
    const emblaApi = computed(() => carousel.value?.emblaApi);
    const next = () => {
      if (emblaApi.value) {
        emblaApi.value.scrollNext();
      }
    };
    const prev = () => {
      if (emblaApi.value) {
        emblaApi.value.scrollPrev();
      }
    };
    const { data: aboutBannersData } = useLazyFetch(
      `${baseUrl}/Banner/sub`,
      {
        key: "sub-banners"
      },
      "$tTmVOvream"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$3;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UButton = _sfc_main$9;
      const _component_UIcon = _sfc_main$f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-d000c253>`);
      if (unref(aboutBannersData)?.meta.totalItem) {
        _push(ssrRenderComponent(_component_UCarousel, {
          ref_key: "carousel",
          ref: carousel,
          items: unref(aboutBannersData)?.data || [],
          class: "w-full p-0",
          autoplay: true,
          loop: true,
          dots: false,
          ui: {
            item: "!p-0",
            container: "h-[55dvh]"
            // Shorter height than banner.vue
          }
        }, {
          default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-full h-full bg-black/10 absolute z-10 top-0 bottom-0 right-0 left-0" data-v-d000c253${_scopeId}></div><div class="relative" data-v-d000c253${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                provider: "peponi",
                src: `/banner/${item.imageUrl}.jpeg`,
                alt: item.title,
                class: "object-cover w-full h-[55dvh]!",
                style: { "height": "100%", "width": "100%" },
                onContextmenu: () => {
                }
              }, null, _parent2, _scopeId));
              _push2(`<div class="absolute bottom-0 w-full flex flex-row-reverse items-end justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 lg:py-6" data-v-d000c253${_scopeId}><div class="flex gap-2 md:gap-3 z-20" data-v-d000c253${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                class: "rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20",
                variant: "ghost",
                onClick: ($event) => prev()
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "heroicons:arrow-left",
                      size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                      class: "text-white"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "heroicons:arrow-left",
                        size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                        class: "text-white"
                      }, null, 8, ["size"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                class: "rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20",
                variant: "ghost",
                onClick: ($event) => next()
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "heroicons:arrow-right",
                      size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                      class: "text-white"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "heroicons:arrow-right",
                        size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                        class: "text-white"
                      }, null, 8, ["size"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "w-full h-full bg-black/10 absolute z-10 top-0 bottom-0 right-0 left-0" }),
                createVNode("div", { class: "relative" }, [
                  createVNode(_component_NuxtImg, {
                    provider: "peponi",
                    src: `/banner/${item.imageUrl}.jpeg`,
                    alt: item.title,
                    class: "object-cover w-full h-[55dvh]!",
                    style: { "height": "100%", "width": "100%" },
                    onContextmenu: withModifiers(() => {
                    }, ["prevent"])
                  }, null, 8, ["src", "alt", "onContextmenu"]),
                  createVNode("div", { class: "absolute bottom-0 w-full flex flex-row-reverse items-end justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 lg:py-6" }, [
                    createVNode("div", { class: "flex gap-2 md:gap-3 z-20" }, [
                      createVNode(_component_UButton, {
                        class: "rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20",
                        variant: "ghost",
                        onClick: ($event) => prev()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "heroicons:arrow-left",
                            size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                            class: "text-white"
                          }, null, 8, ["size"])
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        class: "rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20",
                        variant: "ghost",
                        onClick: ($event) => next()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "heroicons:arrow-right",
                            size: unref(computedWidth) > 768 ? "2.5em" : "2em",
                            class: "text-white"
                          }, null, 8, ["size"])
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="flex items-center justify-center w-full h-[32dvh]" data-v-d000c253><span data-v-d000c253>Loading banners...</span></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/AboutBanner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-d000c253"]]), { __name: "CarouselAboutBanner" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.apiBase;
    const { width } = useWindowSize();
    const store = useCountryStore();
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("home", async () => {
      const [countryRes, favLocationRes, uniqueRes, tripRes] = await Promise.allSettled([
        $fetch(`${baseUrl}/Country/country.list`),
        $fetch(`${baseUrl}/FavouriteLocation`),
        $fetch(`${baseUrl}/UniqueExperience`),
        $fetch(
          `${baseUrl}/Trip/trip.list`
        )
      ]);
      const countryTemp = countryRes.status === "fulfilled" ? countryRes.value?.data : [];
      const favLocationTemp = favLocationRes.status === "fulfilled" ? favLocationRes.value?.data?.slice(0, 20) : [];
      const uniqueExperienceTemp = uniqueRes.status === "fulfilled" ? uniqueRes.value?.data?.slice(0, 14) : [];
      const tripTemp = tripRes.status === "fulfilled" ? tripRes.value?.data?.slice(0, 10) : [];
      store.countryList = countryTemp;
      let country = [];
      if (countryTemp && countryTemp.length > 0) {
        country = countryTemp.map((country2) => ({
          uid: country2.uid || "",
          src: `/country/512_${country2.imageName}.webp`,
          alt: country2.imageName,
          url: `/destinasi-populer/${encodeURIComponent(country2.name.trim().replace(/\s+/g, "-").toLowerCase())}_${country2.uid}`,
          caption: country2.name,
          name: country2.name
        }));
      }
      let favLocation = [];
      if (favLocationTemp && favLocationTemp.length > 0) {
        favLocation = favLocationTemp.map((item) => ({
          uid: item.uid || "",
          src: item.banner?.[0] ? `/favorite-location/512_${item.banner[0]}.webp` : "",
          alt: item.banner?.[0] || "",
          caption: item.name,
          name: item.name,
          url: `/tempat-favorite/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`
        }));
      }
      let uniqueExperience = [];
      if (uniqueExperienceTemp && uniqueExperienceTemp.length > 0) {
        uniqueExperience = uniqueExperienceTemp.map((item) => ({
          uid: item.uid || "",
          src: item.bannerList?.[0] ? `/unique-experience/512_${item.bannerList[0]}.webp` : "",
          alt: item.bannerList?.[0] || "",
          caption: item.name,
          name: item.name,
          url: `/pengalaman-unik/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`
        }));
      }
      let trip = [];
      if (tripTemp && tripTemp.length > 0) {
        trip = tripTemp.map((item) => ({
          imageSrc: item.banner?.[0] || "",
          url: `/trip/${item.uid}`,
          title: item.name,
          days: String(item.days),
          startPrice: parseInt(item.price) || 0,
          tripId: item.uid
        }));
      }
      return { country, favLocation, uniqueExperience, trip };
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarouselBanner = __nuxt_component_0;
      const _component_NavigationSectionHeader = __nuxt_component_0$1;
      const _component_CarouselSliderImage = __nuxt_component_5;
      const _component_GridBento = __nuxt_component_1;
      const _component_CarouselAboutBanner = __nuxt_component_4;
      const _component_CarouselTrip = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-12" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CarouselBanner, null, null, _parent));
      _push(`<section>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, {
        title: "Destinasi Populer",
        url: "/destinasi-populer"
      }, null, _parent));
      _push(ssrRenderComponent(_component_CarouselSliderImage, {
        images: unref(data)?.country
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, {
        title: "Tempat Favorit",
        url: "/tempat-favorite"
      }, null, _parent));
      _push(ssrRenderComponent(_component_CarouselSliderImage, {
        images: unref(data)?.favLocation
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, {
        title: "Pengalaman Unik",
        url: "/pengalaman-unik"
      }, null, _parent));
      _push(ssrRenderComponent(_component_GridBento, {
        class: "w-[95%] md:w-[70%] mx-auto",
        items: unref(data)?.uniqueExperience,
        size: unref(width) > 768 ? "medium" : "small"
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Mengapa Peponi ?" }, null, _parent));
      _push(`<p class="px-6 md:px-24 text-[1.3em] font-semibold"> Sebagai pionir perjalanan seperti orang lokal pertama di indonesia, kami terus berkomitmen untuk menghadirkan berbagai perjalanan unik yang akan mengajak kamu terhubung lebih dalam dengan destinasi. </p></section><section>`);
      _push(ssrRenderComponent(_component_CarouselAboutBanner, null, null, _parent));
      _push(`</section>`);
      if (unref(data)) {
        _push(`<section>`);
        _push(ssrRenderComponent(_component_NavigationSectionHeader, {
          title: "Trip Tersedia",
          url: "/trip"
        }, null, _parent));
        _push(ssrRenderComponent(_component_CarouselTrip, {
          items: unref(data)?.trip
        }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section><div class="flex flex-col items-center px-4 md:w-[60%] mx-auto"><div class="flex flex-col items-center justify-center w-full mb-6">`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Peponi telah diakui sebagai" }, null, _parent));
      _push(`<p class="text-gray-600 text-lg mt-4"> Kepercayaan dan pengakuan dari berbagai institusi membuktikan komitmen kami dalam memberikan pelayanan terbaik </p></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BIjrfE-F.mjs.map
