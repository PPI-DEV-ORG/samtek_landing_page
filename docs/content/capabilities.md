# Draf konten: Capabilities (24 modul)

**Cara reviu:** edit langsung di file ini. Semua angka dan klaim di sini adalah
**perkiraan saya berdasarkan praktik umum computer vision di lapangan**, bukan spesifikasi
resmi SAMTEK. Ada dua tanda untuk atasan/tim teknis:
- `[VERIFY]` = angka teknis perkiraan (piksel, sudut, jarak, resolusi). Wajar sebagai panduan
  umum, tapi cocokkan dengan kemampuan sistem yang sebenarnya.
- `[VERIFY: product]` = klaim tentang **kemampuan atau integrasi produk** (API, notifikasi,
  kelas objek, format plat, dan sebagainya). **Ini yang paling penting dicek**, karena tidak
  boleh dipublikasikan kalau produk belum mendukungnya.

Semua teks berbahasa Inggris karena situs versi English dulu.

**Legenda**
- **Featured** = halaman penuh (foto + panel animasi + FAQ + blok privasi). 4 modul: Face, PPE, LPR, Intrusion.
- **Standard** = halaman ringan (tanpa foto sendiri, tanpa FAQ, jumlah skenario lebih sedikit).
- **Privacy note: yes** = halaman menampilkan blok "Privacy & compliance" (data personal/biometrik/monitoring pekerja).
- **Custom** = satu contoh konkret "kalau butuh versi berbeda, kami bisa melatih model khusus". Ini penghubung ke halaman Custom AI.

**Blok yang sama di semua halaman** (ditulis sekali di template):
- Footer CTA: "Need this running on your cameras? **Request a demo or quote.**"
- Blok Custom: "Need it different? We train custom models for your exact use case." menaut ke `/custom-models`.

## Kategori

| Kategori | Deskripsi singkat | Modul |
|---|---|---|
| **Identity & Access** | Know who or what is entering, and let the right ones through. | 01, 02, 04, 23 |
| **Safety & Compliance** | Keep people safe and rules followed, automatically. | 03, 10, 11, 20, 21 |
| **Security & Threat** | Spot intrusions and threats before they become incidents. | 05, 06, 12, 13, 15, 16 |
| **Traffic & Parking** | Understand and control vehicle flow. | 09, 17, 18, 19, 22 |
| **Crowd & Retail Analytics** | Turn foot traffic into decisions. | 07, 08, 14, 24 |

---

## Identity & Access

### 01 · Face Recognition `face-recognition`
- **Tier:** Featured · **Privacy note:** yes
- **One-liner:** Real-time face matching against watchlists, blacklists, and VIP lists.
- **Problem:** Manual checks at entrances depend on a guard's memory and attention. They do not scale to hundreds of people a day, and people of interest slip through.
- **How it works:**
  1. **Detect** faces in the live camera stream.
  2. **Match** each face against enrolled lists on the edge box. Face images never leave your network.
  3. **Act:** log the visit, raise an alert, or signal your access control.
- **Outputs:** Person ID, Name, Gender, Age range, List (Employee / VIP / Blacklist), Confidence, Camera, Timestamp, Face snapshot.
  **Actions:** dashboard alert · notification to staff by email or messaging `[VERIFY: product]` · API/webhook to access control `[VERIFY: product]`.
- **Scenarios:** VIP or returning-customer recognition at reception · Blacklist alert at a store or branch entrance · Contactless staff access and attendance.
- **Sectors:** Retail, Banking & Finance, Manufacturing, Government.
- **Camera requirements:** face at least ~80 px wide (120 px or more recommended) `[VERIFY]` · mostly frontal, within ~30° of straight-on `[VERIFY]` · even lighting, avoid strong backlight.
- **Related:** 02 Person Re-ID · 23 Anti-Passback · 08 People Counting.
- **Custom:** Enroll your own lists and sync them with your HR, visitor, or membership system.
- **FAQ:**
  - *Are faces stored in the cloud?* No. Matching and storage run on-premise, inside your network.
  - *How are watchlists managed?* From the dashboard, one by one or by bulk import, and through the API `[VERIFY: product]`.
  - *Does it work with masks, glasses, or caps?* Glasses and caps are usually fine. Masks and heavy occlusion reduce accuracy, so the face should be at least partly visible `[VERIFY]`.

### 02 · Person Re-Identification `person-reid`
- **Tier:** Standard · **Privacy note:** yes
- **One-liner:** Tracks individuals across cameras without relying on facial biometrics.
- **Problem:** Faces are not always visible: angled cameras, helmets, masks. Following one person across a site by scrubbing footage takes hours.
- **How it works:**
  1. **Detect** each person and build an appearance signature (clothing, build, colors).
  2. **Match** signatures across cameras on the edge box.
  3. **Trace** the route as a timeline of cameras and zones.
- **Outputs:** Track ID, cameras visited, first/last seen, time per zone, path timeline.
- **Scenarios:** Follow a subject of an incident across the site · Visitor flow analysis · Find coverage gaps between cameras.
- **Sectors:** Manufacturing, Retail, Government.
- **Camera requirements:** full-body view · adjacent or overlapping coverage, ideally within ~10–20 m of each other `[VERIFY]`.
- **Related:** 01 Face Recognition · 06 Loitering · 24 Heatmap.
- **Custom:** Tune the signature for uniforms, so people in identical work clothes can still be told apart.

### 04 · License Plate Recognition `license-plate-recognition`
- **Tier:** Featured · **Privacy note:** yes
- **One-liner:** Reads vehicle plates for access control and enforcement.
- **Problem:** Manual gate logs are slow and error-prone, and unauthorized vehicles are easy to miss during busy shifts.
- **How it works:**
  1. **Detect** the vehicle and its plate as it approaches the gate.
  2. **Read** the plate on the edge box.
  3. **Decide** against allow/deny lists: open the gate, log it, or alert.
- **Outputs:** Plate number, Vehicle type, Color, Direction (in/out), Confidence, Camera, Timestamp, Snapshot. **Decision:** registered / unregistered / blacklisted.
  **Actions:** barrier/gate signal via relay or API `[VERIFY: product]` · alert · entry–exit log with duration.
- **Scenarios:** Parking entry and exit · Gate access for registered vehicles · Blacklisted or flagged vehicle alert · Time-in-facility reporting.
- **Sectors:** Government & Smart City, Manufacturing, Banking, Retail.
- **Camera requirements:** plate at least ~130 px wide `[VERIFY]` · camera within ~30° (horizontal) of the lane axis `[VERIFY]` · vehicle speed at the gate up to ~30 km/h, slower is better `[VERIFY]` · IR or lighting for night.
- **Supported plates:** Indonesian plate formats (e.g. `B 1234 XYZ`). Other countries' formats through a custom model `[VERIFY: product]`.
- **Related:** 09 Vehicle Counting · 18 Parking Occupancy · 19 Speed · 17 Wrong-Way.
- **Custom:** Read vehicle IDs other than plates: container numbers, fleet codes, or company stickers.
- **FAQ:**
  - *Does it work at night?* Yes, with an IR illuminator or adequate lighting on the lane `[VERIFY]`.
  - *Can it open the barrier automatically?* Yes, through a relay or API connection to your barrier controller `[VERIFY: product]`.
  - *Are plates and logs kept on-premise?* Yes, all processing and storage stay inside your network.

### 23 · Anti-Passback / Tailgating `tailgating`
- **Tier:** Standard · **Privacy note:** yes
- **One-liner:** Detects more than one person passing an access point on a single authorization.
- **Problem:** Card readers only know that a card was tapped, not how many people walked through.
- **How it works:**
  1. **Watch** the door or turnstile zone.
  2. **Count** the people passing during each authorization.
  3. **Alert** when the number of people exceeds the number of authorizations.
