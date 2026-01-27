import { a as useHead, b as _sfc_main$9 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Tentang Kami - Peponi",
      meta: [
        { name: "description", content: "Pelajari lebih lanjut tentang Peponi, platform travel yang menghubungkan traveler dengan pengalaman lokal autentik di Indonesia." }
      ]
    });
    const values = [
      {
        title: "Unik Seperti Lokal",
        description: "Tim expert kami merangkai itinerary berdasarkan pengalamannya tinggal di destinasi. Perjalanan dibuat rinci agar kamu dapat menjelajahi destinasi seperti orang lokal, bukan turis."
      },
      {
        title: "Grup Kecil",
        description: "Dengan rata-rata rasio trip leader dengan guest Peponi adalah 1 : 10, kamu akan menjelajahi destinasi impian dalam nuansa grup kecil dengan suasana kekeluargaan."
      },
      {
        title: "Penginapan Strategis",
        description: "Tinggal hanya dalam radius 100-500 meter dari stasiun kereta, halte bus, hingga pusat belanja, membuat kamu memiliki waktu libur tanpa batas."
      },
      {
        title: "Expert Trip Leaders",
        description: "Tim Peponi adalah personil berjiwa muda dan sangat memahami destinasi dan menguasai bahasa lokal. Mereka juga akan menjadi sahabat pertama-mu dalam perjalanan liburan."
      },
      {
        title: "Keberagaman",
        description: "Usia, budget, pilihan penginapan, liburan solo atau bersama sahabat. Apapun latar belakang-mu, perjalanan Peponi adalah wadah dimana kamu dapat saling berbagi cerita dan canda tawa."
      },
      {
        title: "On The Road to Sustainability",
        description: "Bagi Peponi, perjalanan bukan hanya tentang keindahan tempat, tapi juga tentang bagaimana kita menjaganya. Karena itu, melalui gerakan ini, Peponi memilih langkah kecil namun berarti: bepergian dengan transportasi publik, tinggal lebih lama agar lebih terhubung dengan destinasi, mendukung komunitas lokal, menghindari penggunaan plastik sekali pakai, dan membuka jalan ke tempat-tempat yang jarang dijelajahi. Setiap langkah ini kami jalani agar bumi tetap indah, dan setiap perjalanan memberi arti lebih dalam."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><section class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url('http://103.189.234.243/img-asset/assets/7e2b465e-54d9-418c-a88d-62352fee79c8.jpeg')" })}"><div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/[1%] to-transparent"></div><div class="relative z-10 text-center text-white px-4"><h1 class="text-5xl md:text-7xl font-bold mb-4"> Tentang Peponi </h1><p class="text-xl md:text-2xl max-w-2xl mx-auto"> Membangun jembatan antara traveler dan pengalaman lokal yang autentik </p></div></section><section class="py-20 px-4 md:px-8 bg-gray-50"><div class="max-w-7xl mx-auto flex flex-col md:flex-row pr-1"><div class="max-w-2xl mb-16"><h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900"> Nilai-Nilai Kami </h2><p class="text-lg text-gray-600 leading-relaxed"> Di setiap perjalanan, Peponi percaya bahwa makna sesungguhnya bukan hanya tentang ke mana kita pergi, tapi bagaimana kita menjalaninya. Dari merangkai pengalaman autentik layaknya orang lokal, menjaga keintiman dalam grup kecil, hingga memilih cara berkelanjutan untuk menjelajah dunia. <span class="font-bold">PeponiValue</span> adalah prinsip yang membentuk setiap detail perjalanan bersama kami. </p></div><div class="grid gap-y-12"><!--[-->`);
      ssrRenderList(values, (value, index) => {
        _push(`<div class="group"><h3 class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">${ssrInterpolate(value.title)}</h3><p class="text-gray-600 leading-relaxed text-base">${ssrInterpolate(value.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16 px-4 md:px-8"><div class="max-w-4xl mx-auto text-center"><h2 class="text-4xl font-bold mb-6 text-gray-800"> Mulai Petualangan Anda </h2><p class="text-xl text-gray-600 mb-8"> Bergabunglah dengan ribuan traveler yang telah merasakan pengalaman tak terlupakan bersama kami </p><div class="flex flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/trip",
        size: "xl",
        class: "px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Jelajahi Trip `);
          } else {
            return [
              createTextVNode(" Jelajahi Trip ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "/contact-us",
        size: "xl",
        variant: "outline",
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
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-us-C44XXe9A.mjs.map
