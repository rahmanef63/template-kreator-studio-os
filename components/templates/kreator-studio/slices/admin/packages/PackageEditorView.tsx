"use client";

import * as React from "react";
import { CrudFormView } from "@/components/templates/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/components/templates/_shared/crud/types";
import { useStore, nid, slugify } from "../../../shared/store";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { PricingPackage } from "../../../shared/types";

const META: EntityMeta = { label: "Package", labelPlural: "Service Packages" };

export const FIELDS: FieldDef<PricingPackage>[] = [
  { kind: "text", key: "name", label: "Name", placeholder: "Carousel Pack", wide: true },
  { kind: "text", key: "tagline", label: "Tagline", placeholder: "Short value prop", wide: true },
  { kind: "text", key: "price", label: "Price label", placeholder: "Rp 8jt" },
  { kind: "text", key: "period", label: "Period", placeholder: "/issue" },
  { kind: "number", key: "priceNumber", label: "Price (IDR)", min: 0, hint: "Fixed amount makes it purchasable; leave blank for quote-only." },
  { kind: "number", key: "turnaroundDays", label: "Turnaround (days)", min: 0 },
  { kind: "tags", key: "bullets", label: "Bullets" },
  { kind: "text", key: "badge", label: "Badge", placeholder: "Popular" },
  { kind: "text", key: "slug", label: "Slug", mono: true, placeholder: "carousel-pack" },
  { kind: "switch", key: "featured", label: "Featured" },
];

export function usePackagesController(): CrudController<PricingPackage> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.packages,
      getId: (p) => p.id,
      blank: () => ({
        id: nid("pkg"),
        name: "",
        tagline: "",
        price: "",
        bullets: [],
        turnaroundDays: 7,
      }),
      create: (pkg) =>
        dispatch({ type: "package.upsert", pkg: { ...pkg, slug: pkg.slug || slugify(pkg.name) } }),
      update: (id, patch) => {
        const cur = state.packages.find((p) => p.id === id);
        if (!cur) return;
        dispatch({ type: "package.upsert", pkg: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "package.delete", id }),
    }),
    [state.packages, dispatch],
  );
}

export function PackageEditorView({ id }: { id: string }) {
  const controller = usePackagesController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/packages`}
    />
  );
}
