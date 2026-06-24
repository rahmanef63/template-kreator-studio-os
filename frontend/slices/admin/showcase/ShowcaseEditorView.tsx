"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { ShowcaseItem } from "@/features/_app/types";

const META: EntityMeta = { label: "Showcase item", labelPlural: "Showcase" };

export const FIELDS: FieldDef<ShowcaseItem>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  {
    kind: "select",
    key: "kind",
    label: "Kind",
    options: [
      { value: "carousel", label: "Carousel" },
      { value: "video", label: "Video" },
      { value: "campaign", label: "Campaign" },
      { value: "newsletter", label: "Newsletter" },
    ],
  },
  { kind: "text", key: "client", label: "Client" },
  { kind: "textarea", key: "blurb", label: "Blurb", rows: 2 },
  { kind: "text", key: "metric", label: "Metric", placeholder: "1.2M views" },
  { kind: "text", key: "gradient", label: "Gradient", mono: true, placeholder: "from-fuchsia-500 to-purple-600" },
  { kind: "text", key: "emoji", label: "Emoji", placeholder: "🎬" },
  { kind: "imagePicker", key: "image", label: "Image", wide: true },
  { kind: "date", key: "publishedAt", label: "Published" },
];

export function useShowcaseController(): CrudController<ShowcaseItem> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.showcase,
      getId: (s) => s.id,
      blank: () => ({
        id: nid("show"),
        title: "",
        kind: "carousel",
        client: "",
        blurb: "",
        metric: "",
        gradient: "from-fuchsia-500 to-purple-600",
        emoji: "✨",
        publishedAt: Date.now(),
      }),
      create: (item) => dispatch({ type: "showcase.upsert", item }),
      update: (id, patch) => {
        const cur = state.showcase.find((s) => s.id === id);
        if (!cur) return;
        dispatch({ type: "showcase.upsert", item: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "showcase.delete", id }),
    }),
    [state.showcase, dispatch],
  );
}

export function ShowcaseEditorView({ id }: { id: string }) {
  const controller = useShowcaseController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/showcase`}
    />
  );
}
