import type { ProductItem } from "@/data/productsData";
import { Bricolage_Grotesque, DM_Sans, Caveat } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-caveat",
});
import { NeedlyHero } from "./Hero/NeedlyHero";
import { NeedlyTagline } from "./Tagline/NeedlyTagline";
import "./Tagline/NeedlyTagline.scss";
import { NeedlyOverview } from "./Overview/NeedlyOverview";
import { NeedlyInterface } from "./Interface/NeedlyInterface";
import { NeedlyChallenges } from "./Challenges/NeedlyChallenges";
import { NeedlySolution } from "./Solution/NeedlySolution";
import { NeedlyWorkflow } from "./Workflow/NeedlyWorkflow";
import { NeedlyResults } from "./Results/NeedlyResults";
import { NeedlyStack } from "./Stack/NeedlyStack";
import { NeedlyEcosystem } from "./Ecosystem/NeedlyEcosystem";
import { NeedlyCta } from "./Cta/NeedlyCta";
import { NeedlyNav } from "./Nav/NeedlyNav";
import "./Needly.scss";

export function Needly({ product }: { product: ProductItem }) {
  return (
    <div className={`needly-page-container needly-page ${bricolage.variable} ${dmSans.variable} ${caveat.variable}`}>
      <main>
        <NeedlyHero product={product} />
        <NeedlyTagline />
        <NeedlyNav />
        <NeedlyOverview />
        <NeedlyInterface />
        <NeedlyChallenges />
        <NeedlySolution />
        <NeedlyWorkflow />
        <NeedlyResults />
        <NeedlyStack />
        <NeedlyEcosystem />
        <NeedlyCta />
      </main>
    </div>
  );
}