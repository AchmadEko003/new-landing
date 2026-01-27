import { _ as __nuxt_component_0 } from './SectionHeader-Bns2bykH.mjs';
import { u as useRuntimeConfig, c as __nuxt_component_2$1, e as _export_sfc } from './server.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
import { b as useWindowScroll } from './index-B3YyvcOz.mjs';
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
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UniqueCategory",
  __ssrInlineRender: true,
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const carousel = ref(null);
    computed(() => carousel.value?.emblaApi);
    ref(0);
    const { data: pengalamanUnikCategoryData, pending: pengalamanUnikCategoryPending } = useLazyFetch(`${baseUrl}/UniqueExperience/category`, {
      method: "get",
      key: "unique-experience-category"
    }, "$Qi7ClGVEfy");
    computed(() => {
      const temp = pengalamanUnikCategoryData?.value?.data || [];
      if (temp.length === 0) {
        return [];
      }
      temp.unshift({
        uid: "",
        bannerName: "",
        name: "All"
      });
      temp.push({
        uid: "",
        bannerName: "",
        name: ""
      });
      return temp;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-20 flex items-center justify-center sticky top-[62px] bg-white z-50" data-v-2cb1cb3d${_scopeId}><span class="text-gray-500" data-v-2cb1cb3d${_scopeId}>Loading categories...</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full h-20 flex items-center justify-center sticky top-[62px] bg-white z-50" }, [
                createVNode("span", { class: "text-gray-500" }, "Loading categories...")
              ])
            ];
          }
        })
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/UniqueCategory.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-2cb1cb3d"]]), { __name: "CarouselUniqueCategory" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const baseUrl = useRuntimeConfig().public.apiBase;
    const query = ref(void 0);
    const categoryUid = computed(() => query.value);
    const { y } = useWindowScroll({
      behavior: "smooth"
    });
    const { data: pengalamanUnikData } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(() => `${baseUrl}/UniqueExperience`, {
      key: `unique-experience${categoryUid.value ? "-" + categoryUid.value : ""}`,
      query: {
        categoryUid
      }
    }, "$cwCk6i5oKB")), __temp = await __temp, __restore(), __temp);
    computed(() => {
      const result = [];
      (pengalamanUnikData?.value?.data ?? []).forEach(
        (experience) => {
          result.push({
            uid: experience.uid || "",
            src: experience.bannerList?.[0] ? `/unique-experience/${experience.bannerList[0]}.jpeg` : "",
            alt: experience.name,
            url: `/pengalaman-unik/${encodeURIComponent(experience.name.trim().replace(/\s+/g, "-").toLowerCase())}_${experience.uid}`,
            caption: experience.name,
            name: experience.name
          });
        }
      );
      return result;
    });
    const doFilter = (event) => {
      if (y.value > 100) {
        y.value = 0;
        setTimeout(() => {
          query.value = event || void 0;
        }, 700);
      } else {
        query.value = event || void 0;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavigationSectionHeader = __nuxt_component_0;
      const _component_CarouselUniqueCategory = __nuxt_component_1;
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Pilih pengalaman unikmu" }, null, _parent));
      _push(ssrRenderComponent(_component_CarouselUniqueCategory, {
        class: "mb-10",
        onChange: doFilter
      }, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NavigationSectionHeader, { title: "Pengalaman Unik" }, null, _parent2, _scopeId));
            _push2(`<div class="w-[95%] md:w-[70%] mx-auto h-96 flex items-center justify-center"${_scopeId}><span class="text-gray-500"${_scopeId}>Loading experiences...</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-10" }, [
                createVNode(_component_NavigationSectionHeader, { title: "Pengalaman Unik" }),
                createVNode("div", { class: "w-[95%] md:w-[70%] mx-auto h-96 flex items-center justify-center" }, [
                  createVNode("span", { class: "text-gray-500" }, "Loading experiences...")
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pengalaman-unik/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B_IGyQQq.mjs.map
