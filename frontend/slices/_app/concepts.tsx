"use client";

import * as React from "react";
import { useJournal, useShowcase } from "@/features/_app/store";
import { PUBLIC_BASE } from "@/features/_app/nav-config";
import type {
  ConceptCard,
  ConceptListAdapter,
} from "@/features/_shared/concepts/ConceptListPage";

/**
 * Per-template CONCEPT REGISTRY — maps a canonical concept to {data selector +
 * field map + link}, consumed by the shared ConceptListPage (default grid via
 * ConceptCardView). Adapter-only: wraps existing selectors, no schema/table/
 * state rename → zero data migration. Every template ships its own copy of this
 * file pointing at its own tables, giving one consistent list UI fleet-wide.
 */

export const journalAdapter: ConceptListAdapter = {
  header: {
    eyebrow: "Journal",
    title: "Catatan, lesson, dan behind-the-scenes.",
    subtitle:
      "Lebih panjang dari newsletter, lebih honest dari LinkedIn. Tempat untuk long-form thinking yang masih in-progress.",
  },
  columns: 2,
  emptyText: "Belum ada entry di kategori ini.",
  hrefFor: (c) => `${PUBLIC_BASE}/journal/${c.slug}`,
  useCards: () => {
    const entries = useJournal();
    return React.useMemo<ConceptCard[]>(
      () =>
        entries.map((e) => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          excerpt: e.excerpt,
          date: e.publishedAt,
          tags: [e.category.replace("-", " ")],
        })),
      [entries],
    );
  },
};

export const showcaseAdapter: ConceptListAdapter = {
  header: {
    eyebrow: "Showcase",
    title: "Highlight karya terpilih.",
    subtitle:
      "Campaign, carousel, dan video yang resonate sama audience. Mix antara work klien dan editorial sendiri.",
  },
  columns: 3,
  emptyText: "Belum ada item di kategori ini.",
  // No per-item detail route in this template — link to the list base.
  hrefFor: () => `${PUBLIC_BASE}/showcase`,
  useCards: () => {
    const items = useShowcase();
    return React.useMemo<ConceptCard[]>(
      () =>
        items.map((i) => ({
          id: i.id,
          slug: i.id,
          title: i.title,
          excerpt: i.blurb,
          cover: i.image ?? "",
          date: i.publishedAt,
          tags: [i.kind],
        })),
      [items],
    );
  },
};
