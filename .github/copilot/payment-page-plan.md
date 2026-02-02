## Goals
Create page `[uid].vue` on /page/payment. This page is for create/make payment using `virtual account` or `credit card` with some details for payment.

## Scope
1. /payment

## Requirement
1. Add the payment details
2. Add an button to choose payment method using `Virtual Account` or `Credit Card`
3. Add success dialog and constantly check payment status every 5 second
4. For consistency please look other page
5. Please make the beautifully and an easy user experience design
6. For hit api please use CSR method not SSR (use server/api from nuxt). Ex.
```
const baseUrl = useRuntimeConfig().public.apiBase

const { data, pending, error, refresh } = await useLazyFetch<T>(`${baseUrl}/{any endpoint}`, {
  method: 'GET'/'POST',
})
```

## Task
1. Get the invoice details from API response, the api spec on API section
2. Make an button split on two inline (use https://ui.nuxt.com/docs/components/radio-group#variant from nuxtUi)
3. For `Virtual Account`, get the bank list from API. You can refer on `/components/book/paymentmethodsection.vue`.
4. For `Credit Card`, make an input like on `/components/book/paymentmethodsection.vue` from line 143
5. Make an dialog to show submit/create payment is success if the payment is VA, when payment is CC still show success and add button to open new tab based on redirectUrl.
6. The dialog constantly hit to check status payment, if success it will show success alert and redirect the page to home (/)

## API Spec
1. GET Details
Base Url: http://103.189.234.243/api-be/Payment/detail/{uid}
Response:
```
{
  "data": {
    "uid": "6c69222b-435d-47f0-9d6d-cdb2ccd65406",
    "noPesanan": "000452",
    "jadwalKeberangkatan": "02/04/2026 - 02/12/2026",
    "tripName": "testing 1",
    "days": 40,
    "jumlahPeserta": 1,
    "invoiceNumber": "000679",
    "netTotalPrice": 17845000,
    "dueDate": "03/14/2026"
  },
  "meta": {
    "status": true,
    "message": "Success",
    "totalItem": 1
  }
}
```
2. POST Submit create VA
Base Url: http://103.189.234.243/api-be/Payment/invoice.va
Request:
```
{
  "uid": "string",
  "bankCode": "string"
}
```
Response:
```
{
  "data": {
    "va": {
      "va": "8930999976878121",
      "bankCode": "BNI",
      "custName": "Invoice leon",
      "amount": 5000000,
      "expired": "2026-02-01T14:26:11.386Z"
    },
    "invoiceNumber": "000649"
  },
  "meta": {
    "status": true,
    "message": "Success",
    "totalItem": 0
  }
}
```
3. POST Submit create CC
Base Url: http://103.189.234.243/api-be/Payment/invoice.cc
Request:
```
{
  "uid": "string",
  "cardHolderName": "string",
  "cardNumber": "string",
  "cardMonth": 0,
  "cardYear": 0,
  "cardCvn": 0
}
```
Response:
```
{
  "data": {
    "redirectUrl": "stg-v2.paper.id/5sVMD0T",
    "invoiceNumber": "000650"
  },
  "meta": {
    "status": true,
    "message": "Success",
    "totalItem": 0
  }
}
```
4. GET Check payment/invoice status
Base Url: http://103.189.234.243/api-be/Payment/check-status/{invoiceNum}
Response:
```
{
  "data": {
    "status": "UNPAID"
  },
  "meta": {
    "status": true,
    "message": "Success",
    "totalItem": 0
  }
}
```