- **Outputs:** Door ID, persons counted vs. authorizations, Snapshot, Timestamp. Works with your access control through API or relay events, or standalone with camera-side counting `[VERIFY: product]`.
- **Scenarios:** Server room or restricted-floor doors · Bank back-office entrances · Turnstile lanes at a plant.
- **Sectors:** Banking & Finance, Manufacturing.
- **Camera requirements:** overhead or high-angle view (mounted about 2.5–4 m high) with the whole doorway in view `[VERIFY]`.
- **Related:** 01 Face Recognition · 05 Intrusion · 08 People Counting.
- **Custom:** Detect "piggybacking" with carts, or tailgating by vehicles at a gate.

---

## Safety & Compliance

### 03 · PPE Detection `ppe-detection`
- **Tier:** Featured · **Privacy note:** no
- **One-liner:** Checks for helmets, vests, masks, and gloves in work areas.
- **Problem:** Manual safety checks are periodic and inconsistent. Violations often go unnoticed until an incident happens.
- **How it works:**
  1. **Detect** each worker in the frame.
  2. **Check** the required PPE per zone and shift.
  3. **Alert** the supervisor with a snapshot when something is missing.
- **Outputs:** Worker/Track ID, Zone, Missing items, Confidence, Snapshot, Camera, Timestamp. **Rules:** required items per zone and shift.
  **Actions:** real-time alert · compliance log and per-shift report · relay or API output to a stack light or horn `[VERIFY: product]`.
- **Scenarios:** Entry gate check before entering the floor · Continuous compliance in work areas · Shift and area compliance reports.
- **Sectors:** Manufacturing & Industry.
- **Camera requirements:** person at least ~120 px tall `[VERIFY]` · unobstructed view · adequate lighting.
- **Related:** 05 Intrusion · 10 Fire & Smoke · 11 Fall · 20 Smoking.
- **Custom:** Other gear: goggles, coveralls, harnesses, hearing protection, specific uniform colors.
- **FAQ:**
  - *Which items can it detect?* Helmets, vests, masks, and gloves out of the box. Other items need a custom model.
  - *Can it tell which worker is in violation?* By default alerts are tied to a zone and a snapshot. Linking to a named worker needs the optional face module `[VERIFY: product]`.
  - *What happens to the footage?* Processed and stored on-premise.

### 10 · Fire & Smoke Detection `fire-smoke-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Early detection of fire and smoke from the visual feed, no added sensors.
- **Problem:** Point smoke detectors need smoke to reach them. In large halls and outdoor yards, detection can be late.
- **How it works:**
  1. **Analyze** frames for flame and smoke patterns.
  2. **Confirm** over several frames to cut false alarms.
  3. **Alert** with a snapshot and location.
- **Outputs:** Type (fire / smoke), Zone, Confidence, Snapshot or short clip, Camera, Timestamp.
- **Important:** an early-warning aid. It complements, and does not replace, certified fire alarm and suppression systems.
- **Scenarios:** Warehouses and storage halls · Outdoor storage yards · Production halls with high ceilings.
- **Sectors:** Manufacturing, Government.
- **Camera requirements:** clear, unobstructed view · 1080p recommended · effective distance depends on fire size and lens `[VERIFY]`.
- **Related:** 03 PPE · 05 Intrusion · 11 Fall.
- **Custom:** Detect specific hazards such as oil sparks, steam vs. smoke discrimination, or arcing.

### 11 · Fall Detection `fall-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Detects fall incidents in work areas or public facilities.
- **Problem:** A person who falls while alone may not be found for a long time.
- **How it works:**
  1. **Track** body posture.
  2. **Detect** a sudden fall followed by staying on the floor.
  3. **Alert** responders with location and a snapshot.
- **Outputs:** Zone, Event time, Time on floor, Snapshot or clip, Camera.
- **Scenarios:** Factory floors and loading docks · Stairs and corridors · Public facilities and waiting areas.
- **Sectors:** Manufacturing, Government, Retail.
- **Camera requirements:** full-body view, side or high angle, person at least ~120 px tall and not heavily occluded `[VERIFY]`.
- **Related:** 03 PPE · 21 Idle Worker.
- **Custom:** Detect "worker down" for lone-worker safety, or falls from height.

