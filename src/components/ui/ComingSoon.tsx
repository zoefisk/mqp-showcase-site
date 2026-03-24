import {Container, Paper, Typography} from "@mui/material";
import * as React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { CiWarning } from "react-icons/ci";

export default function ComingSoon() {
    return (
            <Container maxWidth="md">
                <PageHeader
                    mainHeader="Report"
                    subheader="View the project report below, or open it in a new tab."
                />

                <Paper
                    variant="outlined"
                    sx={{
                        p: {xs: 2.5, sm: 3.5},
                        borderRadius: 4,
                        mb: 8,
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
                        This page is under construction, as we are still actively writing our final report! Please stay tuned!
                    </Typography>
                </Paper>

            </Container>
    );
}
