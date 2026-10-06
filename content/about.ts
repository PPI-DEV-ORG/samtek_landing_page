import {
  CameraIcon,
  PuzzleIcon,
  ServerIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
};

export const company = {
  legalName: "PT Ghina Multi Prima",
  product: "SAMTEK",
  tagline: "On-premise, edge-first AI Video Management System.",
  address:
    "Jl. Bintara Jaya VIII, RT.008/RW.009, Bintara Jaya, Kec. Bekasi Barat, Jawa Barat 17136",
  city: "Bekasi, Indonesia",
  email: "contact@samtek.id",
  whatsapp: { label: "087744488999", href: "https://wa.me/6287744488999" },
} as const;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;
export const principles: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "On-premise by design",
    text: "Video is processed inside your own network. Nothing is sent to a third-party cloud.",
    icon: ServerIcon,
  },
  {
    title: "Works with what you have",
    text: "We connect to your existing CCTV through standard protocols like ONVIF and RTSP. No camera swap.",
    icon: CameraIcon,
  },
  {
    title: "Modular platform",
    text: "Every use case is an independent module. Activate only what you need, camera by camera.",
    icon: PuzzleIcon,
  },
  {
    title: "Built around your use case",
    text: "When the library does not cover it, we train a custom model for exactly what you need to detect.",
    icon: SparklesIcon,
  },
];
export const story: string[] | null = null;
export const team: TeamMember[] = [
  {
    name: "Rizky Maulana",
    role: "Fullstack Developer",
    bio: "Builds AI vision products.",
    photo: "/team/rizky.webp",
  },
  {
    name: "Rizky Maulana",
    role: "Fullstack Developer",
    bio: "Builds AI vision products.",
    photo: "/team/rizky.webp",
  },
  {
    name: "Rizky Maulana",
    role: "Fullstack Developer",
    bio: "Builds AI vision products.",
    photo: "/team/rizky.webp",
  },
  {
    name: "Rizky Maulana",
    role: "Fullstack Developer",
    bio: "Builds AI vision products.",
    photo: "/team/rizky.webp",
  },
];
