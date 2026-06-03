/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as assets from "../assets.js";
import type * as auth from "../auth.js";
import type * as backup from "../backup.js";
import type * as carousels from "../carousels.js";
import type * as comments from "../comments.js";
import type * as contents from "../contents.js";
import type * as featuredClients from "../featuredClients.js";
import type * as features_aiChat_action from "../features/aiChat/action.js";
import type * as features_comments__schema from "../features/comments/_schema.js";
import type * as features_comments_mutation from "../features/comments/mutation.js";
import type * as features_comments_public from "../features/comments/public.js";
import type * as features_comments_query from "../features/comments/query.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as journal from "../journal.js";
import type * as landing from "../landing.js";
import type * as monetization from "../monetization.js";
import type * as newsletters from "../newsletters.js";
import type * as packages from "../packages.js";
import type * as pages from "../pages.js";
import type * as performance from "../performance.js";
import type * as scripts from "../scripts.js";
import type * as seed from "../seed.js";
import type * as settings from "../settings.js";
import type * as setup from "../setup.js";
import type * as showcase from "../showcase.js";
import type * as testimonials from "../testimonials.js";
import type * as update from "../update.js";
import type * as users from "../users.js";
import type * as voices from "../voices.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  assets: typeof assets;
  auth: typeof auth;
  backup: typeof backup;
  carousels: typeof carousels;
  comments: typeof comments;
  contents: typeof contents;
  featuredClients: typeof featuredClients;
  "features/aiChat/action": typeof features_aiChat_action;
  "features/comments/_schema": typeof features_comments__schema;
  "features/comments/mutation": typeof features_comments_mutation;
  "features/comments/public": typeof features_comments_public;
  "features/comments/query": typeof features_comments_query;
  files: typeof files;
  http: typeof http;
  journal: typeof journal;
  landing: typeof landing;
  monetization: typeof monetization;
  newsletters: typeof newsletters;
  packages: typeof packages;
  pages: typeof pages;
  performance: typeof performance;
  scripts: typeof scripts;
  seed: typeof seed;
  settings: typeof settings;
  setup: typeof setup;
  showcase: typeof showcase;
  testimonials: typeof testimonials;
  update: typeof update;
  users: typeof users;
  voices: typeof voices;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
