"use client";

import * as React from "react";
import { Alert, Stack } from "@mui/material";

type Props = {
    error?: string | null;
    children: React.ReactNode;
};

export default function GraphWorkspace({ error, children }: Props) {
    return (
        <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack spacing={3}>{children}</Stack>
        </Stack>
    );
}
