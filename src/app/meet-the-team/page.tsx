"use client";

import * as React from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import TeamGrid from "@/components/team/TeamGrid";
import Photo from "@/components/Photo"
import { TEAM_MEMBERS } from "@/data/team";

export default function MeetTheTeamPage() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="md">
                <Stack spacing={3} alignItems="center" mb={6}>
                    <Typography variant="h3" fontWeight={700}>
                        Meet the team
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                        Get to know the people behind the project.
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                </Stack>

                <Photo imageSrc={"/stockphoto.jpg"} altText={"Photo of the MQP team members"}/>

                <TeamGrid members={TEAM_MEMBERS} />
            </Container>
        </Box>
    );
}
