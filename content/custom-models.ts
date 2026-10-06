import {
  CogIcon,
  HardHatIcon,
  HashIcon,
  PackageIcon,
  PuzzleIcon,
  ShieldAlertIcon,
  TargetIcon,
  TruckIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

export const whenCustom: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "It is not in the library.",
    text: "A specific product defect, an unusual object, a behavior that only exists on your site.",
    icon: PuzzleIcon,
  },
  {
    title: "The library model is not enough.",
    text: "Your uniforms, vehicles, lighting, or camera angles need better accuracy than a general model gives.",
    icon: TargetIcon,
  },
  {
    title: "It must fit your process.",
    text: "Your own classes, rules, and outputs, wired to your systems.",
    icon: WorkflowIcon,
  },
];
export const examples: { text: string; icon: LucideIcon }[] = [
  { text: "Product or packaging defects on a line", icon: PackageIcon },
  {
    text: "Specific vehicles, forklifts, or container and fleet IDs",
    icon: TruckIcon,
  },
  { text: "Custom PPE or uniform compliance", icon: HardHatIcon },
  {
    text: "Behaviors specific to your site, like a blocked emergency exit",
    icon: ShieldAlertIcon,
  },
  {
    text: "Counting items on a conveyor, pallet, or truck bed",
    icon: HashIcon,
  },
  { text: "Equipment state: running, stopped, or jammed", icon: CogIcon },
];
export const processSteps: { title: string; text: string; payload: string }[] =
  [
    {
      title: "Scope",
      text: "Define together what to detect, where, and what success means.",
      payload: "BRIEF",
    },
    {
      title: "Collect",
      text: "Gather sample footage from your cameras, covering different times of day, lighting, and angles.",
      payload: "FOOTAGE",
    },
    {
      title: "Label & train",
      text: "We label the data and train the model, with the training setup agreed per project.",
      payload: "MODEL",
    },
    {
      title: "Validate on site",
      text: "Test on your live cameras and review results together.",
      payload: "RESULTS",
    },
    {
      title: "Deploy & improve",
      text: "The model runs on the edge box, and we retrain as your needs change.",
      payload: "EDGE",
    },
  ];
export const bring = [
  "A clear description of what to detect, with examples",
  "Sample footage from the real cameras, in whatever format your VMS or NVR exports",
  "Camera locations and access to them",
  'A definition of a "correct" detection, and how you want alerts delivered',
];
export const get = [
  "A model running on your on-premise edge box, alongside any ready-made modules",
  "Alerts and dashboard in the same interface as the other modules",
  "Results reviewed together on your own footage before go-live",
  "Retraining as your environment changes, scoped with you",
];
export const dataPrivacy = [
  "Your footage is used to build your model for your project.",
  "Where training happens and how long footage is kept are agreed per project.",
  "After deployment it runs on-premise, with no cloud dependency, like the rest of the platform.",
];
export const ownership =
  "Ownership and licensing of the trained model are agreed when the project is scoped.";
export const timing =
  "It depends on what you need to detect, how varied your footage is, and the accuracy the use case needs. We give a realistic estimate after scoping, not before.";
export const faq: { q: string; a: string }[] = [
  {
    q: "Can you use footage we already have?",
    a: "Often yes, if it covers your real conditions. We check it during scoping.",
  },
  {
    q: "How much footage do you need?",
    a: "Enough to cover your real conditions: different times of day, lighting, and angles. We tell you what is needed once the use case is scoped.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the use case, the footage, and the accuracy needed. We give an estimate after scoping.",
  },
  {
    q: "Who owns the model?",
    a: "Ownership and licensing terms are agreed when the project is scoped.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope, so we quote per project. Request a quote and we will get back to you.",
  },
  {
    q: "Will it work on our existing cameras?",
    a: "Usually yes, through ONVIF or RTSP.",
  },
];
