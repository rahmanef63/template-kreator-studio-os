"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useTestimonialsController } from "./TestimonialEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Testimonial } from "@/features/_app/types";

const META: EntityMeta = { label: "Testimonial", labelPlural: "Testimonials" };

const COLUMNS: ColumnDef<Testimonial>[] = [
  { key: "author", header: "Author", width: "w-[24%]" },
  { key: "quote", header: "Quote", width: "w-[40%]" },
  { key: "rating", header: "Rating", width: "w-[14%]", render: (v) => `${Number(v ?? 0)}★` },
  { key: "channel", header: "Channel", width: "w-[16%]", badge: "outline" },
];

export function TestimonialsView() {
  const controller = useTestimonialsController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/testimonials/${id}`}
      description="Wall of love"
    />
  );
}
