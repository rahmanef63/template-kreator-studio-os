"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useContentsController } from "./PlannerEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { ContentItem } from "@/features/_app/types";

const META: EntityMeta = { label: "Content", labelPlural: "Content Calendar" };

const COLUMNS: ColumnDef<ContentItem>[] = [
  { key: "title", header: "Title", width: "w-[40%]" },
  { key: "channel", header: "Channel", width: "w-[18%]", badge: "outline" },
  { key: "status", header: "Status", width: "w-[16%]", badge: "secondary" },
  { key: "views", header: "Views", width: "w-[14%]", render: (v) => Number(v ?? 0).toLocaleString() },
];

export function PlannerView() {
  const controller = useContentsController();
  const drafts = controller.items.filter((c) => c.status !== "published").length;
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/planner/${id}`}
      description={`${drafts} belum publish`}
    />
  );
}
