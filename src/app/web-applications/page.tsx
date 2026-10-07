import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { WebApplicationsPage } from "@/components/Solutions/Pages/WebApplications/WebApplicationsPage";

export const metadata: Metadata = getPageMetadata("/web-applications");

export default function WebApplicationsRoutePage() {
  return <WebApplicationsPage />;
}