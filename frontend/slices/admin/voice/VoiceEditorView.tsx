"use client";

import * as React from "react";
import { CrudFormView } from "@/features/_shared/crud/CrudFormView";
import type { CrudController, EntityMeta, FieldDef } from "@/features/_shared/crud/types";
import { useStore, nid } from "@/features/_app/store";
import { ADMIN_BASE } from "@/features/_app/nav-config";
import type { VoiceProfile } from "@/features/_app/types";

const META: EntityMeta = { label: "Voice profile", labelPlural: "Voice Profiles" };

export const FIELDS: FieldDef<VoiceProfile>[] = [
  { kind: "text", key: "name", label: "Name", wide: true },
  { kind: "textarea", key: "description", label: "Description", rows: 2 },
  { kind: "text", key: "tone", label: "Tone", placeholder: "energetic, friendly", wide: true },
  { kind: "tags", key: "doExamples", label: "Do examples", hint: "One per tag." },
  { kind: "tags", key: "dontExamples", label: "Don't examples", hint: "One per tag." },
  { kind: "date", key: "trainedAt", label: "Trained" },
];

export function useVoicesController(): CrudController<VoiceProfile> {
  const { state, dispatch } = useStore();
  return React.useMemo(
    () => ({
      items: state.voices,
      getId: (v) => v.id,
      blank: () => ({
        id: nid("voi"),
        name: "",
        description: "",
        doExamples: [],
        dontExamples: [],
        tone: "",
        trainedAt: Date.now(),
      }),
      create: (voice) => dispatch({ type: "voice.upsert", voice }),
      update: (id, patch) => {
        const cur = state.voices.find((v) => v.id === id);
        if (!cur) return;
        dispatch({ type: "voice.upsert", voice: { ...cur, ...patch, id } });
      },
      remove: (id) => dispatch({ type: "voice.delete", id }),
    }),
    [state.voices, dispatch],
  );
}

export function VoiceEditorView({ id }: { id: string }) {
  const controller = useVoicesController();
  return (
    <CrudFormView
      id={id}
      meta={META}
      controller={controller}
      fields={FIELDS}
      backHref={`${ADMIN_BASE}/voice`}
    />
  );
}
