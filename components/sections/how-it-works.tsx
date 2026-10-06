"use client";
import { BellRingIcon, CameraIcon, CpuIcon, ScanEyeIcon } from "lucide-react";
import { FlowSection } from "@/components/flow/flow-section";
import type { FlowStage } from "@/components/flow/flow-simulation";

const howItWorks: FlowStage[] = [
  {
    num: "01",
    title: "CONNECT",
    payload: "RTSP",
    icon: CameraIcon,
    desc: "Connect to your existing CCTV cameras via RTSP/ONVIF, no hardware swap required.",
  },
  {
    num: "02",
    title: "PROCESS",
    payload: "FRAMES",
    icon: CpuIcon,
    desc: "SAMTEK edge devices run AI inference locally, inside your own network.",
  },
  {
    num: "03",
    title: "DETECT",
    payload: "EVENT",
    icon: ScanEyeIcon,
    desc: "Computer vision models detect events for each use case you activate.",
  },
  {
    num: "04",
    title: "ALERT",
    payload: "ALERT",
    icon: BellRingIcon,
    desc: "Real-time notifications and dashboards run on-premise, with no round-trip to the cloud.",
  },
];
const cameras = ["CAM_04", "CAM_11", "CAM_07", "CAM_02"];
const detections = [
  "FACE_MATCH 98.4%",
  "PPE_MISSING helmet",
  "LPR B 1234 XYZ",
  "INTRUSION zone-3",
];
const latencies = [12, 9, 14, 11];

function logLine(tick: number) {
  const cycle = Math.floor(tick / 4);
  const camera = cameras[cycle % cameras.length];
  switch (tick % 4) {
    case 0:
      return `[CONNECT] ${camera} rtsp stream established`;
    case 1:
      return `[PROCESS] edge-node-01 inference ${latencies[cycle % latencies.length]}ms · 0 bytes to cloud`;
    case 2:
      return `[DETECT] ${detections[cycle % detections.length]} @ ${camera}`;
    default:
      return "[ALERT] dashboard notified · LAN only";
  }
}

export function HowItWorks() {
  return (
    <FlowSection
      id="how-it-works"
      eyebrow="HOW_IT_WORKS.exec()"
      title="From cameras to insight."
      stages={howItWorks}
      logLine={logLine}
    />
  );
}
