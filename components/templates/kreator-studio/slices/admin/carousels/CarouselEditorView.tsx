"use client";

import * as React from "react";
import { CrudFormView } from "@/components/templates/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/components/templates/_shared/crud/types";
import { useStore, nid } from "../../../shared/store";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { Carousel } from "../../../shared/types";

const META: EntityMeta = { label: "Carousel", labelPlural: "Carousel Builder" };

// Slides ({heading, body}[]) are edited via a dedicated slide editor (deferred);
// here we manage title/channel/timestamp and preserve existing slides on update.
export const FIELDS: FieldDef<Carousel>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  {
    kind: "select",
    key: "channel",
    label: "Channel",
    options: [
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "twitter", label: "Twitter" },
      { value: "newsletter", label: "Newsletter" },
      { value: "linkedin", label: "LinkedIn" },
    ],
  },
  { kind: "date", key: "updatedAt", label: "Updated" },
];

export function useCarouselsController(): CrudController<Carousel> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.carousels,
      getId: (c) => c.id,
      blank: () => ({
        id: nid("car"),
        title: "",
        slides: [{ heading: "Slide 1", body: "" }],
        channel: "instagram",
        updatedAt: Date.now(),
      }),
      create: (carousel) => dispatch({ type: "carousel.upsert", carousel }),
      update: (id, patch) => {
        const cur = state.carousels.find((c) => c.id === id);
        if (!cur) return;
        dispatch({ type: "carousel.upsert", carousel: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "carousel.delete", id }),
    }),
    [state.carousels, dispatch],
  );
}

export function CarouselEditorView({ id }: { id: string }) {
  const controller = useCarouselsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/carousels`}
    />
  );
}
