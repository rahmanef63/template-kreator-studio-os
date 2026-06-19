"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CountUp, Stagger } from "@/features/_shared/motion";
import type { ShowcaseItem } from "@/features/_app/types";

/**
 * Aggregate stat strip — total work + total reach (parsed from metric strings).
 */
export function ShowcaseStats({ items }: { items: ShowcaseItem[] }) {
  const total = items.length;
  const totalReach = items.reduce((sum, it) => {
    const m = it.metric.match(/([\d.]+)([KkMm])/);
    if (!m) return sum;
    const n = parseFloat(m[1]);
    const mult = m[2].toLowerCase() === "m" ? 1_000_000 : 1_000;
    return sum + n * mult;
  }, 0);
  const carousels = items.filter((i) => i.kind === "carousel").length;
  const campaigns = items.filter((i) => i.kind === "campaign").length;

  const stats: { label: string; value: number; format?: (n: number) => string }[] = [
    { label: "Total karya", value: total },
    { label: "Total reach", value: totalReach, format: fmtBig },
    { label: "Carousel", value: carousels },
    { label: "Campaign", value: campaigns },
  ];

  return (
    <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stagger itemClassName="h-full">
        {stats.map((s) => (
          <Card key={s.label} className="h-full border-border/60 bg-card/60">
            <CardContent className="space-y-1 p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-semibold tracking-tight">
                <CountUp value={s.value} format={s.format} />
              </p>
            </CardContent>
          </Card>
        ))}
      </Stagger>
    </div>
  );
}

function fmtBig(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}
