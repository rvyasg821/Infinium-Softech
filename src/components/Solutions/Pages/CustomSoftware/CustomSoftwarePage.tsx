import { Code } from "lucide-react";
import { CUSTOM_SOFTWARE_PAGE_CONTENT } from "@/data/solutions/customSoftwarePageData";
import "../AiSolutions/AiSolutionsPage.scss";
import { AiSolutionsHero } from "../AiSolutions/Hero/AiSolutionsHero";
import { AiSolutionsOfferings } from "../AiSolutions/Offerings/AiSolutionsOfferings";
import { AiSolutionsHire } from "../AiSolutions/Hire/AiSolutionsHire";
import { AiSolutionsStrengths } from "../AiSolutions/Strengths/AiSolutionsStrengths";
import { AiSolutionsStack } from "../AiSolutions/Stack/AiSolutionsStack";
import { AiSolutionsProcess } from "../AiSolutions/Process/AiSolutionsProcess";
import { AiSolutionsConsultation } from "../AiSolutions/Consultation/AiSolutionsConsultation";
import { AiSolutionsFaq } from "../AiSolutions/Faq/AiSolutionsFaq";
import { AiSolutionsWorks } from "../AiSolutions/Works/AiSolutionsWorks";

export function CustomSoftwarePage() {
  const content = CUSTOM_SOFTWARE_PAGE_CONTENT;

  return (
    <main className="ai-solutions-page">
      <AiSolutionsHero content={content.hero} icon={Code} />
      <AiSolutionsOfferings content={content.offerings} />
      <AiSolutionsStrengths content={content.strengths} />
      <AiSolutionsProcess content={content.process} />
      <AiSolutionsHire content={content.hire} />
      <AiSolutionsConsultation content={content.consultation} />
      <AiSolutionsStack content={content.stack} />
      <AiSolutionsFaq content={content.faq} />
      <AiSolutionsWorks content={content.works} />
    </main>
  );
}
