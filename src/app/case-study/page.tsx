"use client";

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
                    eyebrowLabel="ZIKMUND-FISHER REPLICATED STUDY"
                    mainHeader="Case Study"
                    subheader="To evaluate our specification approach in a realistic setting, we are replicating the study “Graphics help patients distinguish between urgent and non-urgent deviations in laboratory test results” by recreating its stimuli and adapting the workflow for a modern online experiment."
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
                        label="Original Basis"
                        value="Published Study"
                        description="We are replicating a prior research study on patient interpretation of lab result graphics."
                    />
                    <StudyStatCard
                        icon={<CodeOutlinedIcon />}
                        label="Stimulus Build"
                        value="D3 Recreation"
                        description="The original graphs are being recreated as closely as possible with D3."
                    />
                    <StudyStatCard
                        icon={<PublicOutlinedIcon />}
                        label="Experiment Platform"
                        value="ReVISit.dev"
                        description="The online study is being configured and deployed through ReVISit."
                    />
                    <StudyStatCard
                        icon={<Groups2OutlinedIcon />}
                        label="Recruitment"
                        value="Prolific"
                        description="Participants are being recruited through Prolific for the live study."
                    />
                </Box>

                <SectionTitle>Background on the Original Study</SectionTitle>
                <ResearchNote title="Why this paper matters" mb={8}>
                    <Stack spacing={2.5}>
                        <Typography>
                            [write about why the zikmund fisher study matters and what it tells us]
                        </Typography>
                    </Stack>
                </ResearchNote>

                <SectionTitle>Why This Case Study Matters for Our Project</SectionTitle>
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
                        <Typography>
                            [connect the study to our project]
                        </Typography>
                    </Stack>
                </Paper>

                <SectionTitle>Study Questions</SectionTitle>
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
                            Users were asked the following question sets during the study.
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
                                            For each visualization
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            For every visualization that users saw, they were asked
                                            the following questions.
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
                                            End of main visualizations
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            After completing the main visualizations, users were
                                            asked the following questions.
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

                <SectionTitle>Stimulus / Specification Preview</SectionTitle>
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
                            This section uses the current Vega-based editor in a read-only
                            configuration as a specification-oriented companion to the replication
                            work. A dedicated D3 viewer can be added later as the recreated stimuli
                            are finalized.
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
