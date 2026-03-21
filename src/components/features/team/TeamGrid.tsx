"use client";

import * as React from "react";
import { Box } from "@mui/material";
import TeamMemberCard from "./TeamMemberCard";
import {TeamMember} from "@/types/team_member";

type Props = {
    members: TeamMember[];
};

export default function TeamGrid({ members }: Props) {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                },
            }}
        >
            {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </Box>
    );
}
