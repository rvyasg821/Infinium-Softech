import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { CustomSoftwarePage } from "@/components/Solutions/Pages/CustomSoftware/CustomSoftwarePage";

export const metadata: Metadata = getPageMetadata("/custom-software");

export default function CustomSoftwareRoutePage() {
  return <CustomSoftwarePage />;
}
