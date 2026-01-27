import { g as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SectionHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    url: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between mb-3 px-6 md:px-24" }, _attrs))}><h2 class="text-xl md:text-[26px] font-bold">${ssrInterpolate(props.title)}</h2>`);
      if (props.url) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "text-sm md:text-lg transition-all hover:underline hover:text-primary",
          href: props.url
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Lihat Semua`);
            } else {
              return [
                createTextVNode("Lihat Semua")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/navigation/SectionHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "NavigationSectionHeader" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=SectionHeader-Bns2bykH.mjs.map
