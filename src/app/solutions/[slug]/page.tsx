import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMetadata, type RouteKey } from "@/lib/seo";
import { SOLUTIONS_LIST_DATA } from "@/data/solutions/solutionsData";
import { SolutionPlaceholder } from "@/components/Solutions/Pages/Placeholder/SolutionPlaceholder";
import { AiSolutionsPage } from "@/components/Solutions/Pages/AiSolutions/AiSolutionsPage";
import { WebApplicationsPage } from "@/components/Solutions/Pages/WebApplications/WebApplicationsPage";
import { MobileApplicationsPage } from "@/components/Solutions/Pages/MobileApplications/MobileApplicationsPage";
import { CloudInfrastructurePage } from "@/components/Solutions/Pages/CloudInfrastructure/CloudInfrastructurePage";
import { EnterpriseSolutionsPage } from "@/components/Solutions/Pages/EnterpriseSolutions/EnterpriseSolutionsPage";
import { CustomSoftwarePage } from "@/components/Solutions/Pages/CustomSoftware/CustomSoftwarePage";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SOLUTIONS_LIST_DATA.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST_DATA.find((item) => item.id === slug);

  if (!solution) {
    return { title: "Solution not found" };
  }

  // Define the exact route key this slug maps to in seo.json
  const routeKey = `/${slug}` as RouteKey;

  try {
    // If we have explicit SEO data for this slug (e.g. /custom-software) in seo.json, use it perfectly!
    const baseMetadata = getPageMetadata(routeKey);
    // Explicitly set the canonical to the /solutions/ path so we don't conflict with root standalone routes
    return {
      ...baseMetadata,
      alternates: {
        canonical: `/solutions/${slug}`,
      },
    };
  } catch (error) {
    // Fallback if SEO JSON entry doesn't exist for a particular slug
    return {
      title: solution.title,
      description: solution.description,
      alternates: {
        canonical: `/solutions/${solution.id}`,
      },
    };
  }
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS_LIST_DATA.find((item) => item.id === slug);

  if (!solution) {
    notFound();
  }

  if (slug === "ai-solutions") {
    return <AiSolutionsPage />;
  }

  if (slug === "web-applications") {
    return <WebApplicationsPage />;
  }

  if (slug === "mobile-applications") {
    return <MobileApplicationsPage />;
  }

  if (slug === "cloud-infrastructure") {
    return <CloudInfrastructurePage />;
  }

  if (slug === "enterprise-systems") {
    return <EnterpriseSolutionsPage />;
  }

  if (slug === "custom-software") {
    return <CustomSoftwarePage />;
  }

  // Fallback for solutions that don't have a specific page built yet
  return <SolutionPlaceholder solution={solution} />;
}
