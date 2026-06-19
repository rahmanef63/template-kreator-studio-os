"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid, slugify } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { JournalEntry } from "@/features/_app/types";

const META: EntityMeta = { label: "Journal entry", labelPlural: "Journal" };

export const FIELDS: FieldDef<JournalEntry>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  { kind: "text", key: "slug", label: "Slug", mono: true, placeholder: "auto from title", wide: true },
  { kind: "textarea", key: "excerpt", label: "Excerpt", rows: 2 },
  { kind: "textarea", key: "body", label: "Body", rows: 8, hint: "Paragraphs separated by a blank line." },
  {
    kind: "select",
    key: "category",
    label: "Category",
    options: [
      { value: "behind-the-scenes", label: "Behind the scenes" },
      { value: "lesson", label: "Lesson" },
      { value: "experiment", label: "Experiment" },
      { value: "essay", label: "Essay" },
    ],
  },
  { kind: "number", key: "readMinutes", label: "Read minutes", min: 1 },
  { kind: "date", key: "publishedAt", label: "Published" },
];

export function useJournalController(): CrudController<JournalEntry> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.journal,
      getId: (j) => j.id,
      blank: () => ({
        id: nid("jrn"),
        slug: "",
        title: "",
        excerpt: "",
        body: "",
        category: "essay",
        readMinutes: 4,
        publishedAt: Date.now(),
      }),
      create: (entry) =>
        dispatch({ type: "journal.upsert", entry: { ...entry, slug: entry.slug || slugify(entry.title) } }),
      update: (id, patch) => {
        const cur = state.journal.find((j) => j.id === id);
        if (!cur) return;
        const next = { ...cur, ...patch, id };
        dispatch({ type: "journal.upsert", entry: { ...next, slug: next.slug || slugify(next.title) } });
      },
      remove: (id) => dispatch({ type: "journal.delete", id }),
    }),
    [state.journal, dispatch],
  );
}

export function JournalEditorView({ id }: { id: string }) {
  const controller = useJournalController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/journal`}
    />
  );
}
