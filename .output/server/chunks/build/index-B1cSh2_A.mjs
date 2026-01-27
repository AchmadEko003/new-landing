import { u as useRuntimeConfig, a as useHead, _ as _sfc_main$f, b as _sfc_main$9, g as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(`${baseUrl}/TermsCondition`, {
      key: "terms-and-conditions"
    }, "$PlvAL8HxRO")), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Syarat & Ketentuan - Peponi",
      meta: [
        { name: "description", content: "Syarat dan ketentuan penggunaan layanan Peponi Travel. Baca peraturan dan kebijakan kami sebelum melakukan pemesanan trip." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$f;
      const _component_UButton = _sfc_main$9;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><section class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/country/tojsiyw7.jpeg')" })}"><div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent"></div><div class="relative z-10 text-center text-white px-4"><h1 class="text-5xl md:text-7xl font-bold mb-4"> Syarat &amp; Ketentuan </h1><p class="text-xl md:text-2xl max-w-2xl mx-auto"> Peraturan dan kebijakan untuk penggunaan layanan Peponi Travel </p></div></section><section class="py-16 px-4 md:px-8 max-w-6xl mx-auto"><div class="prose prose-lg max-w-none">`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center items-center min-h-100"><div class="text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:arrow-path",
          class: "text-4xl text-blue-500 animate-spin mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-600"> Memuat syarat dan ketentuan... </p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-16">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:exclamation-triangle",
          class: "text-4xl text-red-500 mb-4"
        }, null, _parent));
        _push(`<p class="text-red-600 mb-4"> Gagal memuat syarat dan ketentuan </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "outline",
          onClick: ($event) => unref(refresh)()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Coba Lagi `);
            } else {
              return [
                createTextVNode(" Coba Lagi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(data)) {
        _push(`<div class="space-y-8"><div class="bg-primary border-l-4 border-primary-800 p-6 rounded-r-lg"><h2 class="text-2xl font-bold mb-4 text-white"> Informasi Penting </h2><p class="text-white"> Dengan menggunakan layanan Peponi Travel, Anda setuju untuk terikat dengan syarat dan ketentuan berikut. Harap baca dengan seksama sebelum melakukan pemesanan. </p></div><div class="grid gap-4"><!--[-->`);
        ssrRenderList(unref(data).data, (section, index) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: index,
            to: `/terms-and-conditions/${section.section}`,
            class: "flex items-center justify-center bg-white border border-gray-200 rounded-lg p-6 hover:border-primary transition-all group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="text-xl font-bold text-gray-800 flex items-center group-hover:text-primary transition-colors"${_scopeId}><span class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3"${_scopeId}>${ssrInterpolate(index + 1)}</span> ${ssrInterpolate(section.header)}</h3>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "heroicons:arrow-right",
                  class: "ml-auto text-gray-400 text-xl"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode("h3", { class: "text-xl font-bold text-gray-800 flex items-center group-hover:text-primary transition-colors" }, [
                    createVNode("span", { class: "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3" }, toDisplayString(index + 1), 1),
                    createTextVNode(" " + toDisplayString(section.header), 1)
                  ]),
                  createVNode(_component_UIcon, {
                    name: "heroicons:arrow-right",
                    class: "ml-auto text-gray-400 text-xl"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div class="bg-gray-50 rounded-lg p-6 mt-8"><p class="text-sm text-gray-600 leading-relaxed"><strong>Terakhir diperbarui:</strong> ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("id-ID"))}</p><p class="text-sm text-gray-600 mt-2"> Syarat dan ketentuan ini dapat berubah sewaktu-waktu. Perubahan akan dinotifikasi melalui website resmi kami. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section class="bg-gray-50 py-16 px-4 md:px-8"><div class="max-w-4xl mx-auto text-center"><h2 class="text-3xl font-bold mb-6 text-gray-800"> Ada Pertanyaan? </h2><p class="text-xl text-gray-600 mb-8"> Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, jangan ragu untuk menghubungi kami </p><div class="flex flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/contact-us",
        size: "xl",
        class: "px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hubungi Kami `);
          } else {
            return [
              createTextVNode(" Hubungi Kami ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "mailto:info@peponi.travel",
        size: "xl",
        variant: "outline",
        class: "px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Email Kami `);
          } else {
            return [
              createTextVNode(" Email Kami ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-and-conditions/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B1cSh2_A.mjs.map
