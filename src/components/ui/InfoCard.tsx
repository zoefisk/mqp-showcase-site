"use client";

import * as React from "react";
import { Paper, Stack, Typography } from "@mui/material";

/**
 * InfoCard
 *
 * A reusable, presentation-focused card component used to display
 * concise informational content with an optional icon, title, and body text.
 *
 * Designed for use in dashboards, landing sections, and feature highlights.
 *
 * Features:
 * - Center-aligned layout for readability
 * - Subtle hover elevation for interactivity
 * - Consistent spacing using MUI Stack
 * - Optional icon support for visual context
 *
 * Usage:
 * <InfoCard
 *   icon={<SomeIcon />}
 *   title="Fast Rendering"
 *   body="Graphs update instantly as you edit the specification."
 * />
 *
 * Props:
 * @param icon  Optional React node displayed above the title (e.g., icon)
 * @param title Primary heading text for the card
 * @param body  Supporting description text
 */

type InfoCardProps = {
    icon?: React.ReactNode;
    title: string;
    body: string;
};

export default function InfoCard({ icon, title, body }: InfoCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={(theme) => ({
                p: 2.5,
                borderRadius: 3,
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                },
            })}
        >
            <Stack spacing={1.5} alignItems="center">
                {/* Optional icon provides visual context */}
                {icon && <span>{icon}</span>}

                {/* Title: emphasized for quick scanning */}
                <Typography fontWeight={700}>
                    {title}
                </Typography>

                {/* Body: secondary supporting text */}
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </Stack>
        </Paper>
    );
}
