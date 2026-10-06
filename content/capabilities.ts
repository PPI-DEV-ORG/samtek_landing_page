export type CategoryId =
  | "identity-access"
  | "safety-compliance"
  | "security-threat"
  | "traffic-parking"
  | "crowd-retail";
export type SectorSlug =
  | "retail"
  | "manufacturing"
  | "banking"
  | "government-smart-city";
export type Category = {
  id: CategoryId;
  name: string;
  description: string;
};
export type Capability = {
  slug: string;
  num: string;
  name: string;
  category: CategoryId;
  tier: "featured" | "standard";
  privacy: boolean;
  oneLiner: string;
  problem: string;
  steps: { title: string; text: string }[];
  outputs: string[];
  outputsNote?: string;
  outputsExtra?: { label: string; value: string }[];
  actions?: string[];
  scenarios: string[];
  sectors: { slug: SectorSlug; level: "primary" | "relevant" }[];
  camera: string[];
  facts?: { label: string; value: string }[];
  notice?: string;
  privacyText?: string;
  related: string[];
  custom: string;
  faq?: { q: string; a: string }[];
};

export const categories: Category[] = [
  {
    id: "identity-access",
    name: "Identity & Access",
    description:
      "Know who or what is entering, and let the right ones through.",
  },
  {
    id: "safety-compliance",
    name: "Safety & Compliance",
    description: "Keep people safe and rules followed, automatically.",
  },
  {
    id: "security-threat",
    name: "Security & Threat",
    description: "Spot intrusions and threats before they become incidents.",
  },
  {
    id: "traffic-parking",
    name: "Traffic & Parking",
    description: "Understand and control vehicle flow.",
  },
  {
    id: "crowd-retail",
    name: "Crowd & Retail Analytics",
    description: "Turn foot traffic into decisions.",
  },
];

export const sectorNames: Record<SectorSlug, string> = {
  retail: "Retail",
  manufacturing: "Manufacturing & Industry",
  banking: "Banking & Finance",
  "government-smart-city": "Government & Smart City",
};

