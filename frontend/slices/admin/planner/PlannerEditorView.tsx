"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { ContentItem } from "@/features/_app/types";

const META: EntityMeta = { label: "Content", labelPlural: "Content Calendar" };

const CHANNEL_OPTS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter" },
  { value: "newsletter", label: "Newsletter" },
  { value: "linkedin", label: "LinkedIn" },
];

export const FIELDS: FieldDef<ContentItem>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  { kind: "select", key: "channel", label: "Channel", options: CHANNEL_OPTS },
  {
    kind: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "idea", label: "Idea" },
      { value: "draft", label: "Draft" },
      { value: "scheduled", label: "Scheduled" },
      { value: "published", label: "Published" },
    ],
  },
  { kind: "text", key: "hook", label: "Hook", wide: true },
  { kind: "textarea", key: "body", label: "Body", rows: 5 },
  { kind: "date", key: "scheduledAt", label: "Scheduled at" },
  { kind: "number", key: "views", label: "Views", min: 0 },
  { kind: "number", key: "likes", label: "Likes", min: 0 },
];

export function useContentsController(): CrudController<ContentItem> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.contents,
      getId: (c) => c.id,
      blank: () => ({
        id: nid("cnt"),
        title: "",
        channel: "instagram",
        status: "idea",
        hook: "",
        body: "",
        scheduledAt: 0,
        views: 0,
        likes: 0,
      }),
      create: (item) => dispatch({ type: "content.upsert", item }),
      update: (id, patch) => {
        const cur = state.contents.find((c) => c.id === id);
        if (!cur) return;
        dispatch({ type: "content.upsert", item: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "content.delete", id }),
    }),
    [state.contents, dispatch],
  );
}

export function PlannerEditorView({ id }: { id: string }) {
  const controller = useContentsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/planner`}
    />
  );
}
