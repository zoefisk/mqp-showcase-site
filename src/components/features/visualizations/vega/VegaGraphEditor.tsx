"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";

import VegaView from "@/components/features/visualizations/vega/VegaView";
import GraphWorkspace from "@/components/features/visualizations/shared/GraphWorkspace";
import GraphSourceAccordion from "@/components/features/visualizations/shared/GraphSourceAccordion";
import GraphPreviewHeader from "@/components/features/visualizations/shared/GraphPreviewHeader";
import GraphPreviewCard from "@/components/features/visualizations/shared/GraphPreviewCard";
import GraphPreviewSkeleton from "@/components/features/visualizations/shared/GraphPreviewSkeleton";
import GraphCodePanel from "@/components/features/visualizations/shared/GraphCodePanel";
import SidebarGroupSkeleton from "@/components/features/visualizations/shared/SidebarGroupSkeleton";
import type { GraphPreviewModeOption } from "@/components/features/visualizations/shared/types";

import { useGraphManifest } from "@/hooks/graphs/useGraphManifest";
import { copyText } from "@/lib/graphs/clipboard";
import { downloadTextFile } from "@/lib/graphs/downloads";
import { ensureMinimumLoadingTime } from "@/lib/graphs/loading";

import {
    buildVegaFromInput,
    parseInputSpecs,
    type InputSpec,
    type VegaSpec,
} from "@/lib/graphs/vega/buildVega";
import { loadVegaGraphManifest, loadVegaInputSpecsFromFile } from "@/lib/graphs/vega/loadVegaGraph";
import {
    addCategory,
    createDefaultInputSpec,
    normalizeInputSpec,
    removeCategoryAt,
    type PreviewMode,
    updateCategoryAt,
} from "@/lib/graphs/vega/editorHelpers";

type VegaGraphEditorProps = {
    title: string;
    subtitle: string;
    jsonEditable?: boolean;
    showPropertyEditors?: boolean;
    graphSource?: string;
};

type JsonErrorLocation = {
    line: number;
    column: number;
} | null;

function SidebarAccordion({
    title,
    icon,
    children,
}: React.PropsWithChildren<{
    title: string;
    icon?: React.ReactNode;
}>) {
    return (
        <Accordion
            defaultExpanded={false}
            disableGutters
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "18px !important",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    px: 2.25,
                    py: 0.25,
                }}
            >
                <Stack direction="row" spacing={1.25} alignItems="center">
                    {icon}
                    <Typography fontWeight={700}>{title}</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2.25, pb: 2.25 }}>{children}</AccordionDetails>
        </Accordion>
    );
}

function TitleSection({
    value,
    onChange,
}: {
    value: InputSpec;
    onChange: (next: InputSpec) => void;
}) {
    return (
        <Stack spacing={2}>
            <TextField
                label="Title text"
                value={value.title.text}
                onChange={(e) =>
                    onChange({
                        ...value,
                        title: { ...value.title, text: e.target.value },
                    })
                }
                fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                    <InputLabel>Align</InputLabel>
                    <Select
                        value={value.title.align ?? "center"}
                        label="Align"
                        onChange={(e) =>
                            onChange({
                                ...value,
                                title: {
                                    ...value.title,
                                    align: e.target.value as "left" | "center" | "right",
                                },
                            })
                        }
                    >
                        <MenuItem value="left">Left</MenuItem>
                        <MenuItem value="center">Center</MenuItem>
                        <MenuItem value="right">Right</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Font"
                    value={value.title.font ?? ""}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            title: { ...value.title, font: e.target.value },
                        })
                    }
                    fullWidth
                />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Font size"
                    type="number"
                    value={value.title.fontSize ?? 16}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            title: {
                                ...value.title,
                                fontSize: Number(e.target.value),
                            },
                        })
                    }
                    fullWidth
                />

                <TextField
                    label="Title color"
                    type="color"
                    value={value.title.color ?? "#111827"}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            title: { ...value.title, color: e.target.value },
                        })
                    }
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Stack>
        </Stack>
    );
}

