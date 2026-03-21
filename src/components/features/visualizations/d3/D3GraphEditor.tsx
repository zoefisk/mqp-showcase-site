"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Chip,
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
import HtmlOutlinedIcon from "@mui/icons-material/HtmlOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import D3View from "@/components/features/visualizations/d3/D3View";
import {
    ensureMinimumLoadingTime,
    getLineNumbers,
    highlightHtml,
    type HtmlErrorLocation,
} from "@/lib/d3/editorHelpers";
import {
    type D3GraphManifestItem,
    type SourceMode,
    loadD3GraphManifest,
    loadD3HtmlFromFile,
} from "@/lib/d3/loadD3Graph";

type PreviewMode = "graph" | "html" | "svg";
type CodeKind = "html" | "svg";

type RawManifestItem = {
    id: string;
    label: string;
    file?: string;
    htmlFile?: string;
    svgFile?: string;
    requiresSvg?: boolean;
    mode?: SourceMode | "html" | "svg";
};

type NormalizedManifestItem = {
    id: string;
    label: string;
    htmlFile?: string;
    svgFile?: string;
    sourceMode: SourceMode;
};

type D3GraphEditorProps = {
    title: string;
    subtitle: string;
    htmlEditable?: boolean;
    svgEditable?: boolean;
    graphSource?: string;
    allowGraphSelection?: boolean;
};

function normalizeManifestItem(item: RawManifestItem): NormalizedManifestItem {
    const htmlFile =
        item.htmlFile ??
        (item.file && item.file.toLowerCase().endsWith(".html") ? item.file : undefined);

    const svgFile =
        item.svgFile ??
        (item.file && item.file.toLowerCase().endsWith(".svg") ? item.file : undefined);

    let sourceMode: SourceMode = "html";

    if (item.mode === "svg") {
        sourceMode = "svg-only";
    } else if (item.mode === "html+svg" || item.requiresSvg || (htmlFile && svgFile)) {
        sourceMode = "html+svg";
    } else if (item.mode === "svg-only" || (!htmlFile && svgFile)) {
        sourceMode = "svg-only";
    }

    return {
        id: item.id,
        label: item.label,
        htmlFile,
        svgFile,
        sourceMode,
    };
}

function buildSvgPreviewHtml(svgText: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SVG Preview</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: white;
      width: 100%;
      min-height: 100%;
      overflow: auto;
    }

    body {
      padding: 24px;
      box-sizing: border-box;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
    }
  </style>
</head>
<body>
${svgText}
</body>
</html>`;
}

function escapeForInlineScript(value: string) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

function injectSvgOverride(html: string, htmlFilePath?: string, svgFilePath?: string, svgText?: string) {
    if (!svgFilePath || !svgText) return html;

    const normalizedSvgPath = svgFilePath.startsWith("/") ? svgFilePath : `/${svgFilePath}`;
    const svgFileName = normalizedSvgPath.split("/").pop() ?? normalizedSvgPath;

    const htmlDir = htmlFilePath
        ? (htmlFilePath.startsWith("/") ? htmlFilePath : `/${htmlFilePath}`).replace(/[^/]+$/, "")
        : "/";

    const possibleTargets = [
        normalizedSvgPath,
        svgFileName,
        `${htmlDir}${svgFileName}`,
    ];

    const injectedScript = `
