import {
  CarFrontIcon,
  HardHatIcon,
  PackageIcon,
  PersonStandingIcon,
  ScanFaceIcon,
  type LucideIcon,
} from "lucide-react";

export type Tone = "ok" | "alert";
export type Detection = {
  bbox: { x: number; y: number; w: number; h: number };
  label: string;
  confidence: number;
  status: string;
  tone: Tone;
  fields: [label: string, value: string][];
  side?: "left" | "right";
};
export type Scenario = {
  camera: string;
  icon: LucideIcon;
  image?: string;
  latencyMs: number;
  detections: Detection[];
};

export const scenarios: Scenario[] = [
  {
    camera: "CAM_04 · LOBBY_ENTRANCE",
    icon: ScanFaceIcon,
    image: "/images/hero/lobby.jpg",
    latencyMs: 12,
    detections: [
      {
        bbox: { x: 0.275, y: 0.28, w: 0.09, h: 0.16 },
        label: "FACE_MATCH",
        confidence: 98.4,
        status: "CLEARED",
        tone: "ok",
        fields: [
          ["ID", "EMP-0231"],
          ["Name", "Budi Santoso"],
          ["Gender", "Male"],
          ["Age", "32"],
          ["List", "Employee"],
        ],
      },
    ],
  },
  {
    camera: "CAM_11 · WAREHOUSE_A",
    icon: HardHatIcon,
    image: "/images/hero/warehouse.jpg",
    latencyMs: 9,
    detections: [
      {
        bbox: { x: 0.68, y: 0.3, w: 0.18, h: 0.52 },
        label: "PPE_MISSING",
        confidence: 94.1,
        status: "ALERT",
        tone: "alert",
        fields: [
          ["ID", "WORKER-0087"],
          ["Zone", "Loading Bay"],
          ["Missing", "Helmet"],
          ["Vest", "OK"],
        ],
      },
    ],
  },
  {
    camera: "CAM_07 · GATE_02",
    icon: CarFrontIcon,
    image: "/images/hero/gate.jpg",
    latencyMs: 14,
    detections: [
      {
        bbox: { x: 0.135, y: 0.49, w: 0.345, h: 0.37 },
        label: "LPR",
        confidence: 97.2,
        status: "ACCESS_GRANTED",
        tone: "ok",
        fields: [
          ["Plate", "B 1234 XYZ"],
          ["Type", "Sedan"],
          ["Color", "White"],
          ["Access", "Registered"],
        ],
      },
    ],
  },
  {
    camera: "CAM_02 · PERIMETER_NORTH",
    icon: PersonStandingIcon,
    image: "/images/hero/perimeter.jpg",
    latencyMs: 11,
    detections: [
      {
        bbox: { x: 0.733, y: 0.6, w: 0.06, h: 0.205 },
        label: "INTRUSION",
        confidence: 91.6,
        status: "ALERT",
        tone: "alert",
        fields: [
          ["ID", "UNKNOWN-0019"],
          ["Zone", "Zone-3"],
          ["Time", "02:14"],
          ["Duration", "00:12"],
        ],
      },
    ],
  },
];
export const customScenario: Scenario = {
  camera: "CAM_11 · WAREHOUSE_A",
  icon: PackageIcon,
  image: "/images/hero/warehouse.jpg",
  latencyMs: 13,
  detections: [
    {
      bbox: { x: 0.47, y: 0.41, w: 0.13, h: 0.16 },
      label: "PALLET_COUNT",
      confidence: 96.3,
      status: "COUNTED",
      tone: "ok",
      fields: [
        ["Class", "Pallet stack"],
        ["Items", "12 boxes"],
        ["Zone", "Aisle B"],
        ["Model", "custom-v1"],
      ],
    },
  ],
};