function AxisAndLabelsSection({
    value,
    onChange,
}: {
    value: InputSpec;
    onChange: (next: InputSpec) => void;
}) {
    return (
        <Stack spacing={2}>
            <TextField
                label="Start value"
                type="number"
                value={value.data.start}
                onChange={(e) =>
                    onChange({
                        ...value,
                        data: {
                            ...value.data,
                            start: Number(e.target.value),
                        },
                    })
                }
                fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                    <InputLabel>Label position</InputLabel>
                    <Select
                        value={value.labels?.position ?? "on"}
                        label="Label position"
                        onChange={(e) =>
                            onChange({
                                ...value,
                                labels: {
                                    ...value.labels,
                                    position: e.target.value as "over" | "on" | "under",
                                },
                            })
                        }
                    >
                        <MenuItem value="over">Over</MenuItem>
                        <MenuItem value="on">On</MenuItem>
                        <MenuItem value="under">Under</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Tick position</InputLabel>
                    <Select
                        value={value.tickmarks?.position ?? "bottom"}
                        label="Tick position"
                        onChange={(e) =>
                            onChange({
                                ...value,
                                tickmarks: {
                                    ...value.tickmarks,
                                    position: e.target.value as "top" | "bottom",
                                },
                            })
                        }
                    >
                        <MenuItem value="top">Top</MenuItem>
                        <MenuItem value="bottom">Bottom</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Tick count"
                    type="number"
                    value={value.tickmarks?.tickCount ?? 4}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            tickmarks: {
                                ...value.tickmarks,
                                tickCount: Number(e.target.value),
                            },
                        })
                    }
                    fullWidth
                />

                <TextField
                    label="Separator width"
                    type="number"
                    value={value.separation?.width ?? 2}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            separation: {
                                ...value.separation,
                                width: Number(e.target.value),
                            },
                        })
                    }
                    fullWidth
                />
            </Stack>

            <TextField
                label="Separator color"
                type="color"
                value={value.separation?.color ?? "#111111"}
                onChange={(e) =>
                    onChange({
                        ...value,
                        separation: {
                            ...value.separation,
                            color: e.target.value,
                        },
                    })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Stack>
    );
}

