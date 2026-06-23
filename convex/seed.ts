import { mutation, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireUser } from "./_shared/auth";
import { HERO, STATS, FEATURES, FAQS } from "./landingContent";

// Demo seed for Kreator Studio OS.
// - `seed:run`        — CLI/power use: wipes content then inserts (npx convex run seed:run).
// - `seed:seedSample` — in-app one-click for non-coders: requires login, inserts
//                       ONLY when the site is still empty (never wipes real work).
//
// Data mirrors components/templates/kreator-studio/shared/*-seed.ts (the former
// localStorage SEED_STATE), converted to Convex inserts.
const now = 1_780_000_000_000;
const day = (n: number) => now - n * 24 * 60 * 60 * 1000;
const future = (n: number) => now + n * 24 * 60 * 60 * 1000;

const CONTENTS = [
  { title: "5 trik produktivitas yang underrated", channel: "instagram" as const, status: "scheduled" as const, hook: "Yang nomor 3 mungkin bikin kamu kaget.", body: "List 5 trik produktivitas yang jarang dibahas tapi efeknya gede — batching, time-blocking, sistem inbox-zero, dan dua kebiasaan kecil yang menghemat satu jam tiap hari.", scheduledAt: future(2), views: 0, likes: 0 },
  { title: "Cara saya plan content 1 minggu dalam 1 jam", channel: "tiktok" as const, status: "published" as const, hook: "POV: kamu bisa plan seminggu cuma 1 jam.", body: "Step by step bikin content calendar pakai sistem batching.", scheduledAt: day(3), views: 48200, likes: 3140 },
  { title: "Why your newsletter ga grow", channel: "newsletter" as const, status: "draft" as const, hook: "Bukan karena writing kamu jelek.", body: "Analisis 5 alasan utama newsletter kamu stagnan dan cara fix-nya.", scheduledAt: 0, views: 0, likes: 0 },
];

const VOICES = [
  { name: "Casual Indonesian", description: "Brand voice utama — santai, relate-able, sedikit humor.", doExamples: ["Pakai 'gue/lo' kalau audiens Jakarta-centric.", "Mulai dengan hook pertanyaan atau POV.", "Pakai metafora sehari-hari."], dontExamples: ["Jangan pakai jargon corporate.", "Hindari kata 'sinergi', 'leverage'.", "Jangan terlalu formal."], tone: "santai, friendly, sedikit playful", trainedAt: day(20) },
  { name: "Profesional EYD", description: "Untuk konten LinkedIn, newsletter B2B, partnership pitch.", doExamples: ["Pakai 'saya/Anda', struktur EYD.", "Sertakan data atau studi kasus.", "Tutup dengan CTA yang jelas."], dontExamples: ["Jangan slang.", "Hindari emoji berlebihan."], tone: "profesional, lugas, tepercaya", trainedAt: day(8) },
  { name: "Edukatif Singkat", description: "Untuk reel/short — caption pendek, eduktif, snackable.", doExamples: ["Maks 3 kalimat.", "Bullet point.", "End dengan call-to-think."], dontExamples: ["Jangan story panjang.", "Hindari detail teknis."], tone: "padat, jelas, action-oriented", trainedAt: day(2) },
];

const SCRIPTS = [
  { title: "Reel — 5 trik produktivitas", channel: "instagram" as const, durationSec: 60, hook: "Yang nomor 3 mungkin bikin kamu kaget.", beats: ["0-5s: Hook + gestur tunjuk kamera", "5-15s: Trik #1 + visual transisi", "15-30s: Trik #2 dan #3", "30-50s: Trik #4 dan #5", "50-60s: CTA follow + next reel"], cta: "Follow buat tips harian.", updatedAt: day(1) },
  { title: "TikTok — content batching", channel: "tiktok" as const, durationSec: 45, hook: "POV: bisa plan seminggu cuma 1 jam.", beats: ["0-3s: Hook visual", "3-15s: Setup masalah", "15-35s: Sistem batching 4-step", "35-45s: CTA save + share"], cta: "Save untuk weekend planning kamu.", updatedAt: day(4) },
  { title: "YouTube — content strategy", channel: "youtube" as const, durationSec: 480, hook: "Saya posting tiap hari selama 90 hari. Ini hasilnya.", beats: ["0-30s: Cold open + claim", "30-180s: Setup eksperimen", "180-360s: 3 lesson learned", "360-480s: CTA + outro"], cta: "Subscribe + comment lesson #1 yang paling kamu setuju.", updatedAt: day(7) },
];

const CAROUSELS = [
  { title: "10 alat creator wajib coba", channel: "instagram" as const, updatedAt: day(2), slides: [{ heading: "10 alat creator wajib coba", body: "Swipe →" }, { heading: "1. Notion", body: "Untuk plan content + database ide." }, { heading: "2. CapCut", body: "Edit video mobile yang super fleksibel." }, { heading: "3. Canva", body: "Design grafis cepat + template ID." }, { heading: "Mana favorit kamu?", body: "Comment di bawah." }] },
  { title: "5 mistake creator pemula", channel: "linkedin" as const, updatedAt: day(6), slides: [{ heading: "5 mistake creator pemula", body: "Yang masih kamu lakukan?" }, { heading: "1. Posting tanpa niche", body: "Audiens bingung mau follow buat apa." }, { heading: "2. Ga konsisten", body: "Algoritma butuh sinyal regular." }, { heading: "3. Ga ada CTA jelas", body: "Tiap post harus ada next step." }] },
];

const ASSETS = [
  { title: "B-roll office aerial", kind: "video" as const, url: "/placeholder-video-1.mp4", fileLabel: "MP4 · 12 MB", uploadedAt: day(2) },
  { title: "Headshot studio Jakarta 2025", kind: "photo" as const, url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=70", fileLabel: "JPG · 2.4 MB", uploadedAt: day(6) },
  { title: "Logo Kreator Studio v3", kind: "graphic" as const, url: "/placeholder-logo.png", fileLabel: "PNG · 80 KB", uploadedAt: day(14) },
];

const NEWSLETTERS = [
  { subject: "Issue #42 — Content Calendar Sistem Saya", preview: "Step by step plan 1 minggu dalam 1 jam.", status: "scheduled" as const, scheduledAt: future(1), recipients: 8240, openRate: 0 },
  { subject: "Issue #41 — 5 Trik Produktivitas", preview: "Yang nomor 3 mungkin bikin kamu kaget.", status: "sent" as const, scheduledAt: day(7), recipients: 8120, openRate: 38.4 },
  { subject: "Issue #40 — Build in Public Update", preview: "Apa yang berhasil + apa yang flop bulan ini.", status: "sent" as const, scheduledAt: day(14), recipients: 7980, openRate: 41.2 },
];

const PERFORMANCE = [
  { channel: "instagram" as const, period: "Mei 2026", views: 482000, followers: 84200, engagementRate: 4.8 },
  { channel: "tiktok" as const, period: "Mei 2026", views: 1240000, followers: 124000, engagementRate: 8.2 },
  { channel: "youtube" as const, period: "Mei 2026", views: 84000, followers: 12400, engagementRate: 6.1 },
];

const COMMENTS = [
  { channel: "instagram" as const, postRef: "Reel — 5 trik produktivitas", comment: "Trik #3 bener-bener game-changer makasih!", reply: "Glad helpful! Yang lain juga coba ya 🙌", status: "draft" as const, ts: now - 30 * 60 * 1000 },
  { channel: "tiktok" as const, postRef: "Cara plan content 1 minggu", comment: "Pakai aplikasi apa untuk batching-nya?", reply: "Aku pakai Notion + Apple Calendar. Akan bikin tutorial detail di newsletter besok.", status: "sent" as const, ts: now - 2 * 60 * 60 * 1000 },
];

const PACKAGES = [
  { name: "Newsletter Sponsor", slug: "newsletter-sponsor", priceNumber: 8_000_000, tagline: "Sponsorship native di issue mingguan.", price: "Rp 8jt", period: "/issue", bullets: ["1 dedicated section di newsletter (~280 word)", "Distribusi ke 12K+ subscribers (38% open rate)", "Brief call 45 menit + 1 revisi draft", "UTM tracking + report performa H+7"], turnaroundDays: 7 },
  { name: "Carousel Pack", slug: "carousel-pack", priceNumber: 12_000_000, tagline: "5 carousel siap-post untuk brand kamu.", price: "Rp 12jt", period: "/pack", bullets: ["5 carousel (8 slide each) — desain + copy", "2 round revisi, file Figma + PNG export", "Caption + hashtag set per carousel", "Bonus: 1 reel script repurposed"], turnaroundDays: 14, featured: true, badge: "Paling laku" },
  // Custom Production = quote-only (no priceNumber) — checkout rejects it; CTA stays "Book brief call".
  { name: "Custom Production", slug: "custom-production", tagline: "End-to-end content untuk launch campaign.", price: "Mulai 35jt", period: "/campaign", bullets: ["Strategy sprint 2 minggu — positioning + hook", "10–15 piece content (mix carousel/reel/long-form)", "Shooting day di Jakarta (kru + B-roll)", "Distribution plan 30 hari + weekly check-in"], turnaroundDays: 45 },
  { name: "Strategy Sprint", slug: "strategy-sprint", priceNumber: 6_000_000, tagline: "Audit + roadmap 90 hari untuk creator/brand.", price: "Rp 6jt", period: "/sprint", bullets: ["Audit 30 post terakhir + content pillars", "Roadmap 90 hari (kalender + KPI)", "Workshop 2 jam (recording disertakan)", "Follow-up async 14 hari (Slack/WhatsApp)"], turnaroundDays: 10 },
];

const SHOWCASE = [
  { title: "Launch Tokopedia Seller Center", kind: "campaign" as const, client: "Tokopedia", blurb: "8-piece campaign untuk relaunch seller dashboard. Mix carousel + reel + long-form.", metric: "2.4M reach", gradient: "from-emerald-500/40 via-teal-500/30 to-cyan-500/40", emoji: "🛒", image: "https://picsum.photos/seed/kreator-tokopedia-seller-center/800/600", publishedAt: day(12) },
  { title: "Carousel — 10 tools creator 2026", kind: "carousel" as const, client: "Editorial", blurb: "8 slide saved 14K kali, repost ke 6 publikasi creator economy.", metric: "186K saves", gradient: "from-fuchsia-500/40 via-pink-500/30 to-rose-500/40", emoji: "🎨", image: "https://picsum.photos/seed/kreator-10-tools-creator/800/600", publishedAt: day(20) },
  { title: "Reel — Cara plan content 1 jam", kind: "video" as const, client: "Editorial", blurb: "POV-style reel yang viral di tiga platform sekaligus.", metric: "1.2M views", gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40", emoji: "🎬", image: "https://picsum.photos/seed/kreator-plan-content-1-jam/800/600", publishedAt: day(28) },
  { title: "Newsletter Issue #38 — BTS launch", kind: "newsletter" as const, client: "Editorial", blurb: "Long-form breakdown launch creator OS — 42% open, 6.2% click.", metric: "8.1K opens", gradient: "from-indigo-500/40 via-violet-500/30 to-purple-500/40", emoji: "✉️", publishedAt: day(35) },
  { title: "Campaign — Bibit financial literacy", kind: "campaign" as const, client: "Bibit", blurb: "12-piece edukasi investasi untuk audiens Gen-Z, mix story + carousel.", metric: "920K reach", gradient: "from-sky-500/40 via-blue-500/30 to-indigo-500/40", emoji: "📈", image: "https://picsum.photos/seed/kreator-bibit-financial-literacy/800/600", publishedAt: day(48) },
  { title: "Carousel — 5 mistake creator pemula", kind: "carousel" as const, client: "Editorial", blurb: "Mini-essay format, jadi entry-point banyak follower baru.", metric: "82K saves", gradient: "from-lime-500/40 via-green-500/30 to-emerald-500/40", emoji: "📚", publishedAt: day(60) },
  { title: "Reel — Behind editing studio", kind: "video" as const, client: "Editorial", blurb: "Studio tour 60 detik — sparked banyak DM tentang gear setup.", metric: "640K views", gradient: "from-rose-500/40 via-red-500/30 to-orange-500/40", emoji: "🎥", publishedAt: day(70) },
  { title: "Campaign — Gojek Tokopedia merge", kind: "campaign" as const, client: "GoTo", blurb: "Narrative campaign untuk merger announcement — internal + external.", metric: "3.1M impressions", gradient: "from-emerald-600/40 via-green-500/30 to-lime-500/40", emoji: "🚀", publishedAt: day(85) },
];

const JOURNAL = [
  { slug: "voice-first-content-workflow", title: "Voice-first content workflow", excerpt: "Recording di HP, transcribe, edit 20 menit — bagaimana saya produksi konten tanpa burnout.", body: "Setiap minggu saya rekam suara di HP sambil jalan pagi.\n\nLalu transcribe otomatis, edit 20 menit, dan jadi satu issue newsletter penuh. Ini sistem yang bikin saya konsisten dua tahun tanpa burnout.", category: "behind-the-scenes" as const, readMinutes: 6, publishedAt: day(10) },
  { slug: "cut-from-11-tools-to-4", title: "Kenapa saya potong dari 11 tools ke 4", excerpt: "Tool stack yang ramping bikin saya fokus ke output, bukan setup.", body: "Tahun lalu saya pakai 11 tools untuk produksi konten.\n\nSekarang cuma 4. Lebih sedikit konteks-switching, lebih banyak shipping. Ini breakdown apa yang saya buang dan kenapa.", category: "lesson" as const, readMinutes: 5, publishedAt: day(24) },
  { slug: "hooks-that-dont-suck", title: "5 template hook yang konsisten outperform clickbait", excerpt: "Hook yang jujur tapi tetap bikin orang berhenti scroll.", body: "Clickbait naik sebentar lalu jatuh.\n\nLima template hook ini konsisten outperform karena jujur tapi tetap bikin orang berhenti scroll. Saya pakai ini di tiap reel dan carousel.", category: "experiment" as const, readMinutes: 7, publishedAt: day(40) },
];

const TESTIMONIALS = [
  { author: "Mira Yulianti", role: "Head of Brand", company: "Tokopedia", quote: "Campaign 8-piece kemarin smooth banget — brief jelas, turnaround on-time, dan numbers exceed target 30%. Saya bakal balik kerja sama lagi pasti.", rating: 5, channel: "client" as const, avatar: "🛍️", gradient: "from-emerald-500/40 via-teal-500/30 to-cyan-500/40", featured: true, receivedAt: day(8) },
  { author: "Bagus Pratama", role: "Indie hacker, newsletter reader", quote: "Newsletter ini tiap minggu jadi reading time favorit. Tone-nya jujur, kadang vulnerable, dan saya selalu dapet 1-2 idea actionable.", rating: 5, channel: "newsletter" as const, avatar: "📬", gradient: "from-fuchsia-500/40 via-pink-500/30 to-rose-500/40", receivedAt: day(3) },
  { author: "Sarah Hidayat", role: "Marketing Manager", company: "Bibit", quote: "Worked dengan banyak creator, ini salah satu yang paling profesional. Strategy call-nya solid, ga cuma soal aesthetic tapi paham brand outcome.", rating: 5, channel: "client" as const, avatar: "📊", gradient: "from-sky-500/40 via-blue-500/30 to-indigo-500/40", featured: true, receivedAt: day(18) },
  { author: "Dimas Anugrah", role: "Content creator, 28K followers", quote: "Workshop strategy sprint-nya unlock banyak hal — sekarang konten saya ada pilar yang jelas dan ga lagi posting random tiap minggu.", rating: 5, channel: "audience" as const, avatar: "🎬", gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40", receivedAt: day(25) },
  { author: "Putri Anggraini", role: "Founder", company: "Lokal Studio", quote: "Carousel pack-nya hands down salah satu deliverable terbaik dari freelancer mana pun. Copy + desain nyatu, brand voice kami kebawa.", rating: 5, channel: "client" as const, avatar: "🎨", gradient: "from-violet-500/40 via-purple-500/30 to-fuchsia-500/40", receivedAt: day(35) },
  { author: "Andi Rahman", role: "Subscribers since issue #12", quote: "Jarang banget newsletter ID yang konsisten quality kayak gini. Worth banget subscribe — tiap issue saya save buat referensi.", rating: 5, channel: "newsletter" as const, avatar: "✉️", gradient: "from-indigo-500/40 via-violet-500/30 to-purple-500/40", receivedAt: day(12) },
  { author: "Lina Marpaung", role: "Brand Lead", company: "GoTo", quote: "Narrative campaign yang kami collab cukup tricky karena internal+external, tapi eksekusinya rapi. Senior-level thinking di balik post yang playful.", rating: 5, channel: "client" as const, avatar: "🚀", gradient: "from-emerald-600/40 via-green-500/30 to-lime-500/40", receivedAt: day(45) },
  { author: "Reza Kurniawan", role: "Aspiring creator", quote: "Saya follow dari 5K followers. Yang bikin stay: konsistensi tone + transparansi soal angka & lesson. Itu rare di scene lokal.", rating: 5, channel: "instagram" as const, avatar: "📱", gradient: "from-rose-500/40 via-pink-500/30 to-fuchsia-500/40", receivedAt: day(20) },
  { author: "Najwa Salsabila", role: "Newsletter reader", quote: "Issue tentang 'kenapa saya stop posting harian' relate banget. Saya apply lesson-nya dan engagement saya naik 2x bulan ini. Makasih.", rating: 5, channel: "newsletter" as const, avatar: "💭", gradient: "from-teal-500/40 via-cyan-500/30 to-sky-500/40", receivedAt: day(6) },
  { author: "Faisal Achmad", role: "Senior Producer", company: "Vidio", quote: "Production day-nya organized, kru on-point, output siap publish dalam 1 minggu. Estimasi kasar mereka delivered 110%.", rating: 5, channel: "client" as const, avatar: "🎥", gradient: "from-orange-500/40 via-amber-500/30 to-yellow-500/40", receivedAt: day(55) },
];

const FEATURED_CLIENTS = [
  { name: "Tokopedia", initial: "T", gradient: "from-emerald-500/30 to-teal-500/30" },
  { name: "Bibit", initial: "B", gradient: "from-sky-500/30 to-blue-500/30" },
  { name: "GoTo", initial: "G", gradient: "from-green-500/30 to-lime-500/30" },
  { name: "Vidio", initial: "V", gradient: "from-orange-500/30 to-amber-500/30" },
  { name: "Lokal", initial: "L", gradient: "from-violet-500/30 to-purple-500/30" },
  { name: "Niagahoster", initial: "N", gradient: "from-rose-500/30 to-pink-500/30" },
  { name: "Pijar", initial: "P", gradient: "from-fuchsia-500/30 to-pink-500/30" },
];

const MON_SOURCES = [
  { kind: "sponsor" as const, label: "Newsletter sponsorship", amountIdr: 32_000_000, share: 42, growth: 18 },
  { kind: "product" as const, label: "Digital product (Creator OS)", amountIdr: 18_400_000, share: 24, growth: 6 },
  { kind: "affiliate" as const, label: "Affiliate (Notion, Riverside, Beehiiv)", amountIdr: 9_200_000, share: 12, growth: -4 },
  { kind: "course" as const, label: "Cohort course — Creator Sprint", amountIdr: 12_000_000, share: 16, growth: 24 },
  { kind: "subscription" as const, label: "Paid newsletter tier", amountIdr: 4_800_000, share: 6, growth: 12 },
];

const MON_MONTHS = [
  { period: "Jun 2025", amountIdr: 32_400_000 },
  { period: "Jul 2025", amountIdr: 38_100_000 },
  { period: "Agt 2025", amountIdr: 41_800_000 },
  { period: "Sep 2025", amountIdr: 36_900_000 },
  { period: "Okt 2025", amountIdr: 48_600_000 },
  { period: "Nov 2025", amountIdr: 52_300_000 },
  { period: "Des 2025", amountIdr: 61_200_000 },
  { period: "Jan 2026", amountIdr: 58_400_000 },
  { period: "Feb 2026", amountIdr: 64_800_000 },
  { period: "Mar 2026", amountIdr: 71_200_000 },
  { period: "Apr 2026", amountIdr: 68_900_000 },
  { period: "Mei 2026", amountIdr: 76_400_000 },
];

const PAYOUTS = [
  { source: "Tokopedia — Campaign #04", kind: "sponsor" as const, amountIdr: 12_000_000, status: "scheduled" as const, dueAt: future(3) },
  { source: "Bibit — Issue #42 sponsor", kind: "sponsor" as const, amountIdr: 8_000_000, status: "in-review" as const, dueAt: future(7) },
  { source: "Notion affiliate (April)", kind: "affiliate" as const, amountIdr: 4_200_000, status: "scheduled" as const, dueAt: future(12) },
  { source: "Creator OS — March sales", kind: "product" as const, amountIdr: 18_400_000, status: "paid" as const, dueAt: day(8) },
  { source: "Riverside affiliate Q1", kind: "affiliate" as const, amountIdr: 2_800_000, status: "paid" as const, dueAt: day(14) },
  { source: "Cohort #03 enrollments", kind: "course" as const, amountIdr: 12_000_000, status: "scheduled" as const, dueAt: future(18) },
  { source: "GoTo — Brand narrative", kind: "sponsor" as const, amountIdr: 24_000_000, status: "in-review" as const, dueAt: future(21) },
];

// About page — working principles + timeline. Migrated from the former
// hardcoded PRINCIPLES / TIMELINE arrays in AboutPage.tsx.
const PRINCIPLES = [
  { text: "Konsistensi > sempurna — ship tiap minggu, refine seiring jalan.", order: 10 },
  { text: "Voice unik > algoritma chasing — algoritma reward kreator yang otentik.", order: 20 },
  { text: "Repurpose dulu, baru tambah platform — leverage konten yang ada.", order: 30 },
  { text: "Newsletter > follower count — owned audience yang nilainya beda.", order: 40 },
  { text: "Bahasa Indonesia bukan handicap — itu kekuatan untuk niche kamu.", order: 50 },
];

const TIMELINE = [
  { year: "2026", milestone: "100K cross-platform followers, 12K newsletter subs." },
  { year: "2024", milestone: "Pivot full-time content creation. First 1K subs newsletter." },
  { year: "2022", milestone: "Mulai posting konsisten — IG + TikTok harian selama 1 tahun." },
];

// Keep in sync with components/templates/kreator-studio/shared/landing-seed.ts
// SEED_LANDING_SECTIONS. `syncLanding` below pushes additions/order to an
// already-seeded deployment without touching admin-edited copy.
// Item-bearing sections (stats/features/faq) seed their example content into
// `config` from convex/landingContent.ts — the SAME module the frontend render
// falls back to — so a fresh clone gets editable example data and there is no
// convex<->render drift. Table-backed kinds (portfolio/services/testimonials/
// pricing/blog/changelog) render from their own tables and carry no item config.
const LANDING = [
  { id: "ls-hero", order: 10, kind: "hero", title: HERO.title, subtitle: HERO.subtitle, enabled: true, config: JSON.stringify({ badge: HERO.badge }), layers: [{ id: "hero-photo", type: "image", placement: "background", opacity: 100, enabled: true, url: "/hero.webp" }] },
  { id: "ls-stats", order: 15, kind: "stats", title: "Angka yang jalan tiap minggu", subtitle: "Subscribers, views, dan brand yang sudah collab — live dari workspace ini.", enabled: true, config: JSON.stringify({ stats: STATS }) },
  { id: "ls-features", order: 20, kind: "features", title: "Apa yang ada di balik newsletter ini", subtitle: "Workspace kreator yang sama saya pakai untuk produce content tiap minggu.", enabled: true, config: JSON.stringify({ items: FEATURES }) },
  { id: "ls-portfolio", order: 30, kind: "portfolio", title: "Highlight social posts", subtitle: "Yang paling resonance bulan ini di IG, TikTok, dan YouTube.", enabled: true },
  { id: "ls-showcase", order: 35, kind: "services", title: "Karya & campaign terpilih", subtitle: "Carousel, video, dan campaign yang perform paling kuat.", enabled: true, config: '{"limit":3}' },
  { id: "ls-testimonials", order: 40, kind: "testimonials", title: "Kata mereka yang sudah kerja bareng", subtitle: "Brand, klien, dan reader newsletter — real words, real outcomes.", enabled: true, config: '{"limit":6}' },
  { id: "ls-pricing", order: 45, kind: "pricing", title: "Paket kerja sama", subtitle: "Newsletter sponsor, carousel pack, sampai custom production — semua transparan.", enabled: true },
  { id: "ls-faq", order: 50, kind: "faq", title: "Sering ditanya brand & creator", subtitle: "Soal kolaborasi, rate card, lisensi konten, dan timeline produksi.", enabled: true, config: JSON.stringify({ items: FAQS }) },
  { id: "ls-blog", order: 55, kind: "blog", title: "Issue terbaru", subtitle: "Klik untuk baca arsip lengkap.", enabled: true, config: '{"limit":3}' },
  { id: "ls-journal", order: 60, kind: "changelog", title: "Journal — di balik layar", subtitle: "Lesson, eksperimen, dan essay panjang di luar feed newsletter.", enabled: true, config: '{"limit":3}' },
  { id: "ls-cta", order: 65, kind: "cta", title: "Mau bikin campaign yang resonance?", subtitle: "Brief call 15 menit, gratis — saya bantu rekomendasi format yang fit.", enabled: true },
  { id: "ls-newsletter", order: 70, kind: "newsletter", title: "Subscribe newsletter", subtitle: "12K subscribers · 38% avg open rate · gratis selamanya.", enabled: true },
];

const PAGES = [
  { id: "sys-home", slug: "", title: "Home", description: "Creator landing — bio, latest posts, subscribe.", blocks: [], status: "published", createdAt: day(180), updatedAt: day(180), systemPage: true, isLanding: true },
  { id: "sys-posts", slug: "posts", title: "Posts", description: "All public posts.", blocks: [], status: "published", createdAt: day(180), updatedAt: day(180), systemPage: true },
  { id: "sys-about", slug: "about", title: "About", description: "Who I am, what I make, where to find me.", blocks: [], status: "published", createdAt: day(180), updatedAt: day(180), systemPage: true },
  {
    id: "custom-newsletter", slug: "newsletter", title: "Newsletter", description: "Weekly drops — what I'm shipping + best links.",
    blocks: [
      { kind: "hero", headline: "The Weekly Drop", sub: "Friday mornings — short, useful, free." },
      { kind: "text", heading: "What you'll get", body: "Two essays per month, a tools list, and one experiment I'm running." },
      { kind: "feature-list", heading: "Past issues", items: [
        { title: "Issue 42 — Voice-first content workflow", body: "Recording on phone, transcribing, editing in 20 min." },
        { title: "Issue 41 — A 4-tool stack", body: "Why I cut from 11 tools to 4 last quarter." },
        { title: "Issue 40 — Hooks that don't suck", body: "5 templates that consistently outperform clickbait." },
      ] },
      { kind: "cta", headline: "Subscribe — it's free", cta: { label: "Subscribe", href: "/" } },
    ],
    status: "published", createdAt: day(12), updatedAt: day(2), systemPage: false,
  },
];

// All demo content inserts (no wipe). Shared by `run` and `seedSample`.
async function insertAll(ctx: any, opts: { landing?: boolean } = {}) {
  for (const r of CONTENTS) await ctx.db.insert("kreatorContents", r);
  for (const r of VOICES) await ctx.db.insert("kreatorVoices", r);
  for (const r of SCRIPTS) await ctx.db.insert("kreatorScripts", r);
  for (const r of CAROUSELS) await ctx.db.insert("kreatorCarousels", r);
  for (const r of ASSETS) await ctx.db.insert("kreatorAssets", r);
  for (const r of NEWSLETTERS) await ctx.db.insert("kreatorNewsletters", r);
  for (const r of PERFORMANCE) await ctx.db.insert("kreatorPerformance", r);
  for (const r of COMMENTS) await ctx.db.insert("kreatorComments", r);
  for (const r of PACKAGES) await ctx.db.insert("kreatorPackages", r);
  for (const r of SHOWCASE) await ctx.db.insert("kreatorShowcase", r);
  for (const r of JOURNAL) await ctx.db.insert("kreatorJournal", r);
  for (const r of TESTIMONIALS) await ctx.db.insert("kreatorTestimonials", r);
  for (const r of FEATURED_CLIENTS) await ctx.db.insert("kreatorFeaturedClients", r);
  for (const r of PRINCIPLES) await ctx.db.insert("kreatorPrinciples", r);
  for (const r of TIMELINE) await ctx.db.insert("kreatorTimeline", r);
  for (const r of MON_SOURCES) await ctx.db.insert("kreatorMonetizationSources", r);
  for (const r of MON_MONTHS) await ctx.db.insert("kreatorMonetizationMonths", r);
  for (const r of PAYOUTS) await ctx.db.insert("kreatorPayouts", r);
  if (opts.landing !== false) for (const s of LANDING) await ctx.db.insert("landingSections", { sectionId: s.id, data: s });
  for (const p of PAGES) await ctx.db.insert("pages", { entryId: p.id, slug: p.slug, data: p });

  return {
    contents: CONTENTS.length,
    voices: VOICES.length,
    scripts: SCRIPTS.length,
    carousels: CAROUSELS.length,
    assets: ASSETS.length,
    newsletters: NEWSLETTERS.length,
    performance: PERFORMANCE.length,
    comments: COMMENTS.length,
    packages: PACKAGES.length,
    showcase: SHOWCASE.length,
    journal: JOURNAL.length,
    testimonials: TESTIMONIALS.length,
    featuredClients: FEATURED_CLIENTS.length,
    principles: PRINCIPLES.length,
    timeline: TIMELINE.length,
    monetizationSources: MON_SOURCES.length,
    monetizationMonths: MON_MONTHS.length,
    payouts: PAYOUTS.length,
    landing: LANDING.length,
    pages: PAGES.length,
  };
}

const CONTENT_TABLES = [
  "kreatorContents",
  "kreatorVoices",
  "kreatorScripts",
  "kreatorCarousels",
  "kreatorAssets",
  "kreatorNewsletters",
  "kreatorPerformance",
  "kreatorComments",
  "kreatorPackages",
  "kreatorShowcase",
  "kreatorJournal",
  "kreatorTestimonials",
  "kreatorFeaturedClients",
  "kreatorPrinciples",
  "kreatorTimeline",
  "kreatorMonetizationSources",
  "kreatorMonetizationMonths",
  "kreatorPayouts",
  "landingSections",
  "pages",
] as const;

// Power/CLI seed: wipes content tables first, then inserts. Destructive — only
// for terminal use where you explicitly want a reset.
export const run = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    for (const t of CONTENT_TABLES) {
      for (const row of await ctx.db.query(t).take(1000)) await ctx.db.delete(row._id);
    }
    return insertAll(ctx);
  },
});

