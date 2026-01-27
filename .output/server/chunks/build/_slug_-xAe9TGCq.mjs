import { e as _export_sfc, u as useRuntimeConfig, q as useRoute, a as useHead, _ as _sfc_main$f, b as _sfc_main$9 } from './server.mjs';
import { _ as __nuxt_component_2 } from './icon-CqV-axZ2.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const baseUrl = useRuntimeConfig().public.apiBase;
    const route = useRoute();
    const slug = route.params.slug;
    useHead({
      title: `${slug} - Syarat & Ketentuan - Peponi`,
      meta: [
        { name: "description", content: "Detail syarat dan ketentuan penggunaan layanan Peponi Travel." }
      ]
    });
    const backgroundImageUrl = computed(() => {
      const imageMap = {
        "legalitas": "http://103.189.234.243/img-asset/assets/cd0a31d6-cfa8-42ab-ab97-b504ad0b2a78.jpeg",
        "privacy-policy": "http://103.189.234.243/img-asset/assets/933d687d-e81b-4339-a30d-c6bd44bc4fb3.jpeg",
        "booking-conditions": "http://103.189.234.243/img-asset/assets/6d7f50b3-8fb9-44c7-9db3-22560bec200e.jpeg"
      };
      return imageMap[slug] || "http://103.189.234.243/img-asset/assets/933d687d-e81b-4339-a30d-c6bd44bc4fb3.jpeg";
    });
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(`${baseUrl}/termsCondition/${slug}`, {
      method: "GET",
      key: `terms-${slug}`
    }, "$YuP0uFY5fe")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$f;
      const _component_UButton = _sfc_main$9;
      const _component_ImageIcon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-eb24855a>`);
      if (unref(pending)) {
        _push(`<div class="animate-pulse" data-v-eb24855a><div class="h-64 bg-gray-300" data-v-eb24855a></div><div class="max-w-4xl mx-auto px-4 py-16" data-v-eb24855a><div class="space-y-6" data-v-eb24855a><div class="h-8 bg-gray-300 rounded w-3/4" data-v-eb24855a></div><div class="h-4 bg-gray-300 rounded w-full" data-v-eb24855a></div><div class="h-4 bg-gray-300 rounded w-5/6" data-v-eb24855a></div><div class="h-4 bg-gray-300 rounded w-4/5" data-v-eb24855a></div></div></div></div>`);
      } else if (unref(error) || !unref(data)?.meta?.status) {
        _push(`<div class="min-h-screen flex items-center justify-center" data-v-eb24855a><div class="text-center" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:exclamation-triangle",
          class: "text-6xl text-red-500 mb-4"
        }, null, _parent));
        _push(`<h1 class="text-2xl font-bold text-gray-800 mb-2" data-v-eb24855a> Halaman Tidak Ditemukan </h1><p class="text-gray-600 mb-6" data-v-eb24855a>${ssrInterpolate(unref(error)?.message || unref(data)?.meta?.message || "Halaman yang Anda cari tidak tersedia")}</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/terms-and-conditions",
          variant: "outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "heroicons:arrow-left",
                class: "mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Kembali ke Syarat &amp; Ketentuan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "heroicons:arrow-left",
                  class: "mr-2"
                }),
                createTextVNode(" Kembali ke Syarat & Ketentuan ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(data)?.data) {
        _push(`<div data-v-eb24855a><section class="relative overflow-hidden bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle(`background-image: url('${unref(backgroundImageUrl)}')`)}" data-v-eb24855a><div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent" data-v-eb24855a></div><div class="relative z-10 py-20 px-4 md:px-8" data-v-eb24855a><div class="max-w-4xl mx-auto text-center text-white" data-v-eb24855a><div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:document-text",
          class: "mr-2"
        }, null, _parent));
        _push(`<span class="text-sm font-medium" data-v-eb24855a>Syarat &amp; Ketentuan</span></div><h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight" data-v-eb24855a>${ssrInterpolate(unref(data).data.header)}</h1></div></div></section><section class="py-16 px-4 md:px-8" data-v-eb24855a><div class="max-w-4xl mx-auto" data-v-eb24855a><div class="bg-white rounded-2xl border border-gray-200 overflow-hidden" data-v-eb24855a><div class="p-8 md:p-12" data-v-eb24855a><div class="prose prose-lg max-w-none" data-v-eb24855a>`);
        if (unref(data).data.content) {
          _push(`<div class="rich-content" data-v-eb24855a>${unref(data).data.content ?? ""}</div>`);
        } else if (unref(data).data.section) {
          _push(`<div class="rich-content" data-v-eb24855a><p class="text-gray-700 leading-relaxed" data-v-eb24855a>${ssrInterpolate(unref(data).data.section)}</p></div>`);
        } else {
          _push(`<div class="text-center py-12" data-v-eb24855a>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "heroicons:document",
            class: "text-6xl text-gray-400 mb-4"
          }, null, _parent));
          _push(`<p class="text-gray-500 text-lg" data-v-eb24855a> Konten sedang dalam proses pembaruan </p></div>`);
        }
        _push(`</div></div><div class="bg-gray-50 px-8 md:px-12 py-3 border-t border-gray-300" data-v-eb24855a><div class="flex flex-col sm:flex-row gap-4 justify-end items-center" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/terms-and-conditions",
          variant: "outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "heroicons:list-bullet",
                class: "mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Lihat Semua Syarat &amp; Ketentuan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "heroicons:list-bullet",
                  class: "mr-1"
                }),
                createTextVNode(" Lihat Semua Syarat & Ketentuan ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "heroicons:home",
                class: "mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Kembali ke Halaman Utama `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "heroicons:home",
                  class: "mr-1"
                }),
                createTextVNode(" Kembali ke Halaman Utama ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div class="mt-12 grid md:grid-cols-3 gap-6" data-v-eb24855a><div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors" data-v-eb24855a><div class="flex items-center mb-4" data-v-eb24855a><div class="rounded-lg p-3 mr-4" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_ImageIcon, {
          name: "phone-call",
          folder: "assets/icon"
        }, null, _parent));
        _push(`</div><div data-v-eb24855a><h3 class="font-semibold text-gray-800" data-v-eb24855a> Hubungi Kami </h3><p class="text-sm text-gray-600" data-v-eb24855a> Butuh informasi lebih lanjut? </p></div></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/contact-us",
          variant: "outline",
          size: "sm",
          block: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kontak `);
            } else {
              return [
                createTextVNode(" Kontak ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors" data-v-eb24855a><div class="flex items-center mb-4" data-v-eb24855a><div class="rounded-lg p-3 mr-4" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_ImageIcon, {
          name: "destinasi",
          folder: "assets/icon"
        }, null, _parent));
        _push(`</div><div data-v-eb24855a><h3 class="font-semibold text-gray-800" data-v-eb24855a> Jelajahi Trip </h3><p class="text-sm text-gray-600" data-v-eb24855a> Temukan destinasi impian </p></div></div>`);
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
        _push(`</div><div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors" data-v-eb24855a><div class="flex items-center mb-4" data-v-eb24855a><div class="rounded-lg p-3 mr-4" data-v-eb24855a>`);
        _push(ssrRenderComponent(_component_ImageIcon, {
          name: "giraffe",
          folder: "assets/icon",
          size: "xl"
        }, null, _parent));
        _push(`</div><div data-v-eb24855a><h3 class="font-semibold text-gray-800" data-v-eb24855a> Tentang Kami </h3><p class="text-sm text-gray-600" data-v-eb24855a> Pelajari lebih lanjut </p></div></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/info/about-us",
          variant: "outline",
          size: "sm",
          block: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` About Us `);
            } else {
              return [
                createTextVNode(" About Us ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></section></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-and-conditions/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb24855a"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-xAe9TGCq.mjs.map
