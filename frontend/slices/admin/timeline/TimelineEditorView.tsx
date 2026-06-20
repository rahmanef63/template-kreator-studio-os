"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { TimelineEntry } from "@/features/_app/types";

const META: EntityMeta = { label: "Milestone", labelPlural: "Timeline" };

export const FIELDS: FieldDef<TimelineEntry>[] = [
  { kind: "text", key: "year", label: "Year", mono: true, placeholder: "2026" },
  { kind: "text", key: "milestone", label: "Milestone", wide: true },
];

export function useTimelineController(): CrudController<TimelineEntry> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: [...state.timeline].sort((a, b) => b.year.localeCompare(a.year)),
      getId: (t) => t.id,
      blank: () => ({
        id: nid("tml"),
        year: "",
        milestone: "",
      }),
      create: (entry) => dispatch({ type: "timeline.upsert", entry }),
      update: (id, patch) => {
        const cur = state.timeline.find((t) => t.id === id);
        if (!cur) return;
        dispatch({ type: "timeline.upsert", entry: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "timeline.delete", id }),
    }),
    [state.timeline, dispatch],
  );
}

export function TimelineEditorView({ id }: { id: string }) {
  const controller = useTimelineController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/timeline`}
    />
  );
}
