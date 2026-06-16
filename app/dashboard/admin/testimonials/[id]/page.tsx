import { TestimonialEditorView } from "@/components/templates/kreator-studio/slices/admin/testimonials/TestimonialEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TestimonialEditorView id={id} />;
}
