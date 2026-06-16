import { PackageEditorView } from "@/components/templates/kreator-studio/slices/admin/packages/PackageEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageEditorView id={id} />;
}
