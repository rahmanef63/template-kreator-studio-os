// Kreator Studio — domain types.

export type { Channel, ContentStatus } from "./types-channels";
import type { Channel, ContentStatus } from "./types-channels";
export type {
  FeaturedClient,
  MonetizationKind,
  MonetizationMonth,
  MonetizationSource,
  Payout,
  Testimonial,
} from "./types-monetization";
import type {
  FeaturedClient,
  MonetizationMonth,
  MonetizationSource,
  Payout,
  Testimonial,
} from "./types-monetization";

export type ContentItem = {
  id: string;
  title: string;
  channel: Channel;
  status: ContentStatus;
  hook: string;
  body: string;
  scheduledAt: number;
  views: number;
  likes: number;
};

export type VoiceProfile = {
  id: string;
  name: string;
  description: string;
  doExamples: string[];
  dontExamples: string[];
  tone: string; // "energetic, friendly"
  trainedAt: number;
};

export type Script = {
  id: string;
  title: string;
  channel: Channel;
  durationSec: number;
  hook: string;
  beats: string[];
  cta: string;
  updatedAt: number;
};

export type Carousel = {
  id: string;
  title: string;
  slides: { heading: string; body: string }[];
  channel: Channel;
  updatedAt: number;
};

export type Asset = {
  id: string;
  title: string;
  kind: "photo" | "video" | "audio" | "graphic";
  url: string;
  fileLabel: string;
  uploadedAt: number;
};

export type NewsletterIssue = {
  id: string;
  subject: string;
  preview: string;
  status: "draft" | "scheduled" | "sent";
  scheduledAt: number;
  recipients: number;
  openRate: number;
};

export type PerformanceMetric = {
  id: string;
  channel: Channel;
  period: string; // "Jan 2026"
  views: number;
  followers: number;
  engagementRate: number;
};

export type CommentDraft = {
  id: string;
  channel: Channel;
  postRef: string;
  comment: string;
  reply: string;
  status: "draft" | "sent";
  ts: number;
};

/** Public service package (pricing tier). */
export type PricingPackage = {
  id: string;
  name: string;
  tagline: string;
  price: string; // "Rp 8jt", "Mulai 12jt"
  period?: string; // "/issue", "/produksi"
  bullets: string[];
  turnaroundDays: number;
  featured?: boolean;
  badge?: string;
  /** Cart identity + server re-price key (storefront-checkout). */
  slug?: string;
  /** Fixed IDR amount — absent = quote-only package (not purchasable). */
  priceNumber?: number;
};

/** Showcase item — past work visual (carousel result, video thumb, campaign). */
export type ShowcaseItem = {
  id: string;
  title: string;
  kind: "carousel" | "video" | "campaign" | "newsletter";
  client: string;
  blurb: string;
  metric: string; // "1.2M views"
  gradient: string; // tailwind gradient util (placeholder visual)
  emoji: string;
  image?: string; // optional real photo; falls back to emoji + gradient
  publishedAt: number;
};

/** Journal entry — long-form / behind-the-scenes (separate from newsletter feed). */
export type JournalEntry = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // simple paragraph text, split by \n\n
  category: "behind-the-scenes" | "lesson" | "experiment" | "essay";
  readMinutes: number;
  publishedAt: number;
};

/** About-page working principle (single line of copy). */
export type Principle = {
  id: string;
  text: string;
  order: number;
};

/** About-page timeline milestone (year + one-liner). */
export type TimelineEntry = {
  id: string;
  year: string;
  milestone: string;
};

export type State = {
  contents: ContentItem[];
  voices: VoiceProfile[];
  scripts: Script[];
  carousels: Carousel[];
  assets: Asset[];
  newsletters: NewsletterIssue[];
  performance: PerformanceMetric[];
  commentDrafts: CommentDraft[];
  packages: PricingPackage[];
  showcase: ShowcaseItem[];
  journal: JournalEntry[];
  testimonials: Testimonial[];
  featuredClients: FeaturedClient[];
  principles: Principle[];
  timeline: TimelineEntry[];
  monetizationSources: MonetizationSource[];
  monetizationMonths: MonetizationMonth[];
  payouts: Payout[];
  /** O-wave: public pages CRUD slice. */
  pages: import("@/features/_shared/pages/types").PageEntry[];
  /** AB-wave: home-page section composition. Ordered + toggleable. */
  landingSections: import("@/features/_shared/landing/types").LandingSection[];
};

export type LandingSection = import("@/features/_shared/landing/types").LandingSection;
export type LandingSectionKind = import("@/features/_shared/landing/types").LandingSectionKind;
export type LandingAction = import("@/features/_shared/landing/types").LandingAction;

export type Action =
  | import("@/features/_shared/pages/types").PagesAction
  | LandingAction
  | { type: "content.upsert"; item: ContentItem }
  | { type: "content.delete"; id: string }
  | { type: "voice.upsert"; voice: VoiceProfile }
  | { type: "voice.delete"; id: string }
  | { type: "script.upsert"; script: Script }
  | { type: "script.delete"; id: string }
  | { type: "carousel.upsert"; carousel: Carousel }
  | { type: "carousel.delete"; id: string }
  | { type: "asset.upsert"; asset: Asset }
  | { type: "asset.delete"; id: string }
  | { type: "newsletter.upsert"; issue: NewsletterIssue }
  | { type: "newsletter.delete"; id: string }
  | { type: "performance.upsert"; metric: PerformanceMetric }
  | { type: "performance.delete"; id: string }
  | { type: "comment.upsert"; draft: CommentDraft }
  | { type: "comment.delete"; id: string }
  | { type: "package.upsert"; pkg: PricingPackage }
  | { type: "package.delete"; id: string }
  | { type: "showcase.upsert"; item: ShowcaseItem }
  | { type: "showcase.delete"; id: string }
  | { type: "journal.upsert"; entry: JournalEntry }
  | { type: "journal.delete"; id: string }
  | { type: "testimonial.upsert"; testimonial: Testimonial }
  | { type: "testimonial.delete"; id: string }
  | { type: "featuredClient.upsert"; client: FeaturedClient }
  | { type: "featuredClient.delete"; id: string }
  | { type: "principle.upsert"; principle: Principle }
  | { type: "principle.delete"; id: string }
  | { type: "timeline.upsert"; entry: TimelineEntry }
  | { type: "timeline.delete"; id: string }
  | { type: "hydrate"; state: State }
  | { type: "reset" };
