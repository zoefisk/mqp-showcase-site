import * as React from "react";
import {
    Box,
    Chip,
    Divider,
    Link as MuiLink,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";

import SectionTitle from "@/components/ui/SectionTitle";
import { CATEGORY_ORDER, CITATIONS, Citation, CitationCategory } from "@/data/citations";

const categoryIcons: Record<CitationCategory, React.ReactElement> = {
    "Foundational Research": <BiotechOutlinedIcon fontSize="small" />,
    "Healthcare Context": <MenuBookOutlinedIcon fontSize="small" />,
    Visualization: <DescriptionOutlinedIcon fontSize="small" />,
    Other: <PublicOutlinedIcon fontSize="small" />,
};

export function CitationCard({ citation }: { citation: Citation }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 4,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
            }}
        >
            <Stack spacing={1.5}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <Chip
                        icon={categoryIcons[citation.category]}
                        label={citation.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                            borderRadius: "999px",
                            fontWeight: 600,
                        }}
                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                    >
                        {citation.year}
                    </Typography>
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {citation.title}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {citation.authors}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {citation.source}
                </Typography>

                {(citation.url || citation.doi) && (
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {citation.url && (
                            <MuiLink
                                href={citation.url}
                                target="_blank"
                                rel="noreferrer"
                                underline="hover"
                                sx={{ fontWeight: 600 }}
                            >
                                View source
                            </MuiLink>
                        )}

                        {citation.doi && (
                            <Typography variant="body2" color="text.secondary">
                                DOI: {citation.doi}
                            </Typography>
                        )}
                    </Stack>
                )}

                {citation.note && (
                    <>
                        <Divider />
                        <Typography variant="body2" color="text.secondary">
                            {citation.note}
                        </Typography>
                    </>
                )}
            </Stack>
        </Paper>
    );
}

export function CitationGrid() {
    return (
        <>
            <SectionTitle>Reference List</SectionTitle>

            <Stack spacing={6}>
                {CATEGORY_ORDER.map((category) => {
                    const items = CITATIONS.filter((citation) => citation.category === category);

                    if (items.length === 0) return null;

                    return (
                        <Box key={category}>
                            <Stack
                                direction="row"
                                spacing={1.25}
                                alignItems="center"
                                sx={{ mb: 2.5 }}
                            >
                                <Box sx={{ color: "primary.main", display: "flex" }}>
                                    {categoryIcons[category]}
                                </Box>

                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {category}
                                </Typography>
                            </Stack>

                            <Stack spacing={2.5}>
                                {items.map((citation) => (
                                    <CitationCard key={citation.id} citation={citation} />
                                ))}
                            </Stack>
                        </Box>
                    );
                })}
            </Stack>
        </>
    );
}
