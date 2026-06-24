"use client";

import * as React from "react";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import type {
  MonetizationMonth,
  MonetizationSource,
  Payout,
} from "@/features/_app/types";

// CRUD wiring for the three monetization lists. Mirrors the sibling editor
// idiom (controller + FieldDef[] consumed by CrudRowDialog). Edits route
// through the store dispatch: DEMO persists to localStorage via the reducer,
// real clones hit the Convex monetization mutations. See store-dispatch.tsx.

const KIND_OPTIONS = [
  { value: "sponsor", label: "Sponsor" },
  { value: "affiliate", label: "Affiliate" },
  { value: "product", label: "Digital product" },
  { value: "course", label: "Course / cohort" },
  { value: "subscription", label: "Subscription" },
];

export const SOURCE_META: EntityMeta = { label: "Source", labelPlural: "Revenue sources" };
export const MONTH_META: EntityMeta = { label: "Month", labelPlural: "Monthly revenue" };
export const PAYOUT_META: EntityMeta = { label: "Payout", labelPlural: "Payout schedule" };

export const SOURCE_FIELDS: FieldDef<MonetizationSource>[] = [
  { kind: "text", key: "label", label: "Label", placeholder: "Sponsor — Brand X", wide: true },
  { kind: "select", key: "kind", label: "Kind", options: KIND_OPTIONS },
  { kind: "number", key: "amountIdr", label: "Amount (IDR) — this month", min: 0 },
  { kind: "number", key: "share", label: "Share (% of total)", min: 0, max: 100 },
  { kind: "number", key: "growth", label: "Growth (% vs last month)", step: 1 },
];

export const MONTH_FIELDS: FieldDef<MonetizationMonth>[] = [
  { kind: "text", key: "period", label: "Period", placeholder: "Jan 2026" },
  { kind: "number", key: "amountIdr", label: "Amount (IDR)", min: 0 },
];

export const PAYOUT_FIELDS: FieldDef<Payout>[] = [
  { kind: "text", key: "source", label: "Counterparty", placeholder: "Brand X", wide: true },
  { kind: "select", key: "kind", label: "Kind", options: KIND_OPTIONS },
  { kind: "number", key: "amountIdr", label: "Amount (IDR)", min: 0 },
  {
    kind: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "scheduled", label: "Scheduled" },
      { value: "in-review", label: "In review" },
      { value: "paid", label: "Paid" },
    ],
  },
  { kind: "date", key: "dueAt", label: "Due date" },
];

export function useSourcesController(): CrudController<MonetizationSource> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.monetizationSources,
      getId: (s) => s.id,
      blank: () => ({ id: nid("src"), kind: "sponsor", label: "", amountIdr: 0, share: 0, growth: 0 }),
      create: (source) => dispatch({ type: "monetizationSource.upsert", source }),
      update: (id, patch) => {
        const cur = state.monetizationSources.find((s) => s.id === id);
        if (!cur) return;
        dispatch({ type: "monetizationSource.upsert", source: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "monetizationSource.delete", id }),
    }),
    [state.monetizationSources, dispatch],
  );
}

export function useMonthsController(): CrudController<MonetizationMonth> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.monetizationMonths,
      getId: (m) => m.id,
      blank: () => ({ id: nid("mon"), period: "", amountIdr: 0 }),
      create: (month) => dispatch({ type: "monetizationMonth.upsert", month }),
      update: (id, patch) => {
        const cur = state.monetizationMonths.find((m) => m.id === id);
        if (!cur) return;
        dispatch({ type: "monetizationMonth.upsert", month: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "monetizationMonth.delete", id }),
    }),
    [state.monetizationMonths, dispatch],
  );
}

export function usePayoutsController(): CrudController<Payout> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.payouts,
      getId: (p) => p.id,
      blank: () => ({ id: nid("po"), source: "", kind: "sponsor", amountIdr: 0, status: "scheduled", dueAt: Date.now() }),
      create: (payout) => dispatch({ type: "payout.upsert", payout }),
      update: (id, patch) => {
        const cur = state.payouts.find((p) => p.id === id);
        if (!cur) return;
        dispatch({ type: "payout.upsert", payout: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "payout.delete", id }),
    }),
    [state.payouts, dispatch],
  );
}
