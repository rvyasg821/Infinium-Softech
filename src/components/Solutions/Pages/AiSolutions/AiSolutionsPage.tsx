import "./AiSolutionsPage.scss";
import { AiSolutionsHero } from "./Hero/AiSolutionsHero";
import { AiSolutionsOfferings } from "./Offerings/AiSolutionsOfferings";
import { AiSolutionsHire } from "./Hire/AiSolutionsHire";
import { AiSolutionsStrengths } from "./Strengths/AiSolutionsStrengths";
import { AiSolutionsStack } from "./Stack/AiSolutionsStack";
import { AiSolutionsProcess } from "./Process/AiSolutionsProcess";
import { AiSolutionsConsultation } from "./Consultation/AiSolutionsConsultation";
import { AiSolutionsFaq } from "./Faq/AiSolutionsFaq";
import { AiSolutionsWorks } from "./Works/AiSolutionsWorks";

export function AiSolutionsPage() {
  return (
    <main className="ai-solutions-page">
      <AiSolutionsHero />
      <AiSolutionsOfferings />
      <AiSolutionsStrengths />
      <AiSolutionsProcess />
      <AiSolutionsHire />
      <AiSolutionsConsultation />
      <AiSolutionsStack />
      <AiSolutionsFaq />
      <AiSolutionsWorks />
    </main>
  );
}
 