"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { injectBaseTag } from "@/lib/graphs/d3/injectBaseTag";
import {injectCenteredLayout} from "@/lib/graphs/d3/injectCenteredLayout";

type Props = {
    html: string;
    filePath?: string;
    title?: string;
};

export default function D3View({
                                   html,
                                   filePath,
                                   title = "D3 Graph Preview",
                               }: Props) {


    const srcDoc = React.useMemo(() => {
        const withBase = injectBaseTag(html, filePath);
        return injectCenteredLayout(withBase);
    }, [html, filePath]);


    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <iframe
                title={title}
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 16,
                    background: "white",
                    display: "block",
                }}
            />
        </Box>
    );
}
