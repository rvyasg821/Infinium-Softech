import type { ProductItem } from "@/data/productsData";
import { AppointGemHero } from "./Hero/AppointGemHero";
import { AppointGemNav } from "./Nav/AppointGemNav";
import { AppointGemOverview } from "./Overview/AppointGemOverview";
import { AppointGemInterface } from "./Interface/AppointGemInterface";
import { AppointGemChallenges } from "./Challenges/AppointGemChallenges";
import { AppointGemSolution } from "./Solution/AppointGemSolution";
import { AppointGemWorkflow } from "./Workflow/AppointGemWorkflow";
import { AppointGemResults } from "./Results/AppointGemResults";
import { AppointGemStack } from "./Stack/AppointGemStack";
import { AppointGemEcosystem } from "./Ecosystem/AppointGemEcosystem";
import { AppointGemCta } from "./Cta/AppointGemCta";
import "./AppointGem.scss";

export function AppointGem({ product }: { product: ProductItem }) {
  return (
    <div className="appointgem-page">
      <main>
        <AppointGemHero product={product} />
        <AppointGemNav />
        <AppointGemOverview />
        <AppointGemInterface />
        <AppointGemChallenges />
        <AppointGemSolution />
        <AppointGemWorkflow />
        <AppointGemResults />
        <AppointGemStack />
        <AppointGemEcosystem />
        <AppointGemCta />
      </main>
    </div>
  );
}