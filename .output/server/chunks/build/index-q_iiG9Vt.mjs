import { _ as __nuxt_component_0 } from './SectionHeader-Bns2bykH.mjs';
import { _ as __nuxt_component_1 } from './Bento-e23fzcFP.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useRuntimeConfig } from './server.mjs';
import { u as useWindowSize } from './index-B3YyvcOz.mjs';
import { a as useFetch } from './fetch-cLVB8oRf.mjs';
import './Responsive-BjUdJ6QZ.mjs';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const { width } = useWindowSize();
    const { data: favoriteLocationsData, pending, error } = useFetch(`${baseUrl}/FavouriteLocation`, { key: "tempat-favorite" }, "$BTpkzoSs6K");
    const reformattedFavoriteLocations = computed(() => {
      const result = [];
      const locations = Array.isArray(favoriteLocationsData.value?.data) ? favoriteLocationsData.value.data : [];
      locations.forEach((location) => {
        result.push({
          uid: location.uid || "",
          src: location.banner?.[0] ? `/favorite-location/${location.banner[0]}.jpeg` : "",
          alt: location.name,
          caption: location.name,
          url: `/tempat-favorite/${encodeURIComponent(location.name.trim().replace(/\s+/g, "-").toLowerCase())}_${location.uid}`,
          name: location.name
        });
      });
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavigationSectionHeader = __nuxt_component_0;
      const _component_GridBento = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Tempat Favorit" }, null, _parent));
      if (unref(pending)) {
        _push(`<div> Loading... </div>`);
      } else if (unref(error)) {
        _push(`<div class="text-red-500">${ssrInterpolate(unref(error).message || unref(error))}</div>`);
      } else {
        _push(ssrRenderComponent(_component_GridBento, {
          class: "w-[95%] md:w-[70%] mx-auto",
          items: unref(reformattedFavoriteLocations),
          size: unref(width) > 768 ? "medium" : "small"
        }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tempat-favorite/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-q_iiG9Vt.mjs.map
