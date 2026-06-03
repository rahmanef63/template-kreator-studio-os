"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  PagesProvider,
  type PagesStore,
} from "@/components/templates/_shared/pages/pages-context";
import type { PageEntry } from "@/components/templates/_shared/pages/types";
import { pagesReducer } from "@/components/templates/_shared/pages/reducer";
import {
  LandingProvider,
  type LandingStore,
} from "@/components/templates/_shared/landing/landing-context";
import type { LandingSection } from "@/components/templates/_shared/landing/types";
import { ADMIN_BASE, PUBLIC_BASE } from "./nav-config";
import type { Action, State } from "./types";

// Convex-backed store. Replaces the old localStorage reducer: `state` is
// assembled from live Convex queries; `dispatch` routes each action to the
// matching Convex mutation. Consuming slices are UNCHANGED — they still call
// useStore()/useX()/dispatch(action).
//
// id mapping: frontend objects key by `id` (string); Convex keys by `_id`.
// On read we map `_id` -> `id`. On upsert we pass `id` only when it's a known
// Convex id (existing row); a fresh nid -> insert.

type Ctx = { state: State; dispatch: (a: Action) => void; ready: boolean; progress: number };
const StoreCtx = React.createContext<Ctx | null>(null);

const withId = <T,>(rows: ReadonlyArray<Record<string, unknown>> | undefined): T[] =>
  ((rows ?? []) as Array<Record<string, unknown>>).map((r) => ({ ...r, id: r._id })) as T[];

function Provider({ children }: { children: React.ReactNode }) {
  const contents = useQuery(api.contents.list, {});
  const voices = useQuery(api.voices.list, {});
  const scripts = useQuery(api.scripts.list, {});
  const carousels = useQuery(api.carousels.list, {});
  const assets = useQuery(api.assets.list, {});
  const newsletters = useQuery(api.newsletters.list, {});
  const performance = useQuery(api.performance.list, {});
  const comments = useQuery(api.comments.list, {});
  const packages = useQuery(api.packages.list, {});
  const showcase = useQuery(api.showcase.list, {});
  const journal = useQuery(api.journal.list, {});
  const testimonials = useQuery(api.testimonials.list, {});
  const featuredClients = useQuery(api.featuredClients.list, {});
  const monSources = useQuery(api.monetization.listSources, {});
  const monMonths = useQuery(api.monetization.listMonths, {});
  const payouts = useQuery(api.monetization.listPayouts, {});
  const pageRows = useQuery(api.pages.list, {});
  const landingRows = useQuery(api.landing.list, {});

  const queries = [
    contents, voices, scripts, carousels, assets, newsletters, performance,
    comments, packages, showcase, journal, testimonials, featuredClients,
    monSources, monMonths, payouts, pageRows, landingRows,
  ];
  const ready = queries.every((q) => q !== undefined);
  const progress = Math.round((queries.filter((q) => q !== undefined).length / queries.length) * 100);

  const state = React.useMemo<State>(
    () => ({
      contents: withId(contents),
      voices: withId(voices),
      scripts: withId(scripts),
      carousels: withId(carousels),
      assets: withId(assets),
      newsletters: withId(newsletters),
      performance: withId(performance),
      commentDrafts: withId(comments),
      packages: withId(packages),
      showcase: withId(showcase),
      journal: withId(journal),
      testimonials: withId(testimonials),
      featuredClients: withId(featuredClients),
      monetizationSources: withId(monSources),
      monetizationMonths: withId(monMonths),
      payouts: withId(payouts),
      pages: (pageRows ?? []) as PageEntry[],
      landingSections: (landingRows ?? []) as LandingSection[],
    }),
    [contents, voices, scripts, carousels, assets, newsletters, performance, comments, packages, showcase, journal, testimonials, featuredClients, monSources, monMonths, payouts, pageRows, landingRows],
  );

  // ---- mutations ----
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
    }),
    [state],
  );

  const dispatch = React.useCallback(
    (action: Action) => {
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

  const value = React.useMemo<Ctx>(
    () => ({ state, dispatch, ready, progress }),
    [state, dispatch, ready, progress],
  );
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

function useStore() {
  const c = React.useContext(StoreCtx);
  if (!c) throw new Error("useStore must be inside <StoreProvider>");
  return c;
}

function PagesAdapter({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStore();
  const value = React.useMemo<PagesStore>(
    () => ({
      pages: state.pages,
      create: (entry: PageEntry) => dispatch({ type: "PAGE_CREATE", payload: entry }),
      update: (id, patch) => dispatch({ type: "PAGE_UPDATE", payload: { id, patch } }),
      remove: (id: string) => dispatch({ type: "PAGE_DELETE", payload: { id } }),
      reorderBlock: (id, from, to) =>
        dispatch({ type: "PAGE_REORDER_BLOCK", payload: { id, from, to } }),
      upsertSection: (pageId, section) =>
        dispatch({ type: "PAGE_SECTION_UPSERT", payload: { pageId, section } }),
      removeSection: (pageId, sectionId) =>
        dispatch({ type: "PAGE_SECTION_DELETE", payload: { pageId, sectionId } }),
    }),
    [state.pages, dispatch],
  );
  return <PagesProvider value={value}>{children}</PagesProvider>;
}

function LandingAdapter({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStore();
  const value = React.useMemo<LandingStore>(
    () => ({
      items: state.landingSections,
      publicBase: PUBLIC_BASE,
      adminBase: ADMIN_BASE,
      create: (section: LandingSection) =>
        dispatch({ type: "LANDING_UPSERT", payload: section }),
      update: (id, patch) => {
        const current = state.landingSections.find((s) => s.id === id);
        if (!current) return;
        dispatch({ type: "LANDING_UPSERT", payload: { ...current, ...patch, id } });
      },
      remove: (id: string) => dispatch({ type: "LANDING_DELETE", payload: { id } }),
    }),
    [state.landingSections, dispatch],
  );
  return <LandingProvider value={value}>{children}</LandingProvider>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <PagesAdapter>
        <LandingAdapter>{children}</LandingAdapter>
      </PagesAdapter>
    </Provider>
  );
}
export { useStore };
export const usePages = () => useStore().state.pages;
export const useContents = () => useStore().state.contents;
export const useVoices = () => useStore().state.voices;
export const useScripts = () => useStore().state.scripts;
export const useCarousels = () => useStore().state.carousels;
export const useAssets = () => useStore().state.assets;
export const useNewsletters = () => useStore().state.newsletters;
export const usePerformance = () => useStore().state.performance;
export const useCommentDrafts = () => useStore().state.commentDrafts;
export const useLandingSections = () => useStore().state.landingSections;
export const usePackages = () => useStore().state.packages;
export const useShowcase = () => useStore().state.showcase;
export const useJournal = () => useStore().state.journal;
export const useTestimonials = () => useStore().state.testimonials;
export const useFeaturedClients = () => useStore().state.featuredClients;
export const useMonetization = () => { const s = useStore().state; return { sources: s.monetizationSources, months: s.monetizationMonths, payouts: s.payouts }; };

export { nid, slugify, fmtDate, rel } from "@/components/templates/_shared/utils";
