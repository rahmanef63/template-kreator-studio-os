import type {
  FaqItem,
  PricingTier,
  StatItem,
  TestimonialItem,
} from "@/features/_shared/landing/sections";
import { PUBLIC_BASE } from "@/features/_app/nav-config";
import { SEED_PACKAGES } from "@/features/_app/public-seed";
import {
  SEED_FEATURED_CLIENTS,
  SEED_TESTIMONIALS,
} from "@/features/_app/testimonials-seed";
import type {
  FeaturedClient,
  PricingPackage,
  Testimonial,
} from "@/features/_app/types";
import { STATS, FAQS } from "@/convex/landingContent";

/** Kreator Studio defaults for the shared landing sections — every value
 *  overridable per-section via the admin landing editor's config JSON
 *  (keys documented in _shared/landing/sections/config.ts).
 *
 *  Default landing content lives in convex/landingContent.ts — the SINGLE
 *  source the seed also reads (it writes the same content into Convex config).
 *  These re-exports are the render fallback before the seed runs; edit the
 *  content in that module, not here. FEATURE_ITEMS (icon-bearing) is derived
 *  in feature-config.ts and re-exported below. */

export { FEATURE_ITEMS } from "./feature-config";

export const KREATOR_STATS: StatItem[] = STATS;

/** Trusted-by marquee names — live featured-clients store first, falling
 *  back to the same seed const the testimonials wall uses (one source,
 *  no duplicated brand list). */
export function clientNames(clients: FeaturedClient[]): string[] {
  return (clients.length > 0 ? clients : SEED_FEATURED_CLIENTS).map((c) => c.name);
}

/** Wall-of-love store rows → shared TestimonialsSection items. Store data
 *  is the source; testimonials-seed only kicks in on an empty DB. */
export function toTestimonialItems(rows: Testimonial[]): TestimonialItem[] {
  return (rows.length > 0 ? rows : SEED_TESTIMONIALS).map((t) => ({
    quote: t.quote,
    author: t.author,
    role: t.company ? `${t.role} · ${t.company}` : t.role,
    rating: t.rating,
  }));
}

/** Service packages (pricing slice store) → shared PricingSection tiers.
 *  Featured flag survives so "Carousel Pack" keeps its spotlight. */
export function toPricingTiers(rows: PricingPackage[]): PricingTier[] {
  return (rows.length > 0 ? rows : SEED_PACKAGES).map((p) => ({
    name: p.name,
    price: p.price,
    period: p.period,
    blurb: p.tagline,
    features: p.bullets,
    featured: p.featured,
    ctaLabel: "Mulai diskusi",
    ctaHref: `${PUBLIC_BASE}/about`,
  }));
}

/** Featured-tier badge text — reuses the package's own badge label. */
export function featuredBadgeOf(rows: PricingPackage[]): string {
  const source = rows.length > 0 ? rows : SEED_PACKAGES;
  return source.find((p) => p.featured)?.badge ?? "Paling laku";
}

export const KREATOR_FAQS: FaqItem[] = FAQS;