function ValueIndicatorSection({
    value,
    onChange,
}: {
    value: InputSpec;
    onChange: (next: InputSpec) => void;
}) {
    const hasIndicator = !!value.value_indicator;
    const indicator = value.value_indicator;

    const minValue = value.data.start;
    const maxValue =
        value.data.categories[value.data.categories.length - 1]?.end ?? value.data.start;

    const [draftValue, setDraftValue] = React.useState(
        indicator ? String(indicator.value) : String(minValue),
    );

    React.useEffect(() => {
        if (indicator) {
            setDraftValue(String(indicator.value));
        } else {
            setDraftValue(String(minValue));
        }
    }, [indicator?.value, minValue]);

    function clampIndicatorValue(raw: number) {
        if (Number.isNaN(raw)) return minValue;
        return Math.min(Math.max(raw, minValue), maxValue);
    }

    function commitDraftValue() {
        if (!indicator) return;

        const parsed = Number(draftValue);
        const clamped = clampIndicatorValue(parsed);

        onChange({
            ...value,
            value_indicator: {
                ...indicator,
                value: clamped,
            },
        });

        setDraftValue(String(clamped));
    }

    function handleDraftChange(nextDraft: string) {
        setDraftValue(nextDraft);

        if (!indicator) return;

        const parsed = Number(nextDraft);

        if (
            nextDraft.trim() === "" ||
            nextDraft === "-" ||
            nextDraft === "." ||
            nextDraft === "-."
        ) {
            return;
        }

        if (!Number.isNaN(parsed)) {
            const clamped = clampIndicatorValue(parsed);

            onChange({
                ...value,
                value_indicator: {
                    ...indicator,
                    value: clamped,
                },
            });
        }
    }

    const parsedDraft = Number(draftValue);
    const showOutOfRangeWarning =
        draftValue.trim() !== "" &&
        draftValue !== "-" &&
        draftValue !== "." &&
        draftValue !== "-." &&
        !Number.isNaN(parsedDraft) &&
        (parsedDraft < minValue || parsedDraft > maxValue);

    return (
        <Stack spacing={2}>
            <ToggleButtonGroup
                exclusive
                value={hasIndicator ? "on" : "off"}
                onChange={(_, next) => {
                    if (!next) return;

                    if (next === "on") {
                        const nextIndicator = indicator ?? {
                            value: minValue,
                            title: "",
                        };

                        onChange({
                            ...value,
                            value_indicator: nextIndicator,
                        });

                        setDraftValue(String(nextIndicator.value));
                    } else {
                        onChange({
                            ...value,
                            value_indicator: undefined,
                        });
                    }
                }}
            >
                <ToggleButton value="on">On</ToggleButton>
                <ToggleButton value="off">Off</ToggleButton>
            </ToggleButtonGroup>

            {hasIndicator && indicator && (
                <>
                    <TextField
                        label="Indicator value"
                        type="number"
                        value={draftValue}
                        onChange={(e) => handleDraftChange(e.target.value)}
                        onBlur={commitDraftValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                commitDraftValue();
                            }
                        }}
                        fullWidth
                        inputProps={{
                            min: minValue,
                            max: maxValue,
                            step: 1,
                        }}
                        error={showOutOfRangeWarning}
                        helperText={
                            showOutOfRangeWarning
                                ? `Preview is clamped between ${minValue} and ${maxValue}`
                                : `Allowed range: ${minValue} to ${maxValue}`
                        }
                    />

                    <TextField
                        label="Indicator title"
                        value={indicator.title ?? ""}
                        onChange={(e) =>
                            onChange({
                                ...value,
                                value_indicator: {
                                    ...indicator,
                                    value: indicator.value,
                                    title: e.target.value,
                                },
                            })
                        }
                        fullWidth
                    />
                </>
            )}
        </Stack>
    );
}

function CategoriesSection({
    value,
    onChange,
}: {
    value: InputSpec;
    onChange: (next: InputSpec) => void;
}) {
    const categories = value.data.categories;

    return (
        <Stack spacing={2.5}>
            {categories.map((category, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight={700}>Category {index + 1}</Typography>

                            <Tooltip title="Remove category">
                                <span>
                                    <IconButton
                                        color="error"
                                        disabled={categories.length <= 1}
                                        onClick={() =>
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    categories: removeCategoryAt(categories, index),
                                                },
                                            })
                                        }
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Stack>

                        <TextField
                            label="Name"
                            value={category.name}
                            onChange={(e) =>
                                onChange({
                                    ...value,
                                    data: {
                                        ...value.data,
                                        categories: updateCategoryAt(categories, index, {
                                            name: e.target.value,
                                        }),
                                    },
                                })
                            }
                            fullWidth
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Cumulative end"
                                type="number"
                                value={category.end}
                                onChange={(e) =>
                                    onChange({
                                        ...value,
                                        data: {
                                            ...value.data,
                                            categories: updateCategoryAt(categories, index, {
                                                end: Number(e.target.value),
                                            }),
                                        },
                                    })
                                }
                                fullWidth
                            />

                            <TextField
                                label="Color"
                                type="color"
                                value={category.color}
                                onChange={(e) =>
                                    onChange({
                                        ...value,
                                        data: {
                                            ...value.data,
                                            categories: updateCategoryAt(categories, index, {
                                                color: e.target.value,
                                            }),
                                        },
                                    })
                                }
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>
                    </Stack>
                </Paper>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                onClick={() =>
                    onChange({
                        ...value,
                        data: {
                            ...value.data,
                            categories: addCategory(categories),
                        },
                    })
                }
            >
                Add category
            </Button>
        </Stack>
    );
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightJson(json: string, errorLocation?: JsonErrorLocation): string {
    const tokenRegex =
        /("(?:\\.|[^"\\])*")(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\],:]/g;

    let result = "";
    let lastIndex = 0;

    for (const match of json.matchAll(tokenRegex)) {
        const index = match.index ?? 0;
        const full = match[0];
        const stringToken = match[1];
        const keyColon = match[2];

        result += escapeHtml(json.slice(lastIndex, index));

        if (stringToken) {
            if (keyColon) {
                result += `<span class="json-key">${escapeHtml(stringToken)}</span><span class="json-punctuation">${escapeHtml(keyColon)}</span>`;
            } else {
                result += `<span class="json-string">${escapeHtml(full)}</span>`;
            }
        } else if (/^(true|false)$/.test(full)) {
            result += `<span class="json-boolean">${full}</span>`;
        } else if (full === "null") {
            result += `<span class="json-null">${full}</span>`;
        } else if (/^-?\d/.test(full)) {
            result += `<span class="json-number">${full}</span>`;
        } else {
            result += `<span class="json-punctuation">${escapeHtml(full)}</span>`;
        }

        lastIndex = index + full.length;
    }

    result += escapeHtml(json.slice(lastIndex));

    const lines = result.split("\n");

    return lines
        .map((lineHtml, i) => {
            const lineNumber = i + 1;
            const hasError = errorLocation?.line === lineNumber;

            return hasError
                ? `<span class="json-error-line">${lineHtml || " "}</span>`
                : lineHtml || " ";
        })
        .join("\n");
}

