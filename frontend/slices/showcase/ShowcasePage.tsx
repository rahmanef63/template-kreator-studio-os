"use client";

import { ConceptListPage } from "@/features/_shared/concepts/ConceptListPage";
import { showcaseAdapter } from "@/features/_app/concepts";

/**
 * Showcase gallery — now rendered via the shared ConceptListPage default grid
 * (visual unification across the fleet). Adapter-only; the original bespoke
 * asymmetric/spotlight grid + stats strip + comments section are intentionally
 * replaced by the uniform card grid. Data still flows through useShowcase().
 */
export function ShowcasePage() {
  return <ConceptListPage adapter={showcaseAdapter} />;
}
