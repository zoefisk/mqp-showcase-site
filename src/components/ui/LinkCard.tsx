"use client";

import * as React from "react";
import Link from "next/link";
import { Paper, Stack, Typography } from "@mui/material";

/**
 * LinkCard
 *
 * A reusable navigational card component that presents a destination as a
 * visually prominent, clickable surface. Used for internal site navigation,
 * related resources, or feature entry points.
 *
 * Designed to balance discoverability and readability by combining:
 * - a full-card clickable area
 * - optional iconography for quick recognition
 * - a clear title and supporting description
 * - subtle hover feedback to communicate interactivity
 *
 * Usage:
 * <LinkCard
 *   href="/methods"
 *   openInNewTab=true
 *   icon={<ScienceOutlinedIcon color="primary" />}
 *   title="Methods"
 *   body="Review the study design, stimuli, and implementation process."
 * />
 *
 * Props:
 * @param href  Destination URL for the card
 * @param openInNewTab If true, the link opens in a new browser tab (defaults to false)
 * @param icon  Optional visual element shown above the title
 * @param title Primary label for the destination
 * @param body  Supporting summary text describing the destination
 */

type LinkCardProps = {
    href: string;
    openInNewTab?: boolean;
    icon?: React.ReactNode;
    title: string;
    body: string;
};

export default function LinkCard({ href, openInNewTab = false, icon, title, body }: LinkCardProps) {
    return (
        <Paper
            component={Link}
            href={href}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            variant="outlined"
            sx={(theme) => ({
                p: 2.5,
                borderRadius: 3,
                height: "100%",
                display: "block",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.main,
                },

                "&:focus-visible": {
                    outline: `3px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                },
            })}
        >
            <Stack spacing={1.5}>
                {/* Optional icon helps visually differentiate destinations */}
                {icon && <span>{icon}</span>}

                {/* Title should be easy to scan in navigation-heavy layouts */}
                <Typography fontWeight={700}>{title}</Typography>

                {/* Supporting text provides destination context before navigation */}
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </Stack>
        </Paper>
    );
}
