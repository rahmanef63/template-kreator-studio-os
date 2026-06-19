"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useShowcaseController } from "./ShowcaseEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { ShowcaseItem } from "@/features/_app/types";

const META: EntityMeta = { label: "Showcase item", labelPlural: "Showcase" };

const COLUMNS: ColumnDef<ShowcaseItem>[] = [
  { key: "title", header: "Title", width: "w-[34%]" },
  { key: "kind", header: "Kind", width: "w-[16%]", badge: "outline" },
  { key: "client", header: "Client", width: "w-[24%]" },
  { key: "metric", header: "Metric", width: "w-[18%]", mono: true },
];

export function ShowcaseView() {
  const controller = useShowcaseController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/showcase/${id}`}
      description="Past work gallery"
    />
  );
}
