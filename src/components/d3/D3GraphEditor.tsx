"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import D3View from "@/components/d3/D3View";
import {
    ensureMinimumLoadingTime,
    escapeHtml,
    getLineNumbers,
    highlightHtml,
    type HtmlErrorLocation,
    type PreviewMode,
} from "@/lib/d3/editorHelpers";
import {
    loadD3GraphManifest,
    loadD3HtmlFromFile,
    type D3GraphManifestItem,
} from "@/lib/d3/loadD3Graph";

type D3GraphEditorProps = {
    title: string;
    subtitle: string;
    svgEditable?: boolean;
    graphSource?: string;
    allowGraphSelection?: boolean;
    transformMode?: "none" | "gradient";
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
    manifest: D3GraphManifestItem[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id="d3-graph-select-label">Graph file</InputLabel>
            <Select
                labelId="d3-graph-select-label"
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
                           title,
                           subtitle,
                           mode,
                           onModeChange,
                       }: {
    title: string;
    subtitle: string;
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
                    {title}
                </Typography>
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
                <ToggleButton value="graph">
                    <Tooltip title="Graph view">
                        <AutoGraphOutlinedIcon fontSize="small" />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="html">
                    <Tooltip title="HTML view">
                        <CodeOutlinedIcon fontSize="small" />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}

function EditableHtmlPanel({
                               htmlText,
                               editable,
                               error,
                               errorLocation,
                               onChange,
                               onCopy,
                               onDownload,
                           }: {
    htmlText: string;
    editable: boolean;
    error: string | null;
    errorLocation: HtmlErrorLocation;
    onChange: (next: string) => void;
    onCopy: () => void;
    onDownload: () => void;
}) {
    const codeRef = React.useRef<HTMLPreElement | null>(null);
    const linesRef = React.useRef<HTMLDivElement | null>(null);

    const highlightedHtml = React.useMemo(
        () => highlightHtml(htmlText, errorLocation),
        [htmlText, errorLocation]
    );

    const lineNumbers = React.useMemo(() => getLineNumbers(htmlText), [htmlText]);

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
                    {editable ? "Editable live HTML" : "Read-only live HTML"}
                </Typography>

                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Download HTML file">
                        <IconButton onClick={onDownload}>
                            <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Copy HTML">
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
                                "& .html-tag": {
                                    color: "#93c5fd",
                                },
                                "& .html-string": {
                                    color: "#86efac",
                                },
                                "& .html-comment": {
                                    color: "#94a3b8",
                                },
                                "& .html-error-line": {
                                    textDecorationLine: "underline",
                                    textDecorationStyle: "wavy",
                                    textDecorationColor: "#ef4444",
                                    textUnderlineOffset: "3px",
                                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                                },
                            }}
                            dangerouslySetInnerHTML={{ __html: highlightedHtml || " " }}
                        />
                    </Box>

                    {editable ? (
                        <Box
                            component="textarea"
                            spellCheck={false}
                            value={htmlText}
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
                          title,
                          subtitle,
                          mode,
                          htmlText,
                          htmlEditable,
                          selectedFile,
                          htmlError,
                          htmlErrorLocation,
                          onModeChange,
                          onHtmlTextChange,
                          onCopyHtml,
                          onDownloadHtml,
                      }: {
    title: string;
    subtitle: string;
    mode: PreviewMode;
    htmlText: string;
    htmlEditable: boolean;
    selectedFile: string;
    htmlError: string | null;
    htmlErrorLocation: HtmlErrorLocation;
    onModeChange: (mode: PreviewMode) => void;
    onHtmlTextChange: (next: string) => void;
    onCopyHtml: () => void;
    onDownloadHtml: () => void;
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
                <PreviewHeader
                    title={title}
                    subtitle={subtitle}
                    mode={mode}
                    onModeChange={onModeChange}
                />
                <Divider />

                {mode === "graph" ? (
                    <Box
                        sx={{
                            minHeight: 260,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pt: 2,
                        }}
                    >
                        <D3View html={htmlText} filePath={selectedFile} title={title} />
                    </Box>
                ) : (
                    <EditableHtmlPanel
                        htmlText={htmlText}
                        editable={htmlEditable}
                        error={htmlEditable ? htmlError : null}
                        errorLocation={htmlEditable ? htmlErrorLocation : null}
                        onChange={onHtmlTextChange}
                        onCopy={onCopyHtml}
                        onDownload={onDownloadHtml}
                    />
                )}
            </Stack>
        </Paper>
    );
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
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

function SidebarSkeleton() {
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
                    <Skeleton variant="text" width={120} height={28} />
                </Stack>
                <Skeleton variant="rounded" width="100%" height={56} />
            </Stack>
        </Paper>
    );
}