### 20 · Smoking Detection `smoking-detection`
- **Tier:** Standard · **Privacy note:** yes (staff monitoring)
- **One-liner:** Detects smoking activity in designated smoke-free areas.
- **Problem:** In fuel, chemical, or storage areas one cigarette is a serious hazard, and signs alone are not enough.
- **How it works:**
  1. **Watch** the smoke-free zone.
  2. **Detect** smoking behavior and visible smoke.
  3. **Alert** with a snapshot.
- **Outputs:** Zone, Time, Confidence, Snapshot or clip.
- **Scenarios:** Fuel and chemical storage · Warehouses · Public facilities.
- **Sectors:** Manufacturing, Government, Retail.
- **Camera requirements:** 1080p or higher, subject within about 5–8 m, since a cigarette is small `[VERIFY]`.
- **Related:** 10 Fire & Smoke · 03 PPE.
- **Custom:** Vaping detection, or restricting phone use in hazardous zones.

### 21 · Idle Worker Detection `idle-worker-detection`
- **Tier:** Standard · **Privacy note:** yes (staff monitoring)
- **One-liner:** Identifies inactive workers during operating hours on the production line.
- **Problem:** Line stoppages and unattended stations reduce output, but they are hard to spot across a whole floor.
- **How it works:**
  1. **Define** workstation zones and shifts.
  2. **Measure** presence and activity per station.
  3. **Report** idle time and utilization.
- **Outputs:** Station, Idle duration, Utilization %, Shift report. Reports are aggregated per station and shift by default, not per named individual `[VERIFY: product]`.
- **Privacy & compliance (recommended text):** use for process improvement, not individual surveillance. Clear notice to staff and internal policy are needed.
- **Scenarios:** Line balancing · Unattended-station alerts · Shift productivity reports.
- **Sectors:** Manufacturing.
- **Camera requirements:** clear, fixed view of each workstation · 1080p recommended `[VERIFY]`.
- **Related:** 03 PPE · 08 People Counting.
- **Custom:** Machine-state detection (running / stopped / jammed) alongside operator presence.

---

## Security & Threat

### 05 · Intrusion Detection `intrusion-detection`
- **Tier:** Featured · **Privacy note:** no
- **One-liner:** Automatic alerts when restricted areas are entered outside operating hours.
- **Problem:** Perimeters and restricted zones cannot be watched by guards around the clock, so intrusions are usually found after the fact.
- **How it works:**
  1. **Define** restricted zones and their schedules.
  2. **Detect** people or vehicles entering them.
  3. **Alert** in real time with a snapshot or clip.
- **Outputs:** Zone, Object class (person / vehicle), Time, Time inside, Confidence, Snapshot or clip, Camera.
  **Actions:** alert · siren or light via relay or API `[VERIFY: product]` · incident log.
- **Scenarios:** Warehouses after hours · Fenced yards · Utility rooms and rooftops.
- **Sectors:** Manufacturing, Banking, Government, Retail.
- **Camera requirements:** clear coverage of the zone · night visibility with IR cameras or lighting `[VERIFY]`.
- **Related:** 13 Perimeter Breach · 06 Loitering · 12 Abandoned Object.
- **Custom:** Recognize specific intruder types (animals vs. people), or apply per-role rules (authorized staff allowed).
- **FAQ:**
  - *Does it work at night?* Yes, with IR cameras or adequate lighting. Range and accuracy depend on illumination and distance `[VERIFY]`.
  - *Can it tell an animal from a person?* Yes, it classifies objects. Typical classes are person, vehicle, and animal `[VERIFY: product]`.
  - *How are false alarms reduced?* Multi-frame confirmation, minimum object size, and zone and schedule rules `[VERIFY]`.

### 06 · Loitering Detection `loitering-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Flags individuals remaining in one area beyond a reasonable duration.
- **Problem:** Suspicious lingering near entrances, ATMs, or loading areas is easy to miss among normal traffic.
- **How it works:**
  1. **Track** people inside a defined zone.
  2. **Measure** how long each stays.
  3. **Alert** once the threshold is exceeded.
