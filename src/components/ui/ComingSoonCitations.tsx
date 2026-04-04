import * as React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { CiWarning } from "react-icons/ci";

import PageHeader from "@/components/layout/PageHeader";

export default function ComingSoonCitations() {
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
                    subheader="The references section for this project is still being finalized."
                />

                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 4,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                    }}
                >
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <CiWarning />
                        We are currently reviewing and organizing the full list of project sources.
                        Please check back soon for the completed citations page.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
