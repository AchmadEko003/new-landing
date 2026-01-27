import { u as useRuntimeConfig, a as useHead, _ as _sfc_main$f, b as _sfc_main$9, c as __nuxt_component_2$1 } from './server.mjs';
import { _ as __nuxt_component_2 } from './icon-CqV-axZ2.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
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
  __name: "faq",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const baseUrl = useRuntimeConfig().public.apiBase;
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(`${baseUrl}/Faq`, {
      method: "GET",
      key: "faq-data"
    }, "$BJSbVtOl8i")), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "FAQ - Peponi",
      meta: [
        { name: "description", content: "Pertanyaan yang sering diajukan tentang layanan perjalanan Peponi. Temukan jawaban untuk berbagai pertanyaan seputar reservasi, pembayaran, dan layanan kami." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$f;
      const _component_UButton = _sfc_main$9;
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_ImageIcon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><section class="relative h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/assets/71f458e0-9c50-412e-98f7-50a10cbb30c7.jpeg')" })}"><div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent"></div><div class="relative z-10 text-center text-white px-4"><h1 class="text-5xl md:text-6xl font-bold mb-4"> FAQ </h1><p class="text-xl md:text-2xl max-w-2xl mx-auto"> Temukan jawaban untuk pertanyaan umum tentang layanan perjalanan kami </p></div></section><section class="bg-gray-50 py-16 px-4 md:px-8">`);
      if (unref(pending)) {
        _push(`<div class="max-w-4xl mx-auto"><div class="text-center mb-12"><h2 class="text-4xl font-bold mb-4 text-gray-800"> Pertanyaan Sering Diajukan </h2><p class="text-xl text-gray-600"> Memuat pertanyaan dan jawaban... </p></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"><div class="p-6"><div class="flex items-center justify-between"><div class="h-6 bg-gray-200 rounded w-3/4"></div><div class="w-6 h-6 bg-gray-200 rounded-full"></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="flex justify-center items-center py-20"><div class="text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:exclamation-triangle",
          class: "text-4xl text-red-600 mb-4"
        }, null, _parent));
        _push(`<p class="text-red-600 mb-2"> Gagal memuat data FAQ </p><p class="text-gray-600 text-sm">${ssrInterpolate(unref(error).message)}</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          class: "mt-4",
          onClick: ($event) => unref(refresh)()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "heroicons:arrow-path",
                class: "mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Coba Lagi `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "heroicons:arrow-path",
                  class: "mr-2"
                }),
                createTextVNode(" Coba Lagi ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="max-w-4xl mx-auto"${_scopeId}><div class="text-center mb-12"${_scopeId}><h2 class="text-4xl font-bold mb-4 text-gray-800"${_scopeId}> Pertanyaan Sering Diajukan </h2><p class="text-xl text-gray-600"${_scopeId}> Memuat pertanyaan dan jawaban... </p></div><div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(5, (n) => {
                _push2(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="h-6 bg-gray-200 rounded w-3/4"${_scopeId}></div><div class="w-6 h-6 bg-gray-200 rounded-full"${_scopeId}></div></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", { class: "max-w-4xl mx-auto" }, [
                  createVNode("div", { class: "text-center mb-12" }, [
                    createVNode("h2", { class: "text-4xl font-bold mb-4 text-gray-800" }, " Pertanyaan Sering Diajukan "),
                    createVNode("p", { class: "text-xl text-gray-600" }, " Memuat pertanyaan dan jawaban... ")
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (n) => {
                      return createVNode("div", {
                        key: n,
                        class: "bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
                      }, [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "h-6 bg-gray-200 rounded w-3/4" }),
                            createVNode("div", { class: "w-6 h-6 bg-gray-200 rounded-full" })
                          ])
                        ])
                      ]);
                    }), 64))
                  ])
                ])
              ];
            }
          })
        }, _parent));
      }
      _push(`</section><section class="py-16 px-4 md:px-8"><div class="max-w-4xl mx-auto"><div class="text-center mb-12"><h3 class="text-3xl font-bold text-gray-800 mb-4"> Masih Ada Pertanyaan? </h3><p class="text-lg text-gray-600"> Tim customer service kami siap membantu menjawab pertanyaan Anda </p></div><div class="grid md:grid-cols-2 gap-6"><div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors"><div class="flex items-center mb-4"><div class="rounded-lg p-3 mr-4">`);
      _push(ssrRenderComponent(_component_ImageIcon, {
        name: "mail",
        folder: "assets/icon"
      }, null, _parent));
      _push(`</div><div><h4 class="font-semibold text-gray-800"> Email Support </h4><p class="text-sm text-gray-600"> Kirim pertanyaan via email </p></div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/contact-us",
        variant: "outline",
        size: "sm",
        block: ""
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
      _push(`</div><div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors"><div class="flex items-center mb-4"><div class="rounded-lg p-3 mr-4">`);
      _push(ssrRenderComponent(_component_ImageIcon, {
        name: "destinasi",
        folder: "assets/icon"
      }, null, _parent));
      _push(`</div><div><h4 class="font-semibold text-gray-800"> Jelajahi Trip </h4><p class="text-sm text-gray-600"> Temukan destinasi impian </p></div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/trip",
        variant: "outline",
        size: "sm",
        block: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lihat Trip `);
          } else {
            return [
              createTextVNode(" Lihat Trip ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=faq-CLA32h3f.mjs.map
