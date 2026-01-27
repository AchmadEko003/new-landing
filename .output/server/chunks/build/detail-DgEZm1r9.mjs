import { defineComponent, computed, ref, withAsyncContext, resolveComponent, unref, withCtx, isRef, createTextVNode, createVNode, withKeys, toDisplayString, createBlock, createCommentVNode, openBlock, useSlots, mergeProps, renderSlot, useTemplateRef, Fragment, renderList, withDirectives, vShow, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { q as useRoute, p as useToast, u as useRuntimeConfig, b as _sfc_main$9$1, _ as _sfc_main$f, o as _sfc_main$2$1, i as useAppConfig, t as tv, j as useFormField, k as useFieldGroup, l as useComponentIcons, m as _sfc_main$c, e as _export_sfc, c as __nuxt_component_2$1, d as __nuxt_component_1$1, n as looseToNumber } from './server.mjs';
import { u as useWindowSize, a as useVModel } from './index-B3YyvcOz.mjs';
import { f as formatCurrency } from '../_/currency.mjs';
import { a as useFetch } from './fetch-cLVB8oRf.mjs';
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

const formatCardNumber = (value) => {
  const digitsOnly = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = digitsOnly.match(/\d{4,16}/g);
  const match = matches && matches[0] || "";
  const parts = [];
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(" ") : digitsOnly;
};
const formatExpiryDate = (value) => {
  const digitsOnly = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  if (digitsOnly.length >= 2) {
    return `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`;
  }
  return digitsOnly;
};

const theme$1 = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$a = {
  __name: "UCard",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.header) {
              _push2(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.default) {
              _push2(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.footer) {
              _push2(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "header",
                class: ui.value.header({ class: props.ui?.header })
              }, [
                renderSlot(_ctx.$slots, "header")
              ], 2)) : createCommentVNode("", true),
              !!slots.default ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "body",
                class: ui.value.body({ class: props.ui?.body })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("", true),
              !!slots.footer ? (openBlock(), createBlock("div", {
                key: 2,
                "data-slot": "footer",
                class: ui.value.footer({ class: props.ui?.footer })
              }, [
                renderSlot(_ctx.$slots, "footer")
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$9 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, {});
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const inputRef = useTemplateRef("inputRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$f, {
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$c, mergeProps({
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$f, {
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: props.ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$f, {
                    key: 0,
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                    key: 1,
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: props.ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$f, {
                    key: 0,
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PackageAlreadyAdded",
  __ssrInlineRender: true,
  props: {
    packagesAlreadyAdded: {},
    totalGuests: {}
  },
  emits: ["open-detail"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$a;
      const _component_UIcon = _sfc_main$f;
      if (__props.packagesAlreadyAdded.length > 0) {
        _push(ssrRenderComponent(_component_UCard, _attrs, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5 text-green-600"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}> Paket Tambahan yang Sudah Ditambahkan </h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-5 h-5 text-green-600"
                  }),
                  createVNode("h2", { class: "text-xl font-semibold" }, " Paket Tambahan yang Sudah Ditambahkan ")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.packagesAlreadyAdded, (item) => {
                _push2(`<div class="border rounded-lg p-4 bg-white"${_scopeId}><div class="flex items-start justify-between mb-4 pb-4 border-b"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-start gap-2 mb-1"${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(item.pkg.name)}</h3>`);
                if (item.pkg.referenceId) {
                  _push2(`<button class="text-green-600 hover:text-green-700 transition-colors p-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "w-5 h-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(item.pkg.caption)}</p></div><p class="text-lg font-semibold text-primary ml-4 whitespace-nowrap"${_scopeId}> Rp ${ssrInterpolate(item.pkg.price)}</p></div><div class="flex items-center justify-between gap-4"${_scopeId}><div class="flex flex-wrap gap-2 items-center"${_scopeId}><!--[-->`);
                ssrRenderList(item.guests, (guest) => {
                  _push2(`<button disabled class="px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 bg-green-600 text-white shadow-md cursor-not-allowed"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(guest.name)}</button>`);
                });
                _push2(`<!--]--></div><div class="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(item.guests.length)} / ${ssrInterpolate(__props.totalGuests)}</span></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.packagesAlreadyAdded, (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.pkg.uid,
                      class: "border rounded-lg p-4 bg-white"
                    }, [
                      createVNode("div", { class: "flex items-start justify-between mb-4 pb-4 border-b" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex items-start gap-2 mb-1" }, [
                            createVNode("h3", { class: "font-semibold text-gray-900" }, toDisplayString(item.pkg.name), 1),
                            item.pkg.referenceId ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "text-green-600 hover:text-green-700 transition-colors p-1",
                              onClick: ($event) => _ctx.$emit("open-detail", item.pkg)
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-information-circle",
                                class: "w-5 h-5"
                              })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(item.pkg.caption), 1)
                        ]),
                        createVNode("p", { class: "text-lg font-semibold text-primary ml-4 whitespace-nowrap" }, " Rp " + toDisplayString(item.pkg.price), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                        createVNode("div", { class: "flex flex-wrap gap-2 items-center" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.guests, (guest) => {
                            return openBlock(), createBlock("button", {
                              key: guest.name,
                              disabled: "",
                              class: "px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 bg-green-600 text-white shadow-md cursor-not-allowed"
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-user",
                                class: "w-4 h-4"
                              }),
                              createTextVNode(" " + toDisplayString(guest.name), 1)
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-users",
                            class: "w-4 h-4"
                          }),
                          createVNode("span", { class: "font-medium" }, toDisplayString(item.guests.length) + " / " + toDisplayString(__props.totalGuests), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/book/PackageAlreadyAdded.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$8, { __name: "BookPackageAlreadyAdded" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AvailablePackages",
  __ssrInlineRender: true,
  props: {
    availablePackages: {},
    guests: {},
    isGuestSelectedForPackage: { type: Function },
    isGuestLockedForPackage: { type: Function },
    getAvailableGuestsForPackage: { type: Function },
    getNewSelectionsForPackage: { type: Function },
    getAllGuestsSelected: { type: Function },
    getSelectAllButtonText: { type: Function }
  },
  emits: ["toggle-guest", "toggle-all", "open-detail"],
  setup(__props) {
    const props = __props;
    const guests = computed(() => props.guests);
    const availablePackages = computed(() => props.availablePackages);
    const isGuestSelectedForPackage = computed(() => props.isGuestSelectedForPackage);
    const isGuestLockedForPackage = computed(() => props.isGuestLockedForPackage);
    const getAvailableGuestsForPackage = computed(() => props.getAvailableGuestsForPackage);
    const getNewSelectionsForPackage = computed(() => props.getNewSelectionsForPackage);
    const getAllGuestsSelected = computed(() => props.getAllGuestsSelected);
    const getSelectAllButtonText = computed(() => props.getSelectAllButtonText);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$a;
      const _component_UIcon = _sfc_main$f;
      if (unref(availablePackages).length > 0) {
        _push(ssrRenderComponent(_component_UCard, _attrs, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-plus-circle",
                class: "w-5 h-5 text-primary"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}> Paket Tambahan yang Bisa Ditambahkan </h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-plus-circle",
                    class: "w-5 h-5 text-primary"
                  }),
                  createVNode("h2", { class: "text-xl font-semibold" }, " Paket Tambahan yang Bisa Ditambahkan ")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(availablePackages), (pkg) => {
                _push2(`<div class="border rounded-lg p-4"${_scopeId}><div class="flex items-start justify-between mb-4 pb-4 border-b"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-start gap-2 mb-1"${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(pkg.name)}</h3>`);
                if (pkg.referenceId) {
                  _push2(`<button class="text-primary hover:text-primary/80 transition-colors p-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "w-5 h-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(pkg.caption)}</p></div><p class="text-lg font-semibold text-primary ml-4 whitespace-nowrap"${_scopeId}> Rp ${ssrInterpolate(pkg.price)}</p></div><div class="flex items-center justify-between gap-4"${_scopeId}><div class="flex flex-wrap gap-2 items-center"${_scopeId}>`);
                if (unref(getAvailableGuestsForPackage)(pkg.uid).length > 1) {
                  _push2(`<button class="${ssrRenderClass([
                    "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
                    unref(getAllGuestsSelected)(pkg.uid) ? "bg-primary text-white shadow-md" : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                  ])}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(unref(getSelectAllButtonText)(pkg.uid))}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(unref(guests), (guest, idx) => {
                  _push2(`<div style="${ssrRenderStyle(!unref(isGuestLockedForPackage)(pkg.uid, idx) ? null : { display: "none" })}"${_scopeId}><button class="${ssrRenderClass([
                    "px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
                    unref(isGuestSelectedForPackage)(pkg.uid, idx) ? "bg-primary text-white shadow-md" : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                  ])}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(guest.name)}</button></div>`);
                });
                _push2(`<!--]--></div><div class="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(unref(getNewSelectionsForPackage)(pkg.uid))} / ${ssrInterpolate(unref(getAvailableGuestsForPackage)(pkg.uid).length)}</span></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(availablePackages), (pkg) => {
                    return openBlock(), createBlock("div", {
                      key: pkg.uid,
                      class: "border rounded-lg p-4"
                    }, [
                      createVNode("div", { class: "flex items-start justify-between mb-4 pb-4 border-b" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex items-start gap-2 mb-1" }, [
                            createVNode("h3", { class: "font-semibold text-gray-900" }, toDisplayString(pkg.name), 1),
                            pkg.referenceId ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "text-primary hover:text-primary/80 transition-colors p-1",
                              onClick: ($event) => _ctx.$emit("open-detail", pkg)
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-information-circle",
                                class: "w-5 h-5"
                              })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(pkg.caption), 1)
                        ]),
                        createVNode("p", { class: "text-lg font-semibold text-primary ml-4 whitespace-nowrap" }, " Rp " + toDisplayString(pkg.price), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                        createVNode("div", { class: "flex flex-wrap gap-2 items-center" }, [
                          unref(getAvailableGuestsForPackage)(pkg.uid).length > 1 ? (openBlock(), createBlock("button", {
                            key: 0,
                            class: [
                              "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
                              unref(getAllGuestsSelected)(pkg.uid) ? "bg-primary text-white shadow-md" : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                            ],
                            onClick: ($event) => _ctx.$emit("toggle-all", pkg.uid)
                          }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-users",
                              class: "w-4 h-4"
                            }),
                            createTextVNode(" " + toDisplayString(unref(getSelectAllButtonText)(pkg.uid)), 1)
                          ], 10, ["onClick"])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(guests), (guest, idx) => {
                            return withDirectives((openBlock(), createBlock("div", {
                              key: guest.name
                            }, [
                              createVNode("button", {
                                class: [
                                  "px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
                                  unref(isGuestSelectedForPackage)(pkg.uid, idx) ? "bg-primary text-white shadow-md" : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                                ],
                                onClick: ($event) => _ctx.$emit("toggle-guest", { packageUid: pkg.uid, guestIndex: idx })
                              }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-user",
                                  class: "w-4 h-4"
                                }),
                                createTextVNode(" " + toDisplayString(guest.name), 1)
                              ], 10, ["onClick"])
                            ])), [
                              [vShow, !unref(isGuestLockedForPackage)(pkg.uid, idx)]
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-users",
                            class: "w-4 h-4"
                          }),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(getNewSelectionsForPackage)(pkg.uid)) + " / " + toDisplayString(unref(getAvailableGuestsForPackage)(pkg.uid).length), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/book/AvailablePackages.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$7, { __name: "BookAvailablePackages" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    title: { default: "" },
    description: { default: "" },
    size: { default: "md" },
    closable: { type: Boolean, default: true },
    overlayClose: { type: Boolean, default: true },
    dialogClass: { default: "" },
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    preventScroll: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "close", "open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    watch(() => props.modelValue, (newValue) => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/util/Dialog.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-0e3f7a9a"]]), { __name: "UtilDialog" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NextSteps",
  __ssrInlineRender: true,
  props: {
    variant: { default: "primary" }
  },
  setup(__props) {
    const props = __props;
    const variantClasses = computed(() => {
      switch (props.variant) {
        case "success":
          return {
            container: "bg-green-50 rounded-2xl p-6 border border-green-100",
            title: "text-lg font-semibold text-green-800 mb-3 flex items-center",
            titleIcon: "w-6 h-6 mr-2",
            list: "text-green-700 space-y-3 text-left text-sm"
          };
        case "warning":
          return {
            container: "bg-yellow-50 rounded-2xl p-6 border border-yellow-100",
            title: "text-lg font-semibold text-yellow-800 mb-3 flex items-center",
            titleIcon: "w-6 h-6 mr-2",
            list: "text-yellow-700 space-y-3 text-left text-sm"
          };
        default:
          return {
            container: "bg-primary-50 rounded-2xl p-6 border border-primary-100",
            title: "text-lg font-semibold text-primary mb-3 flex items-center",
            titleIcon: "w-6 h-6 mr-2",
            list: "text-primary space-y-3 text-left text-sm"
          };
      }
    });
    const steps = [
      "Cek <i>email</i> Anda untuk detail pembayaran lengkap",
      "Simpan <i>invoice number</i> untuk referensi",
      "Selesaikan pembayaran sesuai instruksi di <i>email</i>",
      "Pembayaran akan dikonfirmasi otomatis"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(variantClasses).container
      }, _attrs))} data-v-1e1d80ae><h3 class="${ssrRenderClass(unref(variantClasses).title)}" data-v-1e1d80ae><svg class="${ssrRenderClass(unref(variantClasses).titleIcon)}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1e1d80ae><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1e1d80ae></path></svg> Langkah Selanjutnya </h3><ul class="${ssrRenderClass(unref(variantClasses).list)}" data-v-1e1d80ae><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<li class="flex items-start gap-3" data-v-1e1d80ae><span class="font-bold shrink-0" data-v-1e1d80ae>${ssrInterpolate(index + 1)}.</span><span data-v-1e1d80ae>${step ?? ""}</span></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment/NextSteps.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-1e1d80ae"]]), { __name: "PaymentNextSteps" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "LoadingModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    invoiceId: {},
    redirectUrl: {}
  },
  emits: ["redirect"],
  setup(__props, { emit: __emit }) {
    const redirecting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/70 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"><div class="flex justify-center mb-6"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div></div><h2 class="text-2xl font-bold text-center text-gray-900 mb-2"> Pembayaran Terdeteksi </h2><p class="text-center text-gray-600 mb-6"> Silakan selesaikan pembayaran di halaman yang baru dibuka untuk melanjutkan proses pemesanan Anda. </p>`);
        if (__props.invoiceId) {
          _push(`<div class="bg-gray-50 rounded-lg p-4 mb-6"><p class="text-sm text-gray-600 mb-1"> Invoice ID </p><p class="text-lg font-semibold text-gray-900 font-mono">${ssrInterpolate(__props.invoiceId)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"><p class="text-sm text-blue-800"><strong>ℹ️ Penting:</strong> Jangan tutup halaman ini sampai Anda menyelesaikan verifikasi pembayaran di tab yang baru dibuka. </p></div><div class="flex justify-center items-center gap-2 mb-6"><div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div><p class="text-sm text-gray-600"> Menunggu konfirmasi pembayaran... </p></div><button${ssrIncludeBooleanAttr(unref(redirecting)) ? " disabled" : ""} class="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (!unref(redirecting)) {
          _push(`<span>Lanjutkan ke Pembayaran</span>`);
        } else {
          _push(`<span class="flex items-center justify-center gap-2"><svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Mengarahkan... </span>`);
        }
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment/LoadingModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$4, { __name: "PaymentLoadingModal" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RingkasanPaketTambahan",
  __ssrInlineRender: true,
  props: {
    newPackageSelections: {},
    newPackageSelectionsTotal: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$a;
      const _component_UIcon = _sfc_main$f;
      if (__props.newPackageSelections.length > 0) {
        _push(ssrRenderComponent(_component_UCard, _attrs, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-receipt",
                class: "w-5 h-5 text-primary"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}> Ringkasan Paket Tambahan </h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-receipt",
                    class: "w-5 h-5 text-primary"
                  }),
                  createVNode("h2", { class: "text-xl font-semibold" }, " Ringkasan Paket Tambahan ")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.newPackageSelections, (item) => {
                _push2(`<div class="border rounded-lg p-4 bg-white border-blue-200"${_scopeId}><div class="flex items-start justify-between mb-3 pb-3 border-b border-blue-200"${_scopeId}><div class="flex-1"${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(item.pkg.name)}</h3><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(item.pkg.caption)}</p></div><div class="text-right"${_scopeId}><p class="text-lg font-semibold text-primary"${_scopeId}> Rp ${ssrInterpolate(item.pkg.priceValue.toLocaleString("id-ID"))}</p><p class="text-xs text-gray-500 mt-1"${_scopeId}> × ${ssrInterpolate(item.guests.length)} orang </p></div></div><div class="space-y-2 mb-3"${_scopeId}><p class="text-sm font-medium text-gray-700"${_scopeId}> Tamu yang Dipilih: </p><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(item.guests, (guest) => {
                  _push2(`<div class="px-3 py-1.5 rounded-full bg-white border border-blue-200 text-sm font-medium text-gray-700 flex items-center gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(guest.name)}</div>`);
                });
                _push2(`<!--]--></div></div><div class="flex justify-between items-center pt-2 border-t border-blue-200"${_scopeId}><span class="text-sm font-medium text-gray-700"${_scopeId}>Subtotal:</span><span class="font-semibold text-primary"${_scopeId}>Rp ${ssrInterpolate(item.subtotal.toLocaleString("id-ID"))}</span></div></div>`);
              });
              _push2(`<!--]--><div class="border-t-2 border-primary pt-4 mt-6"${_scopeId}><div class="flex justify-between items-center bg-primary/5 rounded-lg p-4 border border-primary/20"${_scopeId}><span class="text-lg font-bold text-gray-900"${_scopeId}>Total Paket Tambahan:</span><span class="text-2xl font-bold text-primary"${_scopeId}>Rp ${ssrInterpolate(__props.newPackageSelectionsTotal.toLocaleString("id-ID"))}</span></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.newPackageSelections, (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.pkg.uid,
                      class: "border rounded-lg p-4 bg-white border-blue-200"
                    }, [
                      createVNode("div", { class: "flex items-start justify-between mb-3 pb-3 border-b border-blue-200" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h3", { class: "font-semibold text-gray-900" }, toDisplayString(item.pkg.name), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(item.pkg.caption), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-lg font-semibold text-primary" }, " Rp " + toDisplayString(item.pkg.priceValue.toLocaleString("id-ID")), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " × " + toDisplayString(item.guests.length) + " orang ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2 mb-3" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-700" }, " Tamu yang Dipilih: "),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.guests, (guest) => {
                            return openBlock(), createBlock("div", {
                              key: guest.index,
                              class: "px-3 py-1.5 rounded-full bg-white border border-blue-200 text-sm font-medium text-gray-700 flex items-center gap-2"
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-user",
                                class: "w-4 h-4"
                              }),
                              createTextVNode(" " + toDisplayString(guest.name), 1)
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-between items-center pt-2 border-t border-blue-200" }, [
                        createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Subtotal:"),
                        createVNode("span", { class: "font-semibold text-primary" }, "Rp " + toDisplayString(item.subtotal.toLocaleString("id-ID")), 1)
                      ])
                    ]);
                  }), 128)),
                  createVNode("div", { class: "border-t-2 border-primary pt-4 mt-6" }, [
                    createVNode("div", { class: "flex justify-between items-center bg-primary/5 rounded-lg p-4 border border-primary/20" }, [
                      createVNode("span", { class: "text-lg font-bold text-gray-900" }, "Total Paket Tambahan:"),
                      createVNode("span", { class: "text-2xl font-bold text-primary" }, "Rp " + toDisplayString(__props.newPackageSelectionsTotal.toLocaleString("id-ID")), 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/book/RingkasanPaketTambahan.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const RingkasanPaketTambahan = Object.assign(_sfc_main$3, { __name: "BookRingkasanPaketTambahan" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PackageDetailModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    selectedPackage: {},
    packageDetails: {},
    loadingDetails: { type: Boolean },
    selectedBannerIndex: {}
  },
  emits: ["update:modelValue", "select-banner"],
  setup(__props, { emit: __emit }) {
    const sanitizeAndTransformImages = (html) => {
      if (!html) return "";
      return html;
    };
    const { width } = useWindowSize();
    const computedWidth = computed(() => width.value || 0);
    const props = __props;
    const emit = __emit;
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const dialogSize = computed(() => computedWidth.value <= 768 ? "full" : "4xl");
    const selectBanner = (index) => {
      emit("select-banner", index);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UtilDialog = __nuxt_component_7;
      const _component_UIcon = _sfc_main$f;
      const _component_UBadge = _sfc_main$2$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_UtilDialog, mergeProps({
        modelValue: unref(isOpen),
        "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        title: __props.selectedPackage?.name || "Package Details",
        size: unref(dialogSize),
        closable: true,
        "show-footer": false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.selectedPackage) {
              _push2(`<div class="space-y-6"${_scopeId}>`);
              if (__props.selectedPackage.referenceType !== "experience" && __props.selectedPackage.referenceType !== "visa") {
                _push2(`<div class="relative bg-linear-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl p-6 mb-2 border border-primary/20"${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"${_scopeId}></div><div class="relative"${_scopeId}><div class="flex items-start justify-between gap-4 mb-3"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-sparkles",
                  class: "w-5 h-5 text-primary"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-xs font-semibold text-primary uppercase tracking-wider"${_scopeId}>Paket Tambahan</span></div><h2 class="text-3xl font-bold text-gray-900 leading-tight"${_scopeId}>${ssrInterpolate(__props.selectedPackage.name)}</h2></div>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "solid",
                  size: "lg",
                  class: "shrink-0 px-4 py-2 text-lg font-bold shadow-lg"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(__props.selectedPackage.price)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(__props.selectedPackage.price), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><p class="text-gray-600 text-base leading-relaxed"${_scopeId}>${ssrInterpolate(__props.selectedPackage.description)}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.loadingDetails) {
                _push2(`<div class="flex items-center justify-center py-8"${_scopeId}><div class="animate-spin"${_scopeId}><svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg></div><p class="ml-3 text-gray-600"${_scopeId}> Loading details... </p></div>`);
              } else if (__props.packageDetails) {
                _push2(`<div class="space-y-6"${_scopeId}>`);
                if (__props.selectedPackage.referenceType === "visa") {
                  _push2(`<!--[-->`);
                  if (__props.packageDetails.content) {
                    _push2(`<div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="flex items-center gap-2 mb-4"${_scopeId}><div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-document-text",
                      class: "w-5 h-5 text-primary"
                    }, null, _parent2, _scopeId));
                    _push2(`</div><h3 class="font-bold text-xl text-gray-900"${_scopeId}> Deskripsi Visa </h3></div><div class="text-gray-700 space-y-3 leading-relaxed prose prose-sm max-w-none"${_scopeId}>${__props.packageDetails.content ?? ""}</div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (__props.packageDetails.country) {
                    _push2(`<div class="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"${_scopeId}><div class="p-6 pb-4"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-map-pin",
                      class: "w-6 h-6 text-primary"
                    }, null, _parent2, _scopeId));
                    _push2(`</div><div${_scopeId}><span class="text-xs font-semibold text-primary uppercase tracking-wider block mb-1"${_scopeId}>Destinasi</span><h3 class="font-bold text-2xl text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageDetails.country.name)}</h3></div></div></div>`);
                    if (__props.packageDetails.country.bannerName) {
                      _push2(`<div class="relative mx-6 mb-6 rounded-2xl overflow-hidden group"${_scopeId}><div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10"${_scopeId}></div>`);
                      _push2(ssrRenderComponent(_component_NuxtImg, {
                        provider: "peponi",
                        src: `/country/${__props.packageDetails.country.bannerName}.jpeg`,
                        alt: __props.packageDetails.country.name,
                        class: "w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                      }, null, _parent2, _scopeId));
                      _push2(`<div class="absolute bottom-4 left-4 z-20"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_UBadge, {
                        color: "neutral",
                        variant: "solid",
                        size: "lg",
                        class: "shadow-xl"
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-globe-alt",
                              class: "w-4 h-4 mr-1"
                            }, null, _parent3, _scopeId2));
                            _push3(` ${ssrInterpolate(__props.packageDetails.country.name)}`);
                          } else {
                            return [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-globe-alt",
                                class: "w-4 h-4 mr-1"
                              }),
                              createTextVNode(" " + toDisplayString(__props.packageDetails.country.name), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent2, _scopeId));
                      _push2(`</div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (__props.packageDetails.country.summary) {
                      _push2(`<div class="px-6 pb-6"${_scopeId}><div class="bg-white rounded-xl p-5 border border-gray-100"${_scopeId}><p class="text-gray-700 leading-relaxed text-base"${_scopeId}>${ssrInterpolate(__props.packageDetails.country.summary)}</p></div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                } else if (__props.selectedPackage.referenceType === "experience") {
                  _push2(`<!--[--><div class="bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20 shadow-sm"${_scopeId}><div class="flex items-center justify-between gap-4 flex-wrap"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-sparkles",
                    class: "w-6 h-6 text-primary"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div${_scopeId}><p class="text-xs font-semibold text-primary uppercase tracking-wider"${_scopeId}> Pengalaman Unik </p><h3 class="font-bold text-2xl text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageDetails.name)}</h3></div></div>`);
                  if (__props.packageDetails.category) {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "primary",
                      variant: "soft",
                      size: "lg",
                      class: "px-4 py-2"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_component_UIcon, {
                            name: "i-heroicons-tag",
                            class: "w-4 h-4 mr-1"
                          }, null, _parent3, _scopeId2));
                          _push3(` ${ssrInterpolate(__props.packageDetails.category)}`);
                        } else {
                          return [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-tag",
                              class: "w-4 h-4 mr-1"
                            }),
                            createTextVNode(" " + toDisplayString(__props.packageDetails.category), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                  if (__props.packageDetails.bannerList && __props.packageDetails.bannerList.length > 0) {
                    _push2(`<div class="relative rounded-2xl overflow-hidden shadow-xl"${_scopeId}><div class="relative group"${_scopeId}><div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10"${_scopeId}></div>`);
                    _push2(ssrRenderComponent(_component_NuxtImg, {
                      provider: "peponi",
                      src: `/unique-experience/${__props.packageDetails.bannerList[__props.selectedBannerIndex]}.jpeg`,
                      alt: __props.packageDetails.name,
                      class: "w-full h-96 object-cover"
                    }, null, _parent2, _scopeId));
                    if (__props.packageDetails.bannerList.length > 1) {
                      _push2(`<div class="absolute top-4 right-4 z-20"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_UBadge, {
                        color: "neutral",
                        variant: "solid",
                        size: "md",
                        class: "shadow-lg backdrop-blur-sm"
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-photo",
                              class: "w-4 h-4 mr-1"
                            }, null, _parent3, _scopeId2));
                            _push3(` ${ssrInterpolate(__props.packageDetails.bannerList.length)} Foto `);
                          } else {
                            return [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-photo",
                                class: "w-4 h-4 mr-1"
                              }),
                              createTextVNode(" " + toDisplayString(__props.packageDetails.bannerList.length) + " Foto ", 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent2, _scopeId));
                      _push2(`</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="absolute bottom-6 left-6 z-20"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "neutral",
                      variant: "solid",
                      size: "lg",
                      class: "shadow-2xl"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_component_UIcon, {
                            name: "i-heroicons-camera",
                            class: "w-4 h-4 mr-1"
                          }, null, _parent3, _scopeId2));
                          _push3(` Gallery Pengalaman `);
                        } else {
                          return [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-camera",
                              class: "w-4 h-4 mr-1"
                            }),
                            createTextVNode(" Gallery Pengalaman ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                    _push2(`</div></div>`);
                    if (__props.packageDetails.bannerList.length > 1) {
                      _push2(`<div class="grid grid-cols-4 gap-2 p-4 bg-gray-50"${_scopeId}><!--[-->`);
                      ssrRenderList(__props.packageDetails.bannerList.slice(0, 4), (banner, idx) => {
                        _push2(`<div class="${ssrRenderClass([__props.selectedBannerIndex === Number(idx) ? "ring-4 ring-primary shadow-lg scale-105" : "hover:ring-2 hover:ring-primary/50", "relative rounded-lg overflow-hidden group cursor-pointer aspect-video transition-all duration-300"])}"${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_NuxtImg, {
                          provider: "peponi",
                          src: `/unique-experience/512_${banner}.webp`,
                          alt: `${__props.packageDetails.name} - ${Number(idx) + 1}`,
                          class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        }, null, _parent2, _scopeId));
                        _push2(`<div class="${ssrRenderClass([__props.selectedBannerIndex === idx ? "bg-primary/10" : "bg-black/0 group-hover:bg-black/20", "absolute inset-0 transition-colors duration-300"])}"${_scopeId}></div>`);
                        if (__props.selectedBannerIndex === idx) {
                          _push2(`<div class="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"${_scopeId}>`);
                          _push2(ssrRenderComponent(_component_UIcon, {
                            name: "i-heroicons-check",
                            class: "w-4 h-4 text-white"
                          }, null, _parent2, _scopeId));
                          _push2(`</div>`);
                        } else {
                          _push2(`<!---->`);
                        }
                        _push2(`</div>`);
                      });
                      _push2(`<!--]-->`);
                      if (__props.packageDetails.bannerList.length > 4) {
                        _push2(`<div class="${ssrRenderClass([__props.selectedBannerIndex >= 4 ? "bg-primary ring-4 ring-primary shadow-lg scale-105" : "bg-gray-900 hover:ring-2 hover:ring-primary/50", "relative rounded-lg overflow-hidden flex items-center justify-center aspect-video cursor-pointer group transition-all duration-300"])}"${_scopeId}><div class="text-center"${_scopeId}><p class="text-white font-bold text-lg"${_scopeId}> +${ssrInterpolate(__props.packageDetails.bannerList.length - 4)}</p><p class="text-white text-xs"${_scopeId}> Lainnya </p></div></div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (__props.packageDetails.summary) {
                    _push2(`<div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center gap-2 mb-5"${_scopeId}><div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-document-text",
                      class: "w-5 h-5 text-primary"
                    }, null, _parent2, _scopeId));
                    _push2(`</div><h3 class="font-bold text-xl text-gray-900"${_scopeId}> Detail Pengalaman </h3></div><div class="text-gray-700 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6"${_scopeId}>${sanitizeAndTransformImages(__props.packageDetails.summary) ?? ""}</div></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}> No additional details available for this package </div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.selectedPackage ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                __props.selectedPackage.referenceType !== "experience" && __props.selectedPackage.referenceType !== "visa" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "relative bg-linear-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl p-6 mb-2 border border-primary/20"
                }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" }),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "flex items-start justify-between gap-4 mb-3" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-sparkles",
                            class: "w-5 h-5 text-primary"
                          }),
                          createVNode("span", { class: "text-xs font-semibold text-primary uppercase tracking-wider" }, "Paket Tambahan")
                        ]),
                        createVNode("h2", { class: "text-3xl font-bold text-gray-900 leading-tight" }, toDisplayString(__props.selectedPackage.name), 1)
                      ]),
                      createVNode(_component_UBadge, {
                        color: "primary",
                        variant: "solid",
                        size: "lg",
                        class: "shrink-0 px-4 py-2 text-lg font-bold shadow-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.selectedPackage.price), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("p", { class: "text-gray-600 text-base leading-relaxed" }, toDisplayString(__props.selectedPackage.description), 1)
                  ])
                ])) : createCommentVNode("", true),
                __props.loadingDetails ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-center py-8"
                }, [
                  createVNode("div", { class: "animate-spin" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-6 h-6 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      })
                    ]))
                  ]),
                  createVNode("p", { class: "ml-3 text-gray-600" }, " Loading details... ")
                ])) : __props.packageDetails ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-6"
                }, [
                  __props.selectedPackage.referenceType === "visa" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    __props.packageDetails.content ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                        createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-document-text",
                            class: "w-5 h-5 text-primary"
                          })
                        ]),
                        createVNode("h3", { class: "font-bold text-xl text-gray-900" }, " Deskripsi Visa ")
                      ]),
                      createVNode("div", {
                        class: "text-gray-700 space-y-3 leading-relaxed prose prose-sm max-w-none",
                        innerHTML: __props.packageDetails.content
                      }, null, 8, ["innerHTML"])
                    ])) : createCommentVNode("", true),
                    __props.packageDetails.country ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    }, [
                      createVNode("div", { class: "p-6 pb-4" }, [
                        createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                          createVNode("div", { class: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-map-pin",
                              class: "w-6 h-6 text-primary"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "text-xs font-semibold text-primary uppercase tracking-wider block mb-1" }, "Destinasi"),
                            createVNode("h3", { class: "font-bold text-2xl text-gray-900" }, toDisplayString(__props.packageDetails.country.name), 1)
                          ])
                        ])
                      ]),
                      __props.packageDetails.country.bannerName ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative mx-6 mb-6 rounded-2xl overflow-hidden group"
                      }, [
                        createVNode("div", { class: "absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10" }),
                        createVNode(_component_NuxtImg, {
                          provider: "peponi",
                          src: `/country/${__props.packageDetails.country.bannerName}.jpeg`,
                          alt: __props.packageDetails.country.name,
                          class: "w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "absolute bottom-4 left-4 z-20" }, [
                          createVNode(_component_UBadge, {
                            color: "neutral",
                            variant: "solid",
                            size: "lg",
                            class: "shadow-xl"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-globe-alt",
                                class: "w-4 h-4 mr-1"
                              }),
                              createTextVNode(" " + toDisplayString(__props.packageDetails.country.name), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true),
                      __props.packageDetails.country.summary ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "px-6 pb-6"
                      }, [
                        createVNode("div", { class: "bg-white rounded-xl p-5 border border-gray-100" }, [
                          createVNode("p", { class: "text-gray-700 leading-relaxed text-base" }, toDisplayString(__props.packageDetails.country.summary), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ], 64)) : __props.selectedPackage.referenceType === "experience" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("div", { class: "bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20 shadow-sm" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-4 flex-wrap" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-sparkles",
                              class: "w-6 h-6 text-primary"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs font-semibold text-primary uppercase tracking-wider" }, " Pengalaman Unik "),
                            createVNode("h3", { class: "font-bold text-2xl text-gray-900" }, toDisplayString(__props.packageDetails.name), 1)
                          ])
                        ]),
                        __props.packageDetails.category ? (openBlock(), createBlock(_component_UBadge, {
                          key: 0,
                          color: "primary",
                          variant: "soft",
                          size: "lg",
                          class: "px-4 py-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-tag",
                              class: "w-4 h-4 mr-1"
                            }),
                            createTextVNode(" " + toDisplayString(__props.packageDetails.category), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ]),
                    __props.packageDetails.bannerList && __props.packageDetails.bannerList.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "relative rounded-2xl overflow-hidden shadow-xl"
                    }, [
                      createVNode("div", { class: "relative group" }, [
                        createVNode("div", { class: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" }),
                        createVNode(_component_NuxtImg, {
                          provider: "peponi",
                          src: `/unique-experience/${__props.packageDetails.bannerList[__props.selectedBannerIndex]}.jpeg`,
                          alt: __props.packageDetails.name,
                          class: "w-full h-96 object-cover"
                        }, null, 8, ["src", "alt"]),
                        __props.packageDetails.bannerList.length > 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute top-4 right-4 z-20"
                        }, [
                          createVNode(_component_UBadge, {
                            color: "neutral",
                            variant: "solid",
                            size: "md",
                            class: "shadow-lg backdrop-blur-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-photo",
                                class: "w-4 h-4 mr-1"
                              }),
                              createTextVNode(" " + toDisplayString(__props.packageDetails.bannerList.length) + " Foto ", 1)
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "absolute bottom-6 left-6 z-20" }, [
                          createVNode(_component_UBadge, {
                            color: "neutral",
                            variant: "solid",
                            size: "lg",
                            class: "shadow-2xl"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-camera",
                                class: "w-4 h-4 mr-1"
                              }),
                              createTextVNode(" Gallery Pengalaman ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      __props.packageDetails.bannerList.length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-4 gap-2 p-4 bg-gray-50"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.packageDetails.bannerList.slice(0, 4), (banner, idx) => {
                          return openBlock(), createBlock("div", {
                            key: idx,
                            class: ["relative rounded-lg overflow-hidden group cursor-pointer aspect-video transition-all duration-300", __props.selectedBannerIndex === Number(idx) ? "ring-4 ring-primary shadow-lg scale-105" : "hover:ring-2 hover:ring-primary/50"],
                            onClick: ($event) => selectBanner(Number(idx))
                          }, [
                            createVNode(_component_NuxtImg, {
                              provider: "peponi",
                              src: `/unique-experience/512_${banner}.webp`,
                              alt: `${__props.packageDetails.name} - ${Number(idx) + 1}`,
                              class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", {
                              class: ["absolute inset-0 transition-colors duration-300", __props.selectedBannerIndex === idx ? "bg-primary/10" : "bg-black/0 group-hover:bg-black/20"]
                            }, null, 2),
                            __props.selectedBannerIndex === idx ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-check",
                                class: "w-4 h-4 text-white"
                              })
                            ])) : createCommentVNode("", true)
                          ], 10, ["onClick"]);
                        }), 128)),
                        __props.packageDetails.bannerList.length > 4 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["relative rounded-lg overflow-hidden flex items-center justify-center aspect-video cursor-pointer group transition-all duration-300", __props.selectedBannerIndex >= 4 ? "bg-primary ring-4 ring-primary shadow-lg scale-105" : "bg-gray-900 hover:ring-2 hover:ring-primary/50"],
                          onClick: ($event) => selectBanner(4)
                        }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("p", { class: "text-white font-bold text-lg" }, " +" + toDisplayString(__props.packageDetails.bannerList.length - 4), 1),
                            createVNode("p", { class: "text-white text-xs" }, " Lainnya ")
                          ])
                        ], 10, ["onClick"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    __props.packageDetails.summary ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center gap-2 mb-5" }, [
                          createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-document-text",
                              class: "w-5 h-5 text-primary"
                            })
                          ]),
                          createVNode("h3", { class: "font-bold text-xl text-gray-900" }, " Detail Pengalaman ")
                        ]),
                        createVNode("div", {
                          class: "text-gray-700 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6",
                          innerHTML: sanitizeAndTransformImages(__props.packageDetails.summary)
                        }, null, 8, ["innerHTML"])
                      ])
                    ])) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "text-center py-8 text-gray-500"
                }, " No additional details available for this package "))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/book/PackageDetailModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PackageDetailModal = Object.assign(_sfc_main$2, { __name: "BookPackageDetailModal" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethodSection",
  __ssrInlineRender: true,
  props: {
    newPackageSelectionsTotal: {},
    newPackageSelections: {},
    bookingData: {},
    packageGuestSelections: {},
    lockedSelections: {}
  },
  emits: ["payment-success", "payment-error"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const toast = useToast();
    const baseUrl = useRuntimeConfig().public.apiBase;
    const props = __props;
    const emit = __emit;
    const selectedPaymentType = ref(null);
    const selectedPaymentMethod = ref(null);
    const isLoadingCheckout = ref(false);
    const creditCardForm = ref({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });
    watch(() => creditCardForm.value.cardNumber, (newValue) => {
      creditCardForm.value.cardNumber = formatCardNumber(newValue);
    });
    watch(() => creditCardForm.value.expiryDate, (newValue) => {
      creditCardForm.value.expiryDate = formatExpiryDate(newValue);
    });
    const { data: vaListData, pending: vaListPending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${baseUrl}/Booking/payment-list`, "$UxEKnHli6B")), __temp = await __temp, __restore(), __temp);
    const paymentMethods = computed(() => {
      const methods = [];
      if (vaListData.value?.data) {
        const vaMethodsWithTitle = vaListData.value.data.filter((item) => item.is_Activated).map((item) => ({
          id: item.code.toLowerCase(),
          name: item.name,
          type: "bank",
          code: item.code,
          fee: item.fee,
          icon: `/assets/bank/${item.code}.png`
        }));
        methods.push(...vaMethodsWithTitle);
      }
      return methods;
    });
    const isCreditCardFormValid = computed(() => {
      const form = creditCardForm.value;
      if (!form.cardName.trim()) return false;
      if (!form.cardNumber.trim()) return false;
      if (!form.expiryDate.trim()) return false;
      if (!form.cvv.trim()) return false;
      if (form.cardNumber.replace(/\s/g, "").length !== 16) return false;
      if (form.expiryDate.length !== 5) return false;
      if (form.cvv.length < 3 || form.cvv.length > 4) return false;
      return true;
    });
    const switchPaymentType = (type) => {
      selectedPaymentType.value = type;
      if (type === "virtual_account") {
        creditCardForm.value = {
          cardName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: ""
        };
      } else if (type === "credit_card") {
        selectedPaymentMethod.value = null;
      }
    };
    const selectPaymentMethod = (method) => {
      selectedPaymentMethod.value = method;
    };
    const formatGuestId = (whatsappNumber, name) => {
      const last4Digits = whatsappNumber.slice(-4);
      const first3Letters = name.substring(0, 3).toUpperCase();
      return `${last4Digits}${first3Letters}`;
    };
    const proceedToCheckout = async () => {
      if (!props.bookingData) {
        toast.add({
          title: "Error",
          description: "Booking data tidak ditemukan",
          color: "error"
        });
        return;
      }
      if (selectedPaymentType.value === "virtual_account") {
        if (!selectedPaymentMethod.value) {
          toast.add({
            title: "Error",
            description: "Silakan pilih bank terlebih dahulu",
            color: "error"
          });
          return;
        }
        await proceedWithVirtualAccount();
      } else if (selectedPaymentType.value === "credit_card") {
        if (!isCreditCardFormValid.value) {
          toast.add({
            title: "Error",
            description: "Silakan lengkapi data kartu kredit",
            color: "error"
          });
          return;
        }
        await proceedWithCreditCard();
      }
    };
    const proceedWithCreditCard = async () => {
      isLoadingCheckout.value = true;
      try {
        if (!props.bookingData) {
          throw new Error("Missing booking data");
        }
        const cardNumberDigits = creditCardForm.value.cardNumber.replace(/\s/g, "");
        const [month, year] = creditCardForm.value.expiryDate.split("/");
        const customers = props.bookingData.guest.map((guest) => ({
          gender: guest.gender || "",
          name: guest.name || "",
          whatsappNumber: guest.whatsapp_number || guest.whatsappNumber || ""
        }));
        const extraPackage = [];
        props.packageGuestSelections.forEach((guestSet, uid) => {
          const lockedSet = props.lockedSelections.get(uid) || /* @__PURE__ */ new Set();
          const nonLockedGuests = [...guestSet].filter((i) => !lockedSet.has(i));
          if (nonLockedGuests.length > 0) {
            const guestIds = nonLockedGuests.map((i) => {
              const guest = props.bookingData.guest[i];
              return formatGuestId(
                guest?.whatsapp_number || guest?.whatsappNumber || "",
                guest?.name || ""
              );
            });
            extraPackage.push({
              uid,
              quantity: guestIds.length,
              guest: guestIds
            });
          }
        });
        const payload = {
          bookNumber: props.bookingData.noPesanan,
          extraPackage,
          customers,
          cardHolderName: creditCardForm.value.cardName,
          cardNumber: cardNumberDigits,
          cardMonth: parseInt(month || "0"),
          cardYear: parseInt(year || "0"),
          cardCvn: parseInt(creditCardForm.value.cvv),
          email: props.bookingData.guest[0]?.email || "",
          phoneNumber: props.bookingData.guest[0]?.whatsapp_number || props.bookingData.guest[0]?.whatsappNumber || ""
        };
        console.log("CC Payment Payload:", payload);
        const response = await $fetch("http://103.189.234.243/api-be/Booking/create-additional-cc", {
          method: "POST",
          body: payload
        });
        console.log("CC Payment Response:", response);
        if (response) {
          toast.add({
            title: "Success",
            description: "Pembayaran berhasil diproses",
            color: "success"
          });
          emit("payment-success", response);
        }
      } catch (error) {
        console.error("CC Payment Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Gagal memproses pembayaran";
        toast.add({
          title: "Payment Error",
          description: errorMessage,
          color: "error"
        });
        emit("payment-error", errorMessage);
      } finally {
        isLoadingCheckout.value = false;
      }
    };
    const proceedWithVirtualAccount = async () => {
      isLoadingCheckout.value = true;
      try {
        if (!props.bookingData || !selectedPaymentMethod.value) {
          throw new Error("Missing required data");
        }
        const customers = props.bookingData.guest.map((guest) => ({
          gender: guest.gender || "",
          name: guest.name || "",
          whatsappNumber: guest.whatsapp_number || guest.whatsappNumber || ""
        }));
        const extraPackage = [];
        props.packageGuestSelections.forEach((guestSet, uid) => {
          const lockedSet = props.lockedSelections.get(uid) || /* @__PURE__ */ new Set();
          const nonLockedGuests = [...guestSet].filter((i) => !lockedSet.has(i));
          if (nonLockedGuests.length > 0) {
            const guestIds = nonLockedGuests.map((i) => {
              const guest = props.bookingData.guest[i];
              return formatGuestId(
                guest?.whatsapp_number || guest?.whatsappNumber || "",
                guest?.name || ""
              );
            });
            extraPackage.push({
              uid,
              quantity: guestIds.length,
              guest: guestIds
            });
          }
        });
        const payload = {
          bookNumber: props.bookingData.noPesanan,
          extraPackage,
          customers,
          bankCode: selectedPaymentMethod.value.code
        };
        console.log("VA Payment Payload:", payload);
        const response = await $fetch("http://103.189.234.243/api-be/Booking/create-additional-va", {
          method: "POST",
          body: payload
        });
        console.log("VA Payment Response:", response);
        if (response) {
          toast.add({
            title: "Success",
            description: "Pembayaran berhasil diproses",
            color: "success"
          });
          emit("payment-success", response);
        }
      } catch (error) {
        console.error("VA Payment Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Gagal memproses pembayaran";
        toast.add({
          title: "Payment Error",
          description: errorMessage,
          color: "error"
        });
        emit("payment-error", errorMessage);
      } finally {
        isLoadingCheckout.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$a;
      const _component_UIcon = _sfc_main$f;
      const _component_UInput = _sfc_main$9;
      const _component_UButton = _sfc_main$9$1;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold"${_scopeId}> Pilih Metode Pembayaran </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold" }, " Pilih Metode Pembayaran ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><button${ssrIncludeBooleanAttr(__props.newPackageSelectionsTotal === 0) ? " disabled" : ""} class="${ssrRenderClass([
              "p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]",
              __props.newPackageSelectionsTotal === 0 ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50" : unref(selectedPaymentType) === "virtual_account" ? "border-primary bg-primary/5 cursor-pointer" : "border-gray-200 bg-white hover:border-gray-300 cursor-pointer"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: [
                "w-8 h-8 transition-colors",
                __props.newPackageSelectionsTotal === 0 ? "text-gray-300" : unref(selectedPaymentType) === "virtual_account" ? "text-primary" : "text-gray-400"
              ]
            }, null, _parent2, _scopeId));
            _push2(`<span class="${ssrRenderClass([
              "font-medium text-center",
              __props.newPackageSelectionsTotal === 0 ? "text-gray-400" : unref(selectedPaymentType) === "virtual_account" ? "text-primary" : "text-gray-600"
            ])}"${_scopeId}> Virtual Account </span></button><button${ssrIncludeBooleanAttr(__props.newPackageSelectionsTotal === 0) ? " disabled" : ""} class="${ssrRenderClass([
              "p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]",
              __props.newPackageSelectionsTotal === 0 ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50" : unref(selectedPaymentType) === "credit_card" ? "border-primary bg-primary/5 cursor-pointer" : "border-gray-200 bg-white hover:border-gray-300 cursor-pointer"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-credit-card",
              class: [
                "w-8 h-8 transition-colors",
                __props.newPackageSelectionsTotal === 0 ? "text-gray-300" : unref(selectedPaymentType) === "credit_card" ? "text-primary" : "text-gray-400"
              ]
            }, null, _parent2, _scopeId));
            _push2(`<span class="${ssrRenderClass([
              "font-medium text-center",
              __props.newPackageSelectionsTotal === 0 ? "text-gray-400" : unref(selectedPaymentType) === "credit_card" ? "text-primary" : "text-gray-600"
            ])}"${_scopeId}> Kartu Kredit </span></button></div>`);
            if (unref(selectedPaymentType) === "virtual_account") {
              _push2(`<div class="space-y-4 pt-2"${_scopeId}><p class="text-sm text-gray-600 font-medium"${_scopeId}> Pilih bank untuk transfer virtual account: </p>`);
              if (unref(vaListPending)) {
                _push2(`<div class="flex justify-center py-4"${_scopeId}><svg class="w-6 h-6 text-primary animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg></div>`);
              } else {
                _push2(`<div class="grid grid-cols-2 md:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                ssrRenderList(unref(paymentMethods), (method) => {
                  _push2(`<button class="${ssrRenderClass([
                    "p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2",
                    unref(selectedPaymentMethod)?.id === method.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"
                  ])}"${_scopeId}><img${ssrRenderAttr("src", method.icon)}${ssrRenderAttr("alt", method.name)} class="h-8 object-contain"${_scopeId}><span class="text-sm font-medium text-center"${_scopeId}>${ssrInterpolate(method.name)}</span></button>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(selectedPaymentType) === "credit_card") {
              _push2(`<div class="space-y-4 pt-2"${_scopeId}><div class="bg-amber-50 border border-amber-200 rounded-lg p-4"${_scopeId}><div class="flex items-start gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-5 h-5 text-amber-600 mt-0.5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-amber-800"${_scopeId}> Pembayaran kartu kredit Anda akan diproses secara aman melalui gateway pembayaran terpercaya. </p></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Nama Pemegang Kartu</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(creditCardForm).cardName,
                "onUpdate:modelValue": ($event) => unref(creditCardForm).cardName = $event,
                placeholder: "John Doe",
                class: "w-full",
                onBlur: ($event) => unref(creditCardForm).cardName = unref(creditCardForm).cardName.toUpperCase()
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Nomor Kartu</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(creditCardForm).cardNumber,
                "onUpdate:modelValue": ($event) => unref(creditCardForm).cardNumber = $event,
                placeholder: "1234 5678 9012 3456",
                maxlength: "19",
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-500 mt-1"${_scopeId}> Masukkan 16 digit nomor kartu </p></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Berlaku Hingga</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(creditCardForm).expiryDate,
                "onUpdate:modelValue": ($event) => unref(creditCardForm).expiryDate = $event,
                placeholder: "MM/YY",
                maxlength: "5",
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-500 mt-1"${_scopeId}> Format: MM/YY </p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>CVV</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(creditCardForm).cvv,
                "onUpdate:modelValue": ($event) => unref(creditCardForm).cvv = $event,
                placeholder: "123",
                type: "password",
                maxlength: "4",
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-500 mt-1"${_scopeId}> 3-4 digit belakang kartu </p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(selectedPaymentType)) {
              _push2(`<div class="pt-4 border-t"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                loading: unref(isLoadingCheckout),
                disabled: __props.newPackageSelectionsTotal === 0 || !unref(selectedPaymentMethod) && unref(selectedPaymentType) === "virtual_account" || unref(selectedPaymentType) === "credit_card" && !unref(isCreditCardFormValid),
                block: "",
                size: "lg",
                class: [
                  __props.newPackageSelectionsTotal === 0 || !unref(selectedPaymentMethod) && unref(selectedPaymentType) === "virtual_account" || unref(selectedPaymentType) === "credit_card" && !unref(isCreditCardFormValid) ? "bg-gray-300! text-white cursor-not-allowed opacity-70" : "bg-primary hover:bg-primary/90"
                ],
                onClick: proceedToCheckout
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lanjut Pembayaran `);
                  } else {
                    return [
                      createTextVNode(" Lanjut Pembayaran ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("button", {
                    disabled: __props.newPackageSelectionsTotal === 0,
                    class: [
                      "p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]",
                      __props.newPackageSelectionsTotal === 0 ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50" : unref(selectedPaymentType) === "virtual_account" ? "border-primary bg-primary/5 cursor-pointer" : "border-gray-200 bg-white hover:border-gray-300 cursor-pointer"
                    ],
                    onClick: ($event) => switchPaymentType("virtual_account")
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: [
                        "w-8 h-8 transition-colors",
                        __props.newPackageSelectionsTotal === 0 ? "text-gray-300" : unref(selectedPaymentType) === "virtual_account" ? "text-primary" : "text-gray-400"
                      ]
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      class: [
                        "font-medium text-center",
                        __props.newPackageSelectionsTotal === 0 ? "text-gray-400" : unref(selectedPaymentType) === "virtual_account" ? "text-primary" : "text-gray-600"
                      ]
                    }, " Virtual Account ", 2)
                  ], 10, ["disabled", "onClick"]),
                  createVNode("button", {
                    disabled: __props.newPackageSelectionsTotal === 0,
                    class: [
                      "p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]",
                      __props.newPackageSelectionsTotal === 0 ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50" : unref(selectedPaymentType) === "credit_card" ? "border-primary bg-primary/5 cursor-pointer" : "border-gray-200 bg-white hover:border-gray-300 cursor-pointer"
                    ],
                    onClick: ($event) => switchPaymentType("credit_card")
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-credit-card",
                      class: [
                        "w-8 h-8 transition-colors",
                        __props.newPackageSelectionsTotal === 0 ? "text-gray-300" : unref(selectedPaymentType) === "credit_card" ? "text-primary" : "text-gray-400"
                      ]
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      class: [
                        "font-medium text-center",
                        __props.newPackageSelectionsTotal === 0 ? "text-gray-400" : unref(selectedPaymentType) === "credit_card" ? "text-primary" : "text-gray-600"
                      ]
                    }, " Kartu Kredit ", 2)
                  ], 10, ["disabled", "onClick"])
                ]),
                unref(selectedPaymentType) === "virtual_account" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4 pt-2"
                }, [
                  createVNode("p", { class: "text-sm text-gray-600 font-medium" }, " Pilih bank untuk transfer virtual account: "),
                  unref(vaListPending) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-4"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-6 h-6 text-primary animate-spin",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      })
                    ]))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "grid grid-cols-2 md:grid-cols-3 gap-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentMethods), (method) => {
                      return openBlock(), createBlock("button", {
                        key: method.id,
                        class: [
                          "p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2",
                          unref(selectedPaymentMethod)?.id === method.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"
                        ],
                        onClick: ($event) => selectPaymentMethod(method)
                      }, [
                        createVNode("img", {
                          src: method.icon,
                          alt: method.name,
                          class: "h-8 object-contain",
                          onError: ($event) => $event.target.src = "/placeholder-bank.png"
                        }, null, 40, ["src", "alt", "onError"]),
                        createVNode("span", { class: "text-sm font-medium text-center" }, toDisplayString(method.name), 1)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]))
                ])) : createCommentVNode("", true),
                unref(selectedPaymentType) === "credit_card" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4 pt-2"
                }, [
                  createVNode("div", { class: "bg-amber-50 border border-amber-200 rounded-lg p-4" }, [
                    createVNode("div", { class: "flex items-start gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-information-circle",
                        class: "w-5 h-5 text-amber-600 mt-0.5 shrink-0"
                      }),
                      createVNode("p", { class: "text-sm text-amber-800" }, " Pembayaran kartu kredit Anda akan diproses secara aman melalui gateway pembayaran terpercaya. ")
                    ])
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Nama Pemegang Kartu"),
                      createVNode(_component_UInput, {
                        modelValue: unref(creditCardForm).cardName,
                        "onUpdate:modelValue": ($event) => unref(creditCardForm).cardName = $event,
                        placeholder: "John Doe",
                        class: "w-full",
                        onBlur: ($event) => unref(creditCardForm).cardName = unref(creditCardForm).cardName.toUpperCase()
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Nomor Kartu"),
                      createVNode(_component_UInput, {
                        modelValue: unref(creditCardForm).cardNumber,
                        "onUpdate:modelValue": ($event) => unref(creditCardForm).cardNumber = $event,
                        placeholder: "1234 5678 9012 3456",
                        maxlength: "19",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Masukkan 16 digit nomor kartu ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Berlaku Hingga"),
                        createVNode(_component_UInput, {
                          modelValue: unref(creditCardForm).expiryDate,
                          "onUpdate:modelValue": ($event) => unref(creditCardForm).expiryDate = $event,
                          placeholder: "MM/YY",
                          maxlength: "5",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Format: MM/YY ")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "CVV"),
                        createVNode(_component_UInput, {
                          modelValue: unref(creditCardForm).cvv,
                          "onUpdate:modelValue": ($event) => unref(creditCardForm).cvv = $event,
                          placeholder: "123",
                          type: "password",
                          maxlength: "4",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " 3-4 digit belakang kartu ")
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(selectedPaymentType) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "pt-4 border-t"
                }, [
                  createVNode(_component_UButton, {
                    loading: unref(isLoadingCheckout),
                    disabled: __props.newPackageSelectionsTotal === 0 || !unref(selectedPaymentMethod) && unref(selectedPaymentType) === "virtual_account" || unref(selectedPaymentType) === "credit_card" && !unref(isCreditCardFormValid),
                    block: "",
                    size: "lg",
                    class: [
                      __props.newPackageSelectionsTotal === 0 || !unref(selectedPaymentMethod) && unref(selectedPaymentType) === "virtual_account" || unref(selectedPaymentType) === "credit_card" && !unref(isCreditCardFormValid) ? "bg-gray-300! text-white cursor-not-allowed opacity-70" : "bg-primary hover:bg-primary/90"
                    ],
                    onClick: proceedToCheckout
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Lanjut Pembayaran ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled", "class"])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/book/PaymentMethodSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PaymentMethodSection = Object.assign(_sfc_main$1, { __name: "BookPaymentMethodSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "detail",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRoute();
    const toast = useToast();
    const baseUrl = useRuntimeConfig().public.apiBase;
    const { width } = useWindowSize();
    const computedWidth = computed(() => width.value || 0);
    const showSuccessDialog = ref(false);
    const bookingCode = ref("");
    const isSearching = ref(false);
    const searchAttempted = ref(false);
    const failedSearchCode = ref("");
    const bookingData = ref(null);
    const additionalItems = ref([]);
    const showDetailModal = ref(false);
    const selectedPackage = ref(null);
    const packageDetails = ref(null);
    const loadingDetails = ref(false);
    const selectedBannerIndex = ref(0);
    const packageGuestSelections = ref(/* @__PURE__ */ new Map());
    const lockedSelections = ref(/* @__PURE__ */ new Map());
    const paymentResponse = ref(null);
    const showPaymentLoadingModal = ref(false);
    const paymentModalInvoiceId = ref("");
    const paymentModalRedirectUrl = ref("");
    const openPackageDetail = async (pkg) => {
      selectedPackage.value = pkg;
      showDetailModal.value = true;
      selectedBannerIndex.value = 0;
      if (pkg.referenceType && pkg.referenceId) {
        loadingDetails.value = true;
        try {
          let endpoint = "";
          if (pkg.referenceType === "visa") {
            endpoint = `/Visa/${pkg.referenceId}`;
          } else if (pkg.referenceType === "experience") {
            endpoint = `/UniqueExperience/${pkg.referenceId}`;
          }
          if (endpoint) {
            const response = await $fetch(baseUrl + endpoint);
            packageDetails.value = response?.data || response;
          }
        } catch (error) {
          console.error("Failed to fetch package details:", error);
          packageDetails.value = null;
        } finally {
          loadingDetails.value = false;
        }
      }
    };
    const selectBanner = (index) => {
      selectedBannerIndex.value = index;
    };
    const searchBooking = async () => {
      if (!bookingCode.value.trim()) return;
      isSearching.value = true;
      searchAttempted.value = true;
      try {
        const response = await $fetch(`${baseUrl}/Booking/additional-book-detail/${bookingCode.value}`, {
          method: "GET"
          // query: { id: bookingCode.value }
        });
        if (!response?.data) {
          bookingData.value = null;
          failedSearchCode.value = bookingCode.value;
          return;
        }
        bookingData.value = response.data;
        failedSearchCode.value = "";
        packageGuestSelections.value = /* @__PURE__ */ new Map();
        lockedSelections.value = /* @__PURE__ */ new Map();
        additionalItems.value = (response.data.additionalPackages || []).map((pkg) => ({
          uid: pkg.uid,
          name: pkg.name,
          caption: pkg.caption,
          price: `${pkg.price.toLocaleString("id-ID")}`,
          priceValue: pkg.price,
          quantity: 0,
          referenceType: pkg.referenceType,
          referenceId: pkg.referenceId
        }));
        response.data.guest?.forEach((guest, guestIndex) => {
          if (Array.isArray(guest.extra_package)) {
            guest.extra_package.forEach((uid) => {
              addSelection(uid, guestIndex, true);
              console.log(`Default active: Guest ${guestIndex + 1} → ${uid}`);
            });
          }
        });
      } catch (err) {
        console.error("Error fetching booking:", err);
        bookingData.value = null;
        failedSearchCode.value = bookingCode.value;
      } finally {
        isSearching.value = false;
      }
    };
    const { data: vaListData, pending: vaListPending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${baseUrl}/Booking/payment-list`, "$xuVHTWuTG2")), __temp = await __temp, __restore(), __temp);
    computed(() => {
      const methods = [];
      if (vaListData.value?.data) {
        const vaMethodsWithTitle = vaListData.value.data.filter((item) => item.is_Activated).map((item) => ({
          id: item.code.toLowerCase(),
          name: item.name,
          type: "bank",
          code: item.code,
          fee: item.fee,
          icon: `/assets/bank/${item.code}.png`
        }));
        methods.push(...vaMethodsWithTitle);
      }
      return methods;
    });
    const addSelection = (uid, guestIndex, locked = false) => {
      const map = new Map(packageGuestSelections.value);
      if (!map.has(uid)) map.set(uid, /* @__PURE__ */ new Set());
      map.get(uid).add(guestIndex);
      packageGuestSelections.value = map;
      if (locked) {
        const lockMap = new Map(lockedSelections.value);
        if (!lockMap.has(uid)) lockMap.set(uid, /* @__PURE__ */ new Set());
        lockMap.get(uid).add(guestIndex);
        lockedSelections.value = lockMap;
      }
    };
    const removeSelection = (uid, guestIndex) => {
      if (lockedSelections.value.get(uid)?.has(guestIndex)) return;
      const map = new Map(packageGuestSelections.value);
      const guestSet = map.get(uid);
      if (guestSet) {
        guestSet.delete(guestIndex);
        if (guestSet.size === 0) map.delete(uid);
      }
      packageGuestSelections.value = map;
    };
    const toggleGuestForPackage = (packageUid, guestIndex) => {
      const selected = isGuestSelectedForPackage(packageUid, guestIndex);
      if (selected) {
        removeSelection(packageUid, guestIndex);
      } else {
        addSelection(packageUid, guestIndex);
      }
    };
    const toggleAllGuestsForPackage = (packageUid) => {
      if (!bookingData.value?.guest) return;
      const totalGuests = bookingData.value.guest.length;
      const lockedGuests = lockedSelections.value.get(packageUid) || /* @__PURE__ */ new Set();
      const allGuests = Array.from({ length: totalGuests }, (_, i) => i);
      const selectableGuests = allGuests.filter((i) => !lockedGuests.has(i));
      const map = new Map(packageGuestSelections.value);
      const current = map.get(packageUid);
      lockedGuests.size;
      if (current && current.size === totalGuests) {
        selectableGuests.forEach((i) => removeSelection(packageUid, i));
      } else {
        selectableGuests.forEach((i) => addSelection(packageUid, i));
      }
    };
    const isGuestSelectedForPackage = (uid, guestIndex) => {
      return packageGuestSelections.value.get(uid)?.has(guestIndex) || false;
    };
    const isGuestLockedForPackage = (uid, guestIndex) => {
      return lockedSelections.value.get(uid)?.has(guestIndex) || false;
    };
    const getSelectAllButtonText = (uid) => {
      if (!bookingData.value?.guest) return "Select All";
      const lockedGuests = lockedSelections.value.get(uid) || /* @__PURE__ */ new Set();
      const selectableGuests = bookingData.value.guest.filter((_, idx) => !lockedGuests.has(idx));
      const selectedCount = packageGuestSelections.value.get(uid)?.size || 0;
      if (selectedCount === selectableGuests.length && selectableGuests.length > 0) {
        return "Deselect All";
      }
      return "Select All";
    };
    const getAllGuestsSelected = (uid) => {
      const lockedGuests = lockedSelections.value.get(uid) || /* @__PURE__ */ new Set();
      const selectableGuests = Array.from({ length: bookingData.value?.guest?.length || 0 }, (_, i) => i).filter((i) => !lockedGuests.has(i));
      const selectedGuests = packageGuestSelections.value.get(uid) || /* @__PURE__ */ new Set();
      return selectableGuests.length > 0 && selectableGuests.every((idx) => selectedGuests.has(idx));
    };
    const getAvailableGuestsForPackage = (uid) => {
      if (!bookingData.value?.guest) return [];
      const lockedGuests = lockedSelections.value.get(uid) || /* @__PURE__ */ new Set();
      return bookingData.value.guest.filter((_, index) => !lockedGuests.has(index));
    };
    const getNewSelectionsForPackage = (uid) => {
      const locked = lockedSelections.value.get(uid) || /* @__PURE__ */ new Set();
      const selected = packageGuestSelections.value.get(uid) || /* @__PURE__ */ new Set();
      return [...selected].filter((idx) => !locked.has(idx)).length;
    };
    const packagesAlreadyAdded = computed(() => {
      if (!bookingData.value?.guest) return [];
      const packageMap = /* @__PURE__ */ new Map();
      bookingData.value.guest.forEach((guest) => {
        if (Array.isArray(guest.extra_package)) {
          guest.extra_package.forEach((pkgUid) => {
            if (!packageMap.has(pkgUid)) {
              packageMap.set(pkgUid, []);
            }
            packageMap.get(pkgUid).push(guest);
          });
        }
      });
      return Array.from(packageMap.entries()).map(([uid, guests]) => {
        const pkg = additionalItems.value.find((p) => p.uid === uid);
        return {
          pkg,
          guests
        };
      }).filter((item) => item.pkg);
    });
    const availablePackages = computed(() => {
      if (!bookingData.value?.guest) return [];
      const totalGuests = bookingData.value.guest.length;
      return additionalItems.value.filter((pkg) => {
        const lockedGuests = lockedSelections.value.get(pkg.uid) || /* @__PURE__ */ new Set();
        return lockedGuests.size < totalGuests;
      });
    });
    const newPackageSelections = computed(() => {
      const selections = [];
      packageGuestSelections.value.forEach((guestSet, uid) => {
        const lockedSet = lockedSelections.value.get(uid) || /* @__PURE__ */ new Set();
        const nonLockedGuests = [...guestSet].filter((i) => !lockedSet.has(i));
        if (nonLockedGuests.length > 0 && bookingData.value?.guest) {
          const pkg = additionalItems.value.find((p) => p.uid === uid);
          if (pkg) {
            const guestList = nonLockedGuests.map((idx) => ({
              name: bookingData.value?.guest?.[idx]?.name || "",
              index: idx
            }));
            selections.push({
              pkg,
              guests: guestList,
              subtotal: pkg.priceValue * nonLockedGuests.length
            });
          }
        }
      });
      return selections;
    });
    const newPackageSelectionsTotal = computed(() => {
      return newPackageSelections.value.reduce((sum, item) => sum + item.subtotal, 0);
    });
    const formattedDepartureDate = computed(() => {
      if (!bookingData.value?.jadwalKeberangkatan) return "";
      try {
        const [start, end] = bookingData.value.jadwalKeberangkatan.split(" - ");
        if (!start || !end) return bookingData.value.jadwalKeberangkatan;
        const startDate = parseDate(start);
        const endDate = parseDate(end);
        if (!startDate || !endDate) return bookingData.value.jadwalKeberangkatan;
        const options = {
          day: "numeric",
          month: "long",
          year: "numeric"
        };
        return `${startDate.toLocaleDateString("id-ID", options)} - ${endDate.toLocaleDateString("id-ID", options)}`;
      } catch {
        return bookingData.value?.jadwalKeberangkatan || "";
      }
    });
    const tripDuration = computed(() => {
      if (!bookingData.value?.jadwalKeberangkatan) return "N/A";
      try {
        const [start, end] = bookingData.value.jadwalKeberangkatan.split(" - ");
        if (!start || !end) return "N/A";
        const startDate = parseDate(start);
        const endDate = parseDate(end);
        if (!startDate || !endDate) return "N/A";
        const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffMs / (1e3 * 60 * 60 * 24));
        return `${diffDays + 1} Hari ${diffDays} Malam`;
      } catch {
        return "N/A";
      }
    });
    const parseDate = (dateStr) => {
      try {
        const parts = dateStr.trim().split("/");
        if (parts.length !== 3) return null;
        const month = parseInt(parts[0] || "0");
        const day = parseInt(parts[1] || "0");
        const year = parseInt(parts[2] || "0");
        if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
      } catch {
        return null;
      }
    };
    const handlePaymentSuccess = (response) => {
      paymentResponse.value = response;
      showSuccessDialog.value = true;
      toast.add({
        title: "Success",
        description: "Pembayaran berhasil diproses",
        color: "success"
      });
    };
    const handlePaymentError = (error) => {
      toast.add({
        title: "Payment Error",
        description: error,
        color: "error"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$a;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$9;
      const _component_UButton = _sfc_main$9$1;
      const _component_UIcon = _sfc_main$f;
      const _component_UDivider = resolveComponent("UDivider");
      const _component_UBadge = _sfc_main$2$1;
      const _component_BookPackageAlreadyAdded = __nuxt_component_5;
      const _component_BookAvailablePackages = __nuxt_component_6;
      const _component_UtilDialog = __nuxt_component_7;
      const _component_PaymentNextSteps = __nuxt_component_8;
      const _component_PaymentLoadingModal = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-50 py-8">`);
      if (unref(computedWidth) > 720) {
        _push(`<div class="container mx-auto px-4 max-w-4xl"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2"> Cek Trip Saya </h1><p class="text-gray-600"> Masukkan kode booking untuk melihat detail perjalanan </p></div>`);
        _push(ssrRenderComponent(_component_UCard, { class: "mb-8" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="max-w-md mx-auto"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Kode Booking",
                name: "bookingCode",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(bookingCode),
                      "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                      placeholder: "No. Pesanan (cth: 000000)",
                      size: "lg",
                      class: "flex-1",
                      onKeyup: searchBooking
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      size: "lg",
                      disabled: !unref(bookingCode).trim(),
                      loading: unref(isSearching),
                      onClick: searchBooking
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Cari `);
                        } else {
                          return [
                            createTextVNode(" Cari ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode(_component_UInput, {
                          modelValue: unref(bookingCode),
                          "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                          placeholder: "No. Pesanan (cth: 000000)",
                          size: "lg",
                          class: "flex-1",
                          onKeyup: withKeys(searchBooking, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          size: "lg",
                          disabled: !unref(bookingCode).trim(),
                          loading: unref(isSearching),
                          onClick: searchBooking
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cari ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "loading"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "max-w-md mx-auto" }, [
                  createVNode(_component_UFormGroup, {
                    label: "Kode Booking",
                    name: "bookingCode",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode(_component_UInput, {
                          modelValue: unref(bookingCode),
                          "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                          placeholder: "No. Pesanan (cth: 000000)",
                          size: "lg",
                          class: "flex-1",
                          onKeyup: withKeys(searchBooking, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          size: "lg",
                          disabled: !unref(bookingCode).trim(),
                          loading: unref(isSearching),
                          onClick: searchBooking
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cari ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "loading"])
                      ])
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(searchAttempted) && !unref(isSearching) && unref(failedSearchCode) && !unref(bookingData)) {
          _push(ssrRenderComponent(_component_UCard, { class: "border-red-200 bg-red-50" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex gap-3 items-start"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-circle",
                  class: "w-6 h-6 text-red-600 shrink-0 mt-0.5"
                }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><h3 class="font-semibold text-red-900"${_scopeId}> Booking Tidak Ditemukan </h3><p class="text-sm text-red-700"${_scopeId}> Kode booking &quot;${ssrInterpolate(unref(failedSearchCode))}&quot; tidak terdaftar dalam sistem. Silakan periksa kembali kode booking Anda. </p></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex gap-3 items-start" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-circle",
                      class: "w-6 h-6 text-red-600 shrink-0 mt-0.5"
                    }),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold text-red-900" }, " Booking Tidak Ditemukan "),
                      createVNode("p", { class: "text-sm text-red-700" }, ' Kode booking "' + toDisplayString(unref(failedSearchCode)) + '" tidak terdaftar dalam sistem. Silakan periksa kembali kode booking Anda. ', 1)
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(bookingData)) {
          _push(`<div class="space-y-6">`);
          _push(ssrRenderComponent(_component_UCard, null, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h2 class="text-xl font-semibold"${_scopeId}> Detail Booking </h2>`);
              } else {
                return [
                  createVNode("h2", { class: "text-xl font-semibold" }, " Detail Booking ")
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="grid grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><h3 class="font-semibold mb-3"${_scopeId}> Informasi Booking </h3><dl class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Kode Booking: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).noPesanan)}</dd></div><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Nama Trip: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).tripName)}</dd></div><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Tanggal Berangkat: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(formattedDepartureDate))}</dd></div><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Durasi: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(tripDuration))}</dd></div></dl></div><div${_scopeId}><h3 class="font-semibold mb-3"${_scopeId}> Informasi Pelanggan </h3><dl class="space-y-2"${_scopeId}>`);
                if (unref(bookingData).guest?.[0]) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Nama: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest[0].gender)} ${ssrInterpolate(unref(bookingData).guest[0].name)}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(bookingData).guest?.[0]?.email) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Email: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest[0].email)}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(bookingData).guest?.[0]?.whatsappNumber) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> WhatsApp: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest[0].whatsappNumber)}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Jumlah Peserta: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest?.length || 0)} orang </dd></div></dl></div></div>`);
                _push2(ssrRenderComponent(_component_UDivider, { class: "my-4" }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><h3 class="font-semibold mb-3"${_scopeId}> Informasi Pembayaran </h3><dl class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Total Pembayaran: </dt><dd class="font-semibold text-lg"${_scopeId}> Rp ${ssrInterpolate(unref(bookingData).fixTotalPrice?.toLocaleString("id-ID") || 0)}</dd></div>`);
                if (unref(bookingData).useDiscount) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Diskon: </dt><dd${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "solid" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Aktif `);
                      } else {
                        return [
                          createTextVNode(" Aktif ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</dl></div>`);
              } else {
                return [
                  createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold mb-3" }, " Informasi Booking "),
                      createVNode("dl", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Kode Booking: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).noPesanan), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Nama Trip: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).tripName), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Tanggal Berangkat: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(formattedDepartureDate)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Durasi: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(tripDuration)), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold mb-3" }, " Informasi Pelanggan "),
                      createVNode("dl", { class: "space-y-2" }, [
                        unref(bookingData).guest?.[0] ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("dt", { class: "text-gray-600" }, " Nama: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest[0].gender) + " " + toDisplayString(unref(bookingData).guest[0].name), 1)
                        ])) : createCommentVNode("", true),
                        unref(bookingData).guest?.[0]?.email ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between"
                        }, [
                          createVNode("dt", { class: "text-gray-600" }, " Email: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest[0].email), 1)
                        ])) : createCommentVNode("", true),
                        unref(bookingData).guest?.[0]?.whatsappNumber ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex justify-between"
                        }, [
                          createVNode("dt", { class: "text-gray-600" }, " WhatsApp: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest[0].whatsappNumber), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Jumlah Peserta: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest?.length || 0) + " orang ", 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode(_component_UDivider, { class: "my-4" }),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-semibold mb-3" }, " Informasi Pembayaran "),
                    createVNode("dl", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("dt", { class: "text-gray-600" }, " Total Pembayaran: "),
                        createVNode("dd", { class: "font-semibold text-lg" }, " Rp " + toDisplayString(unref(bookingData).fixTotalPrice?.toLocaleString("id-ID") || 0), 1)
                      ]),
                      unref(bookingData).useDiscount ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between"
                      }, [
                        createVNode("dt", { class: "text-gray-600" }, " Diskon: "),
                        createVNode("dd", null, [
                          createVNode(_component_UBadge, { variant: "solid" }, {
                            default: withCtx(() => [
                              createTextVNode(" Aktif ")
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          if (unref(bookingData)) {
            _push(ssrRenderComponent(_component_BookPackageAlreadyAdded, {
              "packages-already-added": unref(packagesAlreadyAdded),
              "total-guests": unref(bookingData).guest.length,
              onOpenDetail: openPackageDetail
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(bookingData)) {
            _push(ssrRenderComponent(_component_BookAvailablePackages, {
              "available-packages": unref(availablePackages),
              guests: unref(bookingData).guest,
              "is-guest-selected-for-package": isGuestSelectedForPackage,
              "is-guest-locked-for-package": isGuestLockedForPackage,
              "get-available-guests-for-package": getAvailableGuestsForPackage,
              "get-new-selections-for-package": getNewSelectionsForPackage,
              "get-all-guests-selected": getAllGuestsSelected,
              "get-select-all-button-text": getSelectAllButtonText,
              onToggleGuest: ({ packageUid, guestIndex }) => toggleGuestForPackage(packageUid, guestIndex),
              onToggleAll: toggleAllGuestsForPackage,
              onOpenDetail: openPackageDetail
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(bookingData)) {
            _push(ssrRenderComponent(RingkasanPaketTambahan, {
              "new-package-selections": unref(newPackageSelections),
              "new-package-selections-total": unref(newPackageSelectionsTotal)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(bookingData)) {
            _push(ssrRenderComponent(PaymentMethodSection, {
              "new-package-selections-total": unref(newPackageSelectionsTotal),
              "new-package-selections": unref(newPackageSelections),
              "booking-data": unref(bookingData),
              "package-guest-selections": unref(packageGuestSelections),
              "locked-selections": unref(lockedSelections),
              onPaymentSuccess: handlePaymentSuccess,
              onPaymentError: handlePaymentError
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="px-4"><div class="text-center mb-6"><h1 class="text-2xl font-bold text-gray-900 mb-1"> Cek Trip Saya </h1><p class="text-sm text-gray-600"> Masukkan kode booking Anda </p></div>`);
        _push(ssrRenderComponent(_component_UCard, { class: "mb-6" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Kode Booking",
                name: "bookingCode",
                required: "",
                class: "w-full"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(bookingCode),
                      "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                      placeholder: "No. Pesanan (cth: 000000)",
                      size: "md",
                      class: "mb-3 w-full",
                      onKeyup: searchBooking
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      block: "",
                      disabled: !unref(bookingCode).trim(),
                      loading: unref(isSearching),
                      onClick: searchBooking
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Cari Booking `);
                        } else {
                          return [
                            createTextVNode(" Cari Booking ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(bookingCode),
                        "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                        placeholder: "No. Pesanan (cth: 000000)",
                        size: "md",
                        class: "mb-3 w-full",
                        onKeyup: withKeys(searchBooking, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UButton, {
                        block: "",
                        disabled: !unref(bookingCode).trim(),
                        loading: unref(isSearching),
                        onClick: searchBooking
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cari Booking ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UFormGroup, {
                  label: "Kode Booking",
                  name: "bookingCode",
                  required: "",
                  class: "w-full"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(bookingCode),
                      "onUpdate:modelValue": ($event) => isRef(bookingCode) ? bookingCode.value = $event : null,
                      placeholder: "No. Pesanan (cth: 000000)",
                      size: "md",
                      class: "mb-3 w-full",
                      onKeyup: withKeys(searchBooking, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UButton, {
                      block: "",
                      disabled: !unref(bookingCode).trim(),
                      loading: unref(isSearching),
                      onClick: searchBooking
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cari Booking ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(bookingData)) {
          _push(`<div class="space-y-4">`);
          _push(ssrRenderComponent(_component_UCard, null, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="font-semibold"${_scopeId}> Detail Booking </h3>`);
              } else {
                return [
                  createVNode("h3", { class: "font-semibold" }, " Detail Booking ")
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><h4 class="text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Info Booking </h4><dl class="space-y-1 text-sm"${_scopeId}><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Kode: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).noPesanan)}</dd></div><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Trip: </dt><dd class="font-medium text-xs"${_scopeId}>${ssrInterpolate(unref(bookingData).tripName)}</dd></div><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Berangkat: </dt><dd class="font-medium text-xs"${_scopeId}>${ssrInterpolate(unref(formattedDepartureDate))}</dd></div></dl></div>`);
                _push2(ssrRenderComponent(_component_UDivider, null, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><h4 class="text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Info Pelanggan </h4><dl class="space-y-1 text-sm"${_scopeId}>`);
                if (unref(bookingData).guest?.[0]) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Nama: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest[0].gender)} ${ssrInterpolate(unref(bookingData).guest[0].name)}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Peserta: </dt><dd class="font-medium"${_scopeId}>${ssrInterpolate(unref(bookingData).guest?.length || 0)} orang </dd></div></dl></div>`);
                _push2(ssrRenderComponent(_component_UDivider, null, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><h4 class="text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Pembayaran </h4><dl class="space-y-1 text-sm"${_scopeId}><div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Total: </dt><dd class="font-semibold"${_scopeId}> Rp ${ssrInterpolate(unref(bookingData).fixTotalPrice?.toLocaleString("id-ID") || 0)}</dd></div>`);
                if (unref(bookingData).useDiscount) {
                  _push2(`<div class="flex justify-between"${_scopeId}><dt class="text-gray-600"${_scopeId}> Diskon: </dt><dd${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    size: "xs",
                    variant: "solid"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Aktif `);
                      } else {
                        return [
                          createTextVNode(" Aktif ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</dl></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-sm font-semibold text-gray-700 mb-2" }, " Info Booking "),
                      createVNode("dl", { class: "space-y-1 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Kode: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).noPesanan), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Trip: "),
                          createVNode("dd", { class: "font-medium text-xs" }, toDisplayString(unref(bookingData).tripName), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Berangkat: "),
                          createVNode("dd", { class: "font-medium text-xs" }, toDisplayString(unref(formattedDepartureDate)), 1)
                        ])
                      ])
                    ]),
                    createVNode(_component_UDivider),
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-sm font-semibold text-gray-700 mb-2" }, " Info Pelanggan "),
                      createVNode("dl", { class: "space-y-1 text-sm" }, [
                        unref(bookingData).guest?.[0] ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("dt", { class: "text-gray-600" }, " Nama: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest[0].gender) + " " + toDisplayString(unref(bookingData).guest[0].name), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Peserta: "),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(unref(bookingData).guest?.length || 0) + " orang ", 1)
                        ])
                      ])
                    ]),
                    createVNode(_component_UDivider),
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-sm font-semibold text-gray-700 mb-2" }, " Pembayaran "),
                      createVNode("dl", { class: "space-y-1 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("dt", { class: "text-gray-600" }, " Total: "),
                          createVNode("dd", { class: "font-semibold" }, " Rp " + toDisplayString(unref(bookingData).fixTotalPrice?.toLocaleString("id-ID") || 0), 1)
                        ]),
                        unref(bookingData).useDiscount ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("dt", { class: "text-gray-600" }, " Diskon: "),
                          createVNode("dd", null, [
                            createVNode(_component_UBadge, {
                              size: "xs",
                              variant: "solid"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Aktif ")
                              ]),
                              _: 1
                            })
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UtilDialog, {
        modelValue: unref(showSuccessDialog),
        "onUpdate:modelValue": ($event) => isRef(showSuccessDialog) ? showSuccessDialog.value = $event : null,
        title: "🎉 Booking Berhasil!",
        description: "Pembayaran Anda telah berhasil dibuat. Silakan selesaikan pembayaran sesuai instruksi.",
        size: "lg",
        closable: true,
        "show-footer": true
      }, {
        footer: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: `/`,
              size: "lg",
              class: "px-8",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tutup `);
                } else {
                  return [
                    createTextVNode(" Tutup ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center" }, [
                createVNode(_component_UButton, {
                  to: `/`,
                  size: "lg",
                  class: "px-8",
                  onClick: close
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Tutup ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(paymentResponse)) {
              _push2(`<div class="space-y-6"${_scopeId}><div class="text-center"${_scopeId}><div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><p class="text-gray-600 leading-relaxed"${_scopeId}> Bersiaplah untuk petualangan yang menakjubkan! Detail pembayaran telah dikirim ke email Anda. </p></div>`);
              if (_ctx.showCopyFeedback) {
                _push2(`<div class="${ssrRenderClass([_ctx.showCopyFeedback ? "opacity-100 scale-100" : "opacity-0 scale-95", "bg-green-100 border border-green-200 rounded-lg p-3 text-center transition-all duration-300"])}"${_scopeId}><div class="flex items-center justify-center text-green-700"${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg><span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(_ctx.copyFeedback)}</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="space-y-4"${_scopeId}><div class="bg-green-50 rounded-xl p-4 border border-green-200"${_scopeId}><h4 class="text-sm font-semibold text-green-800 mb-2"${_scopeId}> Invoice Number </h4><p class="text-xl font-mono font-bold text-green-700"${_scopeId}>${ssrInterpolate(unref(paymentResponse).data.invoice)}</p></div><div class="bg-gray-50 rounded-xl p-4"${_scopeId}><h4 class="text-sm font-semibold text-gray-700 mb-3"${_scopeId}> Detail Transfer Bank </h4><div class="space-y-3"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Bank</span><span class="font-semibold"${_scopeId}>${ssrInterpolate(unref(paymentResponse).data.va.bankCode)}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-gray-600"${_scopeId}>Virtual Account</span><div class="flex items-center gap-2"${_scopeId}><span class="font-mono font-semibold"${_scopeId}>${ssrInterpolate(unref(paymentResponse).data.va.va)}</span><button class="text-gray-500 hover:text-primary transition-colors p-1 rounded" title="Copy Virtual Account"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg></button></div></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Nama Penerima</span><span class="font-semibold"${_scopeId}>${ssrInterpolate(unref(paymentResponse).data.va.custName)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Jumlah Transfer</span><span class="font-bold text-lg"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(unref(paymentResponse).data.va.amount))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600"${_scopeId}>Berlaku Hingga</span><span class="font-semibold"${_scopeId}>${ssrInterpolate(new Date(unref(paymentResponse).data.va.expired).toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }))}</span></div></div></div>`);
              _push2(ssrRenderComponent(_component_PaymentNextSteps, null, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(paymentResponse) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-6"
              }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-10 h-10 text-green-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M5 13l4 4L19 7"
                      })
                    ]))
                  ]),
                  createVNode("p", { class: "text-gray-600 leading-relaxed" }, " Bersiaplah untuk petualangan yang menakjubkan! Detail pembayaran telah dikirim ke email Anda. ")
                ]),
                _ctx.showCopyFeedback ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ["bg-green-100 border border-green-200 rounded-lg p-3 text-center transition-all duration-300", _ctx.showCopyFeedback ? "opacity-100 scale-100" : "opacity-0 scale-95"]
                }, [
                  createVNode("div", { class: "flex items-center justify-center text-green-700" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M5 13l4 4L19 7"
                      })
                    ])),
                    createVNode("span", { class: "text-sm font-medium" }, toDisplayString(_ctx.copyFeedback), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", { class: "bg-green-50 rounded-xl p-4 border border-green-200" }, [
                    createVNode("h4", { class: "text-sm font-semibold text-green-800 mb-2" }, " Invoice Number "),
                    createVNode("p", { class: "text-xl font-mono font-bold text-green-700" }, toDisplayString(unref(paymentResponse).data.invoice), 1)
                  ]),
                  createVNode("div", { class: "bg-gray-50 rounded-xl p-4" }, [
                    createVNode("h4", { class: "text-sm font-semibold text-gray-700 mb-3" }, " Detail Transfer Bank "),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Bank"),
                        createVNode("span", { class: "font-semibold" }, toDisplayString(unref(paymentResponse).data.va.bankCode), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("span", { class: "text-gray-600" }, "Virtual Account"),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(unref(paymentResponse).data.va.va), 1),
                          createVNode("button", {
                            class: "text-gray-500 hover:text-primary transition-colors p-1 rounded",
                            title: "Copy Virtual Account",
                            onClick: _ctx.copyVirtualAccount
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Nama Penerima"),
                        createVNode("span", { class: "font-semibold" }, toDisplayString(unref(paymentResponse).data.va.custName), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Jumlah Transfer"),
                        createVNode("span", { class: "font-bold text-lg" }, toDisplayString(unref(formatCurrency)(unref(paymentResponse).data.va.amount)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Berlaku Hingga"),
                        createVNode("span", { class: "font-semibold" }, toDisplayString(new Date(unref(paymentResponse).data.va.expired).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })), 1)
                      ])
                    ])
                  ]),
                  createVNode(_component_PaymentNextSteps)
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PackageDetailModal, {
        modelValue: unref(showDetailModal),
        "onUpdate:modelValue": ($event) => isRef(showDetailModal) ? showDetailModal.value = $event : null,
        "selected-package": unref(selectedPackage),
        "package-details": unref(packageDetails),
        "loading-details": unref(loadingDetails),
        "selected-banner-index": unref(selectedBannerIndex),
        onSelectBanner: selectBanner
      }, null, _parent));
      _push(ssrRenderComponent(_component_PaymentLoadingModal, {
        "is-open": unref(showPaymentLoadingModal),
        "invoice-id": unref(paymentModalInvoiceId),
        "redirect-url": unref(paymentModalRedirectUrl)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/book/detail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=detail-DgEZm1r9.mjs.map
