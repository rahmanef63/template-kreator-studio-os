import { PackageEditorView } from "@/features/admin/packages/PackageEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageEditorView id={id} />;
}
