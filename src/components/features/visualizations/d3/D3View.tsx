"use client";

import * as React from "react";
import {injectBaseTag} from "@/lib/graphs/d3/injectBaseTag";

type Props = {
    html: string;
    filePath?: string;
    title?: string;
};

export default function D3View({ html, filePath, title = "D3 Graph Preview" }: Props) {
    const srcDoc = React.useMemo(() => injectBaseTag(html, filePath), [html, filePath]);

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
