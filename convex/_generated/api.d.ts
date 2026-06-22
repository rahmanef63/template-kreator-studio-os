/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _shared_auth from "../_shared/auth.js";
import type * as _shared_crypto from "../_shared/crypto.js";
import type * as _shared_rateLimit from "../_shared/rateLimit.js";
import type * as adminPanel_aiConfig from "../adminPanel_aiConfig.js";
import type * as adminPanel_analytics from "../adminPanel_analytics.js";
import type * as adminPanel_auditLog from "../adminPanel_auditLog.js";
import type * as adminPanel_settings from "../adminPanel_settings.js";
import type * as adminPanel_users from "../adminPanel_users.js";
import type * as adminPanel_webhooks from "../adminPanel_webhooks.js";
import type * as assets from "../assets.js";
import type * as auth from "../auth.js";
import type * as backup from "../backup.js";
import type * as carousels from "../carousels.js";
import type * as checkout from "../checkout.js";
import type * as comments from "../comments.js";
import type * as contents from "../contents.js";
import type * as featuredClients from "../featuredClients.js";
import type * as features_aiChat_action from "../features/aiChat/action.js";
import type * as features_comments__schema from "../features/comments/_schema.js";
import type * as features_comments_mutation from "../features/comments/mutation.js";
import type * as features_comments_public from "../features/comments/public.js";
import type * as features_comments_query from "../features/comments/query.js";
import type * as features_notion__schema from "../features/notion/_schema.js";
import type * as features_notion_mutation from "../features/notion/mutation.js";
import type * as features_notion_query from "../features/notion/query.js";
import type * as features_payment__schema from "../features/payment/_schema.js";
import type * as features_payment_actions_doku from "../features/payment/actions/doku.js";
import type * as features_payment_actions_doku_helpers from "../features/payment/actions/doku_helpers.js";
import type * as features_payment_doku_client from "../features/payment/doku/client.js";
import type * as features_payment_doku_signature from "../features/payment/doku/signature.js";
import type * as features_payment_doku_types from "../features/payment/doku/types.js";
import type * as features_payment_http from "../features/payment/http.js";
import type * as features_payment_mutation from "../features/payment/mutation.js";
import type * as features_payment_query from "../features/payment/query.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as journal from "../journal.js";
import type * as landing from "../landing.js";
import type * as monetization from "../monetization.js";
import type * as newsletters from "../newsletters.js";
import type * as orders from "../orders.js";
import type * as packages from "../packages.js";
import type * as pages from "../pages.js";
import type * as performance from "../performance.js";
import type * as principles from "../principles.js";
import type * as scripts from "../scripts.js";
import type * as seed from "../seed.js";
import type * as settings from "../settings.js";
import type * as setup from "../setup.js";
import type * as showcase from "../showcase.js";
import type * as subscribers from "../subscribers.js";
import type * as testimonials from "../testimonials.js";
import type * as timeline from "../timeline.js";
import type * as update from "../update.js";
import type * as users from "../users.js";
import type * as voices from "../voices.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_shared/auth": typeof _shared_auth;
  "_shared/crypto": typeof _shared_crypto;
  "_shared/rateLimit": typeof _shared_rateLimit;
  adminPanel_aiConfig: typeof adminPanel_aiConfig;
  adminPanel_analytics: typeof adminPanel_analytics;
  adminPanel_auditLog: typeof adminPanel_auditLog;
  adminPanel_settings: typeof adminPanel_settings;
  adminPanel_users: typeof adminPanel_users;
  adminPanel_webhooks: typeof adminPanel_webhooks;
  assets: typeof assets;
  auth: typeof auth;
  backup: typeof backup;
  carousels: typeof carousels;
  checkout: typeof checkout;
  comments: typeof comments;
  contents: typeof contents;
  featuredClients: typeof featuredClients;
  "features/aiChat/action": typeof features_aiChat_action;
  "features/comments/_schema": typeof features_comments__schema;
  "features/comments/mutation": typeof features_comments_mutation;
  "features/comments/public": typeof features_comments_public;
  "features/comments/query": typeof features_comments_query;
  "features/notion/_schema": typeof features_notion__schema;
  "features/notion/mutation": typeof features_notion_mutation;
  "features/notion/query": typeof features_notion_query;
  "features/payment/_schema": typeof features_payment__schema;
  "features/payment/actions/doku": typeof features_payment_actions_doku;
  "features/payment/actions/doku_helpers": typeof features_payment_actions_doku_helpers;
  "features/payment/doku/client": typeof features_payment_doku_client;
  "features/payment/doku/signature": typeof features_payment_doku_signature;
  "features/payment/doku/types": typeof features_payment_doku_types;
  "features/payment/http": typeof features_payment_http;
  "features/payment/mutation": typeof features_payment_mutation;
  "features/payment/query": typeof features_payment_query;
  files: typeof files;
  http: typeof http;
  journal: typeof journal;
  landing: typeof landing;
  monetization: typeof monetization;
  newsletters: typeof newsletters;
  orders: typeof orders;
  packages: typeof packages;
  pages: typeof pages;
  performance: typeof performance;
  principles: typeof principles;
  scripts: typeof scripts;
  seed: typeof seed;
  settings: typeof settings;
  setup: typeof setup;
  showcase: typeof showcase;
  subscribers: typeof subscribers;
  testimonials: typeof testimonials;
  timeline: typeof timeline;
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
