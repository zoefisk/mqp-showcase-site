"use client";

import * as React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

type StudyStatCardProps = {
    icon?: React.ReactNode;
    label: string;
    value: string;
    description?: string;
};

export default function StudyStatCard({
                                          icon,
                                          label,
                                          value,
                                          description,
                                      }: StudyStatCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderRadius: 3,
                height: "100%",
                background:
                    "linear-gradient(180deg, rgba(248,250,252,0.96) 0%, rgba(241,245,249,1) 100%)",
                boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
            }}
        >
            <Stack spacing={1.25}>
                {icon && (
                    <Box sx={{ color: "primary.main", display: "flex" }}>
                        {icon}
                    </Box>
                )}

                <Typography
                    variant="overline"
                    sx={{
                        lineHeight: 1,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: "text.secondary",
                    }}
                >
                    {label}
                </Typography>

                <Typography fontWeight={800} sx={{ lineHeight: 1.15 }}>
                    {value}
                </Typography>

                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
}
