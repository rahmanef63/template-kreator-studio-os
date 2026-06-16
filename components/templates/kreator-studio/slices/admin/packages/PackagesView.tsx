"use client";

import { CrudListView } from "@/components/templates/_shared/crud/CrudListView";
import { FIELDS, usePackagesController } from "./PackageEditorView";
import type { ColumnDef, EntityMeta } from "@/components/templates/_shared/crud/types";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { PricingPackage } from "../../../shared/types";

const META: EntityMeta = { label: "Package", labelPlural: "Service Packages" };

const COLUMNS: ColumnDef<PricingPackage>[] = [
  { key: "name", header: "Name", width: "w-[28%]" },
  { key: "price", header: "Price", width: "w-[18%]", mono: true },
  { key: "turnaroundDays", header: "Turnaround", width: "w-[18%]", render: (v) => `${Number(v ?? 0)} days` },
  { key: "featured", header: "Featured", width: "w-[14%]", badge: "secondary", render: (v) => (v ? "yes" : "—") },
];

export function PackagesView() {
  const controller = usePackagesController();
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/packages/${id}`}
      description="Public pricing tiers"
    />
  );
}
