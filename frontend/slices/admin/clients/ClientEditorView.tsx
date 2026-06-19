"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { FeaturedClient } from "@/features/_app/types";

const META: EntityMeta = { label: "Client", labelPlural: "Featured Clients" };

export const FIELDS: FieldDef<FeaturedClient>[] = [
  { kind: "text", key: "name", label: "Name", wide: true },
  { kind: "text", key: "initial", label: "Initial", placeholder: "AB" },
  { kind: "text", key: "gradient", label: "Gradient", mono: true, placeholder: "from-fuchsia-500 to-purple-600" },
];

export function useClientsController(): CrudController<FeaturedClient> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.featuredClients,
      getId: (c) => c.id,
      blank: () => ({
        id: nid("cli"),
        name: "",
        initial: "",
        gradient: "from-fuchsia-500 to-purple-600",
      }),
      create: (client) => dispatch({ type: "featuredClient.upsert", client }),
      update: (id, patch) => {
        const cur = state.featuredClients.find((c) => c.id === id);
        if (!cur) return;
        dispatch({ type: "featuredClient.upsert", client: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "featuredClient.delete", id }),
    }),
    [state.featuredClients, dispatch],
  );
}

export function ClientEditorView({ id }: { id: string }) {
  const controller = useClientsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/clients`}
    />
  );
}
