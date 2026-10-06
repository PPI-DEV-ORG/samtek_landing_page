import { CheckIcon } from "lucide-react";

export function CheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckIcon className="mt-0.5 shrink-0 text-secondary" />
          {item}
        </li>
      ))}
    </ul>
  );
}
