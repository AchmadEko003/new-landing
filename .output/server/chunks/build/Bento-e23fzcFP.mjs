import { g as __nuxt_component_1$2 } from './server.mjs';
import { _ as __nuxt_component_1$1 } from './Responsive-BjUdJ6QZ.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Bento",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    size: {
      type: String,
      default: "medium",
      // 'small', 'medium', 'large'
      validator: (value) => ["small", "medium", "large"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const width = ref(1024);
    const isMounted = ref(false);
    const gridColsLarge = ref([
      "col-span-4",
      "col-span-8",
      "col-span-4",
      "col-span-4",
      "col-span-4",
      "col-span-8",
      "col-span-4"
    ]);
    const gridColsMedium = ref([
      "col-span-12",
      "col-span-6",
      "col-span-6",
      "col-span-12",
      "col-span-6",
      "col-span-6",
      "col-span-12"
    ]);
    const getGridClass = (index) => {
      if (!isMounted.value) {
        return gridColsMedium.value[index] || "col-span-12";
      }
      return width.value > 1024 ? gridColsLarge.value[index] : gridColsMedium.value[index];
    };
    const chunkedItems = computed(() => {
      const chunkSize = 7;
      const result = [];
      for (let i = 0; i < props.items.length; i += chunkSize) {
        result.push(props.items.slice(i, i + chunkSize));
      }
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_ImageResponsive = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-3" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(chunkedItems), (chunk, chunkIdx) => {
        _push(`<div class="grid grid-cols-12 gap-3"><!--[-->`);
        ssrRenderList(chunk, (item, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: i,
            to: item.url,
            class: getGridClass(i)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ImageResponsive, {
                  "img-url": item.src,
                  title: item.caption,
                  size: props.size
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_ImageResponsive, {
                    "img-url": item.src,
                    title: item.caption,
                    size: props.size
                  }, null, 8, ["img-url", "title", "size"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Grid/Bento.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "GridBento" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Bento-e23fzcFP.mjs.map
