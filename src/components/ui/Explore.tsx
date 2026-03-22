import SectionTitle from "@/components/ui/SectionTitle";
import { Box } from "@mui/material";
import LinkCard from "@/components/ui/LinkCard";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import * as React from "react";

export default function Explore() {
    return (
        <>
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
        </>
    );
}
