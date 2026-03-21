"use client";

import * as React from "react";

type Props = {
    html: string;
    filePath?: string;
    title?: string;
};

function injectBaseTag(html: string, filePath?: string) {
    if (typeof window === "undefined") return html;

    const origin = window.location.origin;

    let baseTag = "";
    if (filePath) {
        const normalized = filePath.startsWith("/") ? filePath : `/${filePath}`;
        const directory = normalized.slice(0, normalized.lastIndexOf("/") + 1);
        const baseHref = `${origin}${directory}`;
        baseTag = `<base href="${baseHref}">`;
    }

    const injectedStyles = `
        <style>
        html, body {
            margin: 0;
            padding: 16px;
            width: 100%;
            height: auto;
            display: block;
            background: white;
        }
        
        #container {
            width: 100%;
            max-width: 80%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            overflow: hidden; 
        }
        
        svg {
            width: 100%;
            max-width: 80%;
            height: auto;
        }
        </style>
    `;

    if (/<head[^>]*>/i.test(html)) {
        return html.replace(
            /<head([^>]*)>/i,
            `<head$1>${baseTag}${injectedStyles}`
        );
    }

    if (/<html[^>]*>/i.test(html)) {
        return html.replace(
            /<html([^>]*)>/i,
            `<html$1><head>${baseTag}${injectedStyles}</head>`
        );
    }

    return `
        <!DOCTYPE html>
        <html>
            <head>${baseTag}${injectedStyles}</head>
            <body>${html}</body>
        </html>
    `;
}

export default function D3View({ html, filePath, title = "D3 Graph Preview" }: Props) {
    const srcDoc = React.useMemo(() => {
        return injectBaseTag(html, filePath);
    }, [html, filePath]);

    return (
        <iframe
            title={title}
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-same-origin"
            style={{
                width: "100%",
                minHeight: 520,
                height: "70vh",
                maxHeight: 900,
                border: "none",
                borderRadius: 16,
                background: "white",
                display: "block",
            }}
        />
    );
}
