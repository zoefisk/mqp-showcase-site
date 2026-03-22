"use client";

import * as React from "react";
import { Paper, Stack, Typography } from "@mui/material";

type ResearchNoteProps = {
    title?: string;
    children: React.ReactNode;
    mb?: number;
};

export default function ResearchNote({ title, children, mb }: ResearchNoteProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 4,
                mb,
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 5,
                    background: "linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)",
                },
            }}
        >
            <Stack spacing={2.5}>
                {title && (
                    <Typography fontWeight={800} sx={{ pl: 1 }}>
                        {title}
                    </Typography>
                )}
                <Stack spacing={2.5} sx={{ pl: 1 }}>
                    {children}
                </Stack>
            </Stack>
        </Paper>
    );
}
