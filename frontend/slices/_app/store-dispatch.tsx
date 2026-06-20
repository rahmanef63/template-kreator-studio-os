"use client";

import * as React from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { IS_DEMO } from "@/lib/stage";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { pagesReducer } from "@/features/_shared/pages/reducer";
import type { LandingSection } from "@/features/_shared/landing/types";
import type { Action, State } from "./types";

// Dispatch wiring, split out of store.tsx (move-only): routes each store
// action to the matching Convex mutation. `id` is passed to upsert only when
// it's a known Convex id (existing row); a fresh nid -> insert.

export function useConvexDispatch(state: State): (a: Action) => void {
  const mContentUpsert = useMutation(api.contents.upsert);
  const mContentRemove = useMutation(api.contents.remove);
  const mVoiceUpsert = useMutation(api.voices.upsert);
  const mVoiceRemove = useMutation(api.voices.remove);
  const mScriptUpsert = useMutation(api.scripts.upsert);
  const mScriptRemove = useMutation(api.scripts.remove);
  const mCarouselUpsert = useMutation(api.carousels.upsert);
  const mCarouselRemove = useMutation(api.carousels.remove);
  const mAssetUpsert = useMutation(api.assets.upsert);
  const mAssetRemove = useMutation(api.assets.remove);
  const mNewsUpsert = useMutation(api.newsletters.upsert);
  const mNewsRemove = useMutation(api.newsletters.remove);
  const mPerfUpsert = useMutation(api.performance.upsert);
  const mPerfRemove = useMutation(api.performance.remove);
  const mCommentUpsert = useMutation(api.comments.upsert);
  const mCommentRemove = useMutation(api.comments.remove);
  const mPageUpsert = useMutation(api.pages.upsert);
  const mPageRemove = useMutation(api.pages.remove);
  const mLandingUpsert = useMutation(api.landing.upsert);
  const mLandingRemove = useMutation(api.landing.remove);
  const mPackageUpsert = useMutation(api.packages.upsert);
  const mPackageRemove = useMutation(api.packages.remove);
  const mShowcaseUpsert = useMutation(api.showcase.upsert);
  const mShowcaseRemove = useMutation(api.showcase.remove);
  const mJournalUpsert = useMutation(api.journal.upsert);
  const mJournalRemove = useMutation(api.journal.remove);
  const mTestimonialUpsert = useMutation(api.testimonials.upsert);
  const mTestimonialRemove = useMutation(api.testimonials.remove);
  const mFeaturedClientUpsert = useMutation(api.featuredClients.upsert);
  const mFeaturedClientRemove = useMutation(api.featuredClients.remove);
  const mPrincipleUpsert = useMutation(api.principles.upsert);
  const mPrincipleRemove = useMutation(api.principles.remove);
  const mTimelineUpsert = useMutation(api.timeline.upsert);
  const mTimelineRemove = useMutation(api.timeline.remove);

  const knownIds = React.useMemo(
    () => ({
      contents: new Set(state.contents.map((c) => c.id)),
      voices: new Set(state.voices.map((v) => v.id)),
      scripts: new Set(state.scripts.map((s) => s.id)),
      carousels: new Set(state.carousels.map((c) => c.id)),
      assets: new Set(state.assets.map((a) => a.id)),
      newsletters: new Set(state.newsletters.map((n) => n.id)),
      performance: new Set(state.performance.map((p) => p.id)),
      commentDrafts: new Set(state.commentDrafts.map((c) => c.id)),
      packages: new Set(state.packages.map((p) => p.id)),
      showcase: new Set(state.showcase.map((s) => s.id)),
      journal: new Set(state.journal.map((j) => j.id)),
      testimonials: new Set(state.testimonials.map((t) => t.id)),
      featuredClients: new Set(state.featuredClients.map((f) => f.id)),
      principles: new Set(state.principles.map((p) => p.id)),
      timeline: new Set(state.timeline.map((t) => t.id)),
    }),
    [state],
  );

  return React.useCallback(
    (action: Action) => {
      // PUBLIC-demo isolation: shared Convex DB is read-only for demo visitors,
      // so concurrent visitors never stomp each other's writes. Pure no-op when
      // NEXT_PUBLIC_DEMO !== "1" (real clones + owner keep full CRUD).
      if (IS_DEMO) {
        toast.info("Mode demo — clone template untuk menyimpan perubahan");
        return;
      }
      const fail = (e: unknown) => console.error(`[store] ${action.type} failed`, e);
      switch (action.type) {
        case "content.upsert": {
          const { id, ...d } = action.item;
          void (knownIds.contents.has(id)
            ? mContentUpsert({ id: id as Id<"kreatorContents">, ...d })
            : mContentUpsert(d)
          ).catch(fail);
          break;
        }
        case "content.delete":
          void mContentRemove({ id: action.id as Id<"kreatorContents"> }).catch(fail);
          break;

        case "voice.upsert": {
          const { id, ...d } = action.voice;
          void (knownIds.voices.has(id)
            ? mVoiceUpsert({ id: id as Id<"kreatorVoices">, ...d })
            : mVoiceUpsert(d)
          ).catch(fail);
          break;
        }
        case "voice.delete":
          void mVoiceRemove({ id: action.id as Id<"kreatorVoices"> }).catch(fail);
          break;

        case "script.upsert": {
          const { id, ...d } = action.script;
          void (knownIds.scripts.has(id)
            ? mScriptUpsert({ id: id as Id<"kreatorScripts">, ...d })
            : mScriptUpsert(d)
          ).catch(fail);
          break;
        }
        case "script.delete":
          void mScriptRemove({ id: action.id as Id<"kreatorScripts"> }).catch(fail);
          break;

        case "carousel.upsert": {
          const { id, ...d } = action.carousel;
          void (knownIds.carousels.has(id)
            ? mCarouselUpsert({ id: id as Id<"kreatorCarousels">, ...d })
            : mCarouselUpsert(d)
          ).catch(fail);
          break;
        }
        case "carousel.delete":
          void mCarouselRemove({ id: action.id as Id<"kreatorCarousels"> }).catch(fail);
          break;

        case "asset.upsert": {
          const { id, ...d } = action.asset;
          void (knownIds.assets.has(id)
            ? mAssetUpsert({ id: id as Id<"kreatorAssets">, ...d })
            : mAssetUpsert(d)
          ).catch(fail);
          break;
        }
        case "asset.delete":
          void mAssetRemove({ id: action.id as Id<"kreatorAssets"> }).catch(fail);
          break;

        case "newsletter.upsert": {
          const { id, ...d } = action.issue;
          void (knownIds.newsletters.has(id)
            ? mNewsUpsert({ id: id as Id<"kreatorNewsletters">, ...d })
            : mNewsUpsert(d)
          ).catch(fail);
          break;
        }
        case "newsletter.delete":
          void mNewsRemove({ id: action.id as Id<"kreatorNewsletters"> }).catch(fail);
          break;

        case "performance.upsert": {
          const { id, ...d } = action.metric;
          void (knownIds.performance.has(id)
            ? mPerfUpsert({ id: id as Id<"kreatorPerformance">, ...d })
            : mPerfUpsert(d)
          ).catch(fail);
          break;
        }
        case "performance.delete":
          void mPerfRemove({ id: action.id as Id<"kreatorPerformance"> }).catch(fail);
          break;

        case "comment.upsert": {
          const { id, ...d } = action.draft;
          void (knownIds.commentDrafts.has(id)
            ? mCommentUpsert({ id: id as Id<"kreatorComments">, ...d })
            : mCommentUpsert(d)
          ).catch(fail);
          break;
        }
        case "comment.delete":
          void mCommentRemove({ id: action.id as Id<"kreatorComments"> }).catch(fail);
          break;

        case "PAGE_DELETE":
          void mPageRemove({ entryId: action.payload.id }).catch(fail);
          break;
        case "PAGE_CREATE":
        case "PAGE_UPDATE":
        case "PAGE_REORDER_BLOCK":
        case "PAGE_SECTION_UPSERT":
        case "PAGE_SECTION_DELETE": {
          const next = pagesReducer({ pages: state.pages }, action);
          const pid =
            (action.payload as { id?: string; pageId?: string }).id ??
            (action.payload as { pageId?: string }).pageId;
          const entry = next.pages.find((p) => p.id === pid);
          if (entry) void mPageUpsert({ entryId: entry.id, slug: entry.slug, data: entry }).catch(fail);
          break;
        }

        case "package.upsert": {
          const { id, ...d } = action.pkg;
          void (knownIds.packages.has(id)
            ? mPackageUpsert({ id: id as Id<"kreatorPackages">, ...d })
            : mPackageUpsert(d)
          ).catch(fail);
          break;
        }
        case "package.delete":
          void mPackageRemove({ id: action.id as Id<"kreatorPackages"> }).catch(fail);
          break;

        case "showcase.upsert": {
          const { id, ...d } = action.item;
          void (knownIds.showcase.has(id)
            ? mShowcaseUpsert({ id: id as Id<"kreatorShowcase">, ...d })
            : mShowcaseUpsert(d)
          ).catch(fail);
          break;
        }
        case "showcase.delete":
          void mShowcaseRemove({ id: action.id as Id<"kreatorShowcase"> }).catch(fail);
          break;

        case "journal.upsert": {
          const { id, ...d } = action.entry;
          void (knownIds.journal.has(id)
            ? mJournalUpsert({ id: id as Id<"kreatorJournal">, ...d })
            : mJournalUpsert(d)
          ).catch(fail);
          break;
        }
        case "journal.delete":
          void mJournalRemove({ id: action.id as Id<"kreatorJournal"> }).catch(fail);
          break;

        case "testimonial.upsert": {
          const { id, ...d } = action.testimonial;
          void (knownIds.testimonials.has(id)
            ? mTestimonialUpsert({ id: id as Id<"kreatorTestimonials">, ...d })
            : mTestimonialUpsert(d)
          ).catch(fail);
          break;
        }
        case "testimonial.delete":
          void mTestimonialRemove({ id: action.id as Id<"kreatorTestimonials"> }).catch(fail);
          break;

        case "featuredClient.upsert": {
          const { id, ...d } = action.client;
          void (knownIds.featuredClients.has(id)
            ? mFeaturedClientUpsert({ id: id as Id<"kreatorFeaturedClients">, ...d })
            : mFeaturedClientUpsert(d)
          ).catch(fail);
          break;
        }
        case "featuredClient.delete":
          void mFeaturedClientRemove({ id: action.id as Id<"kreatorFeaturedClients"> }).catch(fail);
          break;

        case "principle.upsert": {
          const { id, ...d } = action.principle;
          void (knownIds.principles.has(id)
            ? mPrincipleUpsert({ id: id as Id<"kreatorPrinciples">, ...d })
            : mPrincipleUpsert(d)
          ).catch(fail);
          break;
        }
        case "principle.delete":
          void mPrincipleRemove({ id: action.id as Id<"kreatorPrinciples"> }).catch(fail);
          break;

        case "timeline.upsert": {
          const { id, ...d } = action.entry;
          void (knownIds.timeline.has(id)
            ? mTimelineUpsert({ id: id as Id<"kreatorTimeline">, ...d })
            : mTimelineUpsert(d)
          ).catch(fail);
          break;
        }
        case "timeline.delete":
          void mTimelineRemove({ id: action.id as Id<"kreatorTimeline"> }).catch(fail);
          break;

        case "LANDING_UPSERT": {
          const s = action.payload as LandingSection;
          void mLandingUpsert({ sectionId: s.id, data: s }).catch(fail);
          break;
        }
        case "LANDING_DELETE":
          void mLandingRemove({ sectionId: (action.payload as { id: string }).id }).catch(fail);
          break;

        case "hydrate":
        case "reset":
          // Convex is the source of truth — no-op.
          break;
      }
    },
    [knownIds, state.pages], // eslint-disable-line react-hooks/exhaustive-deps
  );
}
