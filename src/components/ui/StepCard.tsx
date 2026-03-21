"use client";

import { Paper, Typography } from "@mui/material";
import * as React from "react";

type StepCardProps = {
    title: string;
    body: string;
};

export default function StepCard({ title, body }: StepCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 3,
                minWidth: 180,
                textAlign: "center",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,1))",
            }}
        >
            <Typography fontWeight={700}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">
                {body}
            </Typography>
        </Paper>
    );
}
