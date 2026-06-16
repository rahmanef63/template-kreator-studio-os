import { ClientEditorView } from "@/components/templates/kreator-studio/slices/admin/clients/ClientEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClientEditorView id={id} />;
}
