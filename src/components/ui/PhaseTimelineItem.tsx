"use client";

import * as React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

type PhaseTimelineItemProps = {
    number: string;
    title: string;
    body: string;
};

export default function PhaseTimelineItem({ number, title, body }: PhaseTimelineItemProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "72px 1fr" },
                gap: 2,
                alignItems: "stretch",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "stretch" },
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: { xs: 56, sm: 64 },
                        minWidth: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: "100%" },
                        minHeight: 56,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: 800,
                        fontSize: "1rem",
                        boxShadow: "0 10px 24px rgba(37,99,235,0.18)",
                    }}
                >
                    {number}
                </Box>
            </Box>

            <Paper
                variant="outlined"
                sx={{
                    p: 2.5,
                    borderRadius: 3,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                }}
            >
                <Stack spacing={1}>
                    <Typography fontWeight={700}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}
