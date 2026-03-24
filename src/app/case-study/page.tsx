import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import PageHeader from "@/components/layout/PageHeader";

import SectionTitle from "@/components/ui/SectionTitle";
import StudyStatCard from "@/components/ui/StudyStatCard";
import ResearchNote from "@/components/ui/ResearchNote";
import D3GraphEditor from "@/components/features/visualizations/d3/D3GraphEditor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StudyQuestionsSet from "@/components/ui/StudyQuestionsExample";
import { FINAL_QUESTIONS, VIZ_QUESTIONS } from "@/data/caseStudyQuestions";

import { caseStudyContent } from "@/content/case-study/content";

export default function CaseStudyPage() {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                py: { xs: 6, sm: 10 },
            }}
        >
            <Container maxWidth="md">
                <PageHeader
                    eyebrowLabel={caseStudyContent.pageHeader.eyebrowLabel}
                    mainHeader={caseStudyContent.pageHeader.mainHeader}
                    subheader={caseStudyContent.pageHeader.subheader}
                />

                <SectionTitle>Study Snapshot</SectionTitle>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 2,
                        mb: 8,
                    }}
                >
                    <StudyStatCard
                        icon={<ScienceOutlinedIcon />}
                        label={caseStudyContent.studySnapshot.cards.originalBasis.label}
                        value={caseStudyContent.studySnapshot.cards.originalBasis.value}
                        description={caseStudyContent.studySnapshot.cards.originalBasis.description}
                    />
                    <StudyStatCard
                        icon={<CodeOutlinedIcon />}
                        label={caseStudyContent.studySnapshot.cards.stimulusBuild.label}
                        value={caseStudyContent.studySnapshot.cards.stimulusBuild.value}
                        description={caseStudyContent.studySnapshot.cards.stimulusBuild.value}
                    />
                    <StudyStatCard
                        icon={<PublicOutlinedIcon />}
                        label={caseStudyContent.studySnapshot.cards.experimentPlatform.label}
                        value={caseStudyContent.studySnapshot.cards.experimentPlatform.value}
                        description={
                            caseStudyContent.studySnapshot.cards.experimentPlatform.description
                        }
                    />
                    <StudyStatCard
                        icon={<Groups2OutlinedIcon />}
                        label={caseStudyContent.studySnapshot.cards.recruitment.label}
                        value={caseStudyContent.studySnapshot.cards.recruitment.value}
                        description={caseStudyContent.studySnapshot.cards.recruitment.description}
                    />
                </Box>

                <SectionTitle>{caseStudyContent.background.title}</SectionTitle>
                <ResearchNote title={caseStudyContent.background.noteTitle} mb={8}>
                    <Stack spacing={2.5}>
                        <Typography>{caseStudyContent.background.body}</Typography>
                    </Stack>
                </ResearchNote>

                <SectionTitle>{caseStudyContent.projectConnection.title}</SectionTitle>
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 4,
                        mb: 8,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                    }}
                >
                    <Stack spacing={2.5}>
                        <Typography>{caseStudyContent.projectConnection.body}</Typography>
                    </Stack>
                </Paper>

                <SectionTitle>{caseStudyContent.studyQuestions.title}</SectionTitle>
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 4,
                        mb: 8,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                    }}
                >
                    <Stack spacing={2.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ color: "primary.main", display: "flex" }}>
                                <HubOutlinedIcon />
                            </Box>
                            <Typography fontWeight={700}>Study questions</Typography>
                        </Stack>

                        <Typography color="text.secondary">
                            {caseStudyContent.studyQuestions.intro}
                        </Typography>

                        <Stack spacing={1.5}>
                            <Accordion
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
                                            {caseStudyContent.studyQuestions.perVisualization.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                caseStudyContent.studyQuestions.perVisualization
                                                    .description
                                            }
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0 }}>
                                    <StudyQuestionsSet questions={VIZ_QUESTIONS} />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
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
                                            {caseStudyContent.studyQuestions.finalQuestions.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                caseStudyContent.studyQuestions.finalQuestions
                                                    .description
                                            }
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0 }}>
                                    <StudyQuestionsSet questions={FINAL_QUESTIONS} />
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Stack>
                </Paper>

                <SectionTitle>{caseStudyContent.specificationPreview.title}</SectionTitle>
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 4,
                        mb: 8,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                    }}
                >
                    <Stack spacing={2.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ color: "primary.main", display: "flex" }}>
                                <HubOutlinedIcon />
                            </Box>
                            <Typography fontWeight={700}>Read-only preview</Typography>
                        </Stack>

                        <Typography color="text.secondary">
                            {caseStudyContent.specificationPreview.intro}
                        </Typography>

                        <Stack spacing={1.5}>
                            <Accordion
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
                                            Creatinine Gradient
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Reference range number line with gradient styling
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0 }}>
                                    <D3GraphEditor
                                        title="D3 RRNL Preview"
                                        subtitle="Edit the HTML directly."
                                        graphSource="creatinine-gradient"
                                        htmlEditable={false}
                                        svgEditable={false}
                                        allowGraphSelection={false}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
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
                                        <Typography fontWeight={600}>Platelet Table</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tabular stimulus preview
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ pt: 0 }}>
                                    <D3GraphEditor
                                        title="D3 RRNL Preview"
                                        subtitle="Edit the HTML directly."
                                        graphSource="platelet-table"
                                        htmlEditable={true}
                                        svgEditable={false}
                                        allowGraphSelection={false}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
