"use client";

import Link from "next/link";
import { Paper, Stack, Typography } from "@mui/material";
import * as React from "react";

type LinkCardProps = {
    href: string;
    icon?: React.ReactNode;
    title: string;
    body: string;
};

export default function LinkCard({
                                     href,
                                     icon,
                                     title,
                                     body,
                                 }: LinkCardProps) {
    return (
        <Link href={href} style={{ textDecoration: "none" }}>
            <Paper
                variant="outlined"
                sx={{
                    p: 2.5,
                    borderRadius: 3,
                    height: "100%",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                        borderColor: "primary.main",
                    },
                }}
            >
                <Stack spacing={1.5}>
                    {icon}
                    <Typography fontWeight={700}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </Stack>
            </Paper>
        </Link>
    );
}
