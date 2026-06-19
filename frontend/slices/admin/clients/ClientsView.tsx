"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useClientsController } from "./ClientEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { FeaturedClient } from "@/features/_app/types";

const META: EntityMeta = { label: "Client", labelPlural: "Featured Clients" };

const COLUMNS: ColumnDef<FeaturedClient>[] = [
  { key: "name", header: "Name", width: "w-[52%]" },
  { key: "initial", header: "Initial", width: "w-[20%]", mono: true },
  { key: "gradient", header: "Gradient", width: "w-[28%]", mono: true },
];

export function ClientsView() {
  const controller = useClientsController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/clients/${id}`}
      description="Logo strip"
    />
  );
}
