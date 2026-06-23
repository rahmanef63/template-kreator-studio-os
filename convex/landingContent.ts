// SINGLE SOURCE of Kreator Studio's landing example content.
//
// Imported by BOTH:
//  - convex/seed.ts → seeds each item section's `config` into landingSections,
//    so a fresh clone gets EDITABLE example data in the admin landing editor
//    (not just code-only defaults).
//  - frontend/slices/home/* → the render fallback (used before the seed runs).
//
// MUST stay framework-pure: no convex/server, no convex/values, no React/lucide
// imports — only literals + plain types — so the Convex bundler AND the Next
// client can both import it. Feature icons are lucide NAMES (string), resolved
// to components in feature-config.ts. Hrefs are root-relative (publicBase = "").
//
// Edit content HERE once; the seed and the render both follow. No drift.

export type LcStat = { value: number; prefix?: string; suffix?: string; label: string };
export type LcFeature = { icon: string; title: string; blurb: string };
export type LcTier = {
  name: string;
  price: string;
  period?: string;
  blurb?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
};
export type LcFaq = { q: string; a: string };

export const HERO = {
  title: "Newsletter & content notes untuk creator yang serius.",
  subtitle:
    "Tiap minggu — strategi konten, breakdown viral hits, dan template yang bisa kamu pakai langsung.",
  badge: "Issue mingguan untuk creator",
};

// Grounded in seed data: 12.4K newsletter list, ±1.8M monthly views
// (PERFORMANCE total), 38% avg open rate, 7 brand di client strip.
export const STATS: LcStat[] = [
  { value: 12400, suffix: "+", label: "Newsletter subscribers" },
  { value: 1800000, suffix: "+", label: "Views per bulan" },
  { value: 38, suffix: "%", label: "Rata-rata open rate" },
  { value: 7, label: "Brand collab" },
];

export const FEATURES: LcFeature[] = [
  { icon: "CalendarDays", title: "Multi-channel Planner", blurb: "Plan IG, TikTok, YouTube, newsletter dari satu calendar." },
  { icon: "Mic", title: "Voice Trainer", blurb: "Train AI dengan brand voice kamu — do/don't examples." },
  { icon: "Wand2", title: "Repurposing Engine", blurb: "1 long-form → 5 shorts, 3 carousel, 1 newsletter otomatis." },
  { icon: "Mail", title: "Newsletter Native", blurb: "Compose, schedule, ukur open rate — semua in-app." },
];

export const FAQS: LcFaq[] = [
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
