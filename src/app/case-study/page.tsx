"use client";

import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Paper, Stack, Typography} from "@mui/material";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import PageHeader from "@/components/layout/PageHeader";

import SectionTitle from "@/components/ui/SectionTitle";
import LinkCard from "@/components/ui/LinkCard";
import StudyStatCard from "@/components/ui/StudyStatCard";
import ResearchNote from "@/components/ui/ResearchNote";
import PhaseTimelineItem from "@/components/ui/PhaseTimelineItem";
import ToolBadge from "@/components/ui/ToolBadge";
import VegaGraphEditor from "@/components/features/visualizations/vega/VegaGraphEditor";
import D3GraphEditor from "@/components/features/visualizations/d3/D3GraphEditor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
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
                <ResearchNote
                    title="Why this paper matters"
                    mb={8}
                >
                    <Stack spacing={2.5}>
                        <Typography>
                            The original study by Zikmund-Fisher and colleagues examined whether graphical presentation helps patients better distinguish between urgent and non-urgent deviations in laboratory test results. Rather than focusing only on whether a result was above or below normal, the study explored how different visual encodings affect perceived urgency and participants’ desire to immediately contact a health care provider.
                        </Typography>

                        <Typography>
                            One of the central findings was that visual displays reduced perceived urgency for near-normal results when compared with tabular formats, while perceptions of clearly extreme values remained more stable. The paper also reports that gradient line displays produced the greatest sensitivity to changes in result severity when controlling for literacy and numeracy-related factors.
                        </Typography>

                        <Typography>
                            For our project, this study is especially useful because it includes multiple RRNL-like visual forms that can be reconstructed as formal specifications. Replicating those graphs gives us a way to test whether our work can capture real designs from the literature, not just simplified examples created for demonstration purposes.
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
                            Our broader project is about building a structured way to specify reference range number lines and related clinical result graphics. This case study helps ground that work in a published research context. Instead of only showing that we can build RRNLs in the abstract, we can demonstrate that our approach is capable of reproducing known experimental stimuli and supporting a real evaluation pipeline.
                        </Typography>

                        <Typography>
                            At this stage, we are recreating the study graphs with D3 and using the site to document both the underlying design choices and the replication workflow. In parallel, the existing Vega-based editor remains useful as a read-only visualization component for previewing related specification ideas and showing how structured graph definitions can be surfaced on the web.
                        </Typography>
                    </Stack>
                </Paper>

                <SectionTitle>Study Stack</SectionTitle>
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3 },
                        borderRadius: 4,
                        mb: 8,
                        background:
                            "linear-gradient(180deg, rgba(248,250,252,0.96) 0%, rgba(241,245,249,1) 100%)",
                    }}
                >
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        useFlexGap
                        gap={1.25}
                    >
                        <ToolBadge label="D3" />
                        <ToolBadge label="ReVISit.dev" />
                        <ToolBadge label="Prolific" />
                        <ToolBadge label="RRNL Specification" />
                        <ToolBadge label="Graph Recreation" />
                        <ToolBadge label="Online Study Deployment" />
                    </Stack>
                </Paper>

                <SectionTitle>Replication Workflow</SectionTitle>
                <Stack spacing={2} mb={8}>
                    <PhaseTimelineItem
                        number="01"
                        title="Study Review"
                        body="We began by closely reading the original paper and identifying the graph types, conditions, and outcome measures used in the experiment."
                    />
                    <PhaseTimelineItem
                        number="02"
                        title="Graph Recreation in D3"
                        body="We are reconstructing the published visual stimuli in D3 so the replicated designs align as closely as possible with the original study conditions."
                    />
                    <PhaseTimelineItem
                        number="03"
                        title="Study Implementation in ReVISit"
                        body="The online experiment is being implemented on ReVISit.dev, which supports study configuration, deployment, and interaction logging."
                    />
                    <PhaseTimelineItem
                        number="04"
                        title="Participant Recruitment through Prolific"
                        body="We are hosting recruitment through Prolific so participants can be directed into the deployed online study."
                    />
                    <PhaseTimelineItem
                        number="05"
                        title="Evaluation and Reflection"
                        body="The replication gives us a way to compare recreated visualizations, reflect on implementation tradeoffs, and understand how well our specification ideas map to published designs."
                    />
                </Stack>

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
                            <Typography fontWeight={700}>
                                Read-only preview
                            </Typography>
                        </Stack>

                        <Typography color="text.secondary">
                            This section uses the current Vega-based editor in a read-only configuration
                            as a specification-oriented companion to the replication work. A dedicated D3
                            viewer can be added later as the recreated stimuli are finalized.
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
                                        <Typography fontWeight={600}>Creatinine Gradient</Typography>
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

                <SectionTitle>Explore Related Pages</SectionTitle>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 2,
                        mb: 8,
                    }}
                >
                    <LinkCard
                        href="/graph-editor"
                        icon={<InsightsOutlinedIcon />}
                        title="Graph Editor"
                        body="View the specification-oriented RRNL editor and preview structured graph definitions."
                    />
                    <LinkCard
                        href="/meet-the-team"
                        icon={<Groups2OutlinedIcon />}
                        title="Meet the Team"
                        body="Learn more about the students contributing to the project and the replication effort."
                    />
                    <LinkCard
                        href="/report"
                        icon={<DescriptionOutlinedIcon />}
                        title="View the Report"
                        body="Read the full project writeup for context, implementation details, and future directions."
                    />
                </Box>
            </Container>
        </Box>
    );
}
