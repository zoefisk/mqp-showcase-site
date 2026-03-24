import * as React from "react";
import PageShell from "@/components/layout/PageShell";
import VegaGraphEditor from "@/components/features/visualizations/vega/VegaGraphEditor";
import PageHeader from "@/components/layout/PageHeader";

export default function GraphEditorPage() {
    return (
        <PageShell maxWidth="lg">
            <PageHeader
                eyebrowLabel={"MAKE YOUR OWN RRNL"}
                mainHeader={"Graph Editor"}
                subheader={
                    "Build and customize reference range number lines from RRNL input properties."
                }
            />

            <VegaGraphEditor
                title={"Preview"}
                subtitle={
                    "Load an RRNL template, edit its properties, and preview the live Vega output."
                }
            />
        </PageShell>
    );
}
