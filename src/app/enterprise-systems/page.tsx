import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { EnterpriseSolutionsPage } from "@/components/Solutions/Pages/EnterpriseSolutions/EnterpriseSolutionsPage";

export const metadata: Metadata = getPageMetadata("/enterprise-systems");

export default function EnterpriseSystemsRoutePage() {
  return <EnterpriseSolutionsPage />;
}
