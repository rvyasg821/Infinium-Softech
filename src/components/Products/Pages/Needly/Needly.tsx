import type { ProductItem } from "@/data/productsData";
import { NeedlyHero } from "./Hero/NeedlyHero";
import { NeedlyNav } from "./Nav/NeedlyNav";
import { NeedlyOverview } from "./Overview/NeedlyOverview";
import { NeedlyInterface } from "./Interface/NeedlyInterface";
import { NeedlyChallenges } from "./Challenges/NeedlyChallenges";
import { NeedlySolution } from "./Solution/NeedlySolution";
import { NeedlyWorkflow } from "./Workflow/WelzokartWorkflow";
import { NeedlyResults } from "./Results/NeedlyResults";
import { NeedlyStack } from "./Stack/WelzokartStack";
import { NeedlyEcosystem } from "./Ecosystem/NeedlyEcosystem";
import { NeedlyCta } from "./Cta/NeedlyCta";
import "./Needly.scss";

export function Needly({ product }: { product: ProductItem }) {
  return (
    <div className="Welzokart-page">
      <main>
        <NeedlyHero product={product} />
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