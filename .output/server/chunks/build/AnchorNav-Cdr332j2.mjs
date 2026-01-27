import { defineComponent, ref, computed, watch, nextTick, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { e as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AnchorNav",
  __ssrInlineRender: true,
  props: {
    sections: {}
  },
  setup(__props) {
    const activeId = ref("");
    const navRef = ref();
    const ulRef = ref();
    ref();
    const buttonRefs = ref([]);
    const borderStyle = computed(() => {
      const activeButton = buttonRefs.value?.find((btn) => btn?.dataset.sectionId === activeId.value);
      if (!activeButton || !ulRef.value) {
        return { width: "0px", left: "0px", opacity: "0" };
      }
      const ulRect = ulRef.value.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const relativeLeft = buttonRect.left - ulRect.left + ulRef.value.scrollLeft;
      return {
        width: `${buttonRect.width}px`,
        left: `${relativeLeft}px`,
        opacity: "1"
      };
    });
    const scrollActiveToCenter = () => {
      if (!navRef.value || !activeId.value) return;
      const activeButton = buttonRefs.value?.find((btn) => btn?.dataset.sectionId === activeId.value);
      if (!activeButton) return;
      const navRect = navRef.value.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const navLeft = navRect.left;
      const navRight = navRect.right;
      const buttonLeft = buttonRect.left;
      const buttonRight = buttonRect.right;
      if (buttonLeft < navLeft || buttonRight > navRight) {
        const scrollContainer = navRef.value;
        const buttonOffsetLeft = activeButton.offsetLeft;
        const containerWidth = scrollContainer.clientWidth;
        const buttonWidth = activeButton.offsetWidth;
        const scrollTo2 = buttonOffsetLeft - containerWidth / 2 + buttonWidth / 2;
        scrollContainer.scrollTo({
          left: scrollTo2,
          behavior: "smooth"
        });
      }
    };
    watch(activeId, () => {
      nextTick(() => {
        scrollActiveToCenter();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        ref_key: "navRef",
        ref: navRef,
        class: "w-full overflow-x-auto no-scrollbar py-2 px-4 md:px-24 sticky top-[62px] bg-white z-50"
      }, _attrs))} data-v-3f7b1f85><ul class="flex gap-6 md:gap-8 px-2 pr-8 md:pr-16 relative" data-v-3f7b1f85><div class="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out" style="${ssrRenderStyle(unref(borderStyle))}" data-v-3f7b1f85></div><!--[-->`);
      ssrRenderList(__props.sections, (section, index) => {
        _push(`<li data-v-3f7b1f85><button type="button" class="${ssrRenderClass([
          "whitespace-nowrap pb-1 transition-colors text-sm md:text-lg font-bold cursor-pointer relative",
          unref(activeId) === section.id ? "text-primary font-semibold" : "text-gray-600 hover:text-primary",
          __props.sections.length - 1 === index ? "mr-8" : ""
        ])}"${ssrRenderAttr("data-section-id", section.id)} data-v-3f7b1f85>${ssrInterpolate(section.title)}</button></li>`);
      });
      _push(`<!--]--></ul></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/navigation/AnchorNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-3f7b1f85"]]), { __name: "NavigationAnchorNav" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=AnchorNav-Cdr332j2.mjs.map
