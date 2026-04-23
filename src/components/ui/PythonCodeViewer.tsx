"use client";

import * as React from "react";
import { Box, CircularProgress, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WrapTextOutlinedIcon from "@mui/icons-material/WrapTextOutlined";
import { highlightPython } from "@/lib/python/highlight";
import { getLineNumbers } from "@/lib/graphs/codePanel";

// ─── Catppuccin Mocha-inspired Python color palette ──────────────────────────
const TOKEN_STYLES = {
    "& .py-keyword":   { color: "#cba6f7" },   // mauve  — def, if, for, …
    "& .py-builtin":   { color: "#89dceb" },   // sky    — print, len, range, …
    "& .py-constant":  { color: "#fab387" },   // peach  — True, False, None
    "& .py-string":    { color: "#a6e3a1" },   // green  — "hello"
    "& .py-number":    { color: "#f38ba8" },   // red    — 42, 3.14
    "& .py-comment":   { color: "#585b70", fontStyle: "italic" }, // surface2
    "& .py-decorator": { color: "#f9e2af" },   // yellow — @dataclass
    "& .py-funcname":  { color: "#89b4fa" },   // blue   — name after def
    "& .py-classname": { color: "#f9e2af" },   // yellow — name after class
} as const;

const BG = "#1e1e2e";
const BG_GUTTER = "#181825";
const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

type Props = {
    /** Inline Python source code. Takes precedence over `src`. */
    code?: string;
    /**
     * Path to a `.py` file inside the `public/` directory.
     * Example: `"/python/analysis.py"` → `public/python/analysis.py`
     * Used only when `code` is not provided.
     */
    src?: string;
    /** Label shown in the header. Defaults to "Python". */
    label?: string;
    /** Optional description shown below the label. */
    description?: string;
    /** Filename used for the download button. Defaults to "code.py". */
    filename?: string;
    /** Whether soft-wrap is enabled by default. Defaults to false. */
    defaultSoftWrap?: boolean;
    minHeight?: number;
    maxHeight?: number;
    mode?: "default" | "compact";
    compactCollapse?: boolean;
    compactPreviewLines?: number;
};

export default function PythonCodeViewer({
    code: codeProp,
    src,
    label = "Python",
    description,
    filename = "code.py",
    defaultSoftWrap = false,
    minHeight = 420,
    maxHeight = 650,
    mode = "default",
    compactCollapse = false,
    compactPreviewLines = 5,
}: Props) {
    const codeRef = React.useRef<HTMLPreElement | null>(null);
    const linesRef = React.useRef<HTMLDivElement | null>(null);

    const [code, setCode] = React.useState<string>(codeProp ?? "");
    const [loading, setLoading] = React.useState(!codeProp && !!src);
    const [copied, setCopied] = React.useState(false);
    const [softWrap, setSoftWrap] = React.useState(
        mode === "compact" ? true : defaultSoftWrap,
    );
    const [compactExpanded, setCompactExpanded] = React.useState(false);
    const isCompact = mode === "compact";

    function syncScroll(target: HTMLPreElement) {
        if (linesRef.current) {
            linesRef.current.scrollTop = target.scrollTop;
        }
    }

    // Load from public/ if `src` is provided and no inline code
    React.useEffect(() => {
        if (codeProp !== undefined) {
            setCode(codeProp);
            setLoading(false);
            return;
        }
        if (!src) return;

        setLoading(true);
        fetch(src)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load ${src}`);
                return res.text();
            })
            .then((text) => {
                setCode(text);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setCode(`# Failed to load: ${src}`);
                setLoading(false);
            });
    }, [codeProp, src]);

    const highlightedHtml = React.useMemo(() => highlightPython(code), [code]);
    const lineNumbers = React.useMemo(() => getLineNumbers(code), [code]);

    // Per-line data used only in soft-wrap mode.
    // Each line is highlighted independently so line numbers stay anchored
    // to the flex row that wraps around the code content.
    const softWrapLines = React.useMemo(() => {
        if (!softWrap) return null;
        return code.split("\n").map((line) => ({
            html: highlightPython(line),
            // Number of leading spaces/tabs — used for hanging indent so wrapped
            // continuations align with the first non-whitespace character.
            indent: line.match(/^(\s*)/)?.[1]?.length ?? 0,
        }));
    }, [softWrap, code]);
    const shouldCollapseCompact = isCompact && compactCollapse && !loading;
    const visibleSoftWrapLines = React.useMemo(() => {
        if (!softWrapLines) return [];
        if (!shouldCollapseCompact) return softWrapLines;
        return softWrapLines.slice(0, compactPreviewLines);
    }, [compactPreviewLines, shouldCollapseCompact, softWrapLines]);
    const hasHiddenCompactLines =
        shouldCollapseCompact && softWrapLines !== null && softWrapLines.length > compactPreviewLines;

    function handleCopy() {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    function handleDownload() {
        const blob = new Blob([code], { type: "text/x-python" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    React.useEffect(() => {
        if (isCompact) {
            setSoftWrap(true);
        }
    }, [isCompact]);

    React.useEffect(() => {
        if (!isCompact || !compactCollapse) {
            setCompactExpanded(false);
        }
    }, [compactCollapse, isCompact, code]);

    return (
        <Stack spacing={2}>
            {!isCompact && (
                <>
                    {/* Header row */}
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.25}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {label}
                            </Typography>
                            {description && (
                                <Typography variant="body2" color="text.secondary">
                                    {description}
                                </Typography>
                            )}
                        </Stack>
                        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0, mt: description ? 0.25 : 0 }}>
                            <Tooltip title={softWrap ? "Disable soft wrap" : "Enable soft wrap"}>
                                <IconButton
                                    onClick={() => setSoftWrap((w) => !w)}
                                    size="small"
                                    sx={{ color: softWrap ? "primary.main" : undefined }}
                                >
                                    <WrapTextOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={`Download ${filename}`}>
                                <IconButton onClick={handleDownload} size="small">
                                    <DownloadOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={copied ? "Copied!" : "Copy code"}>
                                <IconButton onClick={handleCopy} size="small">
                                    <ContentCopyOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </>
            )}

            {/* Code block */}
            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: BG,
                    minHeight: isCompact ? "auto" : minHeight,
                    maxHeight: isCompact ? "none" : maxHeight,
                    // Two-column grid in normal mode; single column in soft-wrap mode
                    // (line numbers move inline in soft-wrap mode).
                    display: softWrap ? "block" : "grid",
                    gridTemplateColumns: softWrap ? undefined : "56px 1fr",
                }}
            >
                {softWrap ? (
                    /* ── Soft-wrap mode ─────────────────────────────────────────────
                       Each source line is a flex row: [line-number | code-content].
                       The line number stays top-aligned while the code content wraps
                       freely. A CSS gradient paints the gutter background across the
                       full container height without per-cell bgcolor hacks.           */
                    <Box
                        component="pre"
                        aria-label={`${label} code`}
                        sx={{
                            m: 0,
                            pt: isCompact ? 1.5 : 2,
                            pb: isCompact ? 1.5 : 2,
                            pl: 0,
                            pr: 0,
                            height: "100%",
                            maxHeight: isCompact ? "none" : maxHeight,
                            overflowY: isCompact ? "visible" : "auto",
                            overflowX: "visible",
                            overscrollBehavior: isCompact ? "auto" : "contain",
                            // Fake gutter column via gradient so it fills top/bottom padding too
                            backgroundImage: `linear-gradient(to right, ${BG_GUTTER} 55px, rgba(255,255,255,0.06) 55px, rgba(255,255,255,0.06) 56px, ${BG} 56px)`,
                            fontFamily: MONO_FONT,
                            fontSize: 13,
                            lineHeight: "22px",
                            color: "#cdd6f4",
                            ...TOKEN_STYLES,
                        }}
                    >
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minHeight,
                                }}
                            >
                                <CircularProgress size={24} sx={{ color: "#cba6f7" }} />
                            </Box>
                        ) : (
                            <>
                                {visibleSoftWrapLines.map(({ html, indent }, idx) => (
                                    <Box
                                        key={idx}
                                        component="div"
                                        sx={{ display: "flex", alignItems: "flex-start" }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 56,
                                                flexShrink: 0,
                                                lineHeight: "22px",
                                                pr: 1.5,
                                                pl: 1.5,
                                                textAlign: "right",
                                                userSelect: "none",
                                                color: "rgba(255,255,255,0.35)",
                                            }}
                                        >
                                            {idx + 1}
                                        </Box>
                                        <Box
                                            component="span"
                                            sx={{
                                                flex: 1,
                                                display: "block",
                                                lineHeight: "22px",
                                                pl: `calc(16px + ${indent}ch)`,
                                                textIndent: `${-indent}ch`,
                                                pr: 2,
                                                whiteSpace: "pre-wrap",
                                                wordBreak: "break-word",
                                            }}
                                            dangerouslySetInnerHTML={{ __html: html || "\u200b" }}
                                        />
                                    </Box>
                                ))}
                                {hasHiddenCompactLines && (
                                    <Collapse in={compactExpanded} collapsedSize={0}>
                                        {softWrapLines!
                                            .slice(compactPreviewLines)
                                            .map(({ html, indent }, idx) => (
                                                <Box
                                                    key={compactPreviewLines + idx}
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "flex-start" }}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            width: 56,
                                                            flexShrink: 0,
                                                            lineHeight: "22px",
                                                            pr: 1.5,
                                                            pl: 1.5,
                                                            textAlign: "right",
                                                            userSelect: "none",
                                                            color: "rgba(255,255,255,0.35)",
                                                        }}
                                                    >
                                                        {compactPreviewLines + idx + 1}
                                                    </Box>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            flex: 1,
                                                            display: "block",
                                                            lineHeight: "22px",
                                                            pl: `calc(16px + ${indent}ch)`,
                                                            textIndent: `${-indent}ch`,
                                                            pr: 2,
                                                            whiteSpace: "pre-wrap",
                                                            wordBreak: "break-word",
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: html || "\u200b" }}
                                                    />
                                                </Box>
                                            ))}
                                    </Collapse>
                                )}
                            </>
                        )}
                    </Box>
                ) : (
                    /* ── Normal (no-wrap) mode ──────────────────────────────────────
                       Separate gutter column + absolutely-positioned pre for correct
                       horizontal scrolling.                                           */
                    <>
                        <Box
                            ref={linesRef}
                            sx={{
                                overflow: "hidden",
                                bgcolor: BG_GUTTER,
                                borderRight: "1px solid rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.35)",
                                fontFamily: MONO_FONT,
                                fontSize: 13,
                                lineHeight: "22px",
                                py: 2,
                                px: 1.5,
                                textAlign: "right",
                                userSelect: "none",
                            }}
                        >
                            {loading ? null : lineNumbers.map((n) => <Box key={n}>{n}</Box>)}
                        </Box>

                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                            {loading ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                        minHeight,
                                    }}
                                >
                                    <CircularProgress size={24} sx={{ color: "#cba6f7" }} />
                                </Box>
                            ) : (
                                <Box
                                    component="pre"
                                    ref={codeRef}
                                    aria-label={`${label} code`}
                                    onScroll={(e: React.UIEvent<HTMLPreElement>) =>
                                        syncScroll(e.currentTarget)
                                    }
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        m: 0,
                                        p: 2,
                                        overflowX: "auto",
                                        overflowY: "auto",
                                        overscrollBehavior: "contain",
                                        whiteSpace: "pre",
                                        wordWrap: "normal",
                                        fontFamily: MONO_FONT,
                                        fontSize: 13,
                                        lineHeight: "22px",
                                        color: "#cdd6f4",
                                        ...TOKEN_STYLES,
                                    }}
                                    dangerouslySetInnerHTML={{ __html: highlightedHtml || " " }}
                                />
                            )}
                        </Box>
                    </>
                )}
            </Box>
            {hasHiddenCompactLines && (
                <Box>
                    <Typography
                        component="button"
                        type="button"
                        onClick={() => setCompactExpanded((expanded) => !expanded)}
                        sx={{
                            appearance: "none",
                            border: 0,
                            background: "transparent",
                            p: 0,
                            color: "primary.main",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {compactExpanded ? "Show less" : `Show ${softWrapLines!.length - compactPreviewLines} more lines`}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
}
