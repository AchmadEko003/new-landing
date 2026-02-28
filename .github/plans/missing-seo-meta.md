# Pages Missing `useSeoMeta` Config

Pages that currently have `useSeoMeta` configured:
- `app/pages/index.vue`
- `app/pages/trip/[tripId].vue`
- `app/pages/pengalaman-unik/index.vue`
- `app/pages/pengalaman-unik/[uid].vue`
- `app/pages/tempat-favorite/[uid].vue`

---

## Pages Without `useSeoMeta`

### Info
| File | Route |
|------|-------|
| `app/pages/info/index.vue` | `/info` |
| `app/pages/info/about-us.vue` | `/info/about-us` |
| `app/pages/info/[slug].vue` | `/info/:slug` |

### Trip
| File | Route |
|------|-------|
| `app/pages/trip/index.vue` | `/trip` |

### Destinasi Populer
| File | Route |
|------|-------|
| `app/pages/destinasi-populer/index.vue` | `/destinasi-populer` |
| `app/pages/destinasi-populer/[uid].vue` | `/destinasi-populer/:uid` |

### Pengalaman Unik
| File | Route |
|------|-------|
| *(all covered)* | — |

### Tempat Favorite
| File | Route |
|------|-------|
| `app/pages/tempat-favorite/index.vue` | `/tempat-favorite` |

### Terms & Conditions
| File | Route |
|------|-------|
| `app/pages/terms-and-conditions/index.vue` | `/terms-and-conditions` |
| `app/pages/terms-and-conditions/[slug].vue` | `/terms-and-conditions/:slug` |

### Static Pages
| File | Route |
|------|-------|
| `app/pages/contact-us.vue` | `/contact-us` |
| `app/pages/faq.vue` | `/faq` |

### Booking (CSR-only)
| File | Route |
|------|-------|
| `app/pages/book/[id].vue` | `/book/:id` |
| `app/pages/book/detail.vue` | `/book/detail` |

### Payment (CSR-only)
| File | Route |
|------|-------|
| `app/pages/payment/index.vue` | `/payment` |
| `app/pages/payment/[uid].vue` | `/payment/:uid` |
| `app/pages/payment/credit-card/[orderNum]-[invNum].vue` | `/payment/credit-card/:orderNum-:invNum` |

### Cancel Order (CSR-only)
| File | Route |
|------|-------|
| `app/pages/cancel-order/[uid].vue` | `/cancel-order/:uid` |

---

## Notes

- **Booking, Payment, and Cancel Order** pages are CSR-only (`ssr: false`) — SEO meta is less critical here but can still improve social sharing previews.
- **Info, Destinasi Populer, Tempat Favorite, Terms & Conditions, FAQ, and Contact Us** are higher priority since they are (or should be) indexable pages.
