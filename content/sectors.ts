import type { SectorSlug } from "./capabilities";

export type SectorStage = {
  title: string;
  text: string;
  payload: string;
  module: string;
};
export type Sector = {
  slug: SectorSlug;
  num: string;
  name: string;
  oneLiner: string;
  image: string;
  imageAlt: string;
  challenges: string[];
  primary: string[];
  relevant: string[];
  dayTitle: string;
  day: SectorStage[];
  deployment: string[];
  faq: { q: string; a: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "retail",
    num: "01",
    name: "Retail",
    oneLiner:
      "Turns store cameras into visitor analytics and loss-prevention tools.",
    image: "/images/sectors/retail.jpg",
    imageAlt:
      "Supermarket aisles and checkout as seen by a ceiling security camera",
    challenges: [
      "Hard to know how many people visit, when, and where they go.",
      "Long checkout queues push customers away, and staffing reacts too late.",
      "Known repeat offenders are hard to spot at the entrance.",
      "Layout and promotion decisions rely on guesses.",
    ],
    primary: [
      "people-counting",
      "heatmap-dwell-time",
      "queue-length-monitoring",
      "face-recognition",
    ],
    relevant: [
      "crowd-counting",
      "loitering-detection",
      "intrusion-detection",
      "parking-occupancy",
      "fight-violence-detection",
      "abandoned-object-detection",
    ],
    dayTitle: "A day in the store.",
    day: [
      {
        title: "Opening",
        text: "Cameras count visitors entering, per hour.",
        payload: "COUNT",
        module: "people-counting",
      },
      {
        title: "Midday",
        text: "Heatmap shows which aisles draw the most dwell time.",
        payload: "HEATMAP",
        module: "heatmap-dwell-time",
      },
      {
        title: "Peak hour",
        text: "Queue length crosses the threshold and an alert asks for another checkout.",
        payload: "QUEUE",
        module: "queue-length-monitoring",
      },
      {
        title: "Entrance",
        text: "A blacklisted person is flagged to the guard, with a snapshot.",
        payload: "MATCH",
        module: "face-recognition",
      },
      {
        title: "Closing",
        text: "Intrusion rules switch on for after-hours.",
        payload: "ARMED",
        module: "intrusion-detection",
      },
    ],
    deployment: [
      "Reuse the store's existing CCTV",
      "Edge box in the back office",
      "Footage and counts stay on the store network",
    ],
    faq: [
      {
        q: "Can it work with the cameras we already have?",
        a: "Yes, through ONVIF or RTSP.",
      },
      {
        q: "Is customer face data stored?",
        a: "Only for enrolled lists, on-premise, and how long they are kept is up to you.",
      },
      {
        q: "Can counts feed our BI or POS?",
        a: "Counts can be exported and sent to other systems through the API.",
      },
    ],
  },
  {
    slug: "manufacturing",
    num: "02",
    name: "Manufacturing & Industry",
    oneLiner:
      "Keeps workplace safety compliance and production-line productivity automated.",
    image: "/images/sectors/manufacturing.jpg",
    imageAlt:
      "Production line workers in a factory hall seen from a high security camera",
    challenges: [
      "Manual safety audits (PPE, restricted areas) are periodic and miss violations between checks.",
      "Large halls and yards are hard to watch, so fire, falls, and intrusions are found late.",
      "Idle stations and line stoppages cost output but are hard to see across the floor.",
      "Vehicles and trucks move through gates and yards with limited traceability.",
    ],
    primary: [
      "ppe-detection",
      "intrusion-detection",
      "fire-smoke-detection",
      "idle-worker-detection",
    ],
    relevant: [
      "fall-detection",
      "smoking-detection",
      "abandoned-object-detection",
      "perimeter-breach-alert",
      "license-plate-recognition",
      "vehicle-counting",
      "speed-estimation",
      "tailgating",
      "face-recognition",
    ],
    dayTitle: "A day in the plant.",
    day: [
      {
        title: "Shift start",
        text: "Workers pass the gate and PPE is checked automatically.",
        payload: "PPE",
        module: "ppe-detection",
      },
      {
        title: "On the floor",
        text: "A missing helmet raises an alert to the area supervisor.",
        payload: "ALERT",
        module: "ppe-detection",
      },
      {
        title: "Midday",
        text: "Idle-station report shows utilization by line.",
        payload: "REPORT",
        module: "idle-worker-detection",
      },
      {
        title: "Yard",
        text: "A truck is read at the gate, checked against the allow list, and logged.",
        payload: "PLATE",
        module: "license-plate-recognition",
      },
      {
        title: "Night",
        text: "Intrusion and perimeter rules protect the site.",
        payload: "BREACH",
        module: "intrusion-detection",
      },
    ],
    deployment: [
      "Reuse existing CCTV in halls and yards",
      "Edge box on the plant network, which can run isolated from the internet",
      "Alerts to supervisors' dashboards",
    ],
    faq: [
      {
        q: "Does it need internet?",
        a: "No. Everything runs on-premise, internet is only optional for remote notifications.",
      },
      {
        q: "Can we use our own PPE rules per zone?",
        a: "Yes, per zone and shift.",
      },
      {
        q: "Does it replace our fire alarm?",
        a: "No. It is an early-warning aid that complements certified fire alarm and suppression systems.",
      },
    ],
  },
  {
    slug: "banking",
    num: "03",
    name: "Banking & Finance",
    oneLiner:
      "Strengthens branch security and detects threats before they become incidents.",
    image: "/images/sectors/banking.jpg",
    imageAlt:
      "Bank branch lobby with teller counters seen from a security camera",
    challenges: [
      "Branches and ATM rooms need continuous, discreet monitoring.",
      "Threats (weapons, loitering) must be flagged before they escalate.",
      "Access to back-office and vault areas must be strictly one person per authorization.",
      "Data sensitivity: customer footage must stay under the bank's own control.",
    ],
    primary: [
      "face-recognition",
      "weapon-detection",
      "tailgating",
      "queue-length-monitoring",
    ],
    relevant: [
      "loitering-detection",
      "abandoned-object-detection",
      "intrusion-detection",
      "perimeter-breach-alert",
      "people-counting",
      "heatmap-dwell-time",
      "parking-occupancy",
    ],
    dayTitle: "A day at the branch.",
    day: [
      {
        title: "Opening",
        text: "Staff enter through the access door, one person per authorization.",
        payload: "ACCESS",
        module: "tailgating",
      },
      {
        title: "Lobby",
        text: "A VIP client is recognized and the branch manager is notified.",
        payload: "MATCH",
        module: "face-recognition",
      },
      {
        title: "Teller area",
        text: "Queue length rises and an alert opens another counter.",
        payload: "QUEUE",
        module: "queue-length-monitoring",
      },
      {
        title: "ATM room",
        text: "A person lingers unusually long and security is alerted.",
        payload: "DWELL",
        module: "loitering-detection",
      },
      {
        title: "Entrance",
        text: "A weapon-like object is flagged with a snapshot for staff verification.",
        payload: "ALERT",
        module: "weapon-detection",
      },
    ],
    deployment: [
      "Reuse branch CCTV",
      "Edge box in the branch or regional server room",
      "All data stays inside the bank's network",
    ],
    faq: [
      {
        q: "Where is data stored?",
        a: "On-premise, in your own network. Nothing is uploaded to a third party.",
      },
      {
        q: "Can it integrate with our access control?",
        a: "Yes, through API or relay events with common access control systems.",
      },
      {
        q: "How is access to footage controlled?",
        a: "Role-based access control and audit logs.",
      },
    ],
  },
  {
    slug: "government-smart-city",
    num: "04",
    name: "Government & Smart City",
    oneLiner:
      "Supports large-scale public-space and city traffic surveillance.",
    image: "/images/sectors/smart-city.jpg",
    imageAlt:
      "City intersection with traffic and pedestrians seen from a pole-mounted camera",
    challenges: [
      "Thousands of cameras, but operators can only watch a handful at once.",
      "Traffic congestion and violations are found through complaints, not data.",
      "Crowds at events and public spaces need capacity awareness.",
      "Public data and citizen privacy call for strict control of where footage goes.",
    ],
    primary: [
      "license-plate-recognition",
      "traffic-congestion-analytics",
      "crowd-counting",
      "perimeter-breach-alert",
    ],
    relevant: [
      "vehicle-counting",
      "wrong-way-detection",
      "speed-estimation",
      "parking-occupancy",
      "fight-violence-detection",
      "weapon-detection",
      "abandoned-object-detection",
      "fall-detection",
      "loitering-detection",
      "person-reid",
    ],
    dayTitle: "A day in the city.",
    day: [
      {
        title: "Morning",
        text: "Congestion index highlights the busiest road segments.",
        payload: "CONGESTION",
        module: "traffic-congestion-analytics",
      },
      {
        title: "Junction",
        text: "Vehicle counts by class feed the traffic report.",
        payload: "COUNTS",
        module: "vehicle-counting",
      },
      {
        title: "Compound gate",
        text: "Plates are read and matched to registered vehicles.",
        payload: "PLATE",
        module: "license-plate-recognition",
      },
      {
        title: "Event",
        text: "Crowd density approaches capacity and organizers are alerted.",
        payload: "CROWD",
        module: "crowd-counting",
      },
      {
        title: "Night",
        text: "A perimeter breach at a facility is flagged with a snapshot.",
        payload: "BREACH",
        module: "perimeter-breach-alert",
      },
    ],
    deployment: [
      "Reuse existing city or facility CCTV",
      "Edge boxes at facilities or district hubs",
      "Data stays within the agency's network",
    ],
    faq: [
      {
        q: "Can it scale to hundreds of cameras?",
        a: "Yes, by adding edge boxes per site or district and managing them centrally.",
      },
      {
        q: "Where does the data go?",
        a: "Stays on-premise, controlled by the agency.",
      },
      {
        q: "Can we integrate with our command center?",
        a: "Through the API and standard video protocols (ONVIF, RTSP).",
      },
    ],
  },
];

export const sectorBySlug = (slug: string) =>
  sectors.find((s) => s.slug === slug);
