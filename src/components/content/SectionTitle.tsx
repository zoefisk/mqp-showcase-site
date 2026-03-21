"use client";

import { Stack, Typography } from "@mui/material";
import * as React from "react";

type SectionTitleProps = {
    children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
    return (
        <Stack alignItems="center" spacing={1} mb={2}>
            <Typography
                variant="overline"
                sx={{
                    letterSpacing: 2,
                    fontWeight: 700,
                    color: "primary.main",
                }}
            >
                {children}
            </Typography>

            <Typography
                sx={{
                    width: 40,
                    height: 3,
                    borderRadius: 999,
                    bgcolor: "primary.main",
                    opacity: 0.6,
                }}
            />
        </Stack>
    );
}
