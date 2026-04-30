import * as React from "react";
import { Box, Container } from "@mui/material";

import PageHeader from "@/components/layout/PageHeader";
import {CitationGrid} from "@/components/ui/CitationList";

export default function CitationsPage() {
    // if (process.env.NODE_ENV === "production") {
    //     return <ComingSoonCitations />;
    // }

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
                    eyebrowLabel="PROJECT REFERENCES"
                    mainHeader="Citations"
                    subheader="A curated list of the sources referenced throughout this project, including foundational studies, healthcare context, and visualization-related literature."
                />

                <CitationGrid />
            </Container>
        </Box>
    );
}
