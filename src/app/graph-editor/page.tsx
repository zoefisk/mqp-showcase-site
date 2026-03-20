import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import PageShell from "@/components/layout/PageShell";
import VegaGraphEditor from "@/components/vega/VegaGraphEditor";

export default function GraphEditorPage() {
    return (
        <PageShell maxWidth="lg">
            <Stack spacing={3} alignItems="center" mb={6}>
                {/* subtle eyebrow label */}
                <Typography
                    variant="overline"
                    sx={{
                        letterSpacing: 2,
                        fontWeight: 700,
                        color: "primary.main",
                    }}
                >
                    MAKE YOUR OWN RRNL
                </Typography>

                <Typography variant="h3" fontWeight={700}>
                    Graph Editor
                </Typography>

                <Typography color="text.secondary" textAlign="center">
                    Build and customize reference range number lines from RRNL input properties.
                </Typography>

                <Divider sx={{ width: "100%" }} />
            </Stack>

            <VegaGraphEditor />
        </PageShell>
    );
}









// import * as React from "react";
// import { Divider, Stack, Typography } from "@mui/material";
// import PageShell from "@/components/layout/PageShell";
// import VegaGraphPicker from "@/components/vega/VegaGraphPicker";
//
// export default function GraphEditorPage() {
//     return (
//         <PageShell maxWidth="md">
//             <Stack spacing={3} alignItems="center" mb={6}>
//                 <Typography variant="h3" fontWeight={700}>
//                     Graph Editor
//                 </Typography>
//
//                 <Typography color="text.secondary" textAlign="center">
//                     Preview Vega JSON files and prepare them for future in-site editing.
//                 </Typography>
//
//                 <Divider sx={{ width: "100%" }} />
//             </Stack>
//
//             <VegaGraphPicker />
//         </PageShell>
//     );
// }