function getLineNumbers(text: string): number[] {
    const count = text.split("\n").length;
    return Array.from({ length: count }, (_, i) => i + 1);
}

function getJsonErrorLocation(error: string, text: string): JsonErrorLocation {
    const positionMatch = error.match(/position\s+(\d+)/i);
    if (positionMatch) {
        const position = Number(positionMatch[1]);
        if (!Number.isNaN(position)) {
            const before = text.slice(0, position);
            const line = before.split("\n").length;
            const lastNewline = before.lastIndexOf("\n");
            const column = position - lastNewline;
            return { line, column };
        }
    }

    const lineColumnMatch = error.match(/line\s+(\d+).*column\s+(\d+)/i);
    if (lineColumnMatch) {
        const line = Number(lineColumnMatch[1]);
        const column = Number(lineColumnMatch[2]);
        if (!Number.isNaN(line) && !Number.isNaN(column)) {
            return { line, column };
        }
    }

    return null;
}

function PreviewStage({
    title,
    subtitle,
    mode,
    spec,
    jsonText,
    jsonEditable,
    jsonError,
    jsonErrorLocation,
    onModeChange,
    onJsonTextChange,
    onCopyJson,
    onDownloadJson,
}: {
    title: string;
    subtitle: string;
    mode: PreviewMode;
    spec: VegaSpec | null;
    jsonText: string;
    jsonEditable: boolean;
    jsonError: string | null;
    jsonErrorLocation: JsonErrorLocation;
    onModeChange: (mode: PreviewMode) => void;
    onJsonTextChange: (next: string) => void;
    onCopyJson: () => void;
    onDownloadJson: () => void;
}) {
    const highlightedJson = React.useMemo(
        () => highlightJson(jsonText, jsonErrorLocation ?? undefined),
        [jsonText, jsonErrorLocation],
    );

    const lineNumbers = React.useMemo(() => getLineNumbers(jsonText), [jsonText]);

    const availableModes: GraphPreviewModeOption<PreviewMode>[] = [
        {
            value: "graph",
            label: "Graph view",
            icon: <AutoGraphOutlinedIcon fontSize="small" />,
        },
        {
            value: "json",
            label: "JSON view",
            icon: <CodeOutlinedIcon fontSize="small" />,
        },
    ];

    return (
        <GraphPreviewCard
            minHeight={200}
            header={
                <GraphPreviewHeader
                    title={title}
                    subtitle={subtitle}
                    mode={mode}
                    availableModes={availableModes}
                    onModeChange={onModeChange}
                />
            }
        >
            {mode === "graph" ? (
                spec ? (
                    <Box
                        sx={{
                            width: "100%",
                            height: 400,
                            pt: 1,
                        }}
                    >
                        <VegaView spec={spec as any} />
                    </Box>
                ) : (
                    <Alert severity="warning">
                        Unable to build Vega spec from the current RRNL properties.
                    </Alert>
                )
            ) : (
                <GraphCodePanel
                    label="JSON"
                    text={jsonText}
                    editable={jsonEditable}
                    error={jsonEditable ? jsonError : null}
                    errorLocation={jsonEditable ? jsonErrorLocation : null}
                    highlightedHtml={highlightedJson}
                    lineNumbers={lineNumbers}
                    onChange={onJsonTextChange}
                    onCopy={onCopyJson}
                    onDownload={onDownloadJson}
                    language="json"
                    minHeight={420}
                    maxHeight={600}
                />
            )}
        </GraphPreviewCard>
    );
}

