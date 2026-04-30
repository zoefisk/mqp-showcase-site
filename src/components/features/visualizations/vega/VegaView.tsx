import * as React from "react";
import vegaEmbed, { type VisualizationSpec, type Result } from "vega-embed";
import { Box } from "@mui/material";

type Props = {
    spec: VisualizationSpec;
    title?: string;
    scale?: number;
    onError?: (error: string) => void;
};

export default function VegaView({
    spec,
    title = "Vega Graph Preview",
    scale = 1.35,
    onError,
}: Props) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const viewRef = React.useRef<Result | null>(null);

    React.useEffect(() => {
        if (!containerRef.current) return;

        let isMounted = true;

        async function render() {
            try {
                viewRef.current?.view.finalize();
                viewRef.current = null;

                const result = await vegaEmbed(containerRef.current!, spec, {
                    actions: false,
                });

                if (!isMounted) return;
                viewRef.current = result;
            } catch (err) {
                if (!isMounted) return;

                const message =
                    err instanceof Error ? err.message : "Failed to render Vega visualization.";

                onError?.(message);
            }
        }

        render();

        return () => {
            isMounted = false;
            viewRef.current?.view.finalize();
            viewRef.current = null;
        };
    }, [spec, onError]);

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
            <Box
                ref={containerRef}
                aria-label={title}
                sx={{
                    width: "fit-content",
                    maxWidth: "100%",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                }}
            />
        </Box>
    );
}
