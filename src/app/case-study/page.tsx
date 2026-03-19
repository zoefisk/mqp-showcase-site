"use client";

import * as React from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import TeamGrid from "@/components/team/TeamGrid";
import { TEAM_MEMBERS } from "@/data/team";

export default function MeetTheTeamPage() {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                py: { xs: 6, sm: 10 },
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={2} alignItems="center" mb={6}>
                    {/* subtle eyebrow label */}
                    <Typography
                        variant="overline"
                        sx={{
                            letterSpacing: 2,
                            fontWeight: 700,
                            color: "primary.main",
                        }}
                    >
                        ZIKMUND FISHER REPLICATED STUDY
                    </Typography>

                    {/* main heading */}
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        textAlign="center"
                        sx={{ lineHeight: 1.1 }}
                    >
                        Case Study
                    </Typography>

                    {/* description */}
                    <Typography
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 480 }}
                    >
                        To wrap up our project, we replicated a study done by Zikmund Fisher et al. The original study was called "Graphics help patients distinguish between urgent and non-urgent deviations in laboratory test results."
                    </Typography>

                    {/* nicer divider */}
                    <Divider
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            mt: 2,
                        }}
                    />
                </Stack>

                <Typography color="text.secondary" textAlign="center" marginBottom={2}>
                    <b>Background details on this study</b>
                </Typography>
                <Typography marginBottom={8}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>

                <Typography color="text.secondary" textAlign="center" marginBottom={2}>
                    <b>About Worcester Polytechnic Institute</b>
                </Typography>
                <Typography>
                    Worcester Polytechnic Institute (WPI) is a top-tier, STEM-focused university with an R1 research classification and global leadership in project-based learning. Founded in 1865, WPI’s distinctive approach integrates classroom theory with real-world practice, preparing students to tackle critical challenges through inclusive education, impactful projects, and interdisciplinary research. With more than 70 bachelor’s, master’s, and doctoral degree programs across 18 academic departments and over 50 global project centers, WPI advances knowledge and innovation in fields such as life sciences, smart technologies, advanced materials and manufacturing, and global innovation. Learn more at www.wpi.edu.
                </Typography>

            </Container>
        </Box>
    );
}
