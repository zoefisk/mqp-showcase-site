"use client";

import * as React from "react";

type Props = {
    html: string;
    filePath?: string;
    title?: string;
};

function injectBaseTag(html: string, filePath?: string) {
    if (!filePath || typeof window === "undefined") return html;

    const origin = window.location.origin;
    const normalized = filePath.startsWith("/") ? filePath : `/${filePath}`;
    const directory = normalized.slice(0, normalized.lastIndexOf("/") + 1);
    const baseHref = `${origin}${directory}`;

    const baseTag = `<base href="${baseHref}">`;

    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);
    }

    if (/<html[^>]*>/i.test(html)) {
        return html.replace(/<html([^>]*)>/i, `<html$1><head>${baseTag}</head>`);
    }

    return `<!DOCTYPE html><html><head>${baseTag}</head><body>${html}</body></html>`;
}

export default function D3View({ html, filePath, title = "D3 Graph Preview" }: Props) {
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

    const srcDoc = React.useMemo(() => {
        return injectBaseTag(html, filePath);
    }, [html, filePath]);

    return (
        <iframe
            ref={iframeRef}
            title={title}
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-same-origin"
            style={{
                width: "100%",
                minHeight: 420,
                border: "none",
                borderRadius: 16,
                background: "white",
            }}
        />
    );
}
