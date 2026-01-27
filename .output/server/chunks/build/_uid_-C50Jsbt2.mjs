import { _ as __nuxt_component_0 } from './loading-uaUOUw21.mjs';
import { u as useRuntimeConfig, q as useRoute, v as useNuxtData, d as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_2 } from './AnchorNav-Cdr332j2.mjs';
import { _ as __nuxt_component_0$1 } from './SectionHeader-Bns2bykH.mjs';
import { a as __nuxt_component_4, _ as __nuxt_component_5 } from './Trip-CAZ4wUCu.mjs';
import { _ as __nuxt_component_1 } from './Bento-e23fzcFP.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { r as reformattedCountryDetail } from './formatToImage-C5UWELI9.mjs';
import { a as useFetch } from './fetch-cLVB8oRf.mjs';
import '@lottiefiles/dotlottie-vue';
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
import './Responsive-BjUdJ6QZ.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[uid]",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const route = useRoute();
    const uid = computed(() => route.params.uid.split("_")[1] || "");
    const { data: countryDetail } = useNuxtData(`country-${uid.value}`);
    const { data: detailData, pending } = useFetch(
      () => `${baseUrl}/Country/country.detail/${uid.value}`,
      {
        key: `country-${uid.value}`,
        getCachedData() {
          if (countryDetail.value) {
            return countryDetail.value;
          }
        }
      },
      "$YrDtRldxPI"
    );
    const reformatedDetail = computed(() => {
      if (detailData.value?.data) {
        return reformattedCountryDetail(detailData.value?.data);
      }
    });
    const sections = [
      { id: "trip-section", title: "Trip" },
      { id: "favorite-section", title: "Tempat Favorit" },
      { id: "experience-section", title: "Pengalaman Unik" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_image_loading = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_NavigationAnchorNav = __nuxt_component_2;
      const _component_NavigationSectionHeader = __nuxt_component_0$1;
      const _component_CarouselTrip = __nuxt_component_4;
      const _component_CarouselSliderImage = __nuxt_component_5;
      const _component_GridBento = __nuxt_component_1;
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_image_loading, _attrs, null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-7" }, _attrs))}><div class="relative flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          provider: "peponi",
          src: `/country/${unref(detailData)?.data?.bannerName}.jpeg`,
          alt: unref(detailData)?.data?.name,
          class: "object-cover w-full !h-[75dvh]",
          onContextmenu: () => {
          }
        }, null, _parent));
        _push(`<h1 class="absolute text-4xl text-white font-bold">${ssrInterpolate(unref(detailData)?.data?.name)}</h1></div>`);
        _push(ssrRenderComponent(_component_NavigationAnchorNav, { sections }, null, _parent));
        _push(`<p class="mx-4 md:mx-24 md:text-xl font-semibold">${ssrInterpolate(unref(detailData)?.data?.summary)}</p><section id="trip-section">`);
        _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Trip" }, null, _parent));
        _push(ssrRenderComponent(_component_CarouselTrip, {
          items: unref(reformatedDetail).trip
        }, null, _parent));
        _push(`</section><section id="favorite-section">`);
        _push(ssrRenderComponent(_component_NavigationSectionHeader, {
          title: "Tempat Favorit",
          url: "/tempat-favorite"
        }, null, _parent));
        _push(ssrRenderComponent(_component_CarouselSliderImage, {
          images: unref(reformatedDetail)?.favoriteLocation
        }, null, _parent));
        _push(`</section><section id="experience-section">`);
        _push(ssrRenderComponent(_component_NavigationSectionHeader, {
          title: "Pengalaman Unik",
          url: "/pengalaman-unik"
        }, null, _parent));
        _push(ssrRenderComponent(_component_GridBento, {
          class: "w-[95%] md:w-[70%] mx-auto",
          items: unref(reformatedDetail)?.uniqueExperience,
          size: "medium"
        }, null, _parent));
        _push(`</section></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/destinasi-populer/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-C50Jsbt2.mjs.map
