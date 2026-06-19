import { AssetEditorView } from "@/features/admin/assets/AssetEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AssetEditorView id={id} />;
}
