"use client";

import * as React from "react";
import { Avatar } from "@mui/material";

/**
 * TeamAvatar
 *
 * A reusable avatar component for displaying team members with support for:
 * - profile images
 * - fallback initials when no image is available
 *
 * Designed for use in team directories, profile cards, and contributor sections.
 *
 * Behavior:
 * - If `src` is provided and non-empty, the image is displayed
 * - Otherwise, the avatar falls back to generated initials from the name
 *
 * Accessibility:
 * - Provides descriptive alt text for screen readers
 *
 * Usage:
 * <TeamAvatar name="Zoe Fisk" src="/images/zoe.jpg" />
 * <TeamAvatar name="Jane Doe" />
 *
 * Props:
 * @param name Full name used for initials and alt text
 * @param src  Optional image URL for the avatar
 */
type Props = {
    name: string;
    src?: string;
};

export default function TeamAvatar({ name, src }: Props) {
    /**
     * Generate up to two initials from the provided name.
     * Example:
     * "Zoe Fisk" -> "ZF"
     * "Zoe" -> "Z"
     */
    const initials = React.useMemo(() => {
        return name
            .trim()
            .split(/\s+/)
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }, [name]);

    /**
     * Determine if a valid image source exists
     */
    const hasImage = Boolean(src && src.trim() !== "");

    return (
        <Avatar
            src={hasImage ? src : undefined}
            alt={`${name} profile picture`}
            sx={(theme) => ({
                width: 88,
                height: 88,
                fontSize: 28,
                fontWeight: 700,

                // Use a neutral background when no image is available
                bgcolor: !hasImage ? theme.palette.grey[400] : undefined,

                // Improve contrast for initials
                color: !hasImage ? theme.palette.getContrastText(theme.palette.grey[400]) : undefined,
            })}
        >
            {/* Fallback initials when image is not available */}
            {!hasImage && initials}
        </Avatar>
    );
}
