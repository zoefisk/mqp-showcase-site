"use client";

import * as React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

import PageHeader from "@/components/PageHeader";

import SectionTitle from "@/components/content/SectionTitle";
import InfoCard from "@/components/content/InfoCard";
import StepCard from "@/components/content/StepCard";
import StepArrow from "@/components/content/StepArrow";
import LinkCard from "@/components/content/LinkCard";

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
                body="RRNLs can help patients interpret lab values, but they are often difficult to create consistently and reproduce across studies or tools."
            />
            <InfoCard
                icon={<LightbulbOutlinedIcon />}
                title="Solution"
                body="This project proposes a DSL that specifies the core elements of an RRNL, such as ranges, labels, colors, and value indicators, in a structured format."
            />
            <InfoCard
                icon={<AutoGraphOutlinedIcon />}
                title="Outcome"
                body="The result is a reusable workflow for generating and editing RRNL visualizations with a balance of simplicity, consistency, and flexibility."
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
            <Typography>
              Reference range number lines place a health value in context by showing whether it falls below, within, or above a clinically meaningful range. Rather than presenting a lab result as an isolated number, RRNLs provide structure that can support interpretation, especially for patients managing long-term conditions.
              <br /><br />
              This project investigates how those visualizations can be described declaratively instead of being manually recreated each time. By introducing a domain-specific language for RRNLs, the project makes it possible to define a graph using a small set of meaningful properties, including the overall range, categorical segments, labels, tick marks, and value indicator. That approach makes RRNLs easier to reproduce from prior literature and easier to adapt for future use.
              <br /><br />
              The broader goal is not just to generate graphs, but to support more consistent, understandable, and reusable health visualizations.
            </Typography>
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
          <SectionTitle>Explore the Site</SectionTitle>
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
                body="Experiment with the RRNL specification and see how structured inputs become generated visualizations."
            />

            <LinkCard
                href="/meet-the-team"
                icon={<Groups2OutlinedIcon />}
                title="Meet the Team"
                body="Learn more about the students behind the project and the people who contributed to the work."
            />

            <LinkCard
                href="/report"
                icon={<DescriptionOutlinedIcon />}
                title="View the Report"
                body="Read the full writeup for project context, design motivation, implementation, and future directions."
            />
          </Box>

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
                Worcester Polytechnic Institute (WPI) is a top-tier, STEM-focused university with an R1 research classification and global leadership in project-based learning. Founded in 1865, WPI’s distinctive approach integrates classroom theory with real-world practice, preparing students to tackle critical challenges through inclusive education, impactful projects, and interdisciplinary research.
              </Typography>

              <Typography>
                At WPI, the MQP (Major Qualifying Project) is a team-based, professional-level design or research experience. It represents the culmination of undergraduate education and emphasizes communication, interdisciplinary thinking, and real-world impact.
              </Typography>
            </Stack>
          </Paper>

        </Container>
      </Box>
  );
}
