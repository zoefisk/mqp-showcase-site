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
                        OUR TEAM
                    </Typography>

                    {/* main heading */}
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        textAlign="center"
                        sx={{ lineHeight: 1.1 }}
                    >
                        Meet the team
                    </Typography>

                    {/* description */}
                    <Typography
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 480 }}
                    >
                        Get to know the people behind the project.
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

                <TeamGrid members={TEAM_MEMBERS} />
            </Container>
        </Box>
    );
}
