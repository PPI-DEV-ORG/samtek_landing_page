# Draf konten: Sectors (4 sektor)

Cara reviu sama seperti `capabilities.md`: angka dan klaim adalah perkiraan saya. `[VERIFY]` = angka teknis perkiraan,
`[VERIFY: product]` = klaim kemampuan produk yang harus dicek sebelum dipublikasikan.
Angka hasil (mis. "turun 30%") **sengaja tidak ditulis**. Slot hasil diisi nanti dari studi kasus nyata.

## Halaman indeks `/sectors`

- **Eyebrow:** `> SOLUTION_SECTORS.select()`
- **Judul:** Four sectors, one platform.
- **Intro:** The same edge AI platform, assembled differently for each industry. Pick yours to see which modules fit, or tell us about a use case that is not listed.
- **Isi:** 4 card besar (foto, nama, satu kalimat, 4 modul utama) menuju halaman sektor.
- **Matriks sektor × modul:** tabel di bagian bawah halaman ini (● utama, ○ juga relevan).
- **CTA bawah:** "Not your industry? **Tell us what you need to detect.**" menaut ke `/contact` (topik: Custom).

---

## 01 · Retail `retail`

- **One-liner:** Turns store cameras into visitor analytics and loss-prevention tools.
- **Foto:** interior toko atau supermarket dari kamera tinggi (lihat `docs/sector-image-prompts.md`).
- **Tantangan:**
  - Hard to know how many people visit, when, and where they go.
  - Long checkout queues push customers away, and staffing reacts too late.
  - Known repeat offenders are hard to spot at the entrance.
  - Layout and promotion decisions rely on guesses.
- **Modul utama (●):** 08 People Counting · 24 Heatmap & Dwell Time · 14 Queue Length · 01 Face Recognition (Blacklist)
- **Juga relevan (○):** 07 Crowd Counting · 06 Loitering · 05 Intrusion (after hours) · 18 Parking Occupancy · 15 Violence · 12 Abandoned Object
- **"A day in the store"** (alur animasi, 5 tahap):
  1. Opening: cameras count visitors entering, per hour.
  2. Midday: heatmap shows which aisles draw the most dwell time.
  3. Peak hour: queue length crosses the threshold and an alert asks for another checkout.
  4. Entrance: a blacklisted person is flagged to the guard, with a snapshot.
  5. Closing: intrusion rules switch on for after-hours.
- **Cocok dipasang:** reuse the store's existing CCTV · edge box in the back office · footage and counts stay on the store network.
- **Hasil dan bukti:** *(slot kosong, nanti diisi studi kasus)*
- **FAQ:**
  - *Can it work with the cameras we already have?* Yes, through ONVIF or RTSP.
  - *Is customer face data stored?* Only for enrolled lists, on-premise, and how long they are kept is up to you `[VERIFY: product]`.
  - *Can counts feed our BI or POS?* Counts can be exported and sent to other systems through the API `[VERIFY: product]`.

---

## 02 · Manufacturing & Industry `manufacturing`

- **One-liner:** Keeps workplace safety compliance and production-line productivity automated.
- **Foto:** area produksi atau gudang dalam pabrik yang sama dengan gambar hero (lihat `docs/sector-image-prompts.md`).
- **Tantangan:**
  - Manual safety audits (PPE, restricted areas) are periodic and miss violations between checks.
  - Large halls and yards are hard to watch, so fire, falls, and intrusions are found late.
  - Idle stations and line stoppages cost output but are hard to see across the floor.
  - Vehicles and trucks move through gates and yards with limited traceability.
- **Modul utama (●):** 03 PPE Detection · 05 Intrusion Detection · 10 Fire & Smoke Detection · 21 Idle Worker Detection
- **Juga relevan (○):** 11 Fall · 20 Smoking · 12 Abandoned Object · 13 Perimeter Breach · 04 License Plate Recognition · 09 Vehicle Counting · 19 Speed · 23 Anti-Passback · 01 Face Recognition (access)
- **"A day in the plant"** (alur animasi, 5 tahap):
  1. Shift start: workers pass the gate and PPE is checked automatically.
  2. On the floor: a missing helmet raises an alert to the area supervisor.
  3. Midday: idle-station report shows utilization by line.
  4. Yard: a truck is read at the gate, checked against the allow list, and logged.
  5. Night: intrusion and perimeter rules protect the site.
- **Cocok dipasang:** reuse existing CCTV in halls and yards · edge box on the plant network, which can run isolated from the internet `[VERIFY: product]` · alerts to supervisors' dashboards.
- **Hasil dan bukti:** *(slot kosong, nanti diisi studi kasus)*
- **FAQ:**
  - *Does it need internet?* No. Everything runs on-premise, internet is only optional for remote notifications.
  - *Can we use our own PPE rules per zone?* Yes, per zone and shift.
  - *Does it replace our fire alarm?* No. It is an early-warning aid that complements certified fire alarm and suppression systems.

---

## 03 · Banking & Finance `banking`

