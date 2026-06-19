import { CalendarDays, Mail, Mic, Wand2 } from "lucide-react";
import type { FeatureItem } from "@/features/_shared";
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

/** Kreator Studio defaults for the shared landing sections — every value
 *  overridable per-section via the admin landing editor's config JSON
 *  (keys documented in _shared/landing/sections/config.ts). */

export const FEATURE_ITEMS: FeatureItem[] = [
  { icon: CalendarDays, title: "Multi-channel Planner", blurb: "Plan IG, TikTok, YouTube, newsletter dari satu calendar." },
  { icon: Mic, title: "Voice Trainer", blurb: "Train AI dengan brand voice kamu — do/don't examples." },
  { icon: Wand2, title: "Repurposing Engine", blurb: "1 long-form → 5 shorts, 3 carousel, 1 newsletter otomatis." },
  { icon: Mail, title: "Newsletter Native", blurb: "Compose, schedule, ukur open rate — semua in-app." },
];

// Grounded in seed data: 12.4K newsletter list, ±1.8M monthly views
// (SEED_PERFORMANCE total), 38% avg open rate, 7 brand di client strip.
export const KREATOR_STATS: StatItem[] = [
  { value: 12400, suffix: "+", label: "Newsletter subscribers" },
  { value: 1800000, suffix: "+", label: "Views per bulan" },
  { value: 38, suffix: "%", label: "Rata-rata open rate" },
  { value: 7, label: "Brand collab" },
];

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

export const KREATOR_FAQS: FaqItem[] = [
  {
    q: "Bagaimana alur kolaborasi dengan brand?",
    a: "Mulai dari brief call 45 menit (gratis) — bahas goal, audiens, dan format yang fit. Proposal + timeline saya kirim H+2, produksi jalan setelah brief disepakati.",
  },
  {
    q: "Apakah ada rate card resmi?",
    a: "Empat paket utama transparan di halaman Pricing — Newsletter Sponsor, Carousel Pack, Custom Production, dan Strategy Sprint. Untuk custom scope, email saja; biasanya saya balas H+1 kerja dengan estimasi awal.",
  },
  {
    q: "Bagaimana lisensi konten yang diproduksi?",
    a: "Default: brand dapat lisensi penggunaan organik 12 bulan di channel sendiri. Paid amplification (ads/boost) dan whitelisting dihitung terpisah — semuanya tertulis jelas di proposal.",
  },
  {
    q: "Berapa lama timeline produksi?",
    a: "Newsletter sponsor ~7 hari kerja, carousel pack ~14 hari, custom production 30–45 hari termasuk strategy sprint. Slot dibatasi 2 campaign per bulan supaya kualitas kejaga.",
  },
  {
    q: "Cara kontak paling cepat?",
    a: "Book brief call lewat halaman About, atau reply newsletter issue mana pun — inbox itu saya baca sendiri tiap hari.",
  },
];