function EditorSidebar({
    value,
    onChange,
}: {
    value: InputSpec;
    onChange: (next: InputSpec) => void;
}) {
    return (
        <Stack spacing={2}>
            <SidebarAccordion title="Title" icon={<TitleOutlinedIcon fontSize="small" />}>
                <TitleSection value={value} onChange={onChange} />
            </SidebarAccordion>

            <SidebarAccordion
                title="Axis, Labels, and Separation"
                icon={<TuneOutlinedIcon fontSize="small" />}
            >
                <AxisAndLabelsSection value={value} onChange={onChange} />
            </SidebarAccordion>

            <SidebarAccordion
                title="Value Indicator"
                icon={<AdsClickOutlinedIcon fontSize="small" />}
            >
                <ValueIndicatorSection value={value} onChange={onChange} />
            </SidebarAccordion>

            <SidebarAccordion title="Categories" icon={<ViewAgendaOutlinedIcon fontSize="small" />}>
                <CategoriesSection value={value} onChange={onChange} />
            </SidebarAccordion>
        </Stack>
    );
}

function stringifySpec(input: InputSpec): string {
    return JSON.stringify(input, null, 2);
}

function tryParseEditableJson(rawText: string): {
    nextInput: InputSpec | null;
    error: string | null;
} {
    try {
        const raw = JSON.parse(rawText);
        const parsed = parseInputSpecs(raw);
        const first = parsed[0];

        if (!first) {
            return {
                nextInput: null,
                error: "JSON is valid, but no RRNL spec was found.",
            };
        }

        return {
            nextInput: normalizeInputSpec(first),
            error: null,
        };
    } catch (err) {
        if (err instanceof Error) {
            return {
                nextInput: null,
                error: err.message,
            };
        }

        return {
            nextInput: null,
            error: "Invalid JSON.",
        };
    }
}

