"use client";

import { CrudListView } from "@/features/_shared/crud/CrudListView";
import { FIELDS, useNewslettersController } from "./NewsletterEditorView";
import type { ColumnDef, EntityMeta } from "@/features/_shared/crud/types";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { NewsletterIssue } from "@/features/_app/types";

const META: EntityMeta = { label: "Issue", labelPlural: "Newsletter Issues" };

const COLUMNS: ColumnDef<NewsletterIssue>[] = [
  { key: "subject", header: "Subject", width: "w-[42%]" },
  { key: "status", header: "Status", width: "w-[16%]", badge: "secondary" },
  { key: "recipients", header: "Recipients", width: "w-[20%]", render: (v) => Number(v ?? 0).toLocaleString() },
  { key: "openRate", header: "Open rate", width: "w-[16%]", render: (v) => `${Number(v ?? 0).toFixed(1)}%` },
];

export function NewsletterView() {
  const controller = useNewslettersController();
  const drafts = controller.items.filter((n) => n.status !== "sent").length;
  return (
    <CrudListView
      meta={META}
      controller={controller}
      columns={COLUMNS}
      fields={FIELDS}
      editPath={(id) => `${ADMIN_BASE}/newsletter/${id}`}
      description={`${drafts} belum terkirim`}
    />
  );
}
