import { d as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Responsive",
  __ssrInlineRender: true,
  props: {
    imgUrl: { type: String, required: true },
    title: { type: String, required: false },
    url: { type: String, required: false },
    size: {
      type: String,
      default: "medium",
      // 'small', 'medium', 'large'
      validator: (value) => ["small", "medium", "large"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const imgSrc = computed(() => props.imgUrl);
    const sizeImage = computed(() => {
      switch (props.size) {
        case "small":
          return "h-40 md:h-56";
        case "medium":
          return "h-56 md:h-80";
        case "large":
          return "h-80 md:h-96";
        default:
          return "h-56 md:h-80";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "relative rounded-2xl overflow-hidden shadow-lg transition-transform",
          "duration-200 group bg-black/5 hover:scale-99",
          __props.url ? "cursor-pointer" : ""
        ]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        provider: "peponi",
        src: unref(imgSrc),
        alt: __props.title,
        loading: "lazy",
        class: ["w-full object-cover group-hover:scale-110 transition-transform duration-200", unref(sizeImage)],
        placeholder: "/assets/image-crashed.png",
        onContextmenu: () => {
        }
      }, null, _parent));
      if (__props.title) {
        _push(`<div class="absolute bottom-0 left-0 w-full pt-10 pb-5 px-4 flex items-end" style="${ssrRenderStyle({ "background": "linear-gradient(to top, rgba(0,0,0,0.3) 10%, transparent 70%)" })}"><h2 class="text-white text-xl lg:text-2xl font-bold drop-shadow-lg line-clamp-1 md:line-clamp-2">${ssrInterpolate(__props.title)}</h2></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/image/Responsive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "ImageResponsive" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Responsive-BjUdJ6QZ.mjs.map
