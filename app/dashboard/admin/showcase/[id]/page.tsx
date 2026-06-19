import { ShowcaseEditorView } from "@/features/admin/showcase/ShowcaseEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ShowcaseEditorView id={id} />;
}
