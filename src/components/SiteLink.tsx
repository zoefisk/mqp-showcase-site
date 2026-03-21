"use client";

import * as React from "react";
import Link from "next/link";
import { Box, alpha } from "@mui/material";

type SiteLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function SiteLink({ href, children }: SiteLinkProps) {
    return (
        <Box
            component={Link}
            href={href}
            sx={(theme) => ({
                display: "inline-flex",
                alignItems: "center",
                px: 1.25,
                py: 0.35,
                mx: 0.15,
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.18),
                transition:
                    "transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                "&:hover": {
                    transform: "translateY(-1px)",
                    backgroundColor: alpha(theme.palette.primary.main, 0.14),
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    boxShadow: "0 6px 16px rgba(37,99,235,0.12)",
                },
            })}
        >
            {children}
        </Box>
    );
}
