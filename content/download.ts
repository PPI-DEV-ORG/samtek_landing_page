import {
  BracesIcon,
  CameraIcon,
  BadgeCheckIcon,
  CpuIcon,
  DownloadIcon,
  HardDriveDownloadIcon,
  KeyRoundIcon,
  MonitorPlayIcon,
  type LucideIcon,
} from "lucide-react";

// Installer details are not final. Leave a field null until it is confirmed;
// the page shows a placeholder for it. Replace the `#` in `href` with the real installer URL,
// and `sha256` so people can verify the ~1 GB file.
export const installer: {
  name: string;
  version: string | null;
  platform: string | null;
  size: string | null;
  sha256: string | null;
  href: string;
} = {
  name: "SAMTEK Suite",
  version: null,
  platform: null,
  size: "~1 GB",
  sha256: null,
  href: "#", // TODO: replace with the installer URL on your storage/CDN
};
export const components: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "VMS",
    text: "Live view, playback, and camera management from one dashboard.",
    icon: MonitorPlayIcon,
  },
  {
    title: "API",
    text: "Send detections and events to your own systems, with role-based access control.",
    icon: BracesIcon,
  },
  {
    title: "Edge",
    text: "Runs AI inference locally, inside your network, for the modules you activate.",
    icon: CpuIcon,
  },
];
export const installSteps: { title: string; text: string; payload: string }[] =
  [
    {
      title: "Download",
      text: "Get the single package. VMS, API, and Edge come together.",
      payload: "PACKAGE",
    },
    {
      title: "Install",
      text: "Run it on a server inside your network. On first start it enrolls itself with SAMTEK as an unverified device.",
      payload: "SETUP",
    },
    {
      title: "Request trial",
      text: "Send us a trial license request. We review it and verify your enrolled device.",
      payload: "REQUEST",
    },
    {
      title: "Activate",
      text: "Once verified, the software activates on its own. There is no key to enter.",
      payload: "VERIFIED",
    },
    {
      title: "Connect",
      text: "Add your existing cameras through ONVIF or RTSP, with no hardware swap.",
      payload: "RTSP",
    },
  ];
export const icons: LucideIcon[] = [
  DownloadIcon,
  HardDriveDownloadIcon,
  KeyRoundIcon,
  BadgeCheckIcon,
  CameraIcon,
];
export const trialSteps = [
  "Install and start the software. It enrolls itself with SAMTEK automatically",
  "Send a trial request with your company and site details",
  "We verify your device, and the software activates on its own",
];
export const before = [
  "A server inside your local network to install on",
  "Internet access on that server when it first starts, so it can enroll for licensing",
  "Network access from that server to your cameras, over ONVIF or RTSP",
];
export const faq: { q: string; a: string }[] = [
  {
    q: "How do I get a trial license?",
    a: "Install and start the software. It enrolls itself with SAMTEK as an unverified device. Send a trial request from this page, we verify the device, and it activates on its own.",
  },
  {
    q: "Do I install VMS, API, and Edge separately?",
    a: "No. They ship together as one package and are set up in a single install.",
  },
  {
    q: "Does it need internet?",
    a: "Yes, the server needs internet when the software first starts, so it can enroll for licensing. Your video is still processed and stored inside your network.",
  },
  {
    q: "Does my video leave my network?",
    a: "No. SAMTEK processes and stores video on-premise, inside your network, and nothing is uploaded to a third-party server.",
  },
  {
    q: "Will it work with our existing cameras?",
    a: "Usually yes, through ONVIF or RTSP. No hardware swap is required.",
  },
  {
    q: "Can you help with the installation?",
    a: "Yes. Get in touch and we will go through your site and setup with you.",
  },
];
