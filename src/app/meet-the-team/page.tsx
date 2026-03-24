import * as React from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { TEAM_MEMBERS } from "@/data/team";
import PageHeader from "@/components/layout/PageHeader";
import { TeamMemberCardGrid } from "@/components/features/team/TeamMemberCard";

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
                <PageHeader
                    eyebrowLabel={"OUR TEAM"}
                    mainHeader={"Meet The Team"}
                    subheader={"Get to know the people behind the project."}
                />

                <TeamMemberCardGrid members={TEAM_MEMBERS} />
            </Container>
        </Box>
    );
}
