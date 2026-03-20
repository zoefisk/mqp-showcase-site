import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import PageShell from "@/components/layout/PageShell";
import VegaGraphEditor from "@/components/vega/VegaGraphEditor";
import PageHeader from "@/components/PageHeader";

export default function GraphEditorPage() {
    return (
        <PageShell maxWidth="lg">
                <PageHeader
                    eyebrowLabel={"MAKE YOUR OWN RRNL"}
                    mainHeader={"Graph Editor"}
                    subheader={"Build and customize reference range number lines from RRNL input properties."}
                />

            <VegaGraphEditor />
        </PageShell>
    );
}







