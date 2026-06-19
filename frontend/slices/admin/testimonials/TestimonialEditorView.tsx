"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Testimonial } from "@/features/_app/types";

const META: EntityMeta = { label: "Testimonial", labelPlural: "Testimonials" };

export const FIELDS: FieldDef<Testimonial>[] = [
  { kind: "text", key: "author", label: "Author", wide: true },
  { kind: "text", key: "role", label: "Role", placeholder: "Founder, Brand X" },
  { kind: "text", key: "company", label: "Company" },
  { kind: "textarea", key: "quote", label: "Quote", rows: 3 },
  { kind: "number", key: "rating", label: "Rating", min: 1, max: 5 },
  {
    kind: "select",
    key: "channel",
    label: "Channel",
    options: [
      { value: "client", label: "Client" },
      { value: "audience", label: "Audience" },
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "twitter", label: "Twitter" },
      { value: "newsletter", label: "Newsletter" },
      { value: "linkedin", label: "LinkedIn" },
    ],
  },
  { kind: "text", key: "avatar", label: "Avatar emoji", placeholder: "🙂" },
  { kind: "text", key: "gradient", label: "Gradient", mono: true, placeholder: "from-fuchsia-500 to-purple-600" },
  { kind: "switch", key: "featured", label: "Featured" },
  { kind: "date", key: "receivedAt", label: "Received" },
];

export function useTestimonialsController(): CrudController<Testimonial> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.testimonials,
      getId: (t) => t.id,
      blank: () => ({
        id: nid("tst"),
        author: "",
        role: "",
        quote: "",
        rating: 5,
        channel: "client",
        avatar: "🙂",
        gradient: "from-fuchsia-500 to-purple-600",
        receivedAt: Date.now(),
      }),
      create: (testimonial) => dispatch({ type: "testimonial.upsert", testimonial }),
      update: (id, patch) => {
        const cur = state.testimonials.find((t) => t.id === id);
        if (!cur) return;
        dispatch({ type: "testimonial.upsert", testimonial: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "testimonial.delete", id }),
    }),
    [state.testimonials, dispatch],
  );
}

export function TestimonialEditorView({ id }: { id: string }) {
  const controller = useTestimonialsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/testimonials`}
    />
  );
}
