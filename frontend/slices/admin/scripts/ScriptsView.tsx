"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useScriptsController } from "./ScriptEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Script } from "@/features/_app/types";

const META: EntityMeta = { label: "Script", labelPlural: "Script Library" };

const COLUMNS: ColumnDef<Script>[] = [
  { key: "title", header: "Title", width: "w-[44%]" },
  { key: "channel", header: "Channel", width: "w-[18%]", badge: "outline" },
  { key: "durationSec", header: "Duration", width: "w-[18%]", render: (v) => `${Number(v ?? 0)}s` },
  { key: "cta", header: "CTA", width: "w-[20%]" },
];

export function ScriptsView() {
  const controller = useScriptsController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/scripts/${id}`}
      description="Template hook, beat, dan CTA"
    />
  );
}
