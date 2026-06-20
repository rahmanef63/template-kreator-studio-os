"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, usePrinciplesController } from "./PrincipleEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Principle } from "@/features/_app/types";

const META: EntityMeta = { label: "Principle", labelPlural: "Working Principles" };

const COLUMNS: ColumnDef<Principle>[] = [
  { key: "text", header: "Principle", width: "w-[82%]" },
  { key: "order", header: "Order", width: "w-[18%]", mono: true },
];

export function PrinciplesView() {
  const controller = usePrinciplesController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/principles/${id}`}
      description="About page — prinsip kerja"
    />
  );
}
