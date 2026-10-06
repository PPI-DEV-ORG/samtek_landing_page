"use client";
import * as React from "react";
import { CheckIcon, CopyIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Box = { x: number; y: number; w: number; h: number };

const TARGET_RATIO = 16 / 10;
const round = (n: number) => Number(n.toFixed(3));
const snippet = (b: Box) =>
  `bbox: { x: ${round(b.x)}, y: ${round(b.y)}, w: ${round(b.w)}, h: ${round(b.h)} },`;

export function BboxTool() {
  const [src, setSrc] = React.useState<string | null>(null);
  const [ratio, setRatio] = React.useState<number | null>(null);
  const [boxes, setBoxes] = React.useState<Box[]>([]);
  const [draft, setDraft] = React.useState<Box | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);
  const start = React.useRef<{ x: number; y: number } | null>(null);
  const canvas = React.useRef<HTMLDivElement>(null);
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (src) URL.revokeObjectURL(src);
    setSrc(URL.createObjectURL(file));
    setRatio(null);
    setBoxes([]);
  };
  const point = (e: React.PointerEvent) => {
    const rect = canvas.current!.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    };
  };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!src) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    start.current = p;
    setDraft({ ...p, w: 0, h: 0 });
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const p = point(e);
    const s = start.current;
    setDraft({
      x: Math.min(s.x, p.x),
      y: Math.min(s.y, p.y),
      w: Math.abs(p.x - s.x),
      h: Math.abs(p.y - s.y),
    });
  };
  const onPointerUp = () => {
    start.current = null;
    if (draft && draft.w > 0.01 && draft.h > 0.01) {
      setBoxes((b) => [...b, draft]);
    }
    setDraft(null);
  };
  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const wrongRatio = ratio !== null && Math.abs(ratio - TARGET_RATIO) > 0.02;
  const all = boxes.map(snippet).join("\n");

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-3">
        <span className="text-sm text-primary">&gt; BBOX_HELPER.run()</span>
        <h1 className="text-3xl font-extrabold">Bounding box helper</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Choose a photo, drag a rectangle over the subject, then paste the
          result into <code>lib/hero-scenarios.ts</code>. The photo is shown
          cropped to 16:10, exactly like in the hero. Dev only, this page is
          hidden in production.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>1. Photo</CardTitle>
          <CardDescription>
            Stays in your browser, nothing is uploaded.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="max-w-sm"
          />
          {ratio !== null && (
            <Badge variant={wrongRatio ? "destructive" : "secondary"}>
              {wrongRatio
                ? `RATIO ${ratio.toFixed(2)}:1 · WILL BE CROPPED TO 16:10`
                : "16:10 OK"}
            </Badge>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>2. Draw</CardTitle>
          <CardDescription>
            Drag to draw a box. Draw several to get one per detection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={canvas}
            className="relative aspect-16/10 w-full cursor-crosshair touch-none overflow-hidden bg-muted select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt="Reference photo"
                draggable={false}
                onLoad={(e) =>
                  setRatio(
                    e.currentTarget.naturalWidth /
                      e.currentTarget.naturalHeight,
                  )
                }
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                CHOOSE A PHOTO FIRST
              </div>
            )}
            {boxes.map((b, i) => (
              <div
                key={i}
                className="pointer-events-none absolute border-2 border-primary"
                style={{
                  left: `${b.x * 100}%`,
                  top: `${b.y * 100}%`,
                  width: `${b.w * 100}%`,
                  height: `${b.h * 100}%`,
                }}
              >
                <Badge className="absolute top-0 left-0">#{i + 1}</Badge>
              </div>
            ))}
            {draft && (
              <div
                className="pointer-events-none absolute border-2 border-dashed border-secondary"
                style={{
                  left: `${draft.x * 100}%`,
                  top: `${draft.y * 100}%`,
                  width: `${draft.w * 100}%`,
                  height: `${draft.h * 100}%`,
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>3. Copy</CardTitle>
          <CardDescription>
            Paste into the matching detection in <code>hero-scenarios.ts</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {boxes.length === 0 && (
            <span className="text-muted-foreground">No boxes yet.</span>
          )}
          {boxes.map((b, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <Badge>#{i + 1}</Badge>
              <code className="flex-1 text-xs break-all">{snippet(b)}</code>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={`Copy box ${i + 1}`}
                onClick={() => copy(`box-${i}`, snippet(b))}
              >
                {copied === `box-${i}` ? <CheckIcon /> : <CopyIcon />}
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={`Delete box ${i + 1}`}
                onClick={() => setBoxes((all) => all.filter((_, j) => j !== i))}
              >
                <Trash2Icon />
              </Button>
            </div>
          ))}
          {boxes.length > 1 && (
            <Button
              variant="outline"
              className="self-start"
              onClick={() => copy("all", all)}
            >
              {copied === "all" ? <CheckIcon /> : <CopyIcon />}
              COPY_ALL
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
