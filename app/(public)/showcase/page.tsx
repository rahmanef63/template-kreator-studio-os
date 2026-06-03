import { ShowcasePage } from "@/components/templates/kreator-studio/slices/showcase/ShowcasePage";

// Rendered at request time: the page mounts <CommentsSection> which calls
// useConvexAuth(), and the Convex auth provider is client-only (see
// components/convex-provider.tsx — it skips static prerender). Forcing dynamic
// avoids the "Could not find ConvexProviderWithAuth" prerender error.
export const dynamic = "force-dynamic";

export default function Page() {
  return <ShowcasePage />;
}
