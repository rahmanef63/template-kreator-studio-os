import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { commentsTables } from "./features/comments/_schema";
import { notionTables } from "./features/notion/_schema";
import { paymentTables } from "./features/payment/_schema";

// Kreator Studio OS — full schema (Convex target).
// authTables = @convex-dev/auth. Content tables mirror the localStorage shape
// the frontend store used, so the Convex-backed store adapter maps 1:1.

const CHANNEL = v.union(
  v.literal("instagram"),
  v.literal("tiktok"),
  v.literal("youtube"),
  v.literal("twitter"),
  v.literal("newsletter"),
  v.literal("linkedin"),
);

const CONTENT_STATUS = v.union(
  v.literal("idea"),
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("published"),
);

const MONETIZATION_KIND = v.union(
  v.literal("sponsor"),
  v.literal("affiliate"),
  v.literal("product"),
  v.literal("course"),
  v.literal("subscription"),
);

export default defineSchema({
  ...authTables,
  ...commentsTables,
  ...notionTables,
  ...paymentTables,

  // --- production tooling (admin CRUD, feeds public posts) ---
  kreatorContents: defineTable({
    title: v.string(),
    channel: CHANNEL,
    status: CONTENT_STATUS,
    hook: v.string(),
    body: v.string(),
    scheduledAt: v.number(),
    views: v.number(),
    likes: v.number(),
  }).index("by_status", ["status"]),

  kreatorVoices: defineTable({
    name: v.string(),
    description: v.string(),
    doExamples: v.array(v.string()),
    dontExamples: v.array(v.string()),
    tone: v.string(),
    trainedAt: v.number(),
  }),

  kreatorScripts: defineTable({
    title: v.string(),
    channel: CHANNEL,
    durationSec: v.number(),
    hook: v.string(),
    beats: v.array(v.string()),
    cta: v.string(),
    updatedAt: v.number(),
  }),

  kreatorCarousels: defineTable({
    title: v.string(),
    slides: v.array(v.object({ heading: v.string(), body: v.string() })),
    channel: CHANNEL,
    updatedAt: v.number(),
  }),

  kreatorAssets: defineTable({
    title: v.string(),
    kind: v.union(
      v.literal("photo"),
      v.literal("video"),
      v.literal("audio"),
      v.literal("graphic"),
    ),
    url: v.string(),
    fileLabel: v.string(),
    uploadedAt: v.number(),
  }),

  kreatorNewsletters: defineTable({
    subject: v.string(),
    preview: v.string(),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("sent")),
    scheduledAt: v.number(),
    recipients: v.number(),
    openRate: v.number(),
  }),

  kreatorPerformance: defineTable({
    channel: CHANNEL,
    period: v.string(),
    views: v.number(),
    followers: v.number(),
    engagementRate: v.number(),
  }),

  kreatorComments: defineTable({
    channel: CHANNEL,
    postRef: v.string(),
    comment: v.string(),
    reply: v.string(),
    status: v.union(v.literal("draft"), v.literal("sent")),
    ts: v.number(),
  }).index("by_status", ["status"]),

  // --- public-facing content ---
  kreatorPackages: defineTable({
    name: v.string(),
    tagline: v.string(),
    price: v.string(),
    period: v.optional(v.string()),
    bullets: v.array(v.string()),
    turnaroundDays: v.number(),
    featured: v.optional(v.boolean()),
    badge: v.optional(v.string()),
    // Commerce (additive): slug = cart identity + server re-price key;
    // priceNumber = fixed IDR amount. Packages without priceNumber are
    // quote-only ("Mulai 35jt") and can't be added to the cart.
    slug: v.optional(v.string()),
    priceNumber: v.optional(v.number()),
  }),

  // Guest checkout orders (storefront-checkout + doku-payment). orderId is
  // the unguessable capability token for /order/[id]; joins paymentOrders.
  kreatorOrders: defineTable({
    orderId: v.string(),
    buyer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
    }),
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        qty: v.number(),
        price: v.number(),
        priceLabel: v.string(),
      }),
    ),
    totalLabel: v.string(),
    status: v.string(),
    ts: v.number(),
  }).index("by_orderId", ["orderId"]),

  kreatorShowcase: defineTable({
    title: v.string(),
    kind: v.union(
      v.literal("carousel"),
      v.literal("video"),
      v.literal("campaign"),
      v.literal("newsletter"),
    ),
    client: v.string(),
    blurb: v.string(),
    metric: v.string(),
    gradient: v.string(),
    emoji: v.string(),
    image: v.optional(v.string()),
    publishedAt: v.number(),
  }).index("by_publishedAt", ["publishedAt"]),

  kreatorJournal: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    body: v.string(),
    category: v.union(
      v.literal("behind-the-scenes"),
      v.literal("lesson"),
      v.literal("experiment"),
      v.literal("essay"),
    ),
    readMinutes: v.number(),
    publishedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_publishedAt", ["publishedAt"]),

  kreatorTestimonials: defineTable({
    author: v.string(),
    role: v.string(),
    company: v.optional(v.string()),
    quote: v.string(),
    rating: v.number(),
    channel: v.optional(
      v.union(CHANNEL, v.literal("client"), v.literal("audience")),
    ),
    avatar: v.string(),
    gradient: v.string(),
    featured: v.optional(v.boolean()),
    receivedAt: v.number(),
  }),

  kreatorFeaturedClients: defineTable({
    name: v.string(),
    initial: v.string(),
    gradient: v.string(),
  }),

  // --- monetization ---
  kreatorMonetizationSources: defineTable({
    kind: MONETIZATION_KIND,
    label: v.string(),
    amountIdr: v.number(),
    share: v.number(),
    growth: v.number(),
  }),

  kreatorMonetizationMonths: defineTable({
    period: v.string(),
    amountIdr: v.number(),
  }),

  kreatorPayouts: defineTable({
    source: v.string(),
    kind: MONETIZATION_KIND,
    amountIdr: v.number(),
    status: v.union(
      v.literal("scheduled"),
      v.literal("in-review"),
      v.literal("paid"),
    ),
    dueAt: v.number(),
  }),

  subscribers: defineTable({
    email: v.string(),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("unsubscribed")),
    source: v.string(),
    ts: v.number(),
  }).index("by_email", ["email"]),

  // Page-builder + landing: complex nested structures stored as blobs keyed by
  // the frontend's string id (PageEntry.id / LandingSection.id).
  pages: defineTable({
    entryId: v.string(),
    slug: v.string(),
    data: v.any(),
  })
    .index("by_entryId", ["entryId"])
    .index("by_slug", ["slug"]),

  landingSections: defineTable({
    sectionId: v.string(),
    data: v.any(),
  }).index("by_sectionId", ["sectionId"]),

  // Singleton site config — onboarding wizard + admin Settings write this.
  siteSettings: defineTable({
    siteName: v.optional(v.string()),
    tagline: v.optional(v.string()),
    ownerName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    brandColor: v.optional(v.string()),
    themeDefault: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    faviconUrl: v.optional(v.string()),
    socials: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    analyticsId: v.optional(v.string()),
    onboardedAt: v.optional(v.number()),
  }),
});
