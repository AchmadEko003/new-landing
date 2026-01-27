import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { e as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  props: {
    name: {},
    size: { default: "1.25rem" },
    color: { default: "currentColor" },
    variant: { default: "solid" },
    class: { default: "" },
    folder: { default: "" },
    fallback: { default: "/assets/image-crashed.png" },
    alt: { default: "" }
  },
  emits: ["error", "load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const iconSrc = computed(() => {
      const basePath = props.folder ? `/${props.folder}/` : "/";
      const extension = props.name.includes(".") ? "" : ".png";
      return `${basePath}${props.name}${extension}`;
    });
    const isSvg = computed(() => {
      return props.name.toLowerCase().includes(".svg") || props.folder === "assets/icons";
    });
    const sizeValue = computed(() => {
      if (typeof props.size === "number") {
        return `${props.size}px`;
      }
      const sizeMap = {
        "xs": "0.75rem",
        "sm": "1rem",
        "md": "1.25rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "5rem"
      };
      return sizeMap[props.size] || props.size;
    });
    const sizeClasses = computed(() => {
      return {
        "w-3 h-3": props.size === "xs",
        "w-4 h-4": props.size === "sm",
        "w-5 h-5": props.size === "md",
        "w-6 h-6": props.size === "lg",
        "w-8 h-8": props.size === "xl",
        "w-10 h-10": props.size === "2xl",
        "w-12 h-12": props.size === "3xl",
        "w-16 h-16": props.size === "4xl",
        "w-20 h-20": props.size === "5xl"
      };
    });
    const colorClasses = computed(() => {
      if (isSvg.value && props.color !== "currentColor") {
        return "";
      }
      return "";
    });
    const customStyle = computed(() => {
      const style = {};
      if (!["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].includes(props.size.toString())) {
        style.width = sizeValue.value;
        style.height = sizeValue.value;
      }
      if (isSvg.value && props.color !== "currentColor") {
        if (props.color.startsWith("#")) {
          style.filter = `brightness(0) saturate(100%) ${hexToFilter(props.color)}`;
        }
      }
      return style;
    });
    const className = computed(() => props.class);
    function hexToFilter(hex) {
      const color = hex.replace("#", "");
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const hue = Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI);
      return `hue-rotate(${hue}deg)`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "inline-flex items-center justify-center",
          unref(sizeClasses),
          unref(colorClasses),
          unref(className)
        ],
        style: unref(customStyle)
      }, _attrs))} data-v-74b25b04><img${ssrRenderAttr("src", unref(iconSrc))}${ssrRenderAttr("alt", __props.alt || __props.name)} class="${ssrRenderClass([
        "object-contain",
        unref(isSvg) ? "w-full h-full" : "max-w-full max-h-full"
      ])}" data-v-74b25b04></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/image/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-74b25b04"]]), { __name: "ImageIcon" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=icon-CqV-axZ2.mjs.map
