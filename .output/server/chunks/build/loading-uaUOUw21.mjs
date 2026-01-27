import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loading",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-[85dvh] w-dvw" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(DotLottieVue), {
        src: "/assets/json/Loading.json",
        class: "w-30 h-30 mx-auto",
        autoplay: "",
        loop: ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/image/loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "ImageLoading" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=loading-uaUOUw21.mjs.map
