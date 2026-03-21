"use client";

import * as React from "react";
import { Avatar } from "@mui/material";

type Props = {
    name: string;
    src?: string;
};

export default function TeamAvatar({ name, src }: Props) {
    const initials = name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const hasImage = Boolean(src && src.trim() !== "");

    return (
        <Avatar
            src={hasImage ? src : undefined}
            alt={`${name} headshot`}
            sx={{
                width: 88,
                height: 88,
                fontSize: 28,
                fontWeight: 700,
                bgcolor: !hasImage ? "grey.400" : undefined,
            }}
        >
            {!hasImage && initials}
        </Avatar>
    );
}
