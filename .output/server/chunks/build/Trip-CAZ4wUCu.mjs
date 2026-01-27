import { e as _export_sfc, c as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, computed, ref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SliderImage",
  __ssrInlineRender: true,
  props: {
    images: {}
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      if (!props.images) return [];
      return [
        ...props.images,
        {
          src: "",
          alt: "",
          caption: "",
          uid: ""
        }
      ];
    });
    const carouselSliderImage = ref(null);
    computed(() => carouselSliderImage.value?.emblaApi);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b68fdc91>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center h-40" data-v-b68fdc91${_scopeId}><span class="text-gray-500" data-v-b68fdc91${_scopeId}>Loading images...</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center h-40" }, [
                createVNode("span", { class: "text-gray-500" }, "Loading images...")
              ])
            ];
          }
        })
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/SliderImage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-b68fdc91"]]), { __name: "CarouselSliderImage" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Trip",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      console.log("trip nih");
      if (!props.items) return [];
      return [
        ...props.items,
        {
          imageSrc: "",
          title: "",
          days: "0",
          summary: "",
          startPrice: 0
        },
        {
          imageSrc: "",
          title: "",
          days: "0",
          summary: "",
          startPrice: 0
        }
      ];
    });
    const carouselSliderTrip = ref(null);
    computed(() => carouselSliderTrip.value?.emblaApi);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3d765ef7>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center h-[500px]" data-v-3d765ef7${_scopeId}><span class="text-gray-500" data-v-3d765ef7${_scopeId}>Loading trips...</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center h-[500px]" }, [
                createVNode("span", { class: "text-gray-500" }, "Loading trips...")
              ])
            ];
          }
        })
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/Trip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-3d765ef7"]]), { __name: "CarouselTrip" });

export { __nuxt_component_5 as _, __nuxt_component_4 as a };
//# sourceMappingURL=Trip-CAZ4wUCu.mjs.map
