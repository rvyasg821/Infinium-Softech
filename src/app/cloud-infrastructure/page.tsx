import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { CloudInfrastructurePage } from "@/components/Solutions/Pages/CloudInfrastructure/CloudInfrastructurePage";

export const metadata: Metadata = getPageMetadata("/cloud-infrastructure");

export default function CloudInfrastructureRoutePage() {
  return <CloudInfrastructurePage />;
}
