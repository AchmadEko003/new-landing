import { u as useRuntimeConfig, a as useHead, _ as _sfc_main$f, b as _sfc_main$9, g as __nuxt_component_1$2 } from './server.mjs';
import { _ as __nuxt_component_1 } from './Responsive-BjUdJ6QZ.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { f as formatCurrency } from '../_/currency.mjs';
import { u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Trip",
  __ssrInlineRender: true,
  props: {
    imageSrc: {},
    title: {},
    days: {},
    summary: {},
    startPrice: {},
    tripId: {},
    url: {}
  },
  setup(__props) {
    const props = __props;
    const imageSrc = computed(() => props.imageSrc);
    const title = computed(() => props.title || "");
    const days = computed(() => props.days || "0");
    const summary = computed(() => props.summary || "");
    const startPrice = computed(() => props.startPrice ?? 0);
    const url = computed(() => props.url || "#");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_ImageResponsive = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({ to: unref(url) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([
              "w-full max-w-[15em] md:max-w-[20em] min-h-[400px] md:min-h-[608px] rounded-2xl overflow-hidden",
              "border-[1px] border-gray-200 hover:border-primary group cursor-pointer flex flex-col select-none",
              "hover:-mt-2 transition-all duration-300 ease-in-out"
            ])}"${_scopeId}><div class="relative pointer-events-none flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ImageResponsive, {
              "img-url": `/trip/${unref(imageSrc)}.jpeg`,
              size: "medium"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col flex-1 p-3"${_scopeId}><div class="flex flex-col gap-2 md:gap-3 flex-1"${_scopeId}><h2 class="text-base md:text-lg lg:text-2xl font-semibold line-clamp-2 select-none"${_scopeId}>${ssrInterpolate(unref(title))}</h2><p class="font-bold text-xs md:text-sm lg:text-base select-none"${_scopeId}>${ssrInterpolate(unref(days))} Hari </p><p class="text-xs md:text-sm lg:text-base line-clamp-2 select-none"${_scopeId}>${ssrInterpolate(unref(summary))}</p></div><div class="mt-auto mb-3"${_scopeId}><p class="text-xs md:text-sm lg:text-base select-none"${_scopeId}> mulai dari <span class="text-sm md:text-lg lg:text-2xl font-bold select-none block mt-1"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(startPrice)))}</span></p></div><div class="flex-shrink-0"${_scopeId}><button class="w-full border-[1px] border-gray-400 rounded-lg py-2 md:py-3 text-sm md:text-base group-hover:cursor-pointer group-hover:border-primary group-hover:bg-primary-100 group-hover:text-primary transition-colors select-none"${_scopeId}> Lihat Trip </button></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: [
                "w-full max-w-[15em] md:max-w-[20em] min-h-[400px] md:min-h-[608px] rounded-2xl overflow-hidden",
                "border-[1px] border-gray-200 hover:border-primary group cursor-pointer flex flex-col select-none",
                "hover:-mt-2 transition-all duration-300 ease-in-out"
              ] }, [
                createVNode("div", { class: "relative pointer-events-none flex-shrink-0" }, [
                  createVNode(_component_ImageResponsive, {
                    "img-url": `/trip/${unref(imageSrc)}.jpeg`,
                    size: "medium"
                  }, null, 8, ["img-url"])
                ]),
                createVNode("div", { class: "flex flex-col flex-1 p-3" }, [
                  createVNode("div", { class: "flex flex-col gap-2 md:gap-3 flex-1" }, [
                    createVNode("h2", { class: "text-base md:text-lg lg:text-2xl font-semibold line-clamp-2 select-none" }, toDisplayString(unref(title)), 1),
                    createVNode("p", { class: "font-bold text-xs md:text-sm lg:text-base select-none" }, toDisplayString(unref(days)) + " Hari ", 1),
                    createVNode("p", { class: "text-xs md:text-sm lg:text-base line-clamp-2 select-none" }, toDisplayString(unref(summary)), 1)
                  ]),
                  createVNode("div", { class: "mt-auto mb-3" }, [
                    createVNode("p", { class: "text-xs md:text-sm lg:text-base select-none" }, [
                      createTextVNode(" mulai dari "),
                      createVNode("span", { class: "text-sm md:text-lg lg:text-2xl font-bold select-none block mt-1" }, toDisplayString(unref(formatCurrency)(unref(startPrice))), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex-shrink-0" }, [
                    createVNode("button", { class: "w-full border-[1px] border-gray-400 rounded-lg py-2 md:py-3 text-sm md:text-base group-hover:cursor-pointer group-hover:border-primary group-hover:bg-primary-100 group-hover:text-primary transition-colors select-none" }, " Lihat Trip ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/Trip.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "CardTrip" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const searchQuery = ref("");
    const selectedSort = ref("");
    const selectedPriceRange = ref("");
    const { data: tripData, pending, error, refresh } = useLazyFetch(`${baseUrl}/Trip/trip.list`, {
      key: "trip-list"
    }, "$zp0nFPA_HG");
    const tripCards = computed(() => {
      if (!tripData.value?.data) return [];
      return tripData.value.data.map((trip) => ({
        imageSrc: trip.banner?.[0] || "default",
        title: trip.name,
        days: String(trip.days),
        summary: `Trip ke ${trip.countryName}`,
        startPrice: parseInt(String(trip.price).replace(/[^\d]/g, "")) || 0,
        tripId: trip.uid,
        url: `/trip/${trip.uid}`
      }));
    });
    const filteredTrips = computed(() => {
      if (!tripCards.value) return [];
      let filtered = [...tripCards.value];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (trip) => trip.title.toLowerCase().includes(query) || (trip.summary || "").toLowerCase().includes(query)
        );
      }
      if (selectedPriceRange.value) {
        filtered = filtered.filter((trip) => {
          const price = trip.startPrice;
          switch (selectedPriceRange.value) {
            case "under-5m":
              return price < 5e6;
            case "5m-10m":
              return price >= 5e6 && price < 1e7;
            case "10m-20m":
              return price >= 1e7 && price < 2e7;
            case "over-20m":
              return price >= 2e7;
            default:
              return true;
          }
        });
      }
      if (selectedSort.value) {
        filtered.sort((a, b) => {
          switch (selectedSort.value) {
            case "price-asc":
              return a.startPrice - b.startPrice;
            case "price-desc":
              return b.startPrice - a.startPrice;
            case "name-asc":
              return a.title.localeCompare(b.title);
            case "name-desc":
              return b.title.localeCompare(a.title);
            case "duration-asc":
              return parseInt(a.days) - parseInt(b.days);
            case "duration-desc":
              return parseInt(b.days) - parseInt(a.days);
            default:
              return 0;
          }
        });
      }
      return filtered;
    });
    const clearFilters = () => {
      searchQuery.value = "";
      selectedSort.value = "";
      selectedPriceRange.value = "";
    };
    useHead({
      title: "Trip - Peponi Travel",
      meta: [
        { name: "description", content: "Jelajahi berbagai pilihan trip menarik dari Peponi Travel. Temukan petualangan impianmu di destinasi terbaik dunia." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$f;
      const _component_UButton = _sfc_main$9;
      const _component_CardTrip = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50" }, _attrs))}><div class="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/country/tojsiyw7.jpeg')" })}"><div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent"></div><div class="relative container mx-auto px-4"><div class="text-center text-white"><h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-t from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent"> Jelajahi Destinasi Impianmu </h1><p class="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"> Temukan petualangan unik seperti lokal di destinasi terbaik dunia bersama Peponi </p><div class="max-w-4xl mx-auto bg-white backdrop-blur-sm rounded-full py-2 pl-6 pr-2 shadow-2xl"><div class="flex flex-row gap-4 items-center"><div class="flex-1"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" class="w-full text-black outline-0 text-lg" placeholder="Cari destinasi impianmu"></div><button class="cursor-pointer bg-primary rounded-full w-11 h-11 flex items-center justify-center active:scale-95 transition-transform">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-magnifying-glass",
        class: "w-6 h-6 font-bold text-white"
      }, null, _parent));
      _push(`</button></div></div></div></div></div><div class="container mx-auto px-4 py-12"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"><div><h2 class="text-2xl md:text-3xl font-bold text-gray-900">${ssrInterpolate(unref(filteredTrips).length > 0 ? `${unref(filteredTrips).length} Trip Ditemukan` : "Semua Trip")}</h2>`);
      if (unref(searchQuery) || unref(selectedPriceRange)) {
        _push(`<p class="text-gray-600 mt-1">`);
        if (unref(searchQuery)) {
          _push(`<span>Pencarian: &quot;${ssrInterpolate(unref(searchQuery))}&quot;</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(searchQuery) && unref(selectedPriceRange)) {
          _push(`<span> • </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedPriceRange)) {
          _push(`<span>${ssrInterpolate(unref(selectedPriceRange))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"><!--[-->`);
        ssrRenderList(8, (n) => {
          _push(`<div class="animate-pulse"><div class="bg-gray-200 rounded-3xl overflow-hidden"><div class="h-48 bg-gray-300"></div><div class="p-6 space-y-3"><div class="h-4 bg-gray-300 rounded w-3/4"></div><div class="h-3 bg-gray-300 rounded w-1/2"></div><div class="h-3 bg-gray-300 rounded w-2/3"></div><div class="h-8 bg-gray-300 rounded w-full mt-4"></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-20"><div class="max-w-md mx-auto">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-16 h-16 text-red-500 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-gray-900 mb-2"> Oops! Terjadi Kesalahan </h3><p class="text-gray-600 mb-6"> Maaf, terjadi kesalahan saat memuat data trip. Silakan coba lagi. </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "lg",
          icon: "i-heroicons-arrow-path",
          onClick: ($event) => unref(refresh)()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` &gt; Coba Lagi `);
            } else {
              return [
                createTextVNode(" > Coba Lagi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(filteredTrips) && unref(filteredTrips).length > 0) {
        _push(`<div><div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-stretch"><!--[-->`);
        ssrRenderList(unref(filteredTrips), (trip) => {
          _push(ssrRenderComponent(_component_CardTrip, mergeProps({
            key: trip.tripId
          }, { ref_for: true }, trip), null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="text-center py-20"><div class="max-w-md mx-auto">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-map",
          class: "w-16 h-16 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-gray-900 mb-2">${ssrInterpolate(unref(searchQuery) ? "Tidak Ada Trip Ditemukan" : "Belum Ada Trip Tersedia")}</h3><p class="text-gray-600 mb-6">${ssrInterpolate(unref(searchQuery) ? `Coba ubah kata kunci pencarian atau filter yang dipilih.` : `Saat ini belum ada trip yang tersedia. Silakan kembali lagi nanti.`)}</p>`);
        if (unref(searchQuery) || unref(selectedPriceRange)) {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            onClick: clearFilters
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Reset Filter `);
              } else {
                return [
                  createTextVNode(" Reset Filter ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trip/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BDOJ0yC0.mjs.map
