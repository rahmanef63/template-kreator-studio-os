"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  PagesProvider,
  type PagesStore,
} from "@/components/templates/_shared/pages/pages-context";
import type { PageEntry } from "@/components/templates/_shared/pages/types";
import {
  LandingProvider,
  type LandingStore,
} from "@/components/templates/_shared/landing/landing-context";
import type { LandingSection } from "@/components/templates/_shared/landing/types";
import { ADMIN_BASE, PUBLIC_BASE } from "./nav-config";
import { StoreCtx, useStore, type Ctx } from "./store-context";
import { useConvexDispatch } from "./store-dispatch";
import type { State } from "./types";

// Convex-backed store. Replaces the old localStorage reducer: `state` is
// assembled from live Convex queries; `dispatch` routes each action to the
// matching Convex mutation (see store-dispatch.tsx). Consuming slices are
// UNCHANGED — they still call useStore()/useX()/dispatch(action).
//
// id mapping: frontend objects key by `id` (string); Convex keys by `_id`.
// On read we map `_id` -> `id`. On upsert we pass `id` only when it's a known
// Convex id (existing row); a fresh nid -> insert.

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

  const dispatch = useConvexDispatch(state);

  const value = React.useMemo<Ctx>(
    () => ({ state, dispatch, ready, progress }),
    [state, dispatch, ready, progress],
  );
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
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
