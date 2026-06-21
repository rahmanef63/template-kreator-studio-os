"use client";

import { ConceptListPage } from "@/features/_shared/concepts/ConceptListPage";
import { journalAdapter } from "@/features/_app/concepts";

/**
 * Journal feed — now rendered via the shared ConceptListPage default grid
 * (visual unification across the fleet). Adapter-only; the original bespoke
 * featured-hero + asymmetric grid is intentionally replaced by the uniform
 * card grid. Data still flows through useJournal() unchanged.
 */
export function JournalListPage() {
  return <ConceptListPage adapter={journalAdapter} />;
}
