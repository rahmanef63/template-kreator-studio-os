"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useJournalController } from "./JournalEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { JournalEntry } from "@/features/_app/types";

const META: EntityMeta = { label: "Journal entry", labelPlural: "Journal" };

const COLUMNS: ColumnDef<JournalEntry>[] = [
  { key: "title", header: "Title", width: "w-[40%]" },
  { key: "category", header: "Category", width: "w-[22%]", badge: "outline" },
  { key: "readMinutes", header: "Read", width: "w-[14%]", render: (v) => `${Number(v ?? 0)} min` },
  { key: "slug", header: "Slug", width: "w-[24%]", mono: true },
];

export function JournalView() {
  const controller = useJournalController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/journal/${id}`}
      description="Long-form posts"
    />
  );
}
