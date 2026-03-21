"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Skeleton,
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
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import VegaView from "@/components/vega/VegaView";
import {
    buildVegaFromInput,
    parseInputSpecs,
    type InputSpec,
    type VegaSpec,
} from "@/lib/vega/buildVega";
import {
    loadVegaGraphManifest,
    loadVegaInputSpecsFromFile,
    type VegaGraphManifestItem,
} from "@/lib/vega/loadVegaGraph";
import {
    addCategory,
    createDefaultInputSpec,
    normalizeInputSpec,
    removeCategoryAt,
    type PreviewMode,
    updateCategoryAt,
} from "@/lib/vega/editorHelpers";

type VegaGraphEditorProps = {
    jsonEditable?: boolean;
};

function EditorAccordion({
                             title,
                             icon,
                             defaultExpanded = false,
                             children,
                         }: React.PropsWithChildren<{
    title: string;
    icon?: React.ReactNode;
    defaultExpanded?: boolean;
}>) {
    return (
        <Accordion
            defaultExpanded={defaultExpanded}
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

            <AccordionDetails sx={{ px: 2.25, pb: 2.25 }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}

function GraphFileSelector({
                               manifest,
                               value,
                               onChange,
                           }: {
    manifest: VegaGraphManifestItem[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id="vega-graph-select-label">Graph file</InputLabel>
            <Select
                labelId="vega-graph-select-label"
                value={value}
                label="Graph file"
                onChange={(e) => onChange(e.target.value)}
            >
                {manifest.map((item) => (
                    <MenuItem key={item.id} value={item.file}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function PreviewHeader({
                           mode,
                           onModeChange,
                       }: {
    mode: PreviewMode;
    onModeChange: (mode: PreviewMode) => void;
}) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Box>
                <Typography variant="h5" fontWeight={700}>
                    Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Live RRNL output based on the current editor properties
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
                <ToggleButton value="graph">
                    <Tooltip title="Graph view">
                        <AutoGraphOutlinedIcon fontSize="small" />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="json">
                    <Tooltip title="JSON view">
                        <CodeOutlinedIcon fontSize="small" />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
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
        indicator ? String(indicator.value) : String(minValue)
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

        // Allow incomplete typing like "-", "", ".", etc. without breaking the graph
        if (nextDraft.trim() === "" || nextDraft === "-" || nextDraft === "." || nextDraft === "-.") {
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
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography fontWeight={700}>
                                Category {index + 1}
                            </Typography>

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
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
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

type JsonErrorLocation = {
    line: number;
    column: number;
} | null;

function getIndexFromLineColumn(text: string, line: number, column: number): number {
    const lines = text.split("\n");
    let index = 0;

    for (let i = 0; i < line - 1; i++) {
        index += (lines[i]?.length ?? 0) + 1;
    }

    return index + Math.max(0, column - 1);
}

function getLineStartIndexes(text: string): number[] {
    const starts = [0];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "\n") {
            starts.push(i + 1);
        }
    }

    return starts;
}

function getJsonErrorLocation(error: string, text: string): JsonErrorLocation {
    // Chrome/Firefox-style examples:
    // "Expected ',' or '}' after property value in JSON at position 123"
    // "Unexpected token } in JSON at position 45"

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

    // Generic fallback if the error already mentions line/column
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

function EditableJsonPanel({
                               jsonText,
                               editable,
                               error,
                               errorLocation,
                               onChange,
                               onCopy,
                               onDownload,
                           }: {
    jsonText: string;
    editable: boolean;
    error: string | null;
    errorLocation: JsonErrorLocation;
    onChange: (next: string) => void;
    onCopy: () => void;
    onDownload: () => void;
}) {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const codeRef = React.useRef<HTMLPreElement | null>(null);
    const linesRef = React.useRef<HTMLDivElement | null>(null);

    const highlightedJson = React.useMemo(
        () => highlightJson(jsonText, errorLocation),
        [jsonText, errorLocation]
    );

    const lineNumbers = React.useMemo(
        () => getLineNumbers(jsonText),
        [jsonText]
    );

    {lineNumbers.map((line) => {
        const isErrorLine = errorLocation?.line === line;

        return (
            <Box
                key={line}
                sx={{
                    color: isErrorLine ? "#f87171" : "rgba(255,255,255,0.45)",
                    fontWeight: isErrorLine ? 700 : 400,
                }}
            >
                {line}
            </Box>
        );
    })}

    function syncScroll(target: HTMLTextAreaElement | HTMLPreElement) {
        if (codeRef.current) {
            codeRef.current.scrollTop = target.scrollTop;
            codeRef.current.scrollLeft = target.scrollLeft;
        }

        if (linesRef.current) {
            linesRef.current.scrollTop = target.scrollTop;
        }
    }

    return (
        <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    {editable ? "Editable live JSON" : "Read-only live JSON"}
                </Typography>

                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Download JSON file">
                        <IconButton onClick={onDownload}>
                            <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Copy JSON">
                        <IconButton onClick={onCopy}>
                            <ContentCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {editable && error && <Alert severity="error">{error}</Alert>}

            <Box
                sx={{
                    border: "1px solid",
                    borderColor: error && editable ? "error.main" : "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "#0f172a",
                    display: "grid",
                    gridTemplateColumns: "56px 1fr",

                    minHeight: 420,
                    maxHeight: 600,
                }}
            >
                <Box
                    ref={linesRef}
                    sx={{
                        overflow: "hidden",
                        bgcolor: "#0b1220",
                        borderRight: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: 13,
                        lineHeight: "22px",
                        py: 2,
                        px: 1.5,
                        textAlign: "right",
                        userSelect: "none",
                    }}
                >
                    {lineNumbers.map((line) => (
                        <Box key={line}>{line}</Box>
                    ))}
                </Box>

                <Box sx={{ position: "relative", minHeight: 420 }}>
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            component="pre"
                            ref={codeRef}
                            aria-hidden
                            sx={{
                                m: 0,
                                p: 2,
                                height: "100%",
                                overflow: "auto",
                                whiteSpace: "pre",
                                wordWrap: "normal",
                                fontFamily:
                                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                fontSize: 13,
                                lineHeight: "22px",
                                color: "#e2e8f0",
                                pointerEvents: "none",
                                "& .json-key": {
                                    color: "#93c5fd",
                                },
                                "& .json-string": {
                                    color: "#86efac",
                                },
                                "& .json-number": {
                                    color: "#f9a8d4",
                                },
                                "& .json-boolean": {
                                    color: "#fcd34d",
                                },
                                "& .json-null": {
                                    color: "#c4b5fd",
                                },
                                "& .json-punctuation": {
                                    color: "#94a3b8",
                                },
                                "& .json-error-line": {
                                    textDecorationLine: "underline",
                                    textDecorationStyle: "wavy",
                                    textDecorationColor: "#ef4444",
                                    textUnderlineOffset: "3px",
                                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                                },
                            }}
                            dangerouslySetInnerHTML={{ __html: highlightedJson || " " }}
                        />
                    </Box>

                    {editable ? (
                        <Box
                            component="textarea"
                            ref={textareaRef}
                            spellCheck={false}
                            value={jsonText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                onChange(e.target.value)
                            }
                            onScroll={(e: React.UIEvent<HTMLTextAreaElement>) =>
                                syncScroll(e.currentTarget)
                            }
                            sx={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                border: "none",
                                outline: "none",
                                resize: "none",
                                m: 0,
                                p: 2,
                                background: "transparent",
                                color: "transparent",
                                caretColor: "#ffffff",
                                WebkitTextFillColor: "transparent",
                                overflow: "auto",
                                whiteSpace: "pre",
                                wordWrap: "normal",
                                fontFamily:
                                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                fontSize: 13,
                                lineHeight: "22px",
                                tabSize: 2,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Stack>
    );
}

function PreviewStage({
                          mode,
                          spec,
                          input,
                          jsonText,
                          jsonEditable,
                          jsonError,
                          jsonErrorLocation,
                          onModeChange,
                          onJsonTextChange,
                          onCopyJson,
                          onDownloadJson,
                      }: {
    mode: PreviewMode;
    spec: VegaSpec | null;
    input: InputSpec | null;
    jsonText: string;
    jsonEditable: boolean;
    jsonError: string | null;
    jsonErrorLocation: JsonErrorLocation;
    onModeChange: (mode: PreviewMode) => void;
    onJsonTextChange: (next: string) => void;
    onCopyJson: () => void;
    onDownloadJson: () => void;
}) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3, md: 4 },
                minHeight: 420,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2.5}>
                <PreviewHeader mode={mode} onModeChange={onModeChange} />
                <Divider />

                {mode === "graph" ? (
                    spec ? (
                        <Box
                            sx={{
                                minHeight: 260,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                pt: 2,
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
                    <EditableJsonPanel
                        jsonText={jsonText}
                        editable={jsonEditable}
                        error={jsonEditable ? jsonError : null}
                        errorLocation={jsonEditable ? jsonErrorLocation : null}
                        onChange={onJsonTextChange}
                        onCopy={onCopyJson}
                        onDownload={onDownloadJson}
                    />
                )}
            </Stack>
        </Paper>
    );
}

function EditorSidebar({
                           manifest,
                           selectedFile,
                           onSelectedFileChange,
                           value,
                           onChange,
                           loadingManifest,
                       }: {
    manifest: VegaGraphManifestItem[];
    selectedFile: string;
    onSelectedFileChange: (value: string) => void;
    value: InputSpec;
    onChange: (next: InputSpec) => void;
    loadingManifest: boolean;
}) {
    return (
        <Stack spacing={2}>
            <EditorAccordion
                title="Graph Source"
                icon={<SourceOutlinedIcon fontSize="small" />}
            >
                {loadingManifest ? (
                    <Skeleton variant="rounded" width="100%" height={56} />
                ) : (
                    <GraphFileSelector
                        manifest={manifest}
                        value={selectedFile}
                        onChange={onSelectedFileChange}
                    />
                )}
            </EditorAccordion>

            <EditorAccordion
                title="Title"
                icon={<TitleOutlinedIcon fontSize="small" />}
            >
                <TitleSection value={value} onChange={onChange} />
            </EditorAccordion>

            <EditorAccordion
                title="Axis, Labels, and Separation"
                icon={<TuneOutlinedIcon fontSize="small" />}
            >
                <AxisAndLabelsSection value={value} onChange={onChange} />
            </EditorAccordion>

            <EditorAccordion
                title="Value Indicator"
                icon={<AdsClickOutlinedIcon fontSize="small" />}
            >
                <ValueIndicatorSection value={value} onChange={onChange} />
            </EditorAccordion>

            <EditorAccordion
                title="Categories"
                icon={<ViewAgendaOutlinedIcon fontSize="small" />}
            >
                <CategoriesSection value={value} onChange={onChange} />
            </EditorAccordion>
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

function PreviewStageSkeleton() {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3, md: 4 },
                minHeight: 420,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2.5}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width={140} height={42} />
                        <Skeleton variant="text" width="55%" height={24} />
                    </Box>

                    <Skeleton variant="rounded" width={92} height={36} />
                </Stack>

                <Divider />

                <Box
                    sx={{
                        minHeight: 260,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 2,
                    }}
                >
                    <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
                        <Skeleton variant="rounded" width="85%" height={28} />
                        <Skeleton variant="rounded" width="78%" height={120} />
                        <Skeleton variant="rounded" width="70%" height={22} />
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    );
}

function AccordionSkeleton({
                               titleWidth = 140,
                               rows = 3,
                           }: {
    titleWidth?: number | string;
    rows?: number;
}) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: 2.25,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={titleWidth} height={28} />
                </Stack>

                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rounded"
                        width="100%"
                        height={56}
                    />
                ))}
            </Stack>
        </Paper>
    );
}

function EditorSidebarSkeleton() {
    return (
        <Stack spacing={2}>
            <AccordionSkeleton titleWidth={120} rows={2} />
            <AccordionSkeleton titleWidth={70} rows={3} />
            <AccordionSkeleton titleWidth={180} rows={4} />
            <AccordionSkeleton titleWidth={120} rows={3} />
            <AccordionSkeleton titleWidth={100} rows={4} />
        </Stack>
    );
}

const MIN_LOADING_MS = 500;

// i made the minimum loading time 1 second because i think it looks better than 0.1 second tbh lest jarring lol
async function ensureMinimumLoadingTime(startTime: number, minMs = MIN_LOADING_MS) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minMs - elapsed);

    if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
    }
}

export default function VegaGraphEditor({
                                            jsonEditable = true,
                                        }: VegaGraphEditorProps) {
    const [manifest, setManifest] = React.useState<VegaGraphManifestItem[]>([]);
    const [selectedFile, setSelectedFile] = React.useState("/vega-graphs/default-rrnl.json");
    const [inputSpec, setInputSpec] = React.useState<InputSpec>(createDefaultInputSpec());
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("graph");
    const [loadingManifest, setLoadingManifest] = React.useState(true);
    const [loadingGraph, setLoadingGraph] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

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

        async function init() {
            const startedAt = Date.now();

            try {
                setLoadingManifest(true);
                setError(null);

                const items = await loadVegaGraphManifest();
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setManifest(items);

                const hasDefault = items.some(
                    (item) => item.file === "/vega-graphs/default-rrnl.json"
                );

                if (!hasDefault && items.length > 0) {
                    setSelectedFile(items[0].file);
                }
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

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

            const startedAt = Date.now();

            try {
                setLoadingGraph(true);
                setError(null);
                setJsonError(null);

                const parsedInputs = await loadVegaInputSpecsFromFile(selectedFile);
                const firstInput = parsedInputs[0] ?? createDefaultInputSpec();
                const normalized = normalizeInputSpec(firstInput);

                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setInputSpec(normalized);
                setJsonText(stringifySpec(normalized));
                setJsonError(null);
                setIsEditingJson(false);
                setJsonErrorLocation(null);
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load graph.");

                const fallback = createDefaultInputSpec();
                setInputSpec(fallback);
                setJsonText(stringifySpec(fallback));
                setJsonError(null);
                setIsEditingJson(false);
                setJsonErrorLocation(null);
            } finally {
                if (mounted) setLoadingGraph(false);
            }
        }

        loadSelectedGraph();

        return () => {
            mounted = false;
        };
    }, [selectedFile]);

    React.useEffect(() => {
        if (isEditingJson) return;
        setJsonText(stringifySpec(inputSpec));
    }, [inputSpec, isEditingJson]);

    async function handleCopyJson() {
        try {
            await navigator.clipboard.writeText(jsonText);
        } catch {
            // no-op
        }
    }

    function handleDownloadJson() {
        try {
            const blob = new Blob([jsonText], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "rrnl-graph.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch {
            // no-op
        }
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

        if (!isEditingJson) {
            setJsonText(stringifySpec(next));
        } else {
            setJsonText(stringifySpec(next));
            setIsEditingJson(false);
        }
    }

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    RRNL Graph Editor
                </Typography>
                <Typography color="text.secondary">
                    Load an RRNL template, edit its properties, and preview the live Vega output.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={3}>
                {loadingGraph ? (
                    <>
                        <PreviewStageSkeleton />
                        <EditorSidebarSkeleton />
                    </>
                ) : (
                    <>
                        <PreviewStage
                            mode={previewMode}
                            spec={builtSpec}
                            input={inputSpec}
                            jsonText={jsonText}
                            jsonEditable={jsonEditable}
                            jsonError={jsonError}
                            jsonErrorLocation={jsonErrorLocation}
                            onModeChange={setPreviewMode}
                            onJsonTextChange={handleJsonTextChange}
                            onCopyJson={handleCopyJson}
                            onDownloadJson={handleDownloadJson}
                        />

                        <EditorSidebar
                            manifest={manifest}
                            selectedFile={selectedFile}
                            onSelectedFileChange={setSelectedFile}
                            value={inputSpec}
                            onChange={handlePropertyChange}
                            loadingManifest={loadingManifest}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    );
}