export const capabilities: Capability[] = [
  {
    slug: "face-recognition",
    num: "01",
    name: "Face Recognition",
    category: "identity-access",
    tier: "featured",
    privacy: true,
    oneLiner:
      "Real-time face matching against watchlists, blacklists, and VIP lists.",
    problem:
      "Manual checks at entrances depend on a guard's memory and attention. They do not scale to hundreds of people a day, and people of interest slip through.",
    steps: [
      {
        title: "Detect",
        text: "faces in the live camera stream.",
      },
      {
        title: "Match",
        text: "each face against enrolled lists on the edge box. Face images never leave your network.",
      },
      {
        title: "Act:",
        text: "log the visit, raise an alert, or signal your access control.",
      },
    ],
    outputs: [
      "Person ID",
      "Name",
      "Gender",
      "Age range",
      "List (Employee / VIP / Blacklist)",
      "Confidence",
      "Camera",
      "Timestamp",
      "Face snapshot",
    ],
    actions: [
      "Dashboard alert",
      "Notification to staff by email or messaging",
      "API/webhook to access control",
    ],
    scenarios: [
      "VIP or returning-customer recognition at reception",
      "Blacklist alert at a store or branch entrance",
      "Contactless staff access and attendance",
    ],
    sectors: [
      {
        slug: "retail",
        level: "primary",
      },
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "primary",
      },
    ],
    camera: [
      "Face at least ~80 px wide (120 px or more recommended)",
      "Mostly frontal, within ~30° of straight-on",
      "Even lighting, avoid strong backlight",
    ],
    related: ["person-reid", "tailgating", "people-counting"],
    custom:
      "Enroll your own lists and sync them with your HR, visitor, or membership system.",
    faq: [
      {
        q: "Are faces stored in the cloud?",
        a: "No. Matching and storage run on-premise, inside your network.",
      },
      {
        q: "How are watchlists managed?",
        a: "From the dashboard, one by one or by bulk import, and through the API.",
      },
      {
        q: "Does it work with masks, glasses, or caps?",
        a: "Glasses and caps are usually fine. Masks and heavy occlusion reduce accuracy, so the face should be at least partly visible.",
      },
    ],
  },
  {
    slug: "person-reid",
    num: "02",
    name: "Person Re-Identification",
    category: "identity-access",
    tier: "standard",
    privacy: true,
    oneLiner:
      "Tracks individuals across cameras without relying on facial biometrics.",
    problem:
      "Faces are not always visible: angled cameras, helmets, masks. Following one person across a site by scrubbing footage takes hours.",
    steps: [
      {
        title: "Detect",
        text: "each person and build an appearance signature (clothing, build, colors).",
      },
      {
        title: "Match",
        text: "signatures across cameras on the edge box.",
      },
      {
        title: "Trace",
        text: "the route as a timeline of cameras and zones.",
      },
    ],
    outputs: [
      "Track ID",
      "Cameras visited",
      "First/last seen",
      "Time per zone",
      "Path timeline",
    ],
    scenarios: [
      "Follow a subject of an incident across the site",
      "Visitor flow analysis",
      "Find coverage gaps between cameras",
    ],
    sectors: [
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: [
      "Full-body view",
      "Adjacent or overlapping coverage, ideally within ~10–20 m of each other",
    ],
    related: ["face-recognition", "loitering-detection", "heatmap-dwell-time"],
    custom:
      "Tune the signature for uniforms, so people in identical work clothes can still be told apart.",
  },
  {
    slug: "ppe-detection",
    num: "03",
    name: "PPE Detection",
    category: "safety-compliance",
    tier: "featured",
    privacy: false,
    oneLiner: "Checks for helmets, vests, masks, and gloves in work areas.",
    problem:
      "Manual safety checks are periodic and inconsistent. Violations often go unnoticed until an incident happens.",
    steps: [
      {
        title: "Detect",
        text: "each worker in the frame.",
      },
      {
        title: "Check",
        text: "the required PPE per zone and shift.",
      },
      {
        title: "Alert",
        text: "the supervisor with a snapshot when something is missing.",
      },
    ],
    outputs: [
      "Worker/Track ID",
      "Zone",
      "Missing items",
      "Confidence",
      "Snapshot",
      "Camera",
      "Timestamp",
    ],
    outputsExtra: [
      {
        label: "Rules",
        value: "Required items per zone and shift",
      },
    ],
    actions: [
      "Real-time alert",
      "Compliance log and per-shift report",
      "Relay or API output to a stack light or horn",
    ],
    scenarios: [
      "Entry gate check before entering the floor",
      "Continuous compliance in work areas",
      "Shift and area compliance reports",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "primary",
      },
    ],
    camera: [
      "Person at least ~120 px tall",
      "Unobstructed view",
      "Adequate lighting",
    ],
    related: [
      "intrusion-detection",
      "fire-smoke-detection",
      "fall-detection",
      "smoking-detection",
    ],
    custom:
      "Other gear: goggles, coveralls, harnesses, hearing protection, specific uniform colors.",
    faq: [
      {
        q: "Which items can it detect?",
        a: "Helmets, vests, masks, and gloves out of the box. Other items need a custom model.",
      },
      {
        q: "Can it tell which worker is in violation?",
        a: "By default alerts are tied to a zone and a snapshot. Linking to a named worker needs the optional face module.",
      },
      {
        q: "What happens to the footage?",
        a: "Processed and stored on-premise.",
      },
    ],
  },
  {
    slug: "license-plate-recognition",
    num: "04",
    name: "License Plate Recognition",
    category: "identity-access",
    tier: "featured",
    privacy: true,
    oneLiner: "Reads vehicle plates for access control and enforcement.",
    problem:
      "Manual gate logs are slow and error-prone, and unauthorized vehicles are easy to miss during busy shifts.",
    steps: [
      {
        title: "Detect",
        text: "the vehicle and its plate as it approaches the gate.",
      },
      {
        title: "Read",
        text: "the plate on the edge box.",
      },
      {
        title: "Decide",
        text: "against allow/deny lists: open the gate, log it, or alert.",
      },
    ],
    outputs: [
      "Plate number",
      "Vehicle type",
      "Color",
      "Direction (in/out)",
      "Confidence",
      "Camera",
      "Timestamp",
      "Snapshot",
    ],
    outputsExtra: [
      {
        label: "Decision",
        value: "Registered / unregistered / blacklisted",
      },
    ],
    actions: [
      "Barrier/gate signal via relay or API",
      "Alert",
      "Entry–exit log with duration",
    ],
    scenarios: [
      "Parking entry and exit",
      "Gate access for registered vehicles",
      "Blacklisted or flagged vehicle alert",
      "Time-in-facility reporting",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "primary",
      },
    ],
    camera: [
      "Plate at least ~130 px wide",
      "Camera within ~30° (horizontal) of the lane axis",
      "Vehicle speed at the gate up to ~30 km/h, slower is better",
      "IR or lighting for night",
    ],
    facts: [
      {
        label: "Supported plates",
        value:
          "Indonesian plate formats (e.g. B 1234 XYZ). Other countries' formats through a custom model",
      },
    ],
    related: [
      "vehicle-counting",
      "parking-occupancy",
      "speed-estimation",
      "wrong-way-detection",
    ],
    custom:
      "Read vehicle IDs other than plates: container numbers, fleet codes, or company stickers.",
    faq: [
      {
        q: "Does it work at night?",
        a: "Yes, with an IR illuminator or adequate lighting on the lane.",
      },
      {
        q: "Can it open the barrier automatically?",
        a: "Yes, through a relay or API connection to your barrier controller.",
      },
      {
        q: "Are plates and logs kept on-premise?",
        a: "Yes, all processing and storage stay inside your network.",
      },
    ],
  },
  {
    slug: "intrusion-detection",
    num: "05",
    name: "Intrusion Detection",
    category: "security-threat",
    tier: "featured",
    privacy: false,
    oneLiner:
      "Automatic alerts when restricted areas are entered outside operating hours.",
    problem:
      "Perimeters and restricted zones cannot be watched by guards around the clock, so intrusions are usually found after the fact.",
    steps: [
      {
        title: "Define",
        text: "restricted zones and their schedules.",
      },
      {
        title: "Detect",
        text: "people or vehicles entering them.",
      },
      {
        title: "Alert",
        text: "in real time with a snapshot or clip.",
      },
    ],
    outputs: [
      "Zone",
      "Object class (person / vehicle)",
      "Time",
      "Time inside",
      "Confidence",
      "Snapshot or clip",
      "Camera",
    ],
    actions: ["Alert", "Siren or light via relay or API", "Incident log"],
    scenarios: [
      "Warehouses after hours",
      "Fenced yards",
      "Utility rooms and rooftops",
    ],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "manufacturing",
        level: "primary",
      },
      {
        slug: "banking",
        level: "relevant",
      },
    ],
    camera: [
      "Clear coverage of the zone",
      "Night visibility with IR cameras or lighting",
    ],
    related: [
      "perimeter-breach-alert",
      "loitering-detection",
      "abandoned-object-detection",
    ],
    custom:
      "Recognize specific intruder types (animals vs. people), or apply per-role rules (authorized staff allowed).",
    faq: [
      {
        q: "Does it work at night?",
        a: "Yes, with IR cameras or adequate lighting. Range and accuracy depend on illumination and distance.",
      },
      {
        q: "Can it tell an animal from a person?",
        a: "Yes, it classifies objects. Typical classes are person, vehicle, and animal.",
      },
      {
        q: "How are false alarms reduced?",
        a: "Multi-frame confirmation, minimum object size, and zone and schedule rules.",
      },
    ],
  },
  {
    slug: "loitering-detection",
    num: "06",
    name: "Loitering Detection",
    category: "security-threat",
    tier: "standard",
    privacy: false,
    oneLiner:
      "Flags individuals remaining in one area beyond a reasonable duration.",
    problem:
      "Suspicious lingering near entrances, ATMs, or loading areas is easy to miss among normal traffic.",
    steps: [
      {
        title: "Track",
        text: "people inside a defined zone.",
      },
      {
        title: "Measure",
        text: "how long each stays.",
      },
      {
        title: "Alert",
        text: "once the threshold is exceeded.",
      },
    ],
    outputs: [
      "Zone",
      "Dwell time",
      "Threshold",
      "Snapshot",
      "Camera",
      "Timestamp",
    ],
    scenarios: ["ATM and branch lobbies", "Loading docks", "Public plazas"],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: ["Clear, fixed view of the zone", "1080p recommended"],
    related: ["intrusion-detection", "person-reid", "crowd-counting"],
    custom: "Different dwell rules per time of day or per zone type.",
  },
  {
    slug: "crowd-counting",
    num: "07",
    name: "Crowd Counting & Density",
    category: "crowd-retail",
    tier: "standard",
    privacy: false,
    oneLiner: "Real-time estimate of people count and density in public areas.",
    problem:
      "Overcrowding is hard to judge by eye, and is usually noticed only when it is already unsafe.",
    steps: [
      {
        title: "Estimate",
        text: "density across the frame.",
      },
      {
        title: "Compare",
        text: "it against each zone's capacity.",
      },
      {
        title: "Alert",
        text: "and update the dashboard.",
      },
    ],
    outputs: [
      "Estimated count",
      "Density level",
      "Capacity %",
      "Trend",
      "Camera",
    ],
    scenarios: [
      "Events and plazas",
      "Station and terminal entries",
      "Peak hours in malls",
    ],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "primary",
      },
    ],
    camera: ["Elevated, wide view (ceiling or pole), 1080p or higher"],
    related: [
      "people-counting",
      "heatmap-dwell-time",
      "queue-length-monitoring",
    ],
    custom: "Capacity rules per event or per time of day.",
  },
  {
    slug: "people-counting",
    num: "08",
    name: "People Counting",
    category: "crowd-retail",
    tier: "standard",
    privacy: false,
    oneLiner: "Counts visitor traffic entering and leaving per zone.",
    problem:
      "Door counters and manual tallies are inaccurate and give no view of trends.",
    steps: [
      {
        title: "Detect and track",
        text: "people.",
      },
      {
        title: "Count",
        text: "crossings of virtual lines (in and out).",
      },
      {
        title: "Aggregate",
        text: "by hour, zone, and day.",
      },
    ],
    outputs: [
      "In / Out counts",
      "Occupancy",
      "Hourly trend",
      "Daily totals",
      "Export",
    ],
    scenarios: [
      "Store footfall",
      "Branch and office occupancy",
      "Visitor stats for public buildings",
    ],
    sectors: [
      {
        slug: "retail",
        level: "primary",
      },
      {
        slug: "banking",
        level: "relevant",
      },
    ],
    camera: [
      "Overhead (about 2.5–4 m high) or high-angle at the entrance, with a counting line across the doorway",
    ],
    related: [
      "crowd-counting",
      "heatmap-dwell-time",
      "queue-length-monitoring",
    ],
    custom: "Separate staff from visitors, or adults from children.",
  },
  {
    slug: "vehicle-counting",
    num: "09",
    name: "Vehicle Counting & Classification",
    category: "traffic-parking",
    tier: "standard",
    privacy: false,
    oneLiner: "Classifies and counts vehicles by type.",
    problem:
      "Traffic and yard logistics data is collected by hand, or not at all.",
    steps: [
      {
        title: "Detect",
        text: "vehicles in the lane.",
      },
      {
        title: "Classify",
        text: "them (motorbike, car, bus, truck).",
      },
      {
        title: "Count",
        text: "by lane, direction, and interval.",
      },
    ],
    outputs: ["Counts by class", "Lane", "Direction", "Interval; exportable"],
    scenarios: [
      "Gate and yard traffic",
      "Road-segment surveys",
      "Truck movement at a plant",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: ["Elevated view (about 4–8 m high) along the lane"],
    related: [
      "license-plate-recognition",
      "traffic-congestion-analytics",
      "parking-occupancy",
      "wrong-way-detection",
    ],
    custom: "Add your own vehicle types (forklifts, specific truck models).",
  },
  {
    slug: "fire-smoke-detection",
    num: "10",
    name: "Fire & Smoke Detection",
    category: "safety-compliance",
    tier: "standard",
    privacy: false,
    oneLiner:
      "Early detection of fire and smoke from the visual feed, no added sensors.",
    problem:
      "Point smoke detectors need smoke to reach them. In large halls and outdoor yards, detection can be late.",
    steps: [
      {
        title: "Analyze",
        text: "frames for flame and smoke patterns.",
      },
      {
        title: "Confirm",
        text: "over several frames to cut false alarms.",
      },
      {
        title: "Alert",
        text: "with a snapshot and location.",
      },
    ],
    outputs: [
      "Type (fire / smoke)",
      "Zone",
      "Confidence",
      "Snapshot or short clip",
      "Camera",
      "Timestamp",
    ],
    scenarios: [
      "Warehouses and storage halls",
      "Outdoor storage yards",
      "Production halls with high ceilings",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "primary",
      },
    ],
    camera: [
      "Clear, unobstructed view",
      "1080p recommended",
      "Effective distance depends on fire size and lens",
    ],
    notice:
      "An early-warning aid. It complements, and does not replace, certified fire alarm and suppression systems.",
    related: ["ppe-detection", "intrusion-detection", "fall-detection"],
    custom:
      "Detect specific hazards such as oil sparks, steam vs. smoke discrimination, or arcing.",
  },
  {
    slug: "fall-detection",
    num: "11",
    name: "Fall Detection",
    category: "safety-compliance",
    tier: "standard",
    privacy: false,
    oneLiner: "Detects fall incidents in work areas or public facilities.",
    problem: "A person who falls while alone may not be found for a long time.",
    steps: [
      {
        title: "Track",
        text: "body posture.",
      },
      {
        title: "Detect",
        text: "a sudden fall followed by staying on the floor.",
      },
      {
        title: "Alert",
        text: "responders with location and a snapshot.",
      },
    ],
    outputs: [
      "Zone",
      "Event time",
      "Time on floor",
      "Snapshot or clip",
      "Camera",
    ],
    scenarios: [
      "Factory floors and loading docks",
      "Stairs and corridors",
      "Public facilities and waiting areas",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: [
      "Full-body view, side or high angle, person at least ~120 px tall and not heavily occluded",
    ],
    related: ["ppe-detection", "idle-worker-detection"],
    custom:
      'Detect "worker down" for lone-worker safety, or falls from height.',
  },
  {
    slug: "abandoned-object-detection",
    num: "12",
    name: "Abandoned Object Detection",
    category: "security-threat",
    tier: "standard",
    privacy: false,
    oneLiner: "Alerts when an object is left unattended in a sensitive area.",
    problem:
      "Unattended bags or boxes in public and sensitive areas can be a security risk, and are hard to notice in a crowd.",
    steps: [
      {
        title: "Detect",
        text: "new static objects appearing in the zone.",
      },
      {
        title: "Check",
        text: "whether the owner has left and for how long.",
      },
      {
        title: "Alert",
        text: "once the time threshold passes.",
      },
    ],
    outputs: ["Object class/size", "Zone", "Time left", "Snapshot", "Camera"],
    scenarios: [
      "Lobbies and ATM areas",
      "Stations and plazas",
      "Loading docks",
    ],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: ["Object at least ~40 px on its shortest side"],
    related: ["loitering-detection", "intrusion-detection", "weapon-detection"],
    custom:
      "Detect removed objects (theft of a fixed item), not just left ones.",
  },
  {
    slug: "perimeter-breach-alert",
    num: "13",
    name: "Perimeter Breach Alert",
    category: "security-threat",
    tier: "standard",
    privacy: false,
    oneLiner: "Detects breaches of fence lines or virtual security boundaries.",
    problem:
      "Long fence lines are expensive to patrol and hard to secure with sensors alone.",
    steps: [
      {
        title: "Draw",
        text: "virtual lines and fence zones.",
      },
      {
        title: "Detect",
        text: "crossing, climbing, or lingering near the line.",
      },
      {
        title: "Alert",
        text: "with direction and a snapshot.",
      },
    ],
    outputs: [
      "Line ID",
      "Direction crossed",
      "Object class",
      "Snapshot",
      "Camera",
      "Timestamp",
    ],
    scenarios: [
      "Plant and yard fences",
      "Utility sites",
      "Restricted compounds",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "primary",
      },
    ],
    camera: [
      "View along the fence, typically 30–50 m of fence per camera depending on the lens, with night visibility",
    ],
    related: ["intrusion-detection", "loitering-detection"],
    custom: "Detect specific behaviors such as fence climbing or cutting.",
  },
  {
    slug: "queue-length-monitoring",
    num: "14",
    name: "Queue Length Monitoring",
    category: "crowd-retail",
    tier: "standard",
    privacy: false,
    oneLiner: "Measures queue length to help optimize service.",
    problem:
      "Long queues drive customers away, but staffing decisions are made without real-time data.",
    steps: [
      {
        title: "Detect",
        text: "people in the queue zone.",
      },
      {
        title: "Count",
        text: "them and estimate waiting time from queue length and the recent service rate.",
      },
      {
        title: "Alert",
        text: "when a threshold is exceeded, so another counter can open.",
      },
    ],
    outputs: ["Queue length", "Estimated wait", "Peaks", "Threshold alerts"],
    scenarios: ["Checkout and teller lines", "Canteens", "Ticketing counters"],
    sectors: [
      {
        slug: "retail",
        level: "primary",
      },
      {
        slug: "banking",
        level: "primary",
      },
    ],
    camera: ["Elevated view of the whole queue zone"],
    related: ["people-counting", "crowd-counting", "heatmap-dwell-time"],
    custom: "Per-lane analysis, or integration with counter-opening systems.",
  },
  {
    slug: "fight-violence-detection",
    num: "15",
    name: "Fight / Violence Detection",
    category: "security-threat",
    tier: "standard",
    privacy: false,
    oneLiner: "Identifies patterns of violent behavior or fighting.",
    problem:
      "Altercations escalate quickly and are noticed late when few staff watch many screens.",
    steps: [
      {
        title: "Analyze",
        text: "motion and posture over a short window.",
      },
      {
        title: "Classify",
        text: "fight-like behavior.",
      },
      {
        title: "Alert",
        text: "with a short clip for human review.",
      },
    ],
    outputs: ["Event type", "Zone", "Duration", "Confidence", "Clip"],
    scenarios: ["Public plazas", "Store floors", "Plant gates and canteens"],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: ["Elevated view with people at least ~100 px tall, 15 fps or more"],
    notice:
      "Raises alerts for a person to verify. Sensitivity is tuned per site to keep false alarms manageable.",
    related: ["weapon-detection", "loitering-detection", "crowd-counting"],
    custom:
      "Tune to your environment's normal activity (e.g. sports areas), to reduce false positives.",
  },
  {
    slug: "weapon-detection",
    num: "16",
    name: "Weapon Detection",
    category: "security-threat",
    tier: "standard",
    privacy: false,
    oneLiner: "Visual detection of weapon-like objects in public areas.",
    problem:
      "A weapon at an entrance is often noticed too late, once the situation has already escalated.",
    steps: [
      {
        title: "Detect",
        text: "objects that resemble weapons (handguns, long guns, and knives).",
      },
      {
        title: "Verify",
        text: "across frames.",
      },
      {
        title: "Send",
        text: "a high-priority alert with a snapshot for operator verification.",
      },
    ],
    outputs: [
      "Object class",
      "Zone",
      "Confidence",
      "Snapshot",
      "Camera",
      "Timestamp",
    ],
    scenarios: [
      "Bank branch entrances",
      "Public buildings",
      "Retail entrances",
    ],
    sectors: [
      {
        slug: "banking",
        level: "primary",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: [
      "1080p or higher, subject within about 5–8 m, and the weapon visible (it cannot see concealed items)",
    ],
    notice:
      "Assists security staff and requires human verification. It does not replace screening.",
    related: [
      "fight-violence-detection",
      "abandoned-object-detection",
      "face-recognition",
    ],
    custom:
      "Detect items relevant to your site, such as tools or prohibited items.",
  },
  {
    slug: "wrong-way-detection",
    num: "17",
    name: "Wrong-Way Detection",
    category: "traffic-parking",
    tier: "standard",
    privacy: false,
    oneLiner: "Alerts on vehicles traveling against traffic flow.",
    problem:
      "Wrong-way vehicles cause serious collisions, but are usually only seen after the fact.",
    steps: [
      {
        title: "Define",
        text: "each lane's direction.",
      },
      {
        title: "Track",
        text: "vehicles through it.",
      },
      {
        title: "Alert",
        text: "when one moves against the flow.",
      },
    ],
    outputs: [
      "Lane",
      "Direction",
      "Vehicle class",
      "Snapshot or clip",
      "Camera",
    ],
    scenarios: ["One-way gate lanes", "Parking ramps", "Road segments"],
    sectors: [
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: ["Elevated view along the lane, 1080p recommended"],
    related: [
      "license-plate-recognition",
      "vehicle-counting",
      "speed-estimation",
    ],
    custom:
      "Detect other traffic violations such as illegal turns or stopping in no-stop zones.",
  },
  {
    slug: "parking-occupancy",
    num: "18",
    name: "Parking Occupancy",
    category: "traffic-parking",
    tier: "standard",
    privacy: false,
    oneLiner: "Real-time monitoring of parking slot availability.",
    problem:
      "Drivers circle looking for a space, and operators do not know how full each area is.",
    steps: [
      {
        title: "Define",
        text: "the parking slots.",
      },
      {
        title: "Detect",
        text: "occupancy per slot.",
      },
      {
        title: "Publish",
        text: "counts to the dashboard, or to signage and barrier systems via API.",
      },
    ],
    outputs: ["Free / occupied per slot and zone", "Occupancy %", "History"],
    scenarios: [
      "Plant and office parking",
      "Mall or campus lots",
      "Bank branch parking",
    ],
    sectors: [
      {
        slug: "retail",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: [
      "Typically 10–30 slots per camera depending on mounting height and angle",
    ],
    related: ["license-plate-recognition", "vehicle-counting"],
    custom: "Reserved bays, EV bays, or overstay detection.",
  },
  {
    slug: "speed-estimation",
    num: "19",
    name: "Speed Estimation",
    category: "traffic-parking",
    tier: "standard",
    privacy: false,
    oneLiner: "Estimates vehicle speed from existing camera feeds.",
    problem:
      "Speeding inside plants and campuses is a safety risk, and radar is expensive to install everywhere.",
    steps: [
      {
        title: "Calibrate",
        text: "with reference distances in the scene.",
      },
      {
        title: "Track",
        text: "each vehicle across the frame.",
      },
      {
        title: "Compute",
        text: "speed and flag over-limit events.",
      },
    ],
    outputs: [
      "Estimated speed",
      "Vehicle class",
      "Over-limit events",
      "Snapshot",
      "Camera",
    ],
    scenarios: ["Internal plant roads", "Campuses", "Parking ramps"],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "government-smart-city",
        level: "relevant",
      },
    ],
    camera: [
      "Fixed camera with a known reference distance in the scene (e.g. lane markings) and about 20–30 m of visible road",
    ],
    notice:
      "Speed is an estimate for monitoring and safety. It is not calibrated for legal enforcement.",
    related: ["license-plate-recognition", "wrong-way-detection"],
    custom: "Zone-specific limits, such as slower near pedestrian crossings.",
  },
  {
    slug: "smoking-detection",
    num: "20",
    name: "Smoking Detection",
    category: "safety-compliance",
    tier: "standard",
    privacy: true,
    oneLiner: "Detects smoking activity in designated smoke-free areas.",
    problem:
      "In fuel, chemical, or storage areas one cigarette is a serious hazard, and signs alone are not enough.",
    steps: [
      {
        title: "Watch",
        text: "the smoke-free zone.",
      },
      {
        title: "Detect",
        text: "smoking behavior and visible smoke.",
      },
      {
        title: "Alert",
        text: "with a snapshot.",
      },
    ],
    outputs: ["Zone", "Time", "Confidence", "Snapshot or clip"],
    scenarios: ["Fuel and chemical storage", "Warehouses", "Public facilities"],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
    ],
    camera: [
      "1080p or higher, subject within about 5–8 m, since a cigarette is small",
    ],
    related: ["fire-smoke-detection", "ppe-detection"],
    custom: "Vaping detection, or restricting phone use in hazardous zones.",
  },
  {
    slug: "idle-worker-detection",
    num: "21",
    name: "Idle Worker Detection",
    category: "safety-compliance",
    tier: "standard",
    privacy: true,
    oneLiner:
      "Identifies inactive workers during operating hours on the production line.",
    problem:
      "Line stoppages and unattended stations reduce output, but they are hard to spot across a whole floor.",
    steps: [
      {
        title: "Define",
        text: "workstation zones and shifts.",
      },
      {
        title: "Measure",
        text: "presence and activity per station.",
      },
      {
        title: "Report",
        text: "idle time and utilization.",
      },
    ],
    outputs: ["Station", "Idle duration", "Utilization %", "Shift report"],
    outputsNote:
      "Reports are aggregated per station and shift by default, not per named individual.",
    scenarios: [
      "Line balancing",
      "Unattended-station alerts",
      "Shift productivity reports",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "primary",
      },
    ],
    camera: ["Clear, fixed view of each workstation", "1080p recommended"],
    privacyText:
      "Use for process improvement, not individual surveillance. Clear notice to staff and internal policy are needed.",
    related: ["ppe-detection", "people-counting"],
    custom:
      "Machine-state detection (running / stopped / jammed) alongside operator presence.",
  },
  {
    slug: "traffic-congestion-analytics",
    num: "22",
    name: "Traffic Congestion Analytics",
    category: "traffic-parking",
    tier: "standard",
    privacy: false,
    oneLiner: "Analyzes density and congestion patterns per road segment.",
    problem:
      "Congestion is only visible to those stuck in it. Planners lack per-segment, per-hour data.",
    steps: [
      {
        title: "Measure",
        text: "vehicle density and flow.",
      },
      {
        title: "Compute",
        text: "a congestion level per segment.",
      },
      {
        title: "Trend",
        text: "it by hour and alert on thresholds.",
      },
    ],
    outputs: [
      "Congestion level",
      "Flow rate",
      "Average speed",
      "Peak hours",
      "Trends",
    ],
    scenarios: [
      "City road segments",
      "Campus and plant roads",
      "Event-day traffic",
    ],
    sectors: [
      {
        slug: "government-smart-city",
        level: "primary",
      },
    ],
    camera: ["Elevated view of the road (pole or overpass), 1080p recommended"],
    related: ["vehicle-counting", "speed-estimation", "wrong-way-detection"],
    custom:
      "Incident detection (stalled vehicles, accidents) on the same cameras.",
  },
  {
    slug: "tailgating",
    num: "23",
    name: "Anti-Passback / Tailgating",
    category: "identity-access",
    tier: "standard",
    privacy: true,
    oneLiner:
      "Detects more than one person passing an access point on a single authorization.",
    problem:
      "Card readers only know that a card was tapped, not how many people walked through.",
    steps: [
      {
        title: "Watch",
        text: "the door or turnstile zone.",
      },
      {
        title: "Count",
        text: "the people passing during each authorization.",
      },
      {
        title: "Alert",
        text: "when the number of people exceeds the number of authorizations.",
      },
    ],
    outputs: [
      "Door ID",
      "Persons counted vs. authorizations",
      "Snapshot",
      "Timestamp",
    ],
    outputsNote:
      "Works with your access control through API or relay events, or standalone with camera-side counting.",
    scenarios: [
      "Server room or restricted-floor doors",
      "Bank back-office entrances",
      "Turnstile lanes at a plant",
    ],
    sectors: [
      {
        slug: "manufacturing",
        level: "relevant",
      },
      {
        slug: "banking",
        level: "primary",
      },
    ],
    camera: [
      "Overhead or high-angle view (mounted about 2.5–4 m high) with the whole doorway in view",
    ],
    related: ["face-recognition", "intrusion-detection", "people-counting"],
    custom:
      'Detect "piggybacking" with carts, or tailgating by vehicles at a gate.',
  },
  {
    slug: "heatmap-dwell-time",
    num: "24",
    name: "Heatmap & Dwell Time",
    category: "crowd-retail",
    tier: "standard",
    privacy: false,
    oneLiner: "Visualizes busy zones and visitor dwell time per area.",
    problem:
      "Layout decisions rely on guesses about where visitors actually go and how long they stay.",
    steps: [
      {
        title: "Track",
        text: "presence over time.",
      },
      {
        title: "Aggregate",
        text: "positions into a heatmap.",
      },
      {
        title: "Compare",
        text: "dwell per zone across hours and days.",
      },
    ],
    outputs: [
      "Heatmap overlay",
      "Dwell time per zone",
      "Hour-by-hour comparison",
    ],
    scenarios: [
      "Store layout optimization",
      "Exhibition and public-space planning",
      "Branch layout",
    ],
    sectors: [
      {
        slug: "retail",
        level: "primary",
      },
      {
        slug: "banking",
        level: "relevant",
      },
    ],
    camera: ["High-angle, wide view covering the floor area"],
    related: [
      "people-counting",
      "crowd-counting",
      "queue-length-monitoring",
      "person-reid",
    ],
    custom: "Heatmaps by customer segment, or per campaign period.",
  },
];
export const capabilityBySlug = (slug: string) =>
  capabilities.find((c) => c.slug === slug);
export const categoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id)!;
const moduleCodes: Record<string, string> = {
  "face-recognition": "FACE",
  "person-reid": "REID",
  "ppe-detection": "PPE",
  "license-plate-recognition": "LPR",
  "intrusion-detection": "INTRUSION",
  "loitering-detection": "LOITER",
  "crowd-counting": "CROWD",
  "people-counting": "PEOPLE",
  "vehicle-counting": "VEHICLE",
  "fire-smoke-detection": "FIRE",
  "fall-detection": "FALL",
  "abandoned-object-detection": "ABANDON",
  "perimeter-breach-alert": "PERIMETER",
  "queue-length-monitoring": "QUEUE",
  "fight-violence-detection": "VIOLENCE",
  "weapon-detection": "WEAPON",
  "wrong-way-detection": "WRONGWAY",
  "parking-occupancy": "PARKING",
  "speed-estimation": "SPEED",
  "smoking-detection": "SMOKING",
  "idle-worker-detection": "IDLE",
  "traffic-congestion-analytics": "TRAFFIC",
  tailgating: "TAILGATE",
  "heatmap-dwell-time": "HEATMAP",
};
export const moduleId = (c: Capability) => `${c.num}_${moduleCodes[c.slug]}`;
