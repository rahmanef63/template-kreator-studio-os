// Landing-page section seed — split from seed.ts (200-LOC cap convention,
// same as journal-seed / testimonials-seed / monetization-seed).
// ~12-section rhythm: hero → stats → features → portfolio → showcase →
// testimonials → pricing → faq → blog (posts) → journal → cta → newsletter.
// All copy/order/visibility admin-editable via /admin → Landing page.

import type { LandingSection } from "@/features/_shared/landing/types";
import { HERO, STATS, FEATURES, FAQS } from "@/convex/landingContent";

// Item-bearing sections (stats/features/faq) and the hero copy derive their
// content from convex/landingContent.ts — the SAME single-source module the
// convex seed reads — so this render fallback never drifts from what gets
// seeded into Convex `config`. Edit content in that module, not here.
export const SEED_LANDING_SECTIONS: LandingSection[] = [
  {
    id: "ls-hero",
    order: 10,
    kind: "hero",
    title: HERO.title,
    subtitle: HERO.subtitle,
    enabled: true,
    config: JSON.stringify({ badge: HERO.badge }),
    layers: [
      { id: "hero-photo", type: "image", placement: "background", opacity: 100, enabled: true, url: "/hero.webp" },
    ],
  },
  {
    id: "ls-stats",
    order: 15,
    kind: "stats",
    title: "Angka yang jalan tiap minggu",
    subtitle: "Subscribers, views, dan brand yang sudah collab — live dari workspace ini.",
    enabled: true,
    config: JSON.stringify({ stats: STATS }),
  },
  {
    id: "ls-features",
    order: 20,
    kind: "features",
    title: "Apa yang ada di balik newsletter ini",
    subtitle: "Workspace kreator yang sama saya pakai untuk produce content tiap minggu.",
    enabled: true,
    config: JSON.stringify({ items: FEATURES }),
  },
  {
    id: "ls-portfolio",
    order: 30,
    kind: "portfolio",
    title: "Highlight social posts",
    subtitle: "Yang paling resonance bulan ini di IG, TikTok, dan YouTube.",
    enabled: true,
  },
  {
    id: "ls-showcase",
    order: 35,
    kind: "services",
    title: "Karya & campaign terpilih",
    subtitle: "Carousel, video, dan campaign yang perform paling kuat.",
    enabled: true,
    config: '{"limit":3}',
  },
  {
    id: "ls-testimonials",
    order: 40,
    kind: "testimonials",
    title: "Kata mereka yang sudah kerja bareng",
    subtitle: "Brand, klien, dan reader newsletter — real words, real outcomes.",
    enabled: true,
    config: '{"limit":6}',
  },
  {
    id: "ls-pricing",
    order: 45,
    kind: "pricing",
    title: "Paket kerja sama",
    subtitle: "Newsletter sponsor, carousel pack, sampai custom production — semua transparan.",
    enabled: true,
  },
  {
    id: "ls-faq",
    order: 50,
    kind: "faq",
    title: "Sering ditanya brand & creator",
    subtitle: "Soal kolaborasi, rate card, lisensi konten, dan timeline produksi.",
    enabled: true,
    config: JSON.stringify({ items: FAQS }),
  },
  {
    id: "ls-blog",
    order: 55,
    kind: "blog",
    title: "Issue terbaru",
    subtitle: "Klik untuk baca arsip lengkap.",
    enabled: true,
    config: '{"limit":3}',
  },
  {
    id: "ls-journal",
    order: 60,
    kind: "changelog",
    title: "Journal — di balik layar",
    subtitle: "Lesson, eksperimen, dan essay panjang di luar feed newsletter.",
    enabled: true,
    config: '{"limit":3}',
  },
  {
    id: "ls-cta",
    order: 65,
    kind: "cta",
    title: "Mau bikin campaign yang resonance?",
    subtitle: "Brief call 15 menit, gratis — saya bantu rekomendasi format yang fit.",
    enabled: true,
  },
  {
    id: "ls-newsletter",
    order: 70,
    kind: "newsletter",
    title: "Subscribe newsletter",
    subtitle: "12K subscribers · 38% avg open rate · gratis selamanya.",
    enabled: true,
  },
];
