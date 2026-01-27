import { a as useHead, c as __nuxt_component_2$1, b as _sfc_main$9, g as __nuxt_component_1$2 } from './server.mjs';
import { _ as __nuxt_component_2 } from './icon-CqV-axZ2.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Hubungi Kami - Peponi",
      meta: [
        { name: "description", content: "Hubungi tim Peponi untuk konsultasi perjalanan, bantuan booking, atau pertanyaan seputar layanan travel kami." }
      ]
    });
    ref({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_ImageIcon = __nuxt_component_2;
      const _component_UButton = _sfc_main$9;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><section class="relative h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/assets/152662dc-0ea1-4661-b00e-27e91e64c5f6.jpeg')" })}"><div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent"></div><div class="relative z-10 text-center text-white px-4"><h1 class="text-5xl md:text-6xl font-bold mb-4"> Hubungi Kami </h1><p class="text-xl md:text-2xl max-w-2xl mx-auto"> Siap memulai petualangan? Mari berbicara dan wujudkan perjalanan impian Anda </p></div></section><section class="py-16 px-4 md:px-8 max-w-7xl mx-auto"><div class="grid lg:grid-cols-2 gap-12"><div class="bg-white rounded-2xl shadow-lg overflow-hidden">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div><div class="space-y-8"><div class="grid gap-6"><div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"><div class="flex items-start space-x-4"><div class="flex justify-center items-center w-12 h-12 rounded-full">`);
      _push(ssrRenderComponent(_component_ImageIcon, {
        name: "destinasi",
        folder: "assets/icon",
        size: "lg"
      }, null, _parent));
      _push(`</div><div><h3 class="text-xl font-bold text-gray-800 mb-2"> Kantor Pusat </h3><p class="text-gray-600"> Sentra Niaga Puri Indah blok T2-28,<br> Kembangan, Kota Jakarta Barat,<br> DKI Jakarta 11610 </p></div></div></div><div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"><div class="flex items-start space-x-4"><div class="flex justify-center items-center w-12 h-12 rounded-full">`);
      _push(ssrRenderComponent(_component_ImageIcon, {
        name: "phone-call",
        folder: "assets/icon",
        size: "lg"
      }, null, _parent));
      _push(`</div><div><h3 class="text-xl font-bold text-gray-800 mb-2"> Telepon </h3><p class="text-gray-600"> 0812-8931-5151 (WhatsApp) </p></div></div></div><div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"><div class="flex items-start space-x-4"><div class="flex justify-center items-center w-12 h-12 rounded-full">`);
      _push(ssrRenderComponent(_component_ImageIcon, {
        name: "mail",
        folder: "assets/icon",
        size: "lg"
      }, null, _parent));
      _push(`</div><div><h3 class="text-xl font-bold text-gray-800 mb-2"> Email </h3><p class="text-gray-600"> cs@peponitravel.com </p></div></div></div></div></div></div></section><section class="py-16 px-4 md:px-8"><div class="max-w-4xl mx-auto text-center"><h2 class="text-4xl font-bold mb-6 text-gray-800"> Tetap Terhubung </h2><p class="text-xl text-gray-600 mb-8"> Ikuti media sosial kami untuk update terbaru dan inspirasi perjalanan </p><div class="flex justify-center space-x-6 mb-8">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "simple-icons:instagram",
        size: "xl",
        variant: "soft",
        color: "neutral",
        to: "https://www.instagram.com/peponitravel",
        target: "_blank",
        external: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "simple-icons:linkedin",
        size: "xl",
        variant: "soft",
        color: "neutral",
        to: "https://www.linkedin.com/company/peponi-travel/",
        target: "_blank",
        external: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "simple-icons:tiktok",
        size: "xl",
        variant: "soft",
        color: "neutral",
        to: "https://www.tiktok.com/@wearepeponi?_t=ZS-8zFDR5ICBts&_r=1",
        target: "_blank",
        external: ""
      }, null, _parent));
      _push(`</div><div class="bg-primary rounded-2xl p-8 text-white"><h3 class="text-2xl font-bold mb-4"> Siap Memulai Petualangan? </h3><p class="text-lg mb-6"> Jelajahi destinasi menakjubkan dan ciptakan kenangan tak terlupakan </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/trip",
        class: "px-4 py-2 border-2 border-white rounded-xl cursor-pointer font-semibold transition-all hover:bg-white hover:text-black"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mulai Perjalanan `);
          } else {
            return [
              createTextVNode(" Mulai Perjalanan ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-us-Bi6mwY0c.mjs.map
