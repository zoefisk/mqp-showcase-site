"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardActionArea,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Skeleton,
    Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import D3View from "@/components/features/visualizations/d3/D3View";
import D3GraphEditor from "@/components/features/visualizations/d3/D3GraphEditor";
import {
    type D3GraphManifestItem,
    loadD3GraphManifest,
    loadD3TextFromFile,
} from "@/lib/graphs/d3/loadD3Graph";
import { useGraphManifest } from "@/hooks/graphs/useGraphManifest";
import { injectBaseTag } from "@/lib/graphs/d3/injectBaseTag";

type D3GraphCardGridProps = {
    /** Only show graphs whose IDs are in this list. Shows all graphs if omitted. */
    graphIds?: string[];
    /** Show the graph label under each card. Defaults to true. */
    showTitles?: boolean;
    /** Number of columns. Defaults to 3. */
    cols?: number;
    /** Height of the preview area inside each card in pixels. Defaults to 160. */
    previewHeight?: number;
    /**
     * Controls how snugly the graph fills its card. The graph is auto-scaled
     * to fit; this value effectively determines the remaining padding ratio.
     * 1.0 = fills the card edge-to-edge, 0.8 = 20% padding around the graph.
     * Defaults to 0.9.
     */
    previewScale?: number;
};

// ---------------------------------------------------------------------------
// Single card — loads its own graph content and renders a small D3View
// ---------------------------------------------------------------------------

type GraphCardProps = {
    item: D3GraphManifestItem;
    showTitle: boolean;
    previewHeight: number;
    previewScale: number;
    onClick: () => void;
};

function buildSvgOnlyHtml(svgText: string) {
    return `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;background:white;width:100%;height:100%;}svg{display:block;width:100%;height:auto;max-width:100%;}</style></head><body>${svgText}</body></html>`;
}

// The iframe is rendered at this fixed "virtual" viewport size so that
// viewport-relative CSS (100vh, width: 100%, etc.) inside each graph resolves
// correctly regardless of the card's actual pixel size. The outer Box then
// applies a CSS transform to scale the whole iframe down to fit the card.
const IFRAME_W = 600;
const IFRAME_H = 250;