- **Outputs:** Zone, Dwell time, Threshold, Snapshot, Camera, Timestamp.
- **Scenarios:** ATM and branch lobbies · Loading docks · Public plazas.
- **Sectors:** Banking, Retail, Government.
- **Camera requirements:** clear, fixed view of the zone · 1080p recommended `[VERIFY]`.
- **Related:** 05 Intrusion · 02 Person Re-ID · 07 Crowd Counting.
- **Custom:** Different dwell rules per time of day or per zone type.

### 12 · Abandoned Object Detection `abandoned-object-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Alerts when an object is left unattended in a sensitive area.
- **Problem:** Unattended bags or boxes in public and sensitive areas can be a security risk, and are hard to notice in a crowd.
- **How it works:**
  1. **Detect** new static objects appearing in the zone.
  2. **Check** whether the owner has left and for how long.
  3. **Alert** once the time threshold passes.
- **Outputs:** Object class/size, Zone, Time left, Snapshot, Camera.
- **Scenarios:** Lobbies and ATM areas · Stations and plazas · Loading docks.
- **Sectors:** Banking, Government, Retail.
- **Camera requirements:** object at least ~40 px on its shortest side `[VERIFY]`.
- **Related:** 06 Loitering · 05 Intrusion · 16 Weapon.
- **Custom:** Detect removed objects (theft of a fixed item), not just left ones.

### 13 · Perimeter Breach Alert `perimeter-breach-alert`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Detects breaches of fence lines or virtual security boundaries.
- **Problem:** Long fence lines are expensive to patrol and hard to secure with sensors alone.
- **How it works:**
  1. **Draw** virtual lines and fence zones.
  2. **Detect** crossing, climbing, or lingering near the line.
  3. **Alert** with direction and a snapshot.
- **Outputs:** Line ID, Direction crossed, Object class, Snapshot, Camera, Timestamp.
- **Scenarios:** Plant and yard fences · Utility sites · Restricted compounds.
- **Sectors:** Manufacturing, Government, Banking.
- **Camera requirements:** view along the fence, typically 30–50 m of fence per camera depending on the lens, with night visibility `[VERIFY]`.
- **Related:** 05 Intrusion · 06 Loitering.
- **Custom:** Detect specific behaviors such as fence climbing or cutting.

### 15 · Fight / Violence Detection `fight-violence-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Identifies patterns of violent behavior or fighting.
- **Problem:** Altercations escalate quickly and are noticed late when few staff watch many screens.
- **How it works:**
  1. **Analyze** motion and posture over a short window.
  2. **Classify** fight-like behavior.
  3. **Alert** with a short clip for human review.
- **Outputs:** Event type, Zone, Duration, Confidence, Clip.
- **Note:** raises alerts for a person to verify. Sensitivity is tuned per site to keep false alarms manageable `[VERIFY]`.
- **Scenarios:** Public plazas · Store floors · Plant gates and canteens.
- **Sectors:** Government, Retail, Manufacturing.
- **Camera requirements:** elevated view with people at least ~100 px tall, 15 fps or more `[VERIFY]`.
- **Related:** 16 Weapon · 06 Loitering · 07 Crowd Counting.
- **Custom:** Tune to your environment's normal activity (e.g. sports areas), to reduce false positives.

### 16 · Weapon Detection `weapon-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Visual detection of weapon-like objects in public areas.
- **Problem:** A weapon at an entrance is often noticed too late, once the situation has already escalated.
- **How it works:**
  1. **Detect** objects that resemble weapons (handguns, long guns, and knives) `[VERIFY: product]`.
  2. **Verify** across frames.
  3. **Send** a high-priority alert with a snapshot for operator verification.
- **Important:** assists security staff and requires human verification. It does not replace screening.
- **Outputs:** Object class, Zone, Confidence, Snapshot, Camera, Timestamp.
- **Scenarios:** Bank branch entrances · Public buildings · Retail entrances.
- **Sectors:** Banking, Government, Retail.
- **Camera requirements:** 1080p or higher, subject within about 5–8 m, and the weapon visible (it cannot see concealed items) `[VERIFY]`.
- **Related:** 15 Violence · 12 Abandoned Object · 01 Face Recognition.
- **Custom:** Detect items relevant to your site, such as tools or prohibited items.

