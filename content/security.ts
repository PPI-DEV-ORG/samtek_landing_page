import {
  CloudOffIcon,
  KeyRoundIcon,
  LockIcon,
  ScrollTextIcon,
  ServerIcon,
  type LucideIcon,
} from "lucide-react";

export const principles: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "On-premise by default",
    text: "All inference and storage run on-premise, inside your local network.",
    icon: ServerIcon,
  },
  {
    title: "Nothing goes to a third party",
    text: "No video or frames are ever uploaded to a third-party server.",
    icon: CloudOffIcon,
  },
  {
    title: "Controlled access",
    text: "Role-based access control (RBAC) for the dashboard and the API.",
    icon: KeyRoundIcon,
  },
  {
    title: "Everything is traceable",
    text: "Audit logs record every access and configuration change.",
    icon: ScrollTextIcon,
  },
  {
    title: "Encrypted",
    text: "Encryption at-rest and in-transit across all system components.",
    icon: LockIcon,
  },
];
export const dataMap: {
  data: string;
  processed: string;
  stored: string;
  leaves: string;
}[] = [
  {
    data: "Video and frames",
    processed: "On the edge server, inside your network",
    stored: "On-premise",
    leaves: "Never",
  },
  {
    data: "Detections and events",
    processed: "On the edge server",
    stored: "On-premise",
    leaves: "Only the optional notifications you choose to send",
  },
  {
    data: "Watchlists (faces, plates)",
    processed: "On the edge server",
    stored: "On-premise",
    leaves: "Never",
  },
  {
    data: "Custom model training data",
    processed: "Agreed per project",
    stored: "Agreed per project",
    leaves: "Agreed per project",
  },
];
export const weProvide = [
  "Processing and storage on-premise, inside your network",
  "No upload of video or frames to third parties",
  "Role-based access control and audit logs",
  "Encryption at-rest and in-transit",
];
export const youDecide = [
  "Who in your organization gets access, and with which role",
  "Where cameras point, and how people who are recorded are informed",
  "How long footage and records are kept, and how they are deleted",
  "How your use fits your internal policy and the law that applies to you, such as Indonesia's PDP Law",
];
export const faq: { q: string; a: string }[] = [
  {
    q: "Does SAMTEK need an internet connection?",
    a: "No. All AI inference and data storage run on-premise, inside your local network. Internet is only optional, for remote notifications.",
  },
  {
    q: "Where is video stored?",
    a: "On-premise, inside your own network. Nothing is uploaded to a third party.",
  },
  {
    q: "Are faces stored in the cloud?",
    a: "No. Matching and storage run on-premise, inside your network.",
  },
  {
    q: "Is data still safe if the on-premise server is compromised?",
    a: "SAMTEK applies encryption at-rest and in-transit, role-based access control, and audit logs across all system components.",
  },
  {
    q: "Who can access the footage?",
    a: "Only people you give access to: role-based access control applies to the dashboard and the API, and every access and configuration change is written to the audit log.",
  },
  {
    q: "How is custom model training data handled?",
    a: "Where training happens and how long footage is kept are agreed per project.",
  },
];
