import { _ as __nuxt_component_0 } from './SectionHeader-Bns2bykH.mjs';
import { _ as __nuxt_component_1 } from './Bento-e23fzcFP.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { c as convertToImage } from './formatToImage-C5UWELI9.mjs';
import { u as useWindowSize } from './index-B3YyvcOz.mjs';
import { u as useRuntimeConfig, v as useNuxtData } from './server.mjs';
import { u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const { width } = useWindowSize();
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.apiBase;
    const { data: homeData } = useNuxtData("home");
    const { data, error, pending } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(
      `${baseUrl}/Country/country.list`,
      {
        method: "GET",
        key: "countryList",
        getCachedData() {
          if (homeData.value?.country) {
            return {
              data: homeData.value?.country || [],
              // Data diambil dari cache
              meta: {
                status: true,
                message: "success",
                totalItem: homeData.value?.country?.length || 0
              }
            };
          }
        }
      },
      "$Vo4QS6GTws"
    )), __temp = await __temp, __restore(), __temp);
    const reformattedData = computed(() => {
      if (data.value === null && data.value === void 0) {
        return [];
      }
      const result = homeData.value?.country ? data.value?.data : convertToImage(data.value?.data);
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavigationSectionHeader = __nuxt_component_0;
      const _component_GridBento = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Destinasi Populer" }, null, _parent));
      if (unref(pending)) {
        _push(`<div> Loading... </div>`);
      } else if (unref(error)) {
        _push(`<div class="text-red-500">${ssrInterpolate(unref(error).message || unref(error))}</div>`);
      } else {
        _push(ssrRenderComponent(_component_GridBento, {
          class: "w-[95%] md:w-[70%] mx-auto",
          items: unref(reformattedData),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/destinasi-populer/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DsczPGw4.mjs.map
