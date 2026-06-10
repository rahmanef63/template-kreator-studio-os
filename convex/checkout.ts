// Guest checkout — package cart → priced server-side → DOKU Direct payment
// → kreatorOrders record. The client's subtotal is DISPLAY ONLY; this file
// re-prices every line from kreatorPackages so a tampered client can never
// set its own amount. Only packages with a fixed `priceNumber` are
// purchasable — quote-only packages ("Mulai 35jt") never reach the cart.

import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";

const itemsArg = v.array(
  v.object({ slug: v.string(), qty: v.number() }),
);

const customerArg = v.object({
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
});

const MAX_QTY = 99;

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export const priceItems = internalQuery({
  args: { items: itemsArg },
  handler: async (ctx, { items }) => {
    // Small table (≤ a dozen packages) — no slug index needed.
    const packages = await ctx.db.query("kreatorPackages").take(200);
    const lines = [];
    for (const item of items) {
      const doc = packages.find((p) => p.slug === item.slug);
      if (!doc) throw new Error(`Paket tidak ditemukan: ${item.slug}`);
      if (!doc.priceNumber) {
        throw new Error(`Paket "${doc.name}" custom quote — hubungi kami.`);
      }
      const qty = Math.max(1, Math.min(MAX_QTY, Math.round(item.qty)));
      lines.push({
        slug: doc.slug as string,
        name: doc.name,
        qty,
        price: doc.priceNumber,
        priceLabel: doc.price,
      });
    }
    return lines;
  },
});

export const recordOrder = internalMutation({
  args: {
    orderId: v.string(),
    customer: customerArg,
    lines: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        qty: v.number(),
        price: v.number(),
        priceLabel: v.string(),
      }),
    ),
    total: v.number(),
  },
  handler: async (ctx, { orderId, customer, lines, total }) => {
    await ctx.db.insert("kreatorOrders", {
      orderId,
      buyer: customer,
      items: lines,
      totalLabel: formatIDR(total),
      status: "new",
      ts: Date.now(),
    });
  },
});

/**
 * Public order tracking — the unguessable orderId is the capability token.
 * Joins the domain order with the payment row so /order/[id] survives
 * reloads and updates reactively when the webhook flips payment to paid.
 */
export const trackOrder = query({
  args: { orderId: v.string() },
  handler: async (ctx, { orderId }) => {
    const order = await ctx.db
      .query("kreatorOrders")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    if (!order) return null;
    const payment = await ctx.db
      .query("paymentOrders")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    return {
      orderId,
      status: order.status,
      totalLabel: order.totalLabel,
      ts: order.ts,
      buyerName: order.buyer.name,
      items: order.items.map((i) => ({
        name: i.name,
        qty: i.qty,
        priceLabel: i.priceLabel,
        price: i.price,
      })),
      payment: payment
        ? {
            status: payment.status,
            amount: payment.amount,
            channel: payment.paymentChannel ?? null,
            instructions: payment.paymentInstructions ?? null,
            checkoutUrl: payment.checkoutUrl ?? null,
            expiresAt: payment.expiresAt ?? null,
            paidAt: payment.paidAt ?? null,
          }
        : null,
    };
  },
});

type PlaceOrderResult =
  | {
      ok: true;
      orderId: string;
      amount: number;
      instructions: unknown;
      expiresAt?: number;
    }
  | { ok: false; notice: string };

export const placeOrder = action({
  args: {
    items: itemsArg,
    customer: customerArg,
    channel: v.string(),
  },
  handler: async (ctx, args): Promise<PlaceOrderResult> => {
    if (args.items.length === 0) {
      return { ok: false, notice: "Keranjang kosong." };
    }

    const lines = await ctx.runQuery(internal.checkout.priceItems, {
      items: args.items,
    });
    const amount = lines.reduce(
      (sum: number, l: { price: number; qty: number }) => sum + l.price * l.qty,
      0,
    );

    const orderId = `KS-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 12)
      .toUpperCase()}`;

    const payment = await ctx.runAction(
      api.features.payment.actions.doku.createDirectPayment,
      {
        orderId,
        amount,
        channel: args.channel,
        customer: args.customer,
      },
    );
    if (!payment.ok) return { ok: false, notice: payment.notice };

    await ctx.runMutation(internal.checkout.recordOrder, {
      orderId,
      customer: args.customer,
      lines,
      total: amount,
    });

    return {
      ok: true,
      orderId,
      amount,
      instructions: payment.instructions,
      expiresAt: payment.expiresAt,
    };
  },
});
