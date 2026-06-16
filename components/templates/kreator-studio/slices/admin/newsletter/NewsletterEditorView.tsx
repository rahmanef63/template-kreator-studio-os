"use client";

import * as React from "react";
import { CrudFormView } from "@/components/templates/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/components/templates/_shared/crud/types";
import { useStore, nid } from "../../../shared/store";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { NewsletterIssue } from "../../../shared/types";

const META: EntityMeta = { label: "Issue", labelPlural: "Newsletter Issues" };

export const FIELDS: FieldDef<NewsletterIssue>[] = [
  { kind: "text", key: "subject", label: "Subject", wide: true },
  { kind: "textarea", key: "preview", label: "Preview", rows: 2 },
  {
    kind: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "draft", label: "Draft" },
      { value: "scheduled", label: "Scheduled" },
      { value: "sent", label: "Sent" },
    ],
  },
  { kind: "date", key: "scheduledAt", label: "Scheduled at" },
  { kind: "number", key: "recipients", label: "Recipients", min: 0 },
  { kind: "number", key: "openRate", label: "Open rate %", min: 0, max: 100, step: 0.1 },
];

export function useNewslettersController(): CrudController<NewsletterIssue> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.newsletters,
      getId: (n) => n.id,
      blank: () => ({
        id: nid("nl"),
        subject: "",
        preview: "",
        status: "draft",
        scheduledAt: Date.now(),
        recipients: 0,
        openRate: 0,
      }),
      create: (issue) => dispatch({ type: "newsletter.upsert", issue }),
      update: (id, patch) => {
        const cur = state.newsletters.find((n) => n.id === id);
        if (!cur) return;
        dispatch({ type: "newsletter.upsert", issue: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "newsletter.delete", id }),
    }),
    [state.newsletters, dispatch],
  );
}

export function NewsletterEditorView({ id }: { id: string }) {
  const controller = useNewslettersController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/newsletter`}
    />
  );
}
