import { pagesReducer } from "@/features/_shared/pages/reducer";
import { landingReducer } from "@/features/_shared/landing/reducer";
import { SEED_STATE } from "./seed";
import type { Action, State } from "./types";

// Pure root reducer — DEMO-only. The non-DEMO store routes each action straight
// to a Convex mutation (see store-dispatch.tsx useConvexDispatch) and never
// touches this file; in DEMO the store has no backend, so it applies actions to
// the in-memory State via this reducer (then persists + broadcasts). It mirrors
// the Convex mutation semantics: upsert replaces-by-id-or-appends, delete drops
// by id. Pages + landing reuse their existing pure slice reducers.

/** Replace the row with `item.id` or append it; preserves array order on update. */
function upsertById<T extends { id: string }>(list: readonly T[], item: T): T[] {
  const idx = list.findIndex((row) => row.id === item.id);
  if (idx < 0) return [...list, item];
  const next = list.slice();
  next[idx] = item;
  return next;
}

const removeById = <T extends { id: string }>(list: readonly T[], id: string): T[] =>
  list.filter((row) => row.id !== id);

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    // ---- Pages slice (reuse the shared pure reducer) ----
    case "PAGE_CREATE":
    case "PAGE_UPDATE":
    case "PAGE_DELETE":
    case "PAGE_REORDER_BLOCK":
    case "PAGE_SECTION_UPSERT":
    case "PAGE_SECTION_DELETE":
      return { ...state, pages: pagesReducer({ pages: state.pages }, action).pages };

    // ---- Landing slice (reuse the shared pure reducer) ----
    case "LANDING_UPSERT":
    case "LANDING_DELETE":
      return {
        ...state,
        landingSections: landingReducer(
          { landingSections: state.landingSections },
          action,
        ).landingSections,
      };

    // ---- Content domain ----
    case "content.upsert":
      return { ...state, contents: upsertById(state.contents, action.item) };
    case "content.delete":
      return { ...state, contents: removeById(state.contents, action.id) };

    case "voice.upsert":
      return { ...state, voices: upsertById(state.voices, action.voice) };
    case "voice.delete":
      return { ...state, voices: removeById(state.voices, action.id) };

    case "script.upsert":
      return { ...state, scripts: upsertById(state.scripts, action.script) };
    case "script.delete":
      return { ...state, scripts: removeById(state.scripts, action.id) };

    case "carousel.upsert":
      return { ...state, carousels: upsertById(state.carousels, action.carousel) };
    case "carousel.delete":
      return { ...state, carousels: removeById(state.carousels, action.id) };

    case "asset.upsert":
      return { ...state, assets: upsertById(state.assets, action.asset) };
    case "asset.delete":
      return { ...state, assets: removeById(state.assets, action.id) };

    case "newsletter.upsert":
      return { ...state, newsletters: upsertById(state.newsletters, action.issue) };
    case "newsletter.delete":
      return { ...state, newsletters: removeById(state.newsletters, action.id) };

    case "performance.upsert":
      return { ...state, performance: upsertById(state.performance, action.metric) };
    case "performance.delete":
      return { ...state, performance: removeById(state.performance, action.id) };

    case "comment.upsert":
      return { ...state, commentDrafts: upsertById(state.commentDrafts, action.draft) };
    case "comment.delete":
      return { ...state, commentDrafts: removeById(state.commentDrafts, action.id) };

    case "package.upsert":
      return { ...state, packages: upsertById(state.packages, action.pkg) };
    case "package.delete":
      return { ...state, packages: removeById(state.packages, action.id) };

    case "showcase.upsert":
      return { ...state, showcase: upsertById(state.showcase, action.item) };
    case "showcase.delete":
      return { ...state, showcase: removeById(state.showcase, action.id) };

    case "journal.upsert":
      return { ...state, journal: upsertById(state.journal, action.entry) };
    case "journal.delete":
      return { ...state, journal: removeById(state.journal, action.id) };

    case "testimonial.upsert":
      return { ...state, testimonials: upsertById(state.testimonials, action.testimonial) };
    case "testimonial.delete":
      return { ...state, testimonials: removeById(state.testimonials, action.id) };

    case "featuredClient.upsert":
      return { ...state, featuredClients: upsertById(state.featuredClients, action.client) };
    case "featuredClient.delete":
      return { ...state, featuredClients: removeById(state.featuredClients, action.id) };

    case "principle.upsert":
      return { ...state, principles: upsertById(state.principles, action.principle) };
    case "principle.delete":
      return { ...state, principles: removeById(state.principles, action.id) };

    case "timeline.upsert":
      return { ...state, timeline: upsertById(state.timeline, action.entry) };
    case "timeline.delete":
      return { ...state, timeline: removeById(state.timeline, action.id) };

    // ---- Monetization domain ----
    case "monetizationSource.upsert":
      return { ...state, monetizationSources: upsertById(state.monetizationSources, action.source) };
    case "monetizationSource.delete":
      return { ...state, monetizationSources: removeById(state.monetizationSources, action.id) };

    case "monetizationMonth.upsert":
      return { ...state, monetizationMonths: upsertById(state.monetizationMonths, action.month) };
    case "monetizationMonth.delete":
      return { ...state, monetizationMonths: removeById(state.monetizationMonths, action.id) };

    case "payout.upsert":
      return { ...state, payouts: upsertById(state.payouts, action.payout) };
    case "payout.delete":
      return { ...state, payouts: removeById(state.payouts, action.id) };

    // ---- Bulk ----
    case "hydrate":
      return action.state;
    case "reset":
      return SEED_STATE;

    default:
      return state;
  }
}
