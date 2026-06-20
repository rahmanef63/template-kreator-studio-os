import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireUser } from "./_shared/auth";

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("kreatorTimeline").take(100),
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("kreatorTimeline")),
    year: v.string(),
    milestone: v.string(),
  },
  handler: async (ctx, { id, ...data }) => {
    await requireUser(ctx);
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    }
    return ctx.db.insert("kreatorTimeline", data);
  },
});

export const remove = mutation({
  args: { id: v.id("kreatorTimeline") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.delete(id);
  },
});
