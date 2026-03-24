"use client";

import * as React from "react";
import { Paper, Skeleton, Stack } from "@mui/material";

type Props = {
    titleWidth?: number | string;
    rows?: number;
};

export default function SidebarAccordionSkeleton({ titleWidth = 140, rows = 3 }: Props) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: 2.25,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={titleWidth} height={28} />
                </Stack>

                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} variant="rounded" width="100%" height={56} />
                ))}
            </Stack>
        </Paper>
    );
}
