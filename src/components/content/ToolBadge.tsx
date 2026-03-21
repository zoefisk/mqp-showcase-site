"use client";

import * as React from "react";
import { Box, alpha } from "@mui/material";

type ToolBadgeProps = {
    label: string;
};

export default function ToolBadge({ label }: ToolBadgeProps) {
    return (
        <Box
            sx={(theme) => ({
                display: "inline-flex",
                alignItems: "center",
                px: 1.4,
                py: 0.65,
                borderRadius: "999px",
                fontSize: "0.92rem",
                fontWeight: 700,
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.16),
            })}
        >
            {label}
        </Box>
    );
}
