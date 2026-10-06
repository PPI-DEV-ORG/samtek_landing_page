# Prompt gambar untuk panel kamera di Hero

Empat gambar untuk panel "CCTV" di hero. Semuanya harus terlihat seperti
**satu pabrik/area industri yang sama**, dipotret dari kamera CCTV yang berbeda.
Yang dibutuhkan adalah **gambar mentah (raw)**: tanpa teks, tanpa kotak deteksi,
tanpa timestamp. Semua overlay (bbox, label, kartu hasil) digambar oleh website.

| # | File | Kamera di UI | Adegan |
|---|------|--------------|--------|
| 1 | `lobby.jpg` | `CAM_04 · LOBBY_ENTRANCE` | Face recognition di pintu masuk gedung administrasi pabrik |
| 2 | `warehouse.jpg` | `CAM_11 · WAREHOUSE_A` | PPE: pekerja tanpa helm di area kerja |
| 3 | `gate.jpg` | `CAM_07 · GATE_02` | LPR: mobil masuk gerbang area parkir |
| 4 | `perimeter.jpg` | `CAM_02 · PERIMETER_NORTH` | Intrusion: orang di dekat pagar perimeter, dini hari |

---

## Spesifikasi teknis

- **Rasio 16:10**, ideal **1600 × 1000 px** (minimal 1200 × 750). Hero menampilkan
  gambar sekitar 540 px lebar, jadi ukuran ini sudah cukup tajam untuk layar retina.
- Format JPG atau WebP, usahakan di bawah 300 KB per file (kompres di Squoosh atau tinypng).
- Kalau generator tidak mendukung 16:10, buat di **3:2 atau 16:9** lalu potong ke 16:10.
  Beri margin: subjek utama jangan menempel ke tepi, karena bagian tepi bisa terpotong.
- **Sisi kosong itu penting.** Kartu hasil deteksi melayang di samping objek. Posisi
  objek per adegan di bawah sengaja dibuat di satu sisi supaya sisi lainnya
  bersih dan kartu tidak menutupi hal penting.

---

## Aturan konsistensi (satu dunia, empat sudut kamera)

Pakai blok ini di **awal setiap prompt** supaya keempat gambar terlihat satu lokasi.

```text
Photorealistic still frame from a fixed CCTV camera at a large modern
manufacturing plant in Indonesia. The facility has light-grey corrugated metal
buildings with safety-yellow and dark-blue accent stripes, clean concrete
yards, yellow painted floor markings, steel structures, and tropical trees
behind the perimeter fence. Neutral, realistic, slightly desaturated colors.
Wide-angle lens, mounted about 3 metres high, very slight barrel distortion,
faint natural sensor noise, sharp enough to clearly read faces and license
plates. No text, no logos, no signage, no watermark, no timestamp, no overlay,
no bounding boxes, no user interface.
```

**Negative prompt** (isi di kolom negative kalau generatornya punya):

```text
text, letters, watermark, logo, signature, timestamp, HUD, user interface,
bounding box, frame, border, cartoon, illustration, 3d render, painting,
distorted face, extra fingers, deformed hands, blurry face, celebrity,
weapon, blood, low resolution, oversaturated, heavy vignette
```

> Catatan: tulisan yang tidak diminta (papan, seragam bertuliskan sesuatu) sering
> muncul dan terlihat aneh. Kalau ada, buang lewat inpainting atau pilih varian lain.

---

## Adegan 1: `lobby.jpg` (Face recognition)

Orang di sepertiga **kiri** frame, kartu hasil muncul di kanan. Wajah harus besar dan
jelas menghadap kamera.

```text
[PASTE BLOK KONSISTENSI DI SINI]

Scene: the entrance lobby of the plant's administration building, seen from a
CCTV camera mounted above the glass entrance doors, looking into the lobby
toward a security turnstile and reception desk. Bright neutral indoor lighting
mixed with soft daylight from the glass doors.

Subject: one Indonesian man in his early thirties, short black hair, clean
shaven, wearing a plain dark-blue work polo shirt, an employee lanyard with a
blank card, walking toward the turnstile. He is positioned in the LEFT third of
the frame, waist-up to knees visible, face large, sharp, well lit and looking
almost directly at the camera. The right half of the frame is a calm, mostly
empty lobby with the turnstile and reception desk, kept uncluttered.

Camera: eye-level-to-slightly-high CCTV angle, 16:10 landscape, shallow depth
of field kept minimal so the whole scene stays crisp.
```

## Adegan 2: `warehouse.jpg` (PPE)

Pekerja tanpa helm di sepertiga **kanan**, kartu hasil muncul di kiri.

```text
[PASTE BLOK KONSISTENSI DI SINI]

Scene: the interior of a production and warehouse hall at the plant, seen from
a high CCTV camera mounted on a steel column. High ceiling with industrial
lighting, tall storage racks, yellow floor walkway markings, pallets and a
parked forklift in the background. Bright, even, realistic indoor lighting.

Subject: one Indonesian male factory worker in his late twenties standing in
the RIGHT third of the frame, waist-up to full body visible, wearing a
high-visibility yellow-orange safety vest over a dark work shirt and work
trousers, and NO hard hat (bare head, clearly visible), looking slightly toward
the camera. In the background, two or three other workers, small and slightly
out of focus, all wearing white hard hats, so the missing helmet stands out. The
left half of the frame is the open walkway and racks, kept uncluttered.

Camera: high angle looking slightly down, 16:10 landscape, everything sharp.
```

