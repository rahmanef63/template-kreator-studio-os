"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useTimelineController } from "./TimelineEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { TimelineEntry } from "@/features/_app/types";

const META: EntityMeta = { label: "Milestone", labelPlural: "Timeline" };

const COLUMNS: ColumnDef<TimelineEntry>[] = [
  { key: "year", header: "Year", width: "w-[18%]", mono: true },
  { key: "milestone", header: "Milestone", width: "w-[82%]" },
];

export function TimelineView() {
  const controller = useTimelineController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/timeline/${id}`}
      description="About page — timeline"
    />
  );
}
