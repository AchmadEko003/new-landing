## Goals
I have page that give an info for user about payment, in that page will show `trip name`, `date trip`, `no order`, `invoice number`, `price` and `status` (`PAID`, `UNPAID`, `CANCELLED`, `EXPIRED`). I want you to add more state from my current page state that just handling if the state `UNPAID`, please add other state if the response have that state.

1. For `PAID` status it will show thank you message for the payment in with check icon, you can follow `/app/pages/cancel-order/[uid].vue` on `Success State`.
2. For `CANCELLED` and `EXPIRED` same like `PAID` but with cross icon
3. For `PAID`, `CANCELLED`, `EXPIRED`, it will hide `Pilih Metode Pembayaran`

## Reference Response
```json
{
    "data": {
        "uid": "34418183-ed95-4219-9390-9575b019408d",
        "noPesanan": "000527",
        "jadwalKeberangkatan": "2/1/2026 - 2/9/2026",
        "tripName": "Iceland Arctic Expedition",
        "days": 9,
        "jumlahPeserta": 4,
        "invoiceNumber": "000948",
        "netTotalPrice": 10000000,
        "dueDate": null,
        "status": "CANCELLED"
    },
    "meta": {
        "status": true,
        "message": "Success",
        "totalItem": 1
    }
}
```
