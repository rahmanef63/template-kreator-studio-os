"use client";

import * as React from "react";
import { CrudFormView } from "@/components/templates/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/components/templates/_shared/crud/types";
import { useStore, nid } from "../../../shared/store";
import { ADMIN_BASE } from "../../../shared/nav-config";
import type { Script } from "../../../shared/types";

const META: EntityMeta = { label: "Script", labelPlural: "Script Library" };

const CHANNEL_OPTS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter" },
  { value: "newsletter", label: "Newsletter" },
  { value: "linkedin", label: "LinkedIn" },
];

export const FIELDS: FieldDef<Script>[] = [
  { kind: "text", key: "title", label: "Title", wide: true },
  { kind: "select", key: "channel", label: "Channel", options: CHANNEL_OPTS },
  { kind: "number", key: "durationSec", label: "Duration (sec)", min: 0 },
  { kind: "text", key: "hook", label: "Hook", wide: true },
  { kind: "tags", key: "beats", label: "Beats", hint: "One beat per tag." },
  { kind: "text", key: "cta", label: "CTA", wide: true },
  { kind: "date", key: "updatedAt", label: "Updated" },
];

export function useScriptsController(): CrudController<Script> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.scripts,
      getId: (s) => s.id,
      blank: () => ({
        id: nid("scr"),
        title: "",
        channel: "instagram",
        durationSec: 30,
        hook: "",
        beats: [],
        cta: "",
        updatedAt: Date.now(),
      }),
      create: (script) => dispatch({ type: "script.upsert", script }),
      update: (id, patch) => {
        const cur = state.scripts.find((s) => s.id === id);
        if (!cur) return;
        dispatch({ type: "script.upsert", script: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "script.delete", id }),
    }),
    [state.scripts, dispatch],
  );
}

export function ScriptEditorView({ id }: { id: string }) {
  const controller = useScriptsController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/scripts`}
    />
  );
}
