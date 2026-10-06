import {
  AccessibilityIcon,
  CarFrontIcon,
  CigaretteIcon,
  ClockIcon,
  CrosshairIcon,
  DoorOpenIcon,
  FenceIcon,
  FlameIcon,
  FootprintsIcon,
  GaugeIcon,
  Grid3x3Icon,
  HardHatIcon,
  ListOrderedIcon,
  LuggageIcon,
  ScanFaceIcon,
  ShieldAlertIcon,
  SquareParkingIcon,
  SwordsIcon,
  TimerIcon,
  TrafficConeIcon,
  TruckIcon,
  Undo2Icon,
  UsersIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "face-recognition": ScanFaceIcon,
  "person-reid": UsersRoundIcon,
  "ppe-detection": HardHatIcon,
  "license-plate-recognition": CarFrontIcon,
  "intrusion-detection": ShieldAlertIcon,
  "loitering-detection": ClockIcon,
  "crowd-counting": UsersIcon,
  "people-counting": FootprintsIcon,
  "vehicle-counting": TruckIcon,
  "fire-smoke-detection": FlameIcon,
  "fall-detection": AccessibilityIcon,
  "abandoned-object-detection": LuggageIcon,
  "perimeter-breach-alert": FenceIcon,
  "queue-length-monitoring": ListOrderedIcon,
  "fight-violence-detection": SwordsIcon,
  "weapon-detection": CrosshairIcon,
  "wrong-way-detection": Undo2Icon,
  "parking-occupancy": SquareParkingIcon,
  "speed-estimation": GaugeIcon,
  "smoking-detection": CigaretteIcon,
  "idle-worker-detection": TimerIcon,
  "traffic-congestion-analytics": TrafficConeIcon,
  tailgating: DoorOpenIcon,
  "heatmap-dwell-time": Grid3x3Icon,
};

export const capabilityIcon = (slug: string): LucideIcon =>
  icons[slug] ?? ScanFaceIcon;
export function CapabilityIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = icons[slug] ?? ScanFaceIcon;
  return <Icon className={className} />;
}
