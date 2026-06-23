// Feature-section config resolver for the kreator-studio LandingRenderer.
// Icons can't live in JSON config, so admin feature items carry a lucide
// icon NAME (string) which we map back to a component here. Unknown/missing
// names fall back to Sparkles so the grid never renders an empty cell.

import { CalendarDays, Mail, Mic, Sparkles, Wand2 } from "lucide-react";
import type { FeatureItem } from "@/features/_shared";
import { FEATURES } from "@/convex/landingContent";

const FEATURE_ICONS: Record<string, FeatureItem["icon"]> = {
  CalendarDays,
  Mic,
  Wand2,
  Mail,
  Sparkles,
};

// Render fallback, derived from the single source (convex/landingContent.ts).
// The seed writes the same FEATURES (icon NAMES) into Convex config; here the
// names map back to lucide components for the local fallback.
export const FEATURE_ITEMS: FeatureItem[] = FEATURES.map((f) => ({
  icon: FEATURE_ICONS[f.icon] ?? Sparkles,
  title: f.title,
  blurb: f.blurb,
}));
