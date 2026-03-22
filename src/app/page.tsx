"use client";

import * as React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import PageHeader from "@/components/layout/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import InfoCard from "@/components/ui/InfoCard";
import StepCard from "@/components/ui/StepCard";
import StepArrow from "@/components/ui/StepArrow";

import Explore from "@/components/ui/Explore";

export default function Home() {
    return (
        <Box sx={{ minHeight: "100vh", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="md">
                {/* HEADER */}
                <PageHeader
                    eyebrowLabel="A Declarative Specification for Clinical RRNL Visualizations"
                    mainHeader="About This Project"
                    subheader="For patients with chronic diseases, reference range number lines (RRNLs) can be useful tools in monitoring their health. Existing studies on RRNLs explore how design influences the patient’s understanding of health status, risk, and resulting behaviors. Despite their usefulness in healthcare contexts, there are few visualization tools for creating RRNLs. This project introduces a domain-specific language (DSL) that streamlines the creation of reference range number lines while supporting both reproducibility and customization."
                />

                {/* QUICK OVERVIEW */}
                <SectionTitle>Quick Overview</SectionTitle>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 2,
                        mb: 8,
                    }}
                >
                    <InfoCard
                        icon={<HealthAndSafetyOutlinedIcon />}
                        title="Problem"
                        body="[1 sentence about the problem]"
                    />
                    <InfoCard
                        icon={<LightbulbOutlinedIcon />}
                        title="Solution"
                        body="[1 sentence about the solution]"
                    />
                    <InfoCard
                        icon={<AutoGraphOutlinedIcon />}
                        title="Outcome"
                        body="[1 sentence about the outcome]"
                    />
                </Box>

                {/* DETAILS */}
                <SectionTitle>More Details About This Project</SectionTitle>
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
                    <Typography>[1-3 paragraphs about our project]</Typography>
                </Paper>

                {/* HOW IT WORKS */}
                <SectionTitle>How It Works</SectionTitle>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    spacing={{ xs: 2, md: 1 }}
                    mb={8}
                >
                    <StepCard
                        title="Literature Examples"
                        body="The project begins with examples of RRNLs from prior research and clinical visualization studies."
                    />

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <StepArrow />
                    </Box>

                    <StepCard
                        title="DSL Specification"
                        body="Key components of the visualization are translated into a structured declarative specification."
                    />

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <StepArrow />
                    </Box>

                    <StepCard
                        title="JSON Input"
                        body="Those properties are stored in a machine-readable format that supports editing and reuse."
                    />

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <StepArrow />
                    </Box>

                    <StepCard
                        title="Generated RRNL"
                        body="The specification can then be rendered into a visual number line and refined through the editor."
                    />
                </Stack>

                {/* EXPLORE */}
                <Explore />

                {/* WPI */}
                <SectionTitle>About Worcester Polytechnic Institute</SectionTitle>
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 4,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                    }}
                >
                    <Stack spacing={2.5}>
                        <Typography>
                            Worcester Polytechnic Institute (WPI) is a top-tier, STEM-focused
                            university with an R1 research classification and global leadership in
                            project-based learning. Founded in 1865, WPI’s distinctive approach
                            integrates classroom theory with real-world practice, preparing students
                            to tackle critical challenges through inclusive education, impactful
                            projects, and interdisciplinary research.
                        </Typography>

                        <Typography>
                            At WPI, the MQP (Major Qualifying Project) is a team-based,
                            professional-level design or research experience. It represents the
                            culmination of undergraduate education and emphasizes communication,
                            interdisciplinary thinking, and real-world impact.
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
