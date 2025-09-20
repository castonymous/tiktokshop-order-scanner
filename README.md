# 📦 TikTok Order Scanner (Chrome Extension)

Ekstensi Chrome sederhana untuk **ambil & copy data pesanan TikTok Shop** langsung dari halaman **Seller Chat Inbox**
👉 URL target: `https://seller-id.tokopedia.com/chat/inbox/current` *(atau halaman chat TikTok Shop seller yang sesuai)*

---

## ✨ Fitur

* **Scan otomatis** data pesanan dari DOM:

  * Tanggal → `.yORCgx3HUgbxX1Ms0aOW`
  * Username → `.a4C3AoFqPE0aPQ6vnFx0`
  * Order ID → `.VwXwEtYfZtpyUUSmErsw span`
  * Catatan → `.pulse-overflow-text-multiply`
  * Status → `.zlSPumFkvZW6Bo9bdYu9`
* **Panel mengambang** di pojok kanan atas
* **Tombol copy (4 mode)** per pesanan:

  1. `username + 5 char akhir orderId`
  2. `username+last5` + enter kosong + `tanggal` + `orderId` + `username`
  3. `status` + `tanggal` + `orderId` + `username`
  4. `catatan`
* **Username otomatis dibersihkan** (hapus tanda titik `.` bila ada)
* **Status berwarna** untuk memudahkan identifikasi:

  * 🔴 Dibatalkan
  * 🟠 Menunggu diproses
  * 🔵 Sedang dikirim
  * 🟣 Menunggu pickup
  * 🟢 Selesai
* **Auto refresh** saat ada pesanan baru (pakai MutationObserver + interval 2 detik)
* **Collapse / expand** panel dengan tombol ▲/▼
* **Debug mode (?)** → cetak semua data order ke **Console**

---

## 📥 Instalasi

1. Download ZIP dari [Release](./releases) atau build sendiri
2. Ekstrak file ZIP
3. Buka `chrome://extensions/` (atau `edge://extensions/`)
4. Aktifkan **Developer mode**
5. Klik **Load unpacked** → pilih folder hasil ekstrak
6. Buka halaman: [TikTok Seller Chat Inbox](https://seller-id.tokopedia.com/chat/inbox/current)
7. Panel **TikTok Orders** akan muncul di kanan atas

---

## 🖼️ Tampilan

*(screenshot bisa kamu taruh di sini nanti)*
![TikTok Order Scanner Screenshot](docs/screenshot.png)

---

## ⚙️ Struktur Proyek

```
tiktok-order-scanner/
├── manifest.json     # Konfigurasi ekstensi
├── content.js        # Script utama (scan & render UI)
├── content.css       # Style panel
├── icon16.png
├── icon48.png
├── icon128.png
└── README.md
```

---

## 🚀 Pengembangan

* Edit file `content.js` & `content.css` sesuai kebutuhan
* Setelah edit, reload ekstensi di `chrome://extensions/`

---

## 📜 Lisensi

MIT License – bebas dipakai & dimodifikasi.
