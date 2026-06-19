import { VoiceEditorView } from "@/features/admin/voice/VoiceEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VoiceEditorView id={id} />;
}
