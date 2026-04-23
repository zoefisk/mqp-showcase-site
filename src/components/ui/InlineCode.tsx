"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { highlightPython } from "@/lib/python/highlight";

type Props = {
    children?: string;
    code?: string;
    /**
     * Apply Python syntax highlighting to the content.
     * Defaults to true. Pass false for generic identifiers/shell snippets.
     */
    highlight?: boolean;
};

/**
 * Inline code snippet styled to match the PythonCodeViewer palette.
 * Renders as an inline element so it flows naturally within body text.
 *
 * @example
 * <Typography>Call <InlineCode>process_data()</InlineCode> to start.</Typography>
 * <Typography>Filter with <InlineCode code="age < 18" /></Typography>
 */
export default function InlineCode({ children, code, highlight = true }: Props) {
    const content = code ?? children ?? "";

    const html = React.useMemo(
        () => (highlight ? highlightPython(content) : null),
        [content, highlight],
    );

    return (
        <Box
            component="code"
            sx={{
                display: "inline",
                fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: "0.875em",
                lineHeight: "inherit",
                bgcolor: "#1e1e2e",
                color: "#cdd6f4",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "5px",
                px: "5px",
                py: "2px",
                // Token colours — same palette as PythonCodeViewer
                "& .py-keyword":   { color: "#cba6f7" },
                "& .py-builtin":   { color: "#89dceb" },
                "& .py-constant":  { color: "#fab387" },
                "& .py-string":    { color: "#a6e3a1" },
                "& .py-number":    { color: "#f38ba8" },
                "& .py-comment":   { color: "#585b70", fontStyle: "italic" },
                "& .py-decorator": { color: "#f9e2af" },
                "& .py-funcname":  { color: "#89b4fa" },
                "& .py-classname": { color: "#f9e2af" },
            }}
            {...(html !== null
                ? { dangerouslySetInnerHTML: { __html: html } }
                : { children: content })}
        />
    );
}
