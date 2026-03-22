"use client";

import * as React from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
    CircularProgress,
    Alert,
    Paper,
} from "@mui/material";

import VegaView from "@/components/features/visualizations/vega/VegaView";
import { buildVegaFromInput, type InputSpec, type VegaSpec } from "@/lib/vega/buildVega";
import {
    loadVegaGraphManifest,
    loadVegaInputSpecsFromFile,
    type VegaGraphManifestItem,
} from "@/lib/vega/loadVegaGraph";

export default function VegaGraphPicker() {
    const [manifest, setManifest] = React.useState<VegaGraphManifestItem[]>([]);
    const [selectedFile, setSelectedFile] = React.useState("");
    const [inputs, setInputs] = React.useState<InputSpec[]>([]);
    const [specs, setSpecs] = React.useState<VegaSpec[]>([]);
    const [loadingManifest, setLoadingManifest] = React.useState(true);
    const [loadingGraph, setLoadingGraph] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;

        async function init() {
            try {
                setLoadingManifest(true);
                setError(null);

                const items = await loadVegaGraphManifest();
                if (!mounted) return;

                setManifest(items);

                if (items.length > 0) {
                    setSelectedFile(items[0].file);
                }
            } catch (err) {
                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load manifest.");
            } finally {
                if (mounted) setLoadingManifest(false);
            }
        }

        init();

        return () => {
            mounted = false;
        };
    }, []);

    React.useEffect(() => {
        let mounted = true;

        async function loadSelectedGraph() {
            if (!selectedFile) return;

            try {
                setLoadingGraph(true);
                setError(null);

                const parsedInputs = await loadVegaInputSpecsFromFile(selectedFile);
                if (!mounted) return;

                setInputs(parsedInputs);
                setSpecs(parsedInputs.map(buildVegaFromInput));
            } catch (err) {
                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load graph.");
                setInputs([]);
                setSpecs([]);
            } finally {
                if (mounted) setLoadingGraph(false);
            }
        }

        loadSelectedGraph();

        return () => {
            mounted = false;
        };
    }, [selectedFile]);

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Graph Editor
                </Typography>
                <Typography color="text.secondary">Pick a Vega JSON file to preview.</Typography>
            </Box>

            {loadingManifest ? (
                <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading graph list...</Typography>
                </Stack>
            ) : (
                <FormControl fullWidth sx={{ maxWidth: 360 }}>
                    <InputLabel id="vega-graph-select-label">Graph file</InputLabel>
                    <Select
                        labelId="vega-graph-select-label"
                        value={selectedFile}
                        label="Graph file"
                        onChange={(e) => setSelectedFile(e.target.value)}
                    >
                        {manifest.map((item) => (
                            <MenuItem key={item.id} value={item.file}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    minHeight: 300,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                }}
            >
                {loadingGraph ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CircularProgress size={20} />
                        <Typography>Loading selected graph...</Typography>
                    </Stack>
                ) : specs.length > 0 ? (
                    <Stack spacing={4} alignItems="center">
                        {specs.map((spec, i) => (
                            <VegaView key={i} spec={spec} />
                        ))}
                    </Stack>
                ) : (
                    <Typography color="text.secondary">No graph loaded.</Typography>
                )}
            </Paper>

            {inputs.length > 0 && (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Parsed input preview
                    </Typography>
                    <Box
                        component="pre"
                        sx={{
                            m: 0,
                            fontSize: 13,
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {JSON.stringify(inputs, null, 2)}
                    </Box>
                </Paper>
            )}
        </Stack>
    );
}