<script>
(() => {
  const svgText = ${escapeForInlineScript(svgText)};
  const targetPaths = ${JSON.stringify(possibleTargets)};

  const matchesTarget = (value) => {
    try {
      const url = new URL(value, window.location.href);
      return targetPaths.some((target) => {
        try {
          const normalizedTarget = new URL(target, window.location.href);
          return url.href === normalizedTarget.href || url.pathname === normalizedTarget.pathname;
        } catch {
          return url.pathname.endsWith(target.replace(/^\\//, ""));
        }
      });
    } catch {
      return false;
    }
  };

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof Request
          ? input.url
          : String(input);

    if (matchesTarget(url)) {
      return new Response(svgText, {
        status: 200,
        headers: { "Content-Type": "image/svg+xml" }
      });
    }

    return originalFetch(input, init);
  };
})();
</script>`;

    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, `<head$1>${injectedScript}`);
    }

    if (/<html[^>]*>/i.test(html)) {
        return html.replace(/<html([^>]*)>/i, `<html$1><head>${injectedScript}</head>`);
    }

    return `<!DOCTYPE html><html><head>${injectedScript}</head><body>${html}</body></html>`;
}

function detectDefaultPreviewMode(item: NormalizedManifestItem | null): PreviewMode {
    if (!item) return "graph";
    return "graph";
}

function detectDefaultCodeKind(item: NormalizedManifestItem | null): CodeKind {
    if (!item) return "html";
    return item.sourceMode === "svg-only" ? "svg" : "html";
}

function getGraphSourceChip(mode: SourceMode) {
    switch (mode) {
        case "html":
            return { label: "HTML only", color: "default" as const };
        case "html+svg":
            return { label: "HTML + SVG", color: "primary" as const };
        case "svg-only":
            return { label: "SVG only", color: "secondary" as const };
    }
}

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
                    <MenuItem key={item.id} value={item.id}>
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
                           previewMode,
                           availableModes,
                           onPreviewModeChange,
                           sourceMode,
                       }: {
    title: string;
    subtitle: string;
    previewMode: PreviewMode;
    availableModes: PreviewMode[];
    onPreviewModeChange: (mode: PreviewMode) => void;
    sourceMode: SourceMode;
}) {
    const chip = getGraphSourceChip(sourceMode);

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
                    <Chip label={chip.label} color={chip.color} size="small" variant="outlined" />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
            </Box>

            <ToggleButtonGroup
                size="small"
                exclusive
                value={previewMode}
                onChange={(_, value) => {
                    if (value) onPreviewModeChange(value);
                }}
            >
                {availableModes.includes("graph") && (
                    <ToggleButton value="graph">
                        <Tooltip title="Graph preview">
                            <AutoGraphOutlinedIcon fontSize="small" />
                        </Tooltip>
                    </ToggleButton>
                )}

                {availableModes.includes("html") && (
                    <ToggleButton value="html">
                        <Tooltip title="HTML source">
                            <HtmlOutlinedIcon fontSize="small" />
                        </Tooltip>
                    </ToggleButton>
                )}

                {availableModes.includes("svg") && (
                    <ToggleButton value="svg">
                        <Tooltip title="SVG source">
                            <ImageOutlinedIcon fontSize="small" />
                        </Tooltip>
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        </Stack>
    );
}

function CodePanel({
                       label,
                       text,
                       editable,
                       error,
                       errorLocation,
                       onChange,
                       onCopy,
                       onDownload,
                   }: {
    label: string;
    text: string;
    editable: boolean;
    error: string | null;
    errorLocation: HtmlErrorLocation;
    onChange: (next: string) => void;
    onCopy: () => void;
    onDownload: () => void;
}) {
    const codeRef = React.useRef<HTMLPreElement | null>(null);
    const linesRef = React.useRef<HTMLDivElement | null>(null);

    const highlightedText = React.useMemo(
        () => highlightHtml(text, errorLocation),
        [text, errorLocation]
    );

    const lineNumbers = React.useMemo(() => getLineNumbers(text), [text]);

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
                    {editable ? `Editable ${label}` : `Read-only ${label}`}
                </Typography>

                <Stack direction="row" spacing={0.5}>
                    <Tooltip title={`Download ${label}`}>
                        <IconButton onClick={onDownload}>
                            <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={`Copy ${label}`}>
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
                    maxHeight: 650,
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
                            dangerouslySetInnerHTML={{ __html: highlightedText || " " }}
                        />
                    </Box>

                    {editable ? (
                        <Box
                            component="textarea"
                            spellCheck={false}
                            value={text}
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
                          selectedItem,
                          previewMode,
                          htmlText,
                          svgText,
                          htmlEditable,
                          svgEditable,
                          htmlError,
                          htmlErrorLocation,
                          svgError,
                          svgErrorLocation,
                          onPreviewModeChange,
                          onHtmlTextChange,
                          onSvgTextChange,
                          onCopyHtml,
                          onDownloadHtml,
                          onCopySvg,
                          onDownloadSvg,
                      }: {
    title: string;
    subtitle: string;
    selectedItem: D3GraphManifestItem | null;
    previewMode: PreviewMode;
    htmlText: string;
    svgText: string;
    htmlEditable: boolean;
    svgEditable: boolean;
    htmlError: string | null;
    htmlErrorLocation: HtmlErrorLocation;
    svgError: string | null;
    svgErrorLocation: HtmlErrorLocation;
    onPreviewModeChange: (mode: PreviewMode) => void;
    onHtmlTextChange: (next: string) => void;
    onSvgTextChange: (next: string) => void;
    onCopyHtml: () => void;
    onDownloadHtml: () => void;
    onCopySvg: () => void;
    onDownloadSvg: () => void;
}) {
    const activeSourceMode = selectedItem?.sourceMode ?? "html";

    const availableModes = React.useMemo(() => {
        const modes: PreviewMode[] = ["graph"];

        if (selectedItem?.htmlFile) modes.push("html");
        if (selectedItem?.requiresSvg && selectedItem?.svgFile) modes.push("svg");

        return modes;
    }, [selectedItem]);

    const previewHtml = React.useMemo(() => {
        if (!selectedItem) {
            return htmlText;
        }

        if (activeSourceMode === "svg-only") {
            return buildSvgPreviewHtml(svgText);
        }

        if (
            activeSourceMode === "html+svg" &&
            selectedItem.htmlFile &&
            selectedItem.svgFile
        ) {
            return injectSvgOverride(
                htmlText,
                selectedItem.htmlFile,
                selectedItem.svgFile,
                svgText
            );
        }

        return htmlText;
    }, [selectedItem, activeSourceMode, htmlText, svgText]);

    const previewFilePath =
        selectedItem?.htmlFile ?? selectedItem?.svgFile ?? undefined;

    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3, md: 4 },
                minHeight: 560,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2.5} sx={{ height: "100%" }}>
                <PreviewHeader
                    title={title}
                    subtitle={subtitle}
                    previewMode={previewMode}
                    availableModes={availableModes}
                    onPreviewModeChange={onPreviewModeChange}
                    sourceMode={activeSourceMode}
                />

                <Divider />

                {previewMode === "graph" ? (
                    <Box
                        sx={{
                            width: "100%",
                            minHeight: 420,
                            flex: 1,
                            pt: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                minHeight: 420,
                                overflow: "hidden",
                                borderRadius: 3,
                                bgcolor: "white",
                            }}
                        >
                            <D3View
                                html={previewHtml}
                                filePath={previewFilePath}
                                title={title}
                            />
                        </Box>
                    </Box>
                ) : previewMode === "html" ? (
                    <CodePanel
                        label="HTML"
                        text={htmlText}
                        editable={htmlEditable}
                        error={htmlEditable ? htmlError : null}
                        errorLocation={htmlEditable ? htmlErrorLocation : null}
                        onChange={onHtmlTextChange}
                        onCopy={onCopyHtml}
                        onDownload={onDownloadHtml}
                    />
                ) : (
                    <CodePanel
                        label="SVG"
                        text={svgText}
                        editable={svgEditable}
                        error={svgEditable ? svgError : null}
                        errorLocation={svgEditable ? svgErrorLocation : null}
                        onChange={onSvgTextChange}
                        onCopy={onCopySvg}
                        onDownload={onDownloadSvg}
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
                minHeight: 560,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
            }}
        >
            <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width={180} height={42} />
                        <Skeleton variant="text" width="55%" height={24} />
                    </Box>

                    <Skeleton variant="rounded" width={124} height={36} />
                </Stack>

                <Divider />

                <Box sx={{ width: "100%", minHeight: 420, pt: 2 }}>
                    <Skeleton variant="rounded" width="100%" height={420} />
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
                                          svgEditable = true,
                                          graphSource,
                                          allowGraphSelection = true,
                                      }: D3GraphEditorProps) {
    const [manifest, setManifest] = React.useState<D3GraphManifestItem[]>([]);
    const [selectedGraphId, setSelectedGraphId] = React.useState<string>(graphSource ?? "");
    const [selectedItem, setSelectedItem] = React.useState<D3GraphManifestItem | null>(null);

    const [htmlText, setHtmlText] = React.useState("");
    const [svgText, setSvgText] = React.useState("");

    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("graph");

    const [loadingManifest, setLoadingManifest] = React.useState(true);
    const [loadingGraph, setLoadingGraph] = React.useState(false);

    const [error, setError] = React.useState<string | null>(null);

    const [htmlError, setHtmlError] = React.useState<string | null>(null);
    const [htmlErrorLocation, setHtmlErrorLocation] =
        React.useState<HtmlErrorLocation>(null);

    const [svgError, setSvgError] = React.useState<string | null>(null);
    const [svgErrorLocation, setSvgErrorLocation] =
        React.useState<HtmlErrorLocation>(null);

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

                let nextSelectedId = graphSource ?? "";

                if (!nextSelectedId && items.length > 0) {
                    nextSelectedId = items[0].id;
                }

                setSelectedGraphId(nextSelectedId);

                const found = items.find((item) => item.id === nextSelectedId) ?? items[0] ?? null;
                setSelectedItem(found ?? null);
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load graph manifest.");
            } finally {
                if (mounted) setLoadingManifest(false);
            }
        }

        init();

        return () => {
            mounted = false;
        };
    }, [graphSource]);

    React.useEffect(() => {
        if (!manifest.length) return;

        const found = manifest.find((item) => item.id === selectedGraphId) ?? null;
        setSelectedItem(found);
    }, [manifest, selectedGraphId]);

    React.useEffect(() => {
        let mounted = true;

        async function loadSelectedGraph() {
            if (!selectedItem) return;

            const startedAt = Date.now();

            try {
                setLoadingGraph(true);
                setError(null);
                setHtmlError(null);
                setSvgError(null);

                const htmlPromise = selectedItem.htmlFile
                    ? loadD3HtmlFromFile(selectedItem.htmlFile)
                    : Promise.resolve("");

                const svgPromise =
                    selectedItem.requiresSvg && selectedItem.svgFile
                        ? loadD3HtmlFromFile(selectedItem.svgFile)
                        : Promise.resolve("");

                const [html, svg] = await Promise.all([htmlPromise, svgPromise]);

                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setHtmlText(html);
                setSvgText(svg);

                setHtmlError(null);
                setHtmlErrorLocation(null);
                setSvgError(null);
                setSvgErrorLocation(null);

                if (previewMode === "svg" && !selectedItem.requiresSvg) {
                    setPreviewMode("html");
                }
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;
                setError(err instanceof Error ? err.message : "Failed to load graph files.");
                setHtmlText("");
                setSvgText("");
            } finally {
                if (mounted) setLoadingGraph(false);
            }
        }

        loadSelectedGraph();

        return () => {
            mounted = false;
        };
    }, [selectedItem]);

    async function handleCopyHtml() {
        try {
            await navigator.clipboard.writeText(htmlText);
        } catch {
            // no-op
        }
    }

    async function handleCopySvg() {
        try {
            await navigator.clipboard.writeText(svgText);
        } catch {
            // no-op
        }
    }

    function downloadTextFile(content: string, filename: string, mimeType: string) {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch {
            // no-op
        }
    }

    function handleDownloadHtml() {
        downloadTextFile(htmlText, "d3-graph.html", "text/html;charset=utf-8");
    }

    function handleDownloadSvg() {
        downloadTextFile(svgText, "d3-graph.svg", "image/svg+xml;charset=utf-8");
    }

    function handleHtmlTextChange(nextText: string) {
        setHtmlText(nextText);

        if (!htmlEditable) return;

        setHtmlError(null);
        setHtmlErrorLocation(null);

        if (!/<html/i.test(nextText) && !/<body/i.test(nextText) && !/<div/i.test(nextText)) {
            setHtmlError("This does not look like a complete HTML graph file.");
            setHtmlErrorLocation({ line: 1, column: 1 });
        }
    }

    function handleSvgTextChange(nextText: string) {
        setSvgText(nextText);

        if (!svgEditable) return;

        setSvgError(null);
        setSvgErrorLocation(null);

        if (selectedItem?.requiresSvg && !/<svg[\s>]/i.test(nextText)) {
            setSvgError("This does not look like a complete SVG file.");
            setSvgErrorLocation({ line: 1, column: 1 });
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
                            selectedItem={selectedItem}
                            previewMode={previewMode}
                            htmlText={htmlText}
                            svgText={svgText}
                            htmlEditable={htmlEditable}
                            svgEditable={svgEditable}
                            htmlError={htmlError}
                            htmlErrorLocation={htmlErrorLocation}
                            svgError={svgError}
                            svgErrorLocation={svgErrorLocation}
                            onPreviewModeChange={setPreviewMode}
                            onHtmlTextChange={handleHtmlTextChange}
                            onSvgTextChange={handleSvgTextChange}
                            onCopyHtml={handleCopyHtml}
                            onDownloadHtml={handleDownloadHtml}
                            onCopySvg={handleCopySvg}
                            onDownloadSvg={handleDownloadSvg}
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
                                        value={selectedGraphId}
                                        onChange={setSelectedGraphId}
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




































