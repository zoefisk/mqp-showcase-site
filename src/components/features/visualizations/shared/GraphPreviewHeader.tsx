"use client";

import * as React from "react";
import {
    Box,
    Chip,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";

import type { GraphBadge, GraphPreviewModeOption } from "./types";

type Props<TMode extends string> = {
    title: string;
    subtitle: string;
    mode: TMode;
    availableModes: GraphPreviewModeOption<TMode>[];
    onModeChange: (mode: TMode) => void;
    badge?: GraphBadge;
};

export default function GraphPreviewHeader<TMode extends string>({
    title,
    subtitle,
    mode,
    availableModes,
    onModeChange,
    badge,
}: Props<TMode>) {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
        >
            <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="h5" fontWeight={700}>
                        {title}
                    </Typography>

                    {badge && (
                        <Chip
                            label={badge.label}
                            color={badge.color ?? "default"}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Stack>

                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
            </Box>

            <ToggleButtonGroup
                size="small"
                exclusive
                value={mode}
                onChange={(_, value) => {
                    if (value) onModeChange(value);
                }}
            >
                {availableModes.map((option) => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        <Tooltip title={option.label}>
                            <Box sx={{ display: "flex" }}>{option.icon ?? option.label}</Box>
                        </Tooltip>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}