function GraphCard({ item, showTitle, previewHeight, previewScale, onClick }: GraphCardProps) {
    const [html, setHtml] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerW, setContainerW] = React.useState(300);

    React.useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        setContainerW(el.getBoundingClientRect().width || 300);
        const ro = new ResizeObserver((entries) => {
            setContainerW(entries[0].contentRect.width);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    React.useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);

                const htmlPromise = item.htmlFile
                    ? loadD3TextFromFile(item.htmlFile)
                    : Promise.resolve("");

                const svgPromise = item.svgFile
                    ? loadD3TextFromFile(item.svgFile)
                    : Promise.resolve("");

                const [htmlText, svgText] = await Promise.all([htmlPromise, svgPromise]);

                if (!mounted) return;

                if (item.sourceMode === "svg-only") {
                    setHtml(buildSvgOnlyHtml(svgText));
                } else {
                    setHtml(htmlText || "");
                }
            } catch {
                if (mounted) setHtml("");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [item]);

    const previewSrc = React.useMemo(() => {
        if (html === null) return "";
        const withBase = injectBaseTag(html, item.htmlFile ?? item.svgFile);
        // Injected at end of body so these styles come last in the cascade and
        // override any padding/margin the graph's own CSS applies to body.
        const centeringOverride = `<style>
  html, body { width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; background: white !important; box-sizing: border-box !important; }
  body { display: flex !important; justify-content: center !important; align-items: center !important; overflow: hidden !important; }
  body > * { flex: 0 0 auto !important; }
</style>`;
        if (/<\/body>/i.test(withBase)) {
            return withBase.replace(/<\/body>/i, `${centeringOverride}</body>`);
        }
        if (/<\/html>/i.test(withBase)) {
            return withBase.replace(/<\/html>/i, `${centeringOverride}</html>`);
        }
        return withBase + centeringOverride;
    }, [html, item.htmlFile, item.svgFile]);

    // Scale the fixed-size iframe to fit inside (containerW × previewHeight),
    // then apply the user-facing previewScale as a final multiplier.
    const scale = Math.min(containerW / IFRAME_W, previewHeight / IFRAME_H) * previewScale;

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "box-shadow 0.2s, border-color 0.2s",
                "&:hover": {
                    boxShadow: 4,
                    borderColor: "primary.main",
                },
            }}
        >
            <CardActionArea onClick={onClick} sx={{ display: "block" }}>
                <Box
                    ref={containerRef}
                    sx={{
                        height: previewHeight,
                        bgcolor: "white",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    ) : (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: IFRAME_W,
                                height: IFRAME_H,
                                transform: `translate(-50%, -50%) scale(${scale})`,
                                transformOrigin: "center center",
                                pointerEvents: "none",
                            }}
                        >
                            <iframe
                                title={item.label}
                                srcDoc={previewSrc}
                                sandbox="allow-scripts allow-same-origin"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    display: "block",
                                }}
                            />
                        </Box>
                    )}
                </Box>

                {showTitle && (
                    <Box sx={{ px: 1.5, py: 1, borderTop: "1px solid", borderColor: "divider" }}>
                        <Typography
                            variant="caption"
                            fontWeight={600}
                            noWrap
                            sx={{ display: "block", color: "text.primary" }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                )}
            </CardActionArea>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Modal — wraps the full D3GraphEditor for the selected graph
// ---------------------------------------------------------------------------

type GraphModalProps = {
    item: D3GraphManifestItem | null;
    onClose: () => void;
};

function GraphModal({ item, onClose }: GraphModalProps) {
    return (
        <Dialog
            open={item !== null}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{ sx: { borderRadius: 4 } }}
        >
            <DialogTitle
                component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 1,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    {item?.label ?? ""}
                </Typography>
                <IconButton onClick={onClose} size="small" aria-label="Close">
                    <CloseOutlinedIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {item && (
                    <D3GraphEditor
                        title={item.label}
                        subtitle=""
                        graphSource={item.id}
                        allowGraphSelection={false}
                        showCodeEditors={true}
                        svgEditable={false}
                        htmlEditable={false}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}

// ---------------------------------------------------------------------------
// Grid
// ---------------------------------------------------------------------------

export default function D3GraphCardGrid({
    graphIds,
    showTitles = true,
    cols = 3,
    previewHeight = 160,
    previewScale = 0.9,
}: D3GraphCardGridProps) {
    const { manifest, loadingManifest } = useGraphManifest(loadD3GraphManifest);
    const [activeItem, setActiveItem] = React.useState<D3GraphManifestItem | null>(null);

    const visibleItems = React.useMemo(() => {
        if (!graphIds) return manifest;
        return graphIds.flatMap((id) => manifest.filter((item) => item.id === id));
    }, [manifest, graphIds]);

    const skeletonCount = graphIds ? graphIds.length : cols * 2;

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: `repeat(${cols}, 1fr)`,
                    },
                }}
            >
                {loadingManifest
                    ? Array.from({ length: skeletonCount }).map((_, i) => (
                          <Skeleton
                              key={i}
                              variant="rounded"
                              height={previewHeight + (showTitles ? 40 : 0)}
                              sx={{ borderRadius: 3 }}
                          />
                      ))
                    : visibleItems.map((item) => (
                          <GraphCard
                              key={item.id}
                              item={item}
                              showTitle={showTitles}
                              previewHeight={previewHeight}
                              previewScale={previewScale}
                              onClick={() => setActiveItem(item)}
                          />
                      ))}
            </Box>

            <GraphModal item={activeItem} onClose={() => setActiveItem(null)} />
        </>
    );
}
