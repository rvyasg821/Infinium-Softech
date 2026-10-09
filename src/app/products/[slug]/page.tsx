import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMetadata, type RouteKey } from "@/lib/seo";
import { AppointGem } from "@/components/Products/Pages/Solta/AppointGem";
import { Welzokart } from "@/components/Products/Pages/Welzokart/Welzokart";
import { Needly } from "@/components/Products/Pages/Needly/Needly"


import { PRODUCT_ITEMS } from "@/data/productsData";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_ITEMS.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_ITEMS.find((item) => item.id === slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const routeKey = `/products/${slug}` as RouteKey;
  
  try {
    const baseMetadata = getPageMetadata(routeKey);
    return {
      ...baseMetadata,
      alternates: {
        ...baseMetadata.alternates,
        canonical: `/products/${product.id}`,
      },
    };
  } catch (error) {
    return {
      title: product.name,
      description: product.desc,
      alternates: {
        canonical: `/products/${product.id}`,
      },
    };
  }
}

import { ProductPlaceholder } from "@/components/Products/Pages/Placeholder/ProductPlaceholder";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCT_ITEMS.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  if (product.id === "slota") {
    return <AppointGem product={product} />;
  }

  if (product.id === "welzokart") {
    return <Welzokart product={product} />;
  }

  if (product.id === "needly") {
    return <Needly product={product} />;
  }

  return <ProductPlaceholder product={product} />;
}