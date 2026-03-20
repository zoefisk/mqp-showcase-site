"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function SiteBadge() {
    return (
        <Box
            component={Link}
            href="/"
            sx={{
                position: "fixed",
                top: 24,
                left: 24,
                zIndex: 1250,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                "&:hover": {
                    transform: "translateY(-1px)",
                    opacity: 0.92,
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: 54,
                    height: 54,
                    flexShrink: 0,
                }}
            >
                <Image
                    src="/WPI.png"
                    alt="WPI logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                />
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography
                    variant="overline"
                    sx={{
                        display: "block",
                        lineHeight: 1,
                        letterSpacing: 1.8,
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 0.4,
                    }}
                >
                    WPI MQP
                </Typography>

                <Typography
                    sx={{
                        lineHeight: 1.1,
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: "text.primary",
                    }}
                >
                    RRNLs Project Showcase
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.15,
                        mt: 0.3,
                    }}
                >
                    Reference Range Number Lines
                </Typography>
            </Box>
        </Box>
    );
}