// Demo/CLI seed (NO auth, internal — run via `npx convex run seed:seedDemo`).
// For SHOWCASE/demo deployments only. Refills the content tables for a full
// demo and seeds the landing lineup only when empty, WITHOUT wiping
// admin-edited landing copy. Idempotent.
export const seedDemo = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const t of CONTENT_TABLES) {
      if (t === "landingSections") continue;
      for (const row of await ctx.db.query(t).take(1000)) await ctx.db.delete(row._id);
    }
    const counts = await insertAll(ctx, { landing: false });
    // Seed landing only if the table is empty (preserve admin-edited copy).
    const hasLanding = await ctx.db.query("landingSections").first();
    if (!hasLanding) {
      for (const s of LANDING) await ctx.db.insert("landingSections", { sectionId: s.id, data: s });
    }
    return counts;
  },
});

// Additive landing sync for already-seeded deployments: inserts LANDING
// entries whose sectionId is missing and aligns `order` to the canonical
// lineup. Never touches admin-edited copy/enabled/config on existing rows.
export const syncLanding = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    let inserted = 0;
    let reordered = 0;
    for (const s of LANDING) {
      const existing = await ctx.db
        .query("landingSections")
        .withIndex("by_sectionId", (q) => q.eq("sectionId", s.id))
        .unique();
      if (!existing) {
        await ctx.db.insert("landingSections", { sectionId: s.id, data: s });
        inserted++;
      } else if ((existing.data as { order?: number }).order !== s.order) {
        await ctx.db.patch(existing._id, {
          data: { ...(existing.data as Record<string, unknown>), order: s.order },
        });
        reordered++;
      }
    }
    return { inserted, reordered };
  },
});

