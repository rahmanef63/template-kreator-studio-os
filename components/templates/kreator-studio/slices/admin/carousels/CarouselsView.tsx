"use client";

import { CrudListView } from "@/components/templates/_shared/crud/CrudListView";
import { FIELDS, useCarouselsController } from "./CarouselEditorView";
import type { ColumnDef, EntityMeta } from "@/components/templates/_shared/crud/types";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { Carousel } from "../../../shared/types";

const META: EntityMeta = { label: "Carousel", labelPlural: "Carousel Builder" };

const COLUMNS: ColumnDef<Carousel>[] = [
  { key: "title", header: "Title", width: "w-[48%]" },
  { key: "channel", header: "Channel", width: "w-[24%]", badge: "outline" },
  { key: "slides", header: "Slides", width: "w-[28%]", render: (v) => `${(v as unknown[] | undefined)?.length ?? 0} slides` },
];

export function CarouselsView() {
  const controller = useCarouselsController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/carousels/${id}`}
      description="Multi-slide builder"
    />
  );
}
