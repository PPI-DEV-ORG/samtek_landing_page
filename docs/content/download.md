# Draf konten: Download (`/download`)

Halaman baru untuk unduh software SAMTEK (paket 3-in-1: VMS + API + Edge). Semua teks ada di
`content/download.ts`. `[VERIFY]` = perkiraan teknis, `[VERIFY: product]` = klaim yang harus dicek atasan
sebelum dipublikasikan. Data installer yang belum ada sengaja dibiarkan kosong (`null`), tidak dikarang.

Posisi di situs: item navbar **"./download"** (menggantikan "./security") dan link di sitemap footer.

## Yang harus diisi
- `installer.href`: URL file installer. Sementara masih `#` (tombol tampil tapi belum menuju file).
- `installer.version`, `installer.platform`, `installer.sha256`: tampil "TBD" di panel hero sampai diisi. `installer.size` sudah `~1 GB`, tampil di tombol download. File installer di-host di object storage/CDN (bukan di repo atau `public/`), lalu URL-nya masuk `installer.href`.
- Section **System requirements**: OS yang didukung, CPU/GPU, RAM, disk, per jumlah kamera dan modul aktif.
- Section **Trial terms**: lama trial, batasan kamera/modul, apa yang terjadi setelah trial habis atau cara upgrade ke lisensi penuh.
- Section **Activation on an on-premise server**: cara user menyebutkan device mana yang harus diverifikasi (device ID? `[VERIFY: product]`), dan apakah server masih butuh internet setelah aktif.
- Section **Versions, checksums and release notes**: versi terkini, checksum, catatan rilis.

## Hero
- **Eyebrow:** `> DOWNLOAD.get()`
- **Judul:** One package. VMS, API, Edge.
- **CTA utama:** Download installer (dengan ukuran), lalu sekunder Request trial license → `/contact?topic=trial`. Urutan ini mengikuti alur: install dulu supaya device enroll, baru request trial.
- **Visual:** kartu paket SAMTEK Suite berisi 3 komponen, versi/platform/ukuran, SHA-256 (dengan tombol salin), dan tombol download.

## Three in one
- **VMS:** live view, playback, and camera management from one dashboard. `[VERIFY]`
- **API:** send detections and events to your own systems, with RBAC. `[VERIFY]`
- **Edge:** runs AI inference locally, inside your network, for the modules you activate.

## Trial license
Topic baru **"Request a trial license"** (`trial`) di form `/contact`. Alur: saat pertama dijalankan (butuh internet), software enroll sendiri ke `samtek_license` sebagai device *unverified*. User kirim request trial, tim verifikasi device itu, lalu software aktif otomatis. Tidak ada key yang diketik user.

## From download to detection (5 langkah, animasi seperti How it works)
1. **Download:** single package, all three components. `[VERIFY: product]`
2. **Install:** on a server inside your network; first start enrolls the device as unverified.
3. **Request trial:** send a trial license request, we verify the enrolled device.
4. **Activate:** automatic once verified, no key to enter.
5. **Connect:** existing cameras via ONVIF or RTSP.

## FAQ
6 pertanyaan (termasuk trial dan "Does it need internet?"), semuanya dari klaim yang sudah ada di situs (on-premise, ONVIF/RTSP) ditambah "1 paket 3-in-1".
