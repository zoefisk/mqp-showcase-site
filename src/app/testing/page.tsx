import StudyQuestionsSet from "@/components/ui/StudyQuestionsExample";
import PageShell from "@/components/layout/PageShell";
import { SET_ONE, VIZ_QUESTIONS } from "@/data/caseStudyQuestions";
import { Divider } from "@mui/material";

export default function TestingPage() {
    return (
        <PageShell>
            <StudyQuestionsSet questions={VIZ_QUESTIONS} />
        </PageShell>
    );
}
