import { NewsletterEditorView } from "@/components/templates/kreator-studio/slices/admin/newsletter/NewsletterEditorView";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsletterEditorView id={id} />;
}
