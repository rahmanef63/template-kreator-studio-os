import { TimelineEditorView } from "@/features/admin/timeline/TimelineEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TimelineEditorView id={id} />;
}
