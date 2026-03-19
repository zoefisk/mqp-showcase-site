import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import PageShell from "@/components/layout/PageShell";
import VegaGraphPicker from "@/components/vega/VegaGraphPicker";

export default function GraphEditorPage() {
    return (
        <PageShell maxWidth="md">
            <Stack spacing={3} alignItems="center" mb={6}>
                <Typography variant="h3" fontWeight={700}>
                    Graph Editor
                </Typography>

                <Typography color="text.secondary" textAlign="center">
                    Preview Vega JSON files and prepare them for future in-site editing.
                </Typography>

                <Divider sx={{ width: "100%" }} />
            </Stack>

            <VegaGraphPicker />
        </PageShell>
    );
}
