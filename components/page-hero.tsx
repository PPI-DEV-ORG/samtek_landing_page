import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Crumb = { label: string; href?: string };

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  badges,
  actions,
  children,
  visual,
}: {
  breadcrumb?: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  visual: React.ReactNode;
}) {
  const content = (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="flex flex-col items-start gap-6">
        <span className="text-sm text-primary">&gt; {eyebrow}</span>
        <h1 className="text-4xl font-extrabold md:text-6xl">{title}</h1>
        <p className="max-w-xl text-muted-foreground">{description}</p>
        {badges && <div className="flex flex-wrap gap-2">{badges}</div>}
        {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        {children}
      </div>
      {visual}
    </div>
  );
  if (!breadcrumb) {
    return (
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">{content}</div>
      </section>
    );
  }
  return (
    <section className="px-6 pt-10 pb-16 md:pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {i === breadcrumb.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : crumb.href ? (
                    <BreadcrumbLink render={<Link href={crumb.href} />}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    crumb.label
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        {content}
      </div>
    </section>
  );
}