- **One-liner:** Strengthens branch security and detects threats before they become incidents.
- **Foto:** lobi cabang bank, area teller dan pintu masuk (lihat `docs/sector-image-prompts.md`).
- **Tantangan:**
  - Branches and ATM rooms need continuous, discreet monitoring.
  - Threats (weapons, loitering) must be flagged before they escalate.
  - Access to back-office and vault areas must be strictly one person per authorization.
  - Data sensitivity: customer footage must stay under the bank's own control.
- **Modul utama (●):** 01 Face Recognition (VIP/Blacklist) · 16 Weapon Detection · 23 Anti-Passback / Tailgating · 14 Queue Length
- **Juga relevan (○):** 06 Loitering · 12 Abandoned Object · 05 Intrusion · 13 Perimeter Breach · 08 People Counting · 24 Heatmap · 18 Parking Occupancy
- **"A day at the branch"** (alur animasi, 5 tahap):
  1. Opening: staff enter through the access door, one person per authorization.
  2. Lobby: a VIP client is recognized and the branch manager is notified.
  3. Teller area: queue length rises and an alert opens another counter.
  4. ATM room: a person lingers unusually long and security is alerted.
  5. Entrance: a weapon-like object is flagged with a snapshot for staff verification.
- **Cocok dipasang:** reuse branch CCTV · edge box in the branch or regional server room · all data stays inside the bank's network.
- **Hasil dan bukti:** *(slot kosong, nanti diisi studi kasus)*
- **FAQ:**
  - *Where is data stored?* On-premise, in your own network. Nothing is uploaded to a third party.
  - *Can it integrate with our access control?* Yes, through API or relay events with common access control systems `[VERIFY: product]`.
  - *How is access to footage controlled?* Role-based access control and audit logs.

---

## 04 · Government & Smart City `government-smart-city`

- **One-liner:** Supports large-scale public-space and city traffic surveillance.
- **Foto:** persimpangan kota dari kamera tiang tinggi (lihat `docs/sector-image-prompts.md`).
- **Tantangan:**
  - Thousands of cameras, but operators can only watch a handful at once.
  - Traffic congestion and violations are found through complaints, not data.
  - Crowds at events and public spaces need capacity awareness.
  - Public data and citizen privacy call for strict control of where footage goes.
- **Modul utama (●):** 04 License Plate Recognition · 22 Traffic Congestion Analytics · 07 Crowd Counting & Density · 13 Perimeter Breach Alert
- **Juga relevan (○):** 09 Vehicle Counting · 17 Wrong-Way · 19 Speed · 18 Parking · 15 Violence · 16 Weapon · 12 Abandoned Object · 11 Fall · 06 Loitering · 02 Re-ID
- **"A day in the city"** (alur animasi, 5 tahap):
  1. Morning: congestion index highlights the busiest road segments.
  2. Junction: vehicle counts by class feed the traffic report.
  3. Gate of a government compound: plates are read and matched to registered vehicles.
  4. Event: crowd density approaches capacity and organizers are alerted.
  5. Night: a perimeter breach at a facility is flagged with a snapshot.
- **Cocok dipasang:** reuse existing city or facility CCTV · edge boxes at facilities or district hubs · data stays within the agency's network.
- **Hasil dan bukti:** *(slot kosong, nanti diisi studi kasus)*
- **FAQ:**
  - *Can it scale to hundreds of cameras?* Yes, by adding edge boxes per site or district and managing them centrally `[VERIFY: product]`.
  - *Where does the data go?* Stays on-premise, controlled by the agency.
  - *Can we integrate with our command center?* Through the API and standard video protocols (ONVIF, RTSP) `[VERIFY: product]`.

---

## Matriks sektor × modul

● = modul utama sektor · ○ = juga relevan. (Ini yang akan ditampilkan sebagai tabel di `/sectors`.)

| # | Modul | Retail | Manufacturing | Banking | Gov & Smart City |
|---|---|:-:|:-:|:-:|:-:|
| 01 | Face Recognition | ● | ○ | ● | |
| 02 | Person Re-ID | | | | ○ |
| 03 | PPE Detection | | ● | | |
| 04 | License Plate Recognition | | ○ | | ● |
| 05 | Intrusion Detection | ○ | ● | ○ | |
| 06 | Loitering Detection | ○ | | ○ | ○ |
| 07 | Crowd Counting | ○ | | | ● |
| 08 | People Counting | ● | | ○ | |
| 09 | Vehicle Counting | | ○ | | ○ |
| 10 | Fire & Smoke | | ● | | |
| 11 | Fall Detection | | ○ | | ○ |
| 12 | Abandoned Object | ○ | ○ | ○ | ○ |
| 13 | Perimeter Breach | | ○ | ○ | ● |
| 14 | Queue Length | ● | | ● | |
| 15 | Fight / Violence | ○ | | | ○ |
| 16 | Weapon Detection | | | ● | ○ |
| 17 | Wrong-Way | | | | ○ |
| 18 | Parking Occupancy | ○ | | ○ | ○ |
| 19 | Speed Estimation | | ○ | | ○ |
| 20 | Smoking Detection | | ○ | | |
| 21 | Idle Worker | | ● | | |
| 22 | Traffic Congestion | | | | ● |
| 23 | Anti-Passback / Tailgating | | ○ | ● | |
| 24 | Heatmap & Dwell Time | ● | | ○ | |
