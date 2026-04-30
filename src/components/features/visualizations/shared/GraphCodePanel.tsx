import * as React from "react";
import { Alert, Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

type ErrorLocation = {
    line: number;
    column: number;
} | null;

type Props = {
    label: string;
    text: string;
    editable: boolean;
    error: string | null;
    errorLocation: ErrorLocation;
    highlightedHtml: string;
    onChange: (next: string) => void;
    onCopy: () => void;
    onDownload: () => void;
    lineNumbers: number[];
    minHeight?: number;
    maxHeight?: number;
    language: "json" | "html";
};

export default function GraphCodePanel({
    label,
    text,
    editable,
    error,
    errorLocation,
    highlightedHtml,
    onChange,
    onCopy,
    onDownload,
    lineNumbers,
    minHeight = 420,
    maxHeight = 650,
    language,
}: Props) {
    const codeRef = React.useRef<HTMLPreElement | null>(null);
    const linesRef = React.useRef<HTMLDivElement | null>(null);

    function syncScroll(target: HTMLTextAreaElement | HTMLPreElement) {
        if (codeRef.current) {
            codeRef.current.scrollTop = target.scrollTop;
            codeRef.current.scrollLeft = target.scrollLeft;
        }

        if (linesRef.current) {
            linesRef.current.scrollTop = target.scrollTop;
        }
    }

    const tokenStyles =
        language === "json"
            ? {
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
              }
            : {
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
              };

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
                    minHeight,
                    maxHeight,
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

                <Box sx={{ position: "relative", minHeight }}>
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
                                overflowX: "auto",
                                overflowY: "auto",
                                overscrollBehavior: "contain",
                                whiteSpace: "pre",
                                wordWrap: "normal",
                                fontFamily:
                                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                fontSize: 13,
                                lineHeight: "22px",
                                color: "#e2e8f0",
                                pointerEvents: editable ? "none" : "auto",
                                ...tokenStyles,
                            }}
                            dangerouslySetInnerHTML={{ __html: highlightedHtml || " " }}
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
                                overflowX: "auto",
                                overflowY: "auto",
                                overscrollBehavior: "contain",
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
