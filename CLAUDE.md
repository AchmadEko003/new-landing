# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server (http://localhost:3000)
bun run build    # Production build
bun run preview  # Preview production build
bun run lint     # Run ESLint
bun run typecheck # TypeScript type checking
```

## Architecture

**Nuxt 4 + Vue 3 travel booking platform** targeting the Indonesian market (IDR currency, Indonesian UI text).

### Key Directories

- `app/pages/` — File-based routing. Booking (`/book/**`) and payment (`/payment/**`) are CSR-only (`ssr: false`). Homepage and trip/destination pages use SWR. About/contact pages are prerendered.
- `app/components/` — Grouped by feature: `book/` (multi-step booking flow), `payment/`, `carousel/`, `card/`, `navigation/`, `image/`, `util/` (Dialog, Drawer, etc.)
- `app/composables/` — Business logic extracted into composition functions (e.g., `useTripDetail.ts` handles parallel data fetching, scroll behavior, and IntersectionObserver for sticky UI)
- `app/stores/` — Pinia stores (currently just `country.ts` for caching country list)
- `shared/interface/` — TypeScript interfaces shared across the app (`ITrip`, `IBooking`, `IPayment`, `IVoucher`, `IResponse<T>`, etc.)
- `shared/script/` — Utility functions: `currency.ts` (IDR formatting), `booking-utils.ts`, `payment-utils.ts`
- `app/providers/peponi.ts` — Custom `@nuxt/image` provider pointing to `http://103.189.234.243/img-asset`

### Data Fetching Pattern

Use `useLazyAsyncData` with `Promise.allSettled()` for parallel API calls:

```ts
const { data } = await useLazyAsyncData('key', async () => {
  const [res1, res2] = await Promise.allSettled([
    $fetch<IResponseList<IFoo>>(`${baseUrl}/Foo`),
    $fetch<IResponseList<IBar>>(`${baseUrl}/Bar`)
  ])
})
```

API base URL comes from `useRuntimeConfig().public.apiBase` (set via `API_BASE_URL` in `.env`).

### Booking Flow

Multi-step process in `app/components/book/`:
1. Package selection → 2. Guest details → 3. Payment method → 4. Payment processing

Payment integrates with **Xendit** (virtual accounts for bank transfer, tokenization for credit card). Interfaces in `shared/interface/IXenditPayment.ts` and `IPayment.ts`.

### Routing Slugs

Dynamic routes use slugs formatted as: `name.trim().replace(/\s+/g, '-').toLowerCase()`

### ESLint Style

- `commaDangle: 'never'`
- `braceStyle: '1tbs'`

### Image Usage

Always use the custom provider:
```vue
<NuxtImg provider="peponi" src="filename.jpg" />
```

### Prompts

`.github/prompts/` contains feature specification prompts. Check this directory for context on in-progress or planned features.
