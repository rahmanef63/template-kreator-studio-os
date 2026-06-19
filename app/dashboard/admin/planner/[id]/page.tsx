import { PlannerEditorView } from "@/features/admin/planner/PlannerEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlannerEditorView id={id} />;
}