export default function VegaGraphEditor({
    title,
    subtitle,
    jsonEditable = true,
    showPropertyEditors = true,
    graphSource,
}: VegaGraphEditorProps) {
    const { manifest, selectedId, setSelectedId, selectedItem, loadingManifest, error, setError } =
        useGraphManifest(loadVegaGraphManifest, graphSource);

    const [inputSpec, setInputSpec] = React.useState<InputSpec>(createDefaultInputSpec());
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("graph");
    const [loadingGraph, setLoadingGraph] = React.useState(false);

    const [jsonText, setJsonText] = React.useState<string>(stringifySpec(createDefaultInputSpec()));
    const [jsonError, setJsonError] = React.useState<string | null>(null);
    const [jsonErrorLocation, setJsonErrorLocation] = React.useState<JsonErrorLocation>(null);
    const [isEditingJson, setIsEditingJson] = React.useState(false);

    const builtSpec = React.useMemo(() => {
        try {
            return buildVegaFromInput(inputSpec);
        } catch {
            return null;
        }
    }, [inputSpec]);

    React.useEffect(() => {
        let mounted = true;

        async function loadSelectedGraph() {
            if (!selectedItem?.file) return;

            const startedAt = Date.now();

            try {
                setLoadingGraph(true);
                setError(null);
                setJsonError(null);

                const parsedInputs = await loadVegaInputSpecsFromFile(selectedItem.file);
                const firstInput = parsedInputs[0] ?? createDefaultInputSpec();
                const normalized = normalizeInputSpec(firstInput);

                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setInputSpec(normalized);
                setJsonText(stringifySpec(normalized));
                setJsonError(null);
                setJsonErrorLocation(null);
                setIsEditingJson(false);
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setError(err instanceof Error ? err.message : "Failed to load graph.");

                const fallback = createDefaultInputSpec();
                setInputSpec(fallback);
                setJsonText(stringifySpec(fallback));
                setJsonError(null);
                setJsonErrorLocation(null);
                setIsEditingJson(false);
            } finally {
                if (mounted) setLoadingGraph(false);
            }
        }

        loadSelectedGraph();

        return () => {
            mounted = false;
        };
    }, [selectedItem, setError]);

    React.useEffect(() => {
        if (isEditingJson) return;
        setJsonText(stringifySpec(inputSpec));
    }, [inputSpec, isEditingJson]);

    async function handleCopyJson() {
        await copyText(jsonText);
    }

    function handleDownloadJson() {
        downloadTextFile(jsonText, "rrnl-graph.json", "application/json;charset=utf-8");
    }

    function handleJsonTextChange(nextText: string) {
        setJsonText(nextText);

        if (!jsonEditable) return;

        setIsEditingJson(true);

        const result = tryParseEditableJson(nextText);

        if (result.error) {
            setJsonError(result.error);
            setJsonErrorLocation(getJsonErrorLocation(result.error, nextText));
            return;
        }

        if (result.nextInput) {
            setJsonError(null);
            setJsonErrorLocation(null);
            setInputSpec(result.nextInput);
        }
    }

    function handlePropertyChange(next: InputSpec) {
        setInputSpec(next);
        setJsonError(null);
        setJsonErrorLocation(null);

        if (!isEditingJson) {
            setJsonText(stringifySpec(next));
        } else {
            setJsonText(stringifySpec(next));
            setIsEditingJson(false);
        }
    }

    return (
        <GraphWorkspace error={error}>
            {loadingGraph ? (
                <>
                    <GraphPreviewSkeleton
                        minHeight={420}
                        controlsWidth={92}
                        previewHeight={260}
                        titleWidth={140}
                        subtitleWidth="55%"
                    />
                    {showPropertyEditors && (
                        <SidebarGroupSkeleton
                            items={[
                                { titleWidth: 70, rows: 3 },
                                { titleWidth: 180, rows: 4 },
                                { titleWidth: 120, rows: 3 },
                                { titleWidth: 100, rows: 4 },
                            ]}
                        />
                    )}
                </>
            ) : (
                <>
                    <PreviewStage
                        title={title}
                        subtitle={subtitle}
                        mode={previewMode}
                        spec={builtSpec}
                        jsonText={jsonText}
                        jsonEditable={jsonEditable}
                        jsonError={jsonError}
                        jsonErrorLocation={jsonErrorLocation}
                        onModeChange={setPreviewMode}
                        onJsonTextChange={handleJsonTextChange}
                        onCopyJson={handleCopyJson}
                        onDownloadJson={handleDownloadJson}
                    />

                    {showPropertyEditors && (
                        <>
                            <GraphSourceAccordion
                                items={manifest}
                                value={selectedId}
                                onChange={setSelectedId}
                                loading={loadingManifest}
                            />
                            <EditorSidebar value={inputSpec} onChange={handlePropertyChange} />
                        </>
                    )}
                </>
            )}
        </GraphWorkspace>
    );
}
