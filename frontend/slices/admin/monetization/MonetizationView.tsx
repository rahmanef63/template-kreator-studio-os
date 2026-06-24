"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, BarChart3, DollarSign, Plus, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrudRowDialog } from "@/features/_shared/crud/CrudRowDialog";
import { SectionHead } from "@/features/_shared/ui/section-head";
import { StatCard } from "@/features/_shared/ui/stat-card";
import { fmtDate, useMonetization } from "@/features/_app/store";
import {
  KIND_ICON,
  KIND_LABEL,
  MonthBar,
  STATUS_TONE,
  chartMax,
  fmtIdr,
  totalAmount,
} from "./monetization-helpers";
import {
  MONTH_FIELDS,
  MONTH_META,
  PAYOUT_FIELDS,
  PAYOUT_META,
  SOURCE_FIELDS,
  SOURCE_META,
  useMonthsController,
  usePayoutsController,
  useSourcesController,
} from "./monetization-editors";

/**
 * Revenue dashboard for creator economy — breakdown per source (sponsor /
 * affiliate / product / course / subscription), monthly bar chart, payout
 * schedule. Every row is editable: click to edit, "New" to add, delete from
 * the dialog. Edits persist (DEMO -> localStorage, real clone -> Convex).
 */
export function MonetizationView() {
  const { sources, months, payouts } = useMonetization();
  const sourcesCtrl = useSourcesController();
  const monthsCtrl = useMonthsController();
  const payoutsCtrl = usePayoutsController();
  const [editing, setEditing] = React.useState<
    { kind: "source" | "month" | "payout"; id: string } | null
  >(null);

  const newSource = () => {
    const it = sourcesCtrl.blank();
    sourcesCtrl.create(it);
    setEditing({ kind: "source", id: it.id });
  };
  const newMonth = () => {
    const it = monthsCtrl.blank();
    monthsCtrl.create(it);
    setEditing({ kind: "month", id: it.id });
  };
  const newPayout = () => {
    const it = payoutsCtrl.blank();
    payoutsCtrl.create(it);
    setEditing({ kind: "payout", id: it.id });
  };

  const total = totalAmount(sources);
  const lastMonth = months[months.length - 1]?.amountIdr ?? 0;
  const prevMonth = months[months.length - 2]?.amountIdr ?? 0;
  const momPct = prevMonth === 0 ? 0 : ((lastMonth - prevMonth) / prevMonth) * 100;
  const scheduledTotal = payouts
    .filter((p) => p.status !== "paid")
    .reduce((s, p) => s + p.amountIdr, 0);
  const ytdTotal = months.reduce((s, m) => s + m.amountIdr, 0);
  const max = chartMax(months);

  return (
    <div className="space-y-5">
      <SectionHead
        eyebrow="Monetization"
        title="Revenue & payouts"
        subtitle="Breakdown per source, monthly trend, payout schedule. Klik baris untuk edit, atau tambah baru."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="This month"
          value={fmtIdr(lastMonth)}
          hint={`${momPct >= 0 ? "+" : ""}${momPct.toFixed(1)}% vs last`}
        />
        <StatCard
          icon={BarChart3}
          label="YTD revenue"
          value={fmtIdr(ytdTotal)}
          hint={`${months.length} bulan tracked`}
        />
        <StatCard
          icon={Wallet}
          label="Scheduled payouts"
          value={fmtIdr(scheduledTotal)}
          hint={`${payouts.filter((p) => p.status !== "paid").length} pending`}
        />
        <StatCard label="Active sources" value={sources.length} hint="diversified" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Source breakdown */}
        <Card className="border-border/60 bg-card/60">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Revenue by source
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {fmtIdr(total)} this month
                </span>
                <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={newSource}>
                  <Plus className="size-3.5" /> New
                </Button>
              </div>
            </div>
            <ul className="space-y-3">
              {sources
                .slice()
                .sort((a, b) => b.amountIdr - a.amountIdr)
                .map((src) => {
                  const Icon = KIND_ICON[src.kind];
                  const up = src.growth >= 0;
                  return (
                    <li
                      key={src.id}
                      onClick={() => setEditing({ kind: "source", id: src.id })}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-1 hover:bg-accent/40"
                    >
                      <span className="grid size-8 place-items-center rounded-md bg-muted/60">
                        <Icon className="size-4 text-foreground/85" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{src.label}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {KIND_LABEL[src.kind]} · {src.share}% of total
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm">{fmtIdr(src.amountIdr)}</p>
                        <p
                          className={`flex items-center justify-end gap-0.5 text-[10px] ${up ? "text-emerald-400" : "text-rose-400"}`}
                        >
                          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                          {Math.abs(src.growth)}%
                        </p>
                      </div>
                    </li>
                  );
                })}
              {sources.length === 0 && (
                <li className="rounded-md border border-dashed border-border/60 px-3 py-5 text-center text-xs text-muted-foreground">
                  Belum ada sumber. Klik <span className="font-medium">New</span>.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Monthly bar chart */}
        <Card className="border-border/60 bg-card/60">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Monthly revenue
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full text-[10px]">
                  {months.length} bulan
                </Badge>
                <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={newMonth}>
                  <Plus className="size-3.5" /> New
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              {months.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setEditing({ kind: "month", id: m.id })}
                  className="block w-full rounded-sm text-left hover:bg-accent/40"
                >
                  <MonthBar month={m} max={max} />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout schedule */}
      <Card className="border-border/60 bg-card/60">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Payout schedule
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">
                {payouts.length} entries
              </span>
              <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={newPayout}>
                <Plus className="size-3.5" /> New
              </Button>
            </div>
          </div>
          <ul className="divide-y divide-border/60">
            {payouts
              .slice()
              .sort((a, b) => a.dueAt - b.dueAt)
              .map((p) => {
                const Icon = KIND_ICON[p.kind];
                return (
                  <li
                    key={p.id}
                    onClick={() => setEditing({ kind: "payout", id: p.id })}
                    className="flex cursor-pointer items-center gap-3 py-3 text-sm hover:bg-accent/40"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{p.source}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {KIND_LABEL[p.kind]} · {fmtDate(p.dueAt)}
                      </p>
                    </div>
                    <span className="font-mono text-xs">{fmtIdr(p.amountIdr)}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] capitalize ${STATUS_TONE[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </li>
                );
              })}
            {payouts.length === 0 && (
              <li className="py-5 text-center text-xs text-muted-foreground">
                Belum ada payout. Klik <span className="font-medium">New</span>.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      {editing?.kind === "source" && (
        <CrudRowDialog
          open
          onOpenChange={(o) => !o && setEditing(null)}
          id={editing.id}
          meta={SOURCE_META}
          controller={sourcesCtrl}
          fields={SOURCE_FIELDS}
        />
      )}
      {editing?.kind === "month" && (
        <CrudRowDialog
          open
          onOpenChange={(o) => !o && setEditing(null)}
          id={editing.id}
          meta={MONTH_META}
          controller={monthsCtrl}
          fields={MONTH_FIELDS}
        />
      )}
      {editing?.kind === "payout" && (
        <CrudRowDialog
          open
          onOpenChange={(o) => !o && setEditing(null)}
          id={editing.id}
          meta={PAYOUT_META}
          controller={payoutsCtrl}
          fields={PAYOUT_FIELDS}
        />
      )}
    </div>
  );
}
