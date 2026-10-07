import type { ProductItem } from "@/data/productsData";
import { WelzokartHero } from "./Hero/WelzokartHero";
import { WelzokartNav } from "./Nav/WelzokartNav";
import { WelzokartOverview } from "./Overview/WelzokartOverview";
import { WelzokartInterface } from "./Interface/WelzokartInterface";
import { WelzokartChallenges } from "./Challenges/WelzokartChallenges";
import { WelzokartSolution } from "./Solution/WelzokartSolution";
import { WelzokartWorkflow } from "./Workflow/WelzokartWorkflow";
import { WelzokartResults } from "./Results/WelzokartResults";
import { WelzokartStack } from "./Stack/WelzokartStack";
import { WelzokartEcosystem } from "./Ecosystem/WelzokartEcosystem";
import { WelzokartCta } from "./Cta/WelzokartCta";
import "./Welzokart.scss";

export function Welzokart({ product }: { product: ProductItem }) {
  return (
    <div className="Welzokart-page">
      <main>
        <WelzokartHero product={product} />
        <WelzokartNav />
        <WelzokartOverview />
        <WelzokartInterface />
        <WelzokartChallenges />
        <WelzokartSolution />
        <WelzokartWorkflow />
        <WelzokartResults />
        <WelzokartStack />
        <WelzokartEcosystem />
        <WelzokartCta />
      </main>
    </div>
  );
}