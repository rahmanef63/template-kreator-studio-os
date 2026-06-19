"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useAssetsController } from "./AssetEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Asset } from "@/features/_app/types";

const META: EntityMeta = { label: "Asset", labelPlural: "Media Library" };

const COLUMNS: ColumnDef<Asset>[] = [
  { key: "title", header: "Title", width: "w-[40%]" },
  { key: "kind", header: "Kind", width: "w-[18%]", badge: "outline" },
  { key: "fileLabel", header: "File", width: "w-[42%]", mono: true },
];

export function AssetsView() {
  const controller = useAssetsController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/assets/${id}`}
      description="B-roll, headshot, logo, audio"
    />
  );
}