---

## Traffic & Parking

### 09 · Vehicle Counting & Classification `vehicle-counting`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Classifies and counts vehicles by type.
- **Problem:** Traffic and yard logistics data is collected by hand, or not at all.
- **How it works:**
  1. **Detect** vehicles in the lane.
  2. **Classify** them (motorbike, car, bus, truck `[VERIFY: product]`).
  3. **Count** by lane, direction, and interval.
- **Outputs:** Counts by class, lane, direction, interval; exportable.
- **Scenarios:** Gate and yard traffic · Road-segment surveys · Truck movement at a plant.
- **Sectors:** Government, Manufacturing.
- **Camera requirements:** elevated view (about 4–8 m high) along the lane `[VERIFY]`.
- **Related:** 04 LPR · 22 Traffic Congestion · 18 Parking · 17 Wrong-Way.
- **Custom:** Add your own vehicle types (forklifts, specific truck models).

### 17 · Wrong-Way Detection `wrong-way-detection`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Alerts on vehicles traveling against traffic flow.
- **Problem:** Wrong-way vehicles cause serious collisions, but are usually only seen after the fact.
- **How it works:**
  1. **Define** each lane's direction.
  2. **Track** vehicles through it.
  3. **Alert** when one moves against the flow.
- **Outputs:** Lane, Direction, Vehicle class, Snapshot or clip, Camera.
- **Scenarios:** One-way gate lanes · Parking ramps · Road segments.
- **Sectors:** Government, Manufacturing.
- **Camera requirements:** elevated view along the lane, 1080p recommended `[VERIFY]`.
- **Related:** 04 LPR · 09 Vehicle Counting · 19 Speed.
- **Custom:** Detect other traffic violations such as illegal turns or stopping in no-stop zones.

### 18 · Parking Occupancy `parking-occupancy`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Real-time monitoring of parking slot availability.
- **Problem:** Drivers circle looking for a space, and operators do not know how full each area is.
- **How it works:**
  1. **Define** the parking slots.
  2. **Detect** occupancy per slot.
  3. **Publish** counts to the dashboard, or to signage and barrier systems via API `[VERIFY: product]`.
- **Outputs:** Free / occupied per slot and zone, Occupancy %, History.
- **Scenarios:** Plant and office parking · Mall or campus lots · Bank branch parking.
- **Sectors:** Government, Retail, Banking, Manufacturing.
- **Camera requirements:** typically 10–30 slots per camera depending on mounting height and angle `[VERIFY]`.
- **Related:** 04 LPR · 09 Vehicle Counting.
- **Custom:** Reserved bays, EV bays, or overstay detection.

### 19 · Speed Estimation `speed-estimation`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Estimates vehicle speed from existing camera feeds.
- **Problem:** Speeding inside plants and campuses is a safety risk, and radar is expensive to install everywhere.
- **How it works:**
  1. **Calibrate** with reference distances in the scene.
  2. **Track** each vehicle across the frame.
  3. **Compute** speed and flag over-limit events.
- **Outputs:** Estimated speed, Vehicle class, Over-limit events, Snapshot, Camera.
- **Important:** speed is an estimate for monitoring and safety. It is not calibrated for legal enforcement.
- **Scenarios:** Internal plant roads · Campuses · Parking ramps.
- **Sectors:** Manufacturing, Government.
- **Camera requirements:** fixed camera with a known reference distance in the scene (e.g. lane markings) and about 20–30 m of visible road `[VERIFY]`.
- **Related:** 04 LPR · 17 Wrong-Way.
- **Custom:** Zone-specific limits, such as slower near pedestrian crossings.

### 22 · Traffic Congestion Analytics `traffic-congestion-analytics`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Analyzes density and congestion patterns per road segment.
- **Problem:** Congestion is only visible to those stuck in it. Planners lack per-segment, per-hour data.
- **How it works:**
  1. **Measure** vehicle density and flow.
  2. **Compute** a congestion level per segment.
  3. **Trend** it by hour and alert on thresholds.
