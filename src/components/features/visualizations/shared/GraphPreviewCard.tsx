"use client";

import * as React from "react";
import { Divider, Paper, Stack } from "@mui/material";

type Props = {
    children: React.ReactNode;
    header: React.ReactNode;
    minHeight?: number;
};

export default function GraphPreviewCard({ children, header, minHeight = 250 }: Props) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3, md: 4 },
                minHeight,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2.5} sx={{ height: "100%" }}>
                {header}
                <Divider />
                {children}
            </Stack>
        </Paper>
    );
}