## Adegan 3: `gate.jpg` (LPR)

Mobil di **kiri-tengah**, plat nomor terbaca jelas. Kartu hasil muncul di kanan.

```text
[PASTE BLOK KONSISTENSI DI SINI]

Scene: the vehicle entrance gate of the plant's parking area in daylight, seen
from an LPR-style CCTV camera mounted on a pole beside the lane, aimed at the
approaching car. A red-and-white boom barrier is closed in front of the car, a
small guard booth stands to the right, and the plant's grey-and-yellow
buildings and a few parked trucks are visible behind.

Subject: one clean white sedan (Toyota Vios style, no brand emblems readable)
approaching the barrier, positioned in the LEFT half of the frame, seen from a
slight front three-quarter angle, headlights on. The front license plate is
large, horizontal, well lit and fully legible: an Indonesian plate, black plate
with white characters, reading "B 1234 XYZ". The right side of the frame shows
the guard booth and empty lane, kept uncluttered.

Camera: low-to-medium height, close enough that the plate is clearly readable,
16:10 landscape, sharp.
```

> Generator sering salah membuat huruf di plat. Kalau tidak akurat, perbaiki lewat
> inpainting atau edit manual. Plat ini fiktif dan tidak harus persis, yang penting
> terlihat masuk akal dan terbaca. Pastikan bukan plat mobil orang sungguhan.

## Adegan 4: `perimeter.jpg` (Intrusion)

Orang di sepertiga **kanan**, kartu hasil muncul di kiri. Data di UI menyebut jam
`02:14`, jadi adegannya malam hari. Ini juga sesuai pesan "24/7".

```text
[PASTE BLOK KONSISTENSI DI SINI]

Scene: the northern perimeter of the plant at night, around 2 a.m., seen from a
CCTV camera on a tall pole, looking along a chain-link security fence topped
with barbed wire. Bright white LED floodlights on poles light the strip beside
the fence, leaving deep shadows further away. A large grey warehouse with
yellow-and-blue stripes is visible in the background, and a wide paved
patrol/service strip runs along the fence. Dry ground, a few tropical trees
beyond the fence. Color night image, cool white floodlight, gentle noise.

Subject: one person in dark clothing (dark hoodie, dark trousers, cap), seen
from slightly above and the side, walking on the strip near the fence in the
RIGHT third of the frame, clearly visible under the floodlight but not
identifiable. The left half of the frame is the empty fence line and the
warehouse, kept uncluttered.

Camera: elevated, angled slightly down, 16:10 landscape.
```

Mau tampilan CCTV inframerah (hitam-putih)? Ganti kalimat terakhir bagian *Scene*
menjadi "black-and-white infrared night vision image". Hasilnya autentik, tapi berbeda
gaya dari tiga gambar lain.

---

## Alur kerja supaya konsisten

1. Buat dulu **satu gambar acuan** (establishing shot pabrik) dari blok konsistensi
   saja. Pakai sebagai *style/image reference* untuk empat adegan berikutnya
   (Midjourney: `--sref`; alat lain: image reference atau img2img).
2. Kunci pengaturan yang sama: model, seed (kalau ada), aspek rasio, dan blok konsistensi.
3. Buat 4-8 varian per adegan, pilih yang paling dekat dengan komposisi (posisi
   subjek, sisi kosong, wajah/plat terbaca).
4. Cek: tidak ada teks acak, tangan dan wajah normal, ada sisi kosong untuk kartu.
5. Potong ke 16:10, kompres, simpan dengan nama di tabel paling atas.

**Soal wajah dan privasi:** wajah hasil generator adalah wajah sintetis, tapi tetap
hindari menyebut nama orang, selebriti, atau meminta mirip seseorang. Semua nama,
ID, dan plat di kartu hasil deteksi juga fiktif.

---

## Setelah gambar jadi

1. Simpan ke `public/hero/` (`lobby.jpg`, `warehouse.jpg`, `gate.jpg`, `perimeter.jpg`).
2. Di `lib/hero-scenarios.ts`, buka komentar baris `// image: "/hero/....jpg",`
   di masing-masing skenario.
3. Jalankan `npm run dev`, buka **`/tools/bbox`**, pilih gambar, lalu drag kotak di
   atas subjeknya (wajah untuk face, badan atas atau kepala untuk PPE, mobil atau
   plat untuk LPR, seluruh badan untuk intrusion).
4. Salin baris `bbox: { ... },` ke deteksi yang sesuai. Kalau perlu, atur `side`
   (`"left"` atau `"right"`) untuk memaksa sisi kartu hasil.
5. Sesuaikan `fields` (ID, nama, dan seterusnya) kalau mau.
