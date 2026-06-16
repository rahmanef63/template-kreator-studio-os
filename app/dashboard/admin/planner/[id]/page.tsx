import { PlannerEditorView } from "@/components/templates/kreator-studio/slices/admin/planner/PlannerEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlannerEditorView id={id} />;
}
