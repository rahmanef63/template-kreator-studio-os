"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { Principle } from "@/features/_app/types";

const META: EntityMeta = { label: "Principle", labelPlural: "Working Principles" };

export const FIELDS: FieldDef<Principle>[] = [
  { kind: "text", key: "text", label: "Principle", wide: true },
  { kind: "number", key: "order", label: "Order" },
];

export function usePrinciplesController(): CrudController<Principle> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: [...state.principles].sort((a, b) => a.order - b.order),
      getId: (p) => p.id,
      blank: () => ({
        id: nid("prn"),
        text: "",
        order: (state.principles.reduce((m, p) => Math.max(m, p.order), 0) || 0) + 10,
      }),
      create: (principle) => dispatch({ type: "principle.upsert", principle }),
      update: (id, patch) => {
        const cur = state.principles.find((p) => p.id === id);
        if (!cur) return;
        dispatch({ type: "principle.upsert", principle: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "principle.delete", id }),
    }),
    [state.principles, dispatch],
  );
}

export function PrincipleEditorView({ id }: { id: string }) {
  const controller = usePrinciplesController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/principles`}
    />
  );
}
