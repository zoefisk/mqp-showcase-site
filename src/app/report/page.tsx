import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PageHeader from "@/components/layout/PageHeader";
import { basePath } from "@/lib/basePath";

const PDF_PATH = `${basePath}/report.pdf`;

export default function ReportPage() {

    return (
        <Box sx={{ minHeight: "100vh", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="md">
                <PageHeader
                    mainHeader="Report"
                    subheader="View the project report below, or open it in a new tab."
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<OpenInNewIcon />}
                            href={PDF_PATH}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                                borderRadius: "999px",
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Open PDF
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<PictureAsPdfIcon />}
                            href={PDF_PATH}
                            download
                            sx={{
                                borderRadius: "999px",
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Download
                        </Button>
                    </Stack>
                </PageHeader>

                {/* PDF Viewer */}
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: "70vh", md: "75vh" },
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                    }}
                >
                    <iframe
                        title="Project Report PDF"
                        src={`${PDF_PATH}#view=FitH`}
                        style={{ width: "100%", height: "100%", border: 0 }}
                    />
                </Box>

                {/* Fallback link (helps if the browser blocks iframe PDFs) */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: "center" }}
                >
                    If the PDF doesn’t display here,{" "}
                    <Box
                        component="a"
                        href={PDF_PATH}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}
                    >
                        open it in a new tab
                    </Box>
                    .
                </Typography>
            </Container>
        </Box>
    );
}
