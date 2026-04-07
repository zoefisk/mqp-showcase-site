import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";

import SectionTitle from "@/components/ui/SectionTitle";
import CaseStudySectionCard from "@/components/case-study/CaseStudySectionCard";
import StudyQuestionsSet from "@/components/ui/StudyQuestionsExample";
import {StudyQuestion} from "@/types/study_question";

type QuestionGroup = {
    title: string;
    description: string;
    questions: StudyQuestion[];
};

type CaseStudyQuestionSectionProps = {
    sectionTitle: string;
    intro: string;
    groups: QuestionGroup[];
};

export default function CaseStudyQuestionSection({
                                                     sectionTitle,
                                                     intro,
                                                     groups,
                                                 }: CaseStudyQuestionSectionProps) {
    return (
        <>
            <SectionTitle>{sectionTitle}</SectionTitle>

            <CaseStudySectionCard>
                <Stack spacing={2.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ color: "primary.main", display: "flex" }}>
                            <HubOutlinedIcon />
                        </Box>
                        <Typography fontWeight={700}>Study questions</Typography>
                    </Stack>

                    <Typography color="text.secondary">{intro}</Typography>

                    <Stack spacing={1.5}>
                        {groups.map((group) => (
                            <Accordion
                                key={group.title}
                                disableGutters
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "none",
                                    "&:before": { display: "none" },
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Stack spacing={0.25}>
                                        <Typography fontWeight={600}>
                                            {group.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {group.description}
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0 }}>
                                    <StudyQuestionsSet questions={group.questions} />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Stack>
                </Stack>
            </CaseStudySectionCard>
        </>
    );
}
