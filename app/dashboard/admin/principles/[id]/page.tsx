import { PrincipleEditorView } from "@/features/admin/principles/PrincipleEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PrincipleEditorView id={id} />;
}
