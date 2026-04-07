import * as React from "react";
import { Box } from "@mui/material";

import SectionTitle from "@/components/ui/SectionTitle";
import StudyStatCard from "@/components/ui/StudyStatCard";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";

type SnapshotIcon = "science" | "code" | "public" | "groups";

type SnapshotCard = {
    label: string;
    value: string;
    description: string;
    icon: SnapshotIcon;
};

type CaseStudySnapshotProps = {
    sectionTitle: string;
    cards: SnapshotCard[];
};

function getIcon(icon: SnapshotIcon): React.ReactElement {
    switch (icon) {
        case "science":
            return <ScienceOutlinedIcon />;
        case "code":
            return <CodeOutlinedIcon />;
        case "public":
            return <PublicOutlinedIcon />;
        case "groups":
            return <Groups2OutlinedIcon />;
        default:
            return <ScienceOutlinedIcon />;
    }
}

export default function CaseStudySnapshot({
                                              sectionTitle,
                                              cards,
                                          }: CaseStudySnapshotProps) {
    return (
        <>
            <SectionTitle>{sectionTitle}</SectionTitle>

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
                {cards.map((card) => (
                    <StudyStatCard
                        key={card.label}
                        icon={getIcon(card.icon)}
                        label={card.label}
                        value={card.value}
                        description={card.description}
                    />
                ))}
            </Box>
        </>
    );
}
