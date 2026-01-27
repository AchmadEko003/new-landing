import { _ as __nuxt_component_0 } from './loading-uaUOUw21.mjs';
import { u as useRuntimeConfig, q as useRoute, c as __nuxt_component_2$1 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './SectionHeader-Bns2bykH.mjs';
import { _ as __nuxt_component_3 } from './htmlRender-C6FQn9zU.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
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
import 'dompurify';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[uid]",
  __ssrInlineRender: true,
  setup(__props) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const route = useRoute();
    const uid = computed(() => route.params.uid.split("_")[1] || "");
    const title = computed(() => {
      const param = route.params.uid || "";
      const rawTitle = param.split("_")[0] || "";
      return rawTitle.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
    });
    const { data: detailData, pending } = useFetch(() => `${baseUrl}/UniqueExperience/${uid.value}`, "$EA4_-T1TEC");
    computed(() => {
      return detailData?.value?.data?.bannerList?.map((item) => `/unique-experience/${item}.jpeg`) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_image_loading = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_navigation_section_header = __nuxt_component_0$1;
      const _component_util_html_render = __nuxt_component_3;
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_image_loading, _attrs, null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-7" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`<div class="mt-3">`);
        _push(ssrRenderComponent(_component_navigation_section_header, {
          title: unref(title),
          class: "md:mx-20 px-6 md:px-24"
        }, null, _parent));
        _push(ssrRenderComponent(_component_util_html_render, {
          content: unref(detailData)?.data?.summary || "",
          class: "md:mx-20 px-6 md:px-24"
        }, null, _parent));
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pengalaman-unik/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-DwdNRcSQ.mjs.map
