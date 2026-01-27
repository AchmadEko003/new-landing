import { u as useRuntimeConfig, a as useHead, h as useRouter, _ as _sfc_main$f } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useLazyFetch } from './fetch-cLVB8oRf.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const baseUrl = useRuntimeConfig().public.apiBase;
    useHead({
      title: "Informasi - Peponi",
      meta: [
        { name: "description", content: "Informasi lengkap tentang Peponi Travel dan layanan perjalanan kami" }
      ]
    });
    useRouter();
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(`${baseUrl}/AboutUs`, {
      key: "info"
    }, "$foDrlSpLs_")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><section class="relative py-20 px-4 md:px-8 bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/assets/7e2b465e-54d9-418c-a88d-62352fee79c8.jpeg')" })}"><div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent"></div><div class="relative max-w-4xl mx-auto text-center text-white"><h1 class="text-4xl md:text-6xl font-bold mb-6"> Informasi Peponi </h1><p class="text-xl md:text-2xl opacity-90"> Pelajari lebih lanjut tentang perjalanan dan layanan kami </p></div></section><section class="py-16 px-4 md:px-8"><div class="max-w-4xl mx-auto">`);
      if (unref(pending)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white rounded-xl p-6 shadow-sm"><div class="animate-pulse"><div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div><div class="h-4 bg-gray-200 rounded w-1/2"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error) || !unref(data)?.meta?.status) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:exclamation-triangle",
          class: "text-6xl text-red-500 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-gray-800 mb-2"> Terjadi Kesalahan </h3><p class="text-gray-600">${ssrInterpolate(unref(error)?.message || unref(data)?.meta?.message || "Gagal memuat data")}</p></div>`);
      } else if (unref(data)?.data && unref(data).data.length > 0) {
        _push(`<div class="space-y-4"><h2 class="text-3xl font-bold text-gray-800 mb-8"> Daftar Informasi </h2><!--[-->`);
        ssrRenderList(unref(data).data, (item) => {
          _push(`<div class="bg-white rounded-xl p-5 border border-gray-300 group hover:border-primary duration-200 cursor-pointer"><div class="flex items-center justify-between"><h3 class="text-xl font-semibold">${ssrInterpolate(item.header)}</h3>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "heroicons:chevron-right",
            class: "text-2xl text-gray-400 font-semibold group-hover:text-primary"
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:document-text",
          class: "text-6xl text-gray-400 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-gray-600 mb-2"> Belum Ada Informasi </h3><p class="text-gray-500"> Informasi akan segera tersedia </p></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BcryvgJJ.mjs.map
