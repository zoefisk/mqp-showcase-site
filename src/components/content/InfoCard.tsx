"use client";

import { Paper, Stack, Typography } from "@mui/material";
import * as React from "react";

type InfoCardProps = {
    icon?: React.ReactNode;
    title: string;
    body: string;
};

export default function InfoCard({ icon, title, body }: InfoCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderRadius: 3,
                textAlign: "center",
                transition: "all 0.2s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                },
            }}
        >
            <Stack spacing={1.5} alignItems="center">
                {icon}
                <Typography fontWeight={700}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </Stack>
        </Paper>
    );
}
