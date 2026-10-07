import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { MobileApplicationsPage } from "@/components/Solutions/Pages/MobileApplications/MobileApplicationsPage";

export const metadata: Metadata = getPageMetadata("/mobile-applications");

export default function MobileApplicationsRoutePage() {
  return <MobileApplicationsPage />;
}