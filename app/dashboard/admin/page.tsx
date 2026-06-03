import { DashboardView } from "@/components/templates/kreator-studio/slices/admin/dashboard/DashboardView";
import { SetupBanner } from "@/components/setup-banner";

export default function Page() {
  return (
    <>
      <SetupBanner />
      <DashboardView />
    </>
  );
}
