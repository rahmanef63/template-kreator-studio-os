"use client";

import * as React from "react";
import { CrudFormView } from "@/components/templates/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/components/templates/_shared/crud/types";
import { useStore, nid } from "../../../shared/store";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { Asset } from "../../../shared/types";

const META: EntityMeta = { label: "Asset", labelPlural: "Media Library" };

export const FIELDS: FieldDef<Asset>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  {
    kind: "select",
    key: "kind",
    label: "Kind",
    options: [
      { value: "photo", label: "Photo" },
      { value: "video", label: "Video" },
      { value: "audio", label: "Audio" },
      { value: "graphic", label: "Graphic" },
    ],
  },
  { kind: "text", key: "fileLabel", label: "File label", placeholder: "headshot.jpg" },
  { kind: "image", key: "url", label: "URL", wide: true },
  { kind: "date", key: "uploadedAt", label: "Uploaded" },
];

export function useAssetsController(): CrudController<Asset> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.assets,
      getId: (a) => a.id,
      blank: () => ({
        id: nid("ast"),
        title: "",
        kind: "photo",
        url: "",
        fileLabel: "",
        uploadedAt: Date.now(),
      }),
      create: (asset) => dispatch({ type: "asset.upsert", asset }),
      update: (id, patch) => {
        const cur = state.assets.find((a) => a.id === id);
        if (!cur) return;
        dispatch({ type: "asset.upsert", asset: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "asset.delete", id }),
    }),
    [state.assets, dispatch],
  );
}

export function AssetEditorView({ id }: { id: string }) {
  const controller = useAssetsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/assets`}
    />
  );
}