// Additive image backfill for already-seeded deployments: for each SHOWCASE row
// that ships with an `image`, find the existing showcase row by its (unique)
// title and patch `image` ONLY if the row has none yet. Never overwrites an
// admin-set photo. Idempotent. (kreatorShowcase has no unique index → collect.)
export const syncShowcaseImages = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    let patched = 0;
    const rows = await ctx.db.query("kreatorShowcase").collect();
    for (const s of SHOWCASE) {
      if (!s.image) continue;
      const existing = rows.find((r) => r.title === s.title);
      if (existing && !existing.image) {
        await ctx.db.patch(existing._id, { image: s.image });
        patched++;
      }
    }
    return { patched };
  },
});

// Additive commerce backfill for already-seeded deployments: gives existing
// kreatorPackages rows their `slug` + `priceNumber` from the seed lineup
// (matched by unique name) ONLY when missing. Idempotent; never overwrites.
export const syncPackagesCommerce = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    let patched = 0;
    const rows = await ctx.db.query("kreatorPackages").collect();
    for (const p of PACKAGES) {
      const existing = rows.find((r) => r.name === p.name);
      if (!existing) continue;
      const patch: { slug?: string; priceNumber?: number } = {};
      if (!existing.slug && p.slug) patch.slug = p.slug;
      const seedPrice = (p as { priceNumber?: number }).priceNumber;
      if (!existing.priceNumber && seedPrice) patch.priceNumber = seedPrice;
      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(existing._id, patch);
        patched++;
      }
    }
    return { patched };
  },
});

// In-app one-click seed for non-technical owners. Safe: requires an authenticated
// admin AND only runs on an empty site, so it can never wipe real content.
export const seedSample = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Harus login sebagai admin.");
    const hasContent = await ctx.db.query("kreatorContents").first();
    const hasLanding = await ctx.db.query("landingSections").first();
    if (hasContent || hasLanding) {
      return { seeded: false, reason: "already-has-content" as const };
    }
    const counts = await insertAll(ctx);
    return { seeded: true, ...counts };
  },
});