export default function D3GraphEditor({
                                          title,
                                          subtitle,
                                          htmlEditable = true,
                                          graphSource,
                                          allowGraphSelection = true,
                                      }: D3GraphEditorProps) {
    const [manifest, setManifest] = React.useState<D3GraphManifestItem[]>([]);
    const [selectedFile, setSelectedFile] = React.useState(
        graphSource ?? "/d3-graphs/default.html"
    );
    const [htmlText, setHtmlText] = React.useState("");
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("graph");
    const [loadingManifest, setLoadingManifest] = React.useState(true);
    const [loadingGraph, setLoadingGraph] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [htmlError, setHtmlError] = React.useState<string | null>(null);
    const [htmlErrorLocation, setHtmlErrorLocation] =
        React.useState<HtmlErrorLocation>(null);

    React.useEffect(() => {
        if (!allowGraphSelection && graphSource) {
            setSelectedFile(graphSource);
        }
    }, [allowGraphSelection, graphSource]);

    React.useEffect(() => {
        let mounted = true;

        async function init() {
            const startedAt = Date.now();

            try {
                setLoadingManifest(true);
                setError(null);

                const items = await loadD3GraphManifest();
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setManifest(items);

                if (!allowGraphSelection && graphSource) {
                    setSelectedFile(graphSource);
                } else {
                    const hasDefault = items.some(
                        (item) => item.file === "/d3-graphs/default.html"
                    );

                    if (!hasDefault && items.length > 0) {
                        setSelectedFile(items[0].file);
                    }
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
    }, [allowGraphSelection, graphSource]);

    React.useEffect(() => {
        let mounted = true;

        async function loadSelectedGraph() {
            if (!selectedFile) return;

            const startedAt = Date.now();

            try {
                setLoadingGraph(true);
                setError(null);
                setHtmlError(null);

                const html = await loadD3HtmlFromFile(selectedFile);
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setHtmlText(html);
                setHtmlError(null);
                setHtmlErrorLocation(null);
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load graph.");
                setHtmlText("");
            } finally {
                if (mounted) setLoadingGraph(false);
            }
        }

        loadSelectedGraph();

        return () => {
            mounted = false;
        };
    }, [selectedFile]);

    async function handleCopyHtml() {
        try {
            await navigator.clipboard.writeText(htmlText);
        } catch {
            // no-op
        }
    }

    function handleDownloadHtml() {
        try {
            const blob = new Blob([htmlText], { type: "text/html;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "d3-graph.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch {
            // no-op
        }
    }

    function handleHtmlTextChange(nextText: string) {
        setHtmlText(nextText);

        if (!htmlEditable) return;

        setHtmlError(null);
        setHtmlErrorLocation(null);

        if (!/<html/i.test(nextText) && !/<body/i.test(nextText) && !/<svg/i.test(nextText)) {
            setHtmlError("This does not look like a complete HTML graph file.");
            setHtmlErrorLocation({ line: 1, column: 1 });
        }
    }

    return (
        <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={3}>
                {loadingGraph ? (
                    <>
                        <PreviewStageSkeleton />
                        {allowGraphSelection && <SidebarSkeleton />}
                    </>
                ) : (
                    <>
                        <PreviewStage
                            title={title}
                            subtitle={subtitle}
                            mode={previewMode}
                            htmlText={htmlText}
                            htmlEditable={htmlEditable}
                            selectedFile={selectedFile}
                            htmlError={htmlError}
                            htmlErrorLocation={htmlErrorLocation}
                            onModeChange={setPreviewMode}
                            onHtmlTextChange={handleHtmlTextChange}
                            onCopyHtml={handleCopyHtml}
                            onDownloadHtml={handleDownloadHtml}
                        />

                        {allowGraphSelection && (
                            <EditorAccordion
                                title="Graph Source"
                                icon={<SourceOutlinedIcon fontSize="small" />}
                                defaultExpanded
                            >
                                {loadingManifest ? (
                                    <Skeleton variant="rounded" width="100%" height={56} />
                                ) : (
                                    <GraphFileSelector
                                        manifest={manifest}
                                        value={selectedFile}
                                        onChange={setSelectedFile}
                                    />
                                )}
                            </EditorAccordion>
                        )}
                    </>
                )}
            </Stack>
        </Stack>
    );
}
