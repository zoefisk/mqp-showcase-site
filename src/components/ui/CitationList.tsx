"use client"

import * as React from "react";
import {
    Box,
    Chip,
    Collapse,
    Divider,
    IconButton,
    Link as MuiLink,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SectionTitle from "@/components/ui/SectionTitle";
import { CATEGORY_ORDER, CITATIONS, Citation, CitationCategory } from "@/data/citations";

const categoryIcons: Record<CitationCategory, React.ReactElement> = {
    "Reference Range Number Lines": <BiotechOutlinedIcon fontSize="small" />,
    "Healthcare Context": <MenuBookOutlinedIcon fontSize="small" />,
    "Health Visualization": <DescriptionOutlinedIcon fontSize="small" />,
    "Visualization Systems and Grammars": <ScienceOutlinedIcon fontSize="small" />,
    "Study Tools and Measures": <MenuBookOutlinedIcon fontSize="small" />,
    "General Reference": <PublicOutlinedIcon fontSize="small" />,
    Other: <PublicOutlinedIcon fontSize="small" />,
};

function sortCitationsByTitle(citations: Citation[]): Citation[] {
    return [...citations].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
}

export function CitationCard({ citation }: { citation: Citation }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 1.5,
                borderRadius: 2.5,
                backgroundColor: "background.paper",
                boxShadow: "none",
            }}
        >
            <Stack spacing={0.75}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            lineHeight: 1.3,
                            pr: 1,
                            flex: 1,
                        }}
                    >
                        {citation.title}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                        {citation.year}
                    </Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    {citation.authors}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {citation.source}
                </Typography>

                {(citation.url || citation.doi) && (
                    <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
                        {citation.url && (
                            <MuiLink
                                href={citation.url}
                                target="_blank"
                                rel="noreferrer"
                                underline="hover"
                                sx={{ fontSize: "0.75rem", fontWeight: 600 }}
                            >
                                View source
                            </MuiLink>
                        )}

                        {citation.doi && (
                            <Typography variant="caption" color="text.secondary">
                                DOI: {citation.doi}
                            </Typography>
                        )}
                    </Stack>
                )}

                {citation.note && (
                    <>
                        <Divider />
                        <Typography variant="caption" color="text.secondary">
                            {citation.note}
                        </Typography>
                    </>
                )}
            </Stack>
        </Paper>
    );
}

function CitationCategorySection({
                                     category,
                                     items,
                                     defaultExpanded = false,
                                 }: {
    category: CitationCategory;
    items: Citation[];
    defaultExpanded?: boolean;
}) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);

    return (
        <Box>
            {/* Header row (no card) */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                    cursor: "pointer",
                    py: 0.75,
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ color: "text.secondary", display: "flex" }}>
                        {categoryIcons[category]}
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {category}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        ({items.length})
                    </Typography>
                </Stack>

                <ExpandMoreIcon
                    sx={{
                        fontSize: 18,
                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: "text.secondary",
                    }}
                />
            </Stack>

            {/* subtle divider instead of card border */}
            <Divider sx={{ mb: 1 }} />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack spacing={1} sx={{ pl: 1 }}>
                    {items.map((citation) => (
                        <CitationCard key={citation.id} citation={citation} />
                    ))}
                </Stack>
            </Collapse>
        </Box>
    );
}

export function CitationGrid() {
    return (
        <>
            <SectionTitle>Reference List</SectionTitle>

            <Stack spacing={2.5}>
                {CATEGORY_ORDER.map((category, index) => {
                    const items = sortCitationsByTitle(
                        CITATIONS.filter((citation) => citation.category === category)
                    );

                    if (items.length === 0) return null;

                    return (
                        <CitationCategorySection
                            key={category}
                            category={category}
                            items={items}
                            defaultExpanded={index === 0}
                        />
                    );
                })}
            </Stack>
        </>
    );
}
