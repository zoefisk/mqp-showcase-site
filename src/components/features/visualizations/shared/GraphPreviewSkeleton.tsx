"use client";

import * as React from "react";
import { Box, Divider, Paper, Skeleton, Stack } from "@mui/material";

type Props = {
    minHeight?: number;
    titleWidth?: number | string;
    subtitleWidth?: number | string;
    controlsWidth?: number;
    previewHeight?: number;
};

export default function GraphPreviewSkeleton({
                                                 minHeight = 420,
                                                 titleWidth = 180,
                                                 subtitleWidth = "55%",
                                                 controlsWidth = 124,
                                                 previewHeight = 420,
                                             }: Props) {
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
            <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width={titleWidth} height={42} />
                        <Skeleton variant="text" width={subtitleWidth} height={24} />
                    </Box>

                    <Skeleton variant="rounded" width={controlsWidth} height={36} />
                </Stack>

                <Divider />

                <Box sx={{ width: "100%", minHeight: previewHeight, pt: 2 }}>
                    <Skeleton variant="rounded" width="100%" height={previewHeight} />
                </Box>
            </Stack>
        </Paper>
    );
}