- **Outputs:** Congestion level, Flow rate, Average speed, Peak hours, Trends `[VERIFY: product]`.
- **Scenarios:** City road segments · Campus and plant roads · Event-day traffic.
- **Sectors:** Government & Smart City.
- **Camera requirements:** elevated view of the road (pole or overpass), 1080p recommended `[VERIFY]`.
- **Related:** 09 Vehicle Counting · 19 Speed · 17 Wrong-Way.
- **Custom:** Incident detection (stalled vehicles, accidents) on the same cameras.

---

## Crowd & Retail Analytics

### 07 · Crowd Counting & Density `crowd-counting`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Real-time estimate of people count and density in public areas.
- **Problem:** Overcrowding is hard to judge by eye, and is usually noticed only when it is already unsafe.
- **How it works:**
  1. **Estimate** density across the frame.
  2. **Compare** it against each zone's capacity.
  3. **Alert** and update the dashboard.
- **Outputs:** Estimated count, Density level, Capacity %, Trend, Camera.
- **Scenarios:** Events and plazas · Station and terminal entries · Peak hours in malls.
- **Sectors:** Government, Retail.
- **Camera requirements:** elevated, wide view (ceiling or pole), 1080p or higher `[VERIFY]`.
- **Related:** 08 People Counting · 24 Heatmap · 14 Queue.
- **Custom:** Capacity rules per event or per time of day.

### 08 · People Counting `people-counting`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Counts visitor traffic entering and leaving per zone.
- **Problem:** Door counters and manual tallies are inaccurate and give no view of trends.
- **How it works:**
  1. **Detect and track** people.
  2. **Count** crossings of virtual lines (in and out).
  3. **Aggregate** by hour, zone, and day.
- **Outputs:** In / Out counts, Occupancy, Hourly trend, Daily totals, Export.
- **Scenarios:** Store footfall · Branch and office occupancy · Visitor stats for public buildings.
- **Sectors:** Retail, Banking, Government, Manufacturing.
- **Camera requirements:** overhead (about 2.5–4 m high) or high-angle at the entrance, with a counting line across the doorway `[VERIFY]`.
- **Related:** 07 Crowd Counting · 24 Heatmap · 14 Queue.
- **Custom:** Separate staff from visitors, or adults from children.

### 14 · Queue Length Monitoring `queue-length-monitoring`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Measures queue length to help optimize service.
- **Problem:** Long queues drive customers away, but staffing decisions are made without real-time data.
- **How it works:**
  1. **Detect** people in the queue zone.
  2. **Count** them and estimate waiting time from queue length and the recent service rate `[VERIFY]`.
  3. **Alert** when a threshold is exceeded, so another counter can open.
- **Outputs:** Queue length, Estimated wait, Peaks, Threshold alerts.
- **Scenarios:** Checkout and teller lines · Canteens · Ticketing counters.
- **Sectors:** Retail, Banking, Government.
- **Camera requirements:** elevated view of the whole queue zone `[VERIFY]`.
- **Related:** 08 People Counting · 07 Crowd Counting · 24 Heatmap.
- **Custom:** Per-lane analysis, or integration with counter-opening systems.

### 24 · Heatmap & Dwell Time `heatmap-dwell-time`
- **Tier:** Standard · **Privacy note:** no
- **One-liner:** Visualizes busy zones and visitor dwell time per area.
- **Problem:** Layout decisions rely on guesses about where visitors actually go and how long they stay.
- **How it works:**
  1. **Track** presence over time.
  2. **Aggregate** positions into a heatmap.
  3. **Compare** dwell per zone across hours and days.
- **Outputs:** Heatmap overlay, Dwell time per zone, Hour-by-hour comparison.
- **Scenarios:** Store layout optimization · Exhibition and public-space planning · Branch layout.
- **Sectors:** Retail, Government, Banking.
- **Camera requirements:** high-angle, wide view covering the floor area `[VERIFY]`.
- **Related:** 08 People Counting · 07 Crowd Counting · 14 Queue · 02 Re-ID.
- **Custom:** Heatmaps by customer segment, or per campaign period.
