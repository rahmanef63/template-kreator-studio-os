"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useVoicesController } from "./VoiceEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { VoiceProfile } from "@/features/_app/types";

const META: EntityMeta = { label: "Voice profile", labelPlural: "Voice Profiles" };

const COLUMNS: ColumnDef<VoiceProfile>[] = [
  { key: "name", header: "Name", width: "w-[28%]" },
  { key: "tone", header: "Tone", width: "w-[28%]" },
  { key: "doExamples", header: "Do", width: "w-[22%]", render: (v) => `${(v as string[] | undefined)?.length ?? 0} examples` },
  { key: "dontExamples", header: "Don't", width: "w-[22%]", render: (v) => `${(v as string[] | undefined)?.length ?? 0} examples` },
];

export function VoiceView() {
  const controller = useVoicesController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/voice/${id}`}
      description="Brand voice trainer"
    />
  );
}
