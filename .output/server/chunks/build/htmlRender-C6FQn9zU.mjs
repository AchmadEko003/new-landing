import { e as _export_sfc, c as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, computed, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import DOMPurify from 'dompurify';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "htmlRender",
  __ssrInlineRender: true,
  props: {
    content: {}
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      if (!props.content) return "";
      return DOMPurify.sanitize(props.content);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ql-editor animate-pulse" data-v-88d2be6e${_scopeId}><div class="h-4 bg-gray-200 rounded w-3/4 mb-2" data-v-88d2be6e${_scopeId}></div><div class="h-4 bg-gray-200 rounded w-1/2" data-v-88d2be6e${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "ql-editor animate-pulse" }, [
                createVNode("div", { class: "h-4 bg-gray-200 rounded w-3/4 mb-2" }),
                createVNode("div", { class: "h-4 bg-gray-200 rounded w-1/2" })
              ])
            ];
          }
        })
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/htmlRender.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-88d2be6e"]]), { __name: "UtilHtmlRender" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=htmlRender-C6FQn9zU.mjs.map
