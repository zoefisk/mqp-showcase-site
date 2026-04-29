"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";

import SectionTitle from "@/components/ui/SectionTitle";
import CaseStudySectionCard from "@/components/case-study/CaseStudySectionCard";
import D3GraphEditor from "@/components/features/visualizations/d3/D3GraphEditor";

type CaseStudySpecificationPreviewProps = {
    sectionTitle: string;
    intro: string;
    previewTitle: string;
    previewDescription: string;
};

export default function CaseStudySpecificationPreview({
                                                          sectionTitle,
                                                          intro,
                                                          previewTitle,
                                                          previewDescription,
                                                      }: CaseStudySpecificationPreviewProps) {
    return (
        <>
            <SectionTitle>{sectionTitle}</SectionTitle>

            <CaseStudySectionCard>
                <Stack spacing={2.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ color: "primary.main", display: "flex" }}>
                            <HubOutlinedIcon />
                        </Box>
                        <Typography fontWeight={700}>Read-only preview</Typography>
                    </Stack>

                    <Typography color="text.secondary">{intro}</Typography>

                    <Accordion
                        disableGutters
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "none",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Stack spacing={0.25}>
                                <Typography fontWeight={600}>{previewTitle}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {previewDescription}
                                </Typography>
                            </Stack>
                        </AccordionSummary>

                        <AccordionDetails sx={{ pt: 0 }}>
                            <D3GraphEditor
                                title="D3 RRNL Preview"
                                subtitle="Take a look at real graphs that we used in our case study."
                                graphSource="creatinine-gradient"
                                htmlEditable={false}
                                svgEditable={false}
                                allowGraphSelection={false}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </CaseStudySectionCard>
        </>
    );
}
