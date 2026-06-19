import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { optionalUser, requireUser } from "./_shared/auth";

const STATUS = v.union(v.literal("draft"), v.literal("scheduled"), v.literal("sent"));

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("kreatorNewsletters").order("desc").take(200);
    if (await optionalUser(ctx)) return rows;
    // Public newsletter archive (PostsPage) renders issues as content; show
    // published (non-draft) issues to anon, keep drafts admin-only. (No PII in
    // this table — cycle 1's blanket [] simply emptied a public archive.)
    return rows.filter((n) => n.status !== "draft");
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("kreatorNewsletters")),
    subject: v.string(),
    preview: v.string(),
    status: STATUS,
    scheduledAt: v.number(),
    recipients: v.number(),
    openRate: v.number(),
  },
  handler: async (ctx, { id, ...data }) => {
    await requireUser(ctx);
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    }
    return ctx.db.insert("kreatorNewsletters", data);
  },
});

export const remove = mutation({
  args: { id: v.id("kreatorNewsletters") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.delete(id);
  },
});
