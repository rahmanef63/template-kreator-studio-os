"use client";

import {
  HeroBlock,
  SectionHead,
  FeatureGrid,
  CtaBand,
} from "@/features/_shared";
import { LandingSectionShell } from "@/features/_shared/landing/LandingSectionShell";
import { parseConfigBadge } from "@/features/_shared/landing/parse-config";
import {
  CustomSection,
  FaqSection,
  NewsletterSection,
  PricingSection,
  StatsSection,
  TestimonialsSection,
} from "@/features/_shared/landing/sections";
import type { LandingSection } from "@/features/_shared/landing/types";
import { ADMIN_BASE, PUBLIC_BASE } from "@/features/_app/nav-config";
import type {
  ContentItem,
  FeaturedClient,
  JournalEntry,
  NewsletterIssue,
  PricingPackage,
  ShowcaseItem,
  Testimonial,
} from "@/features/_app/types";
import {
  clientNames,
  featuredBadgeOf,
  FEATURE_ITEMS,
  KREATOR_FAQS,
  KREATOR_STATS,
  toPricingTiers,
  toTestimonialItems,
} from "./LandingExtras";
import {
  ContentHighlights,
  JournalTeaser,
  PostsTeaser,
  ShowcaseTeaser,
} from "./LandingTeasers";
import { HERO_IMG } from "./home-data";

interface Deps {
  contents: ContentItem[];
  newsletters: NewsletterIssue[];
  testimonials: Testimonial[];
  packages: PricingPackage[];
  showcase: ShowcaseItem[];
  journal: JournalEntry[];
  featuredClients: FeaturedClient[];
  onSubscribe?: (email: string) => Promise<{ ok: boolean; notice?: string }>;
}

/**
 * Maps each enabled landingSection.kind to its kreator-studio renderer.
 * Admin-editable title/subtitle/config thread through everywhere; rich
 * kinds read the same stores their public slices use (newsletters →
 * /posts, journal, showcase, testimonials, packages, featuredClients).
 */
export function renderLanding(section: LandingSection, deps: Deps) {
  switch (section.kind) {
    case "hero":
      return (
        <LandingSectionShell section={section}>
          <HeroBlock
            glow
            backgroundImage={HERO_IMG}
            badge={parseConfigBadge(section.config) ?? "Issue mingguan untuk creator"}
            title={section.title}
            subtitle={section.subtitle}
            primaryCta={{ label: "Baca issue terbaru", href: `${PUBLIC_BASE}/posts` }}
            secondaryCta={{ label: "Kerja sama brand", href: `${PUBLIC_BASE}/pricing` }}
          />
        </LandingSectionShell>
      );

    case "stats":
      return (
        <LandingSectionShell section={section} defaultClassName="border-y border-border/50 bg-muted/10">
          <StatsSection section={section} stats={KREATOR_STATS} clients={clientNames(deps.featuredClients)} />
        </LandingSectionShell>
      );

    case "features":
      return (
        <LandingSectionShell section={section} defaultClassName="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHead
            eyebrow="Workspace"
            title={section.title}
            subtitle={section.subtitle}
            cta={{ label: "Buka workspace", href: ADMIN_BASE }}
          />
          <FeatureGrid items={FEATURE_ITEMS} columns={4} className="mt-10" />
        </LandingSectionShell>
      );

    case "portfolio":
      return (
        <LandingSectionShell section={section} defaultClassName="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ContentHighlights section={section} items={deps.contents} />
        </LandingSectionShell>
      );

    case "services":
      return (
        <LandingSectionShell section={section} defaultClassName="border-y border-border/50 bg-muted/10">
          <ShowcaseTeaser section={section} items={deps.showcase} />
        </LandingSectionShell>
      );

    case "testimonials":
      return (
        <LandingSectionShell section={section}>
          <TestimonialsSection
            section={section}
            eyebrow="Wall of love"
            items={toTestimonialItems(deps.testimonials)}
          />
        </LandingSectionShell>
      );

    case "pricing":
      return (
        <LandingSectionShell section={section} defaultClassName="border-y border-border/50 bg-muted/10">
          <PricingSection
            section={section}
            tiers={toPricingTiers(deps.packages)}
            featuredBadge={featuredBadgeOf(deps.packages)}
          />
        </LandingSectionShell>
      );

    case "faq":
      return (
        <LandingSectionShell section={section}>
          <FaqSection
            section={section}
            items={KREATOR_FAQS}
            ctaLabel="Book brief call"
            ctaHref={`${PUBLIC_BASE}/about`}
          />
        </LandingSectionShell>
      );

    case "blog":
      return (
        <LandingSectionShell section={section} defaultClassName="border-t border-border/50">
          <PostsTeaser section={section} issues={deps.newsletters} />
        </LandingSectionShell>
      );

    case "changelog":
      return (
        <LandingSectionShell section={section}>
          <JournalTeaser section={section} entries={deps.journal} />
        </LandingSectionShell>
      );

    case "cta":
      return (
        <LandingSectionShell section={section}>
          <CtaBand
            title={section.title}
            subtitle={section.subtitle ?? "Brief call 15 menit, gratis."}
            cta={{ label: "Book brief call", href: `${PUBLIC_BASE}/about` }}
            secondaryCta={{ label: "Lihat pricing", href: `${PUBLIC_BASE}/pricing` }}
          />
        </LandingSectionShell>
      );

    case "newsletter":
      return (
        <LandingSectionShell section={section}>
          <NewsletterSection section={section} placeholder="email@kamu.com" buttonLabel="Subscribe" onSubscribe={deps.onSubscribe} />
        </LandingSectionShell>
      );

    case "custom":
      return (
        <LandingSectionShell section={section}>
          <CustomSection section={section} />
        </LandingSectionShell>
      );

    default:
      return null;
  }
}
