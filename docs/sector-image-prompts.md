# Prompt gambar untuk halaman Sectors

Empat foto untuk kartu dan hero halaman sektor. Sama seperti gambar hero: gambar
**mentah (raw)**, tanpa teks, tanpa overlay, karena semua UI digambar oleh website.

| # | File | Sektor | Adegan |
|---|------|--------|--------|
| 1 | `retail.jpg` | Retail | Interior supermarket, area rak dan kasir |
| 2 | `manufacturing.jpg` | Manufacturing & Industry | Lini produksi di dalam pabrik yang sama dengan gambar hero |
| 3 | `banking.jpg` | Banking & Finance | Lobi cabang bank, area teller |
| 4 | `smart-city.jpg` | Government & Smart City | Persimpangan kota dari kamera tiang |

Simpan di `public/sectors/`.

## Spesifikasi

- **Rasio 16:10**, ideal **1600 × 1000 px**, JPG atau WebP, di bawah 300 KB.
  (Kartu sektor memakai rasio ini. Halaman detail sektor memakai gambar yang sama sebagai hero.)
- Kalau generator tidak mendukung 16:10, buat di 3:2 atau 16:9 lalu potong. Beri margin di tepi.
- **Gaya foto:** still dari kamera pengawas yang dipasang tinggi, wide-angle, tajam. Ini menyambung
  dengan cerita produk, dan serasi dengan gambar hero.
- **Orang di gambar kecil dan tidak bisa dikenali** (dari jauh atau dari atas). Ini juga menghindari
  masalah privasi. Tidak ada plat nomor yang terbaca, tidak ada merek atau tulisan.

## Blok gaya bersama (tempel di awal setiap prompt)

```text
Photorealistic still frame from a fixed security camera mounted high, wide-angle
lens, slight barrel distortion, faint natural sensor noise, sharp and clean.
Neutral, realistic, slightly desaturated colors, natural lighting.
People in the frame are small, seen from a distance or from above, not
identifiable. No readable brand names, no logos, no signage text, no license
plates readable, no watermark, no timestamp, no overlay, no bounding boxes, no
user interface. Set in Indonesia (tropical, Southeast Asian people and setting).
```

**Negative prompt:**

```text
text, letters, watermark, logo, brand name, signature, timestamp, HUD, user
interface, bounding box, frame, border, cartoon, illustration, 3d render,
painting, close-up face, distorted people, extra fingers, celebrity, weapon,
blood, low resolution, oversaturated, heavy vignette
```

---

## 1. `retail.jpg`

```text
[PASTE BLOK GAYA BERSAMA DI SINI]

Scene: the interior of a modern mid-size supermarket seen from a ceiling-mounted
security camera at the end of a main aisle. Bright even store lighting, clean
white floor, tall shelves stocked with generic unbranded products, a row of
checkout counters in the background with a short queue of shoppers.
A dozen shoppers with baskets and trolleys, small in the frame, walking and
browsing. The scene reads clearly as a busy but orderly store.
Camera: high angle looking slightly down, 16:10 landscape.
```

## 2. `manufacturing.jpg`

Gunakan **blok konsistensi pabrik dari `docs/hero-image-prompts.md`** (bukan blok gaya bersama
di atas), supaya ini pabrik yang sama dengan gambar hero.

```text
[PASTE BLOK KONSISTENSI PABRIK DARI hero-image-prompts.md DI SINI]

Scene: the interior of a production hall at the plant, seen from a high CCTV
camera on a steel column, looking down a packaging/assembly line. A conveyor
line with boxed products, several workers at stations in high-visibility vests
and white hard hats, small in the frame, working. Yellow floor walkway
markings, overhead industrial lighting, a forklift parked at the far end.
Orderly, bright, realistic. Workers not identifiable.
Camera: high angle, 16:10 landscape.
```

> Untuk hero halaman Manufacturing, kamu juga bisa memakai `warehouse.jpg` yang sudah ada.

## 3. `banking.jpg`

```text
[PASTE BLOK GAYA BERSAMA DI SINI]

Scene: the lobby of a modern bank branch in Indonesia seen from a ceiling-mounted
security camera near the entrance, looking across the floor. Clean tiled floor,
glass entrance doors to one side, a row of teller counters with glass dividers,
a small queue of customers waiting, a security guard standing near the door,
two ATM machines along a wall. Warm neutral interior, no readable logos or
signage. People small in the frame, not identifiable.
Camera: high corner angle looking slightly down, 16:10 landscape.
```

## 4. `smart-city.jpg`

```text
[PASTE BLOK GAYA BERSAMA DI SINI]

Scene: a busy urban intersection in an Indonesian city in daylight, seen from a
camera mounted on a tall pole above the junction. Cars, buses, trucks and many
motorcycles moving through, a pedestrian crossing with people waiting and
crossing, traffic lights, a wide sidewalk with a few trees, mid-rise buildings
beyond. Vehicles and people small in the frame, license plates not legible. The
scene conveys city traffic and public space, orderly but busy.
Camera: elevated, angled down onto the junction, 16:10 landscape.
```

---

## Tips

- Cek cepat tiap gambar: tidak ada teks acak, wajah tidak dominan, dan ada ruang di frame
  (kartu sektor menaruh judul di bawah gambar, jadi tidak ada teks di atasnya).
- Untuk konsistensi antar gambar, pakai satu gambar sebagai *style reference*.
- Setelah jadi: simpan di `public/sectors/`, lalu kabari saya. Data sektor tinggal menunjuk file-nya.
