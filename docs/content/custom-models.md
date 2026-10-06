# Draf konten: Custom AI Models (`/custom-models`)

**Halaman baru** yang belum ada di rencana awal, ditambahkan karena fokus bisnismu ada di
custom model. Kalau tidak setuju dijadikan halaman sendiri, isinya bisa dilipat jadi satu
section di landing. Cara reviu sama: isi di sini perkiraan saya. `[VERIFY]` = perkiraan teknis, `[VERIFY: product]` = klaim
kebijakan atau kemampuan yang harus dicek atasan sebelum dipublikasikan. Untuk keputusan bisnis (kepemilikan,
kebijakan data, jangka waktu) saya sengaja menulis "disepakati per proyek" dan tidak mengarang angka atau komitmen.

Posisi di situs: item menu sendiri **"Custom AI"** di navbar, kartu khusus di `/capabilities`,
opsi topik "Custom model" di form `/contact`, dan blok penutup di setiap halaman capability dan sektor.

---

## Hero
- **Eyebrow:** `> CUSTOM_AI.train()`
- **Judul:** Your use case. Your model.
- **Sub:** The 24 ready-made modules cover the common cases. When yours is different, we build and train a model for exactly what you need to detect, and run it on the same on-premise edge platform.
- **CTA utama:** Tell us what to detect → `/contact?topic=custom`
- **CTA sekunder:** See ready-made modules → `/capabilities`
- **Visual:** panel animasi kamera seperti di hero, dengan **bbox berlabel custom** (mis. `PALLET_DAMAGED`) untuk menunjukkan objek apa pun bisa dideteksi. Diberi label "Illustrative example", bukan demo klien nyata.

## When custom makes sense
Tiga kartu pendek:
1. **It is not in the library.** A specific product defect, an unusual object, a site-specific behavior.
2. **The library model is not enough.** Your uniforms, vehicles, lighting, or camera angles need better accuracy than a general model gives.
3. **It must fit your process.** Your own classes, rules, and outputs, wired to your systems.

## What can be detected (contoh ilustrasi)
*Label di halaman: "Illustrative examples". Bukan klaim proyek nyata.*
- Product or packaging defects on a line
- Specific vehicles, forklifts, or container/fleet IDs
- Custom PPE or uniform compliance
- Behaviors specific to your site (e.g. forklift without spotter, blocked emergency exit)
- Counting items on a conveyor, pallet, or truck bed
- Equipment state (running / stopped / jammed)

## How it works (5 langkah, animasi seperti How it works)
1. **Scope:** define together what to detect, where, and what "success" means.
2. **Collect:** gather sample footage from your cameras, covering different times of day, lighting, and angles `[VERIFY]`.
3. **Label & train:** we label the data and train the model, with the training setup agreed per project `[VERIFY: product]`.
4. **Validate on site:** test on your live cameras and review results together.
5. **Deploy & improve:** the model runs on the edge box, and we retrain as your needs change.

## What we need from you
- A clear description of what to detect, with examples
- Sample footage from the real cameras, in whatever format your VMS or NVR exports `[VERIFY]`
- Camera locations and access to them
- A definition of a "correct" detection, and how you want alerts delivered

## What you get
- A model running on your on-premise edge box, alongside any ready-made modules
- Alerts and dashboard in the same interface as the other modules
- Results reviewed together on your own footage before go-live `[VERIFY: product]`
- Retraining as your environment changes, scoped with you `[VERIFY: product]`

## Data & privacy
- Your footage is used to build your model for your project `[VERIFY: product]`.
- Where training happens and how long footage is kept are agreed per project `[VERIFY: product]`.
- Runs on-premise after deployment, with no cloud dependency, same as the rest of the platform.
- Ownership and licensing of the trained model are agreed when the project is scoped `[VERIFY: product]`.

## Timeline (indikatif)
It depends on what you need to detect, how varied your footage is, and the accuracy the use case needs. We give a realistic estimate after scoping, not before.
Ditulis sebagai rentang dan faktor penentu, bukan janji.

## FAQ
- *Can you use footage we already have?* Often yes, if it covers your real conditions. We check it during scoping `[VERIFY]`.
- *How much footage do you need?* Enough to cover your real conditions: different times of day, lighting, and angles. We tell you what is needed once the use case is scoped `[VERIFY]`.
- *How long does it take?* It depends on the use case, the footage, and the accuracy needed. We give an estimate after scoping.
- *Who owns the model?* Ownership and licensing terms are agreed when the project is scoped `[VERIFY: product]`.
- *What does it cost?* It depends on scope, so we quote per project. → Request a quote.
- *Will it work on our existing cameras?* Usually yes, through ONVIF or RTSP `[VERIFY: product]`.

## CTA penutup
**Have a use case in mind?** Describe it and we will tell you what is possible. → `/contact?topic=custom`

---

## Dampak ke halaman lain (saran)
- **Landing `/`:** tambah blok kecil setelah Capabilities: "Not in the list? We train it for you." menaut ke halaman ini. Ini memperjelas diferensiasi sejak halaman pertama.
- **`/capabilities`:** card ke-25 bergaya khusus "Custom model".
- **Navbar:** Capabilities · Custom AI · Sectors · Security · Company · [Request demo / quote].
- **Form `/contact`:** pilihan topik: Demo · Quote · Custom model · General question.
