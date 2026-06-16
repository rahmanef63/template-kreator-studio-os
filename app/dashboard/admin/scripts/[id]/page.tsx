import { ScriptEditorView } from "@/components/templates/kreator-studio/slices/admin/scripts/ScriptEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ScriptEditorView id={id} />;
}
