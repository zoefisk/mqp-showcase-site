import { withBasePath } from "@/lib/graphs/asset";

export type SourceMode = "html" | "html+svg" | "svg-only";

export type D3GraphManifestItem = {
    id: string;
    label: string;
    sourceMode: SourceMode;
    htmlFile?: string;
    svgFile?: string;
    requiresSvg?: boolean;
};

export async function loadD3GraphManifest(): Promise<D3GraphManifestItem[]> {
    const res = await fetch(withBasePath("/d3-graphs/index.json")!, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load D3 graph manifest.");
    }

    const items: D3GraphManifestItem[] = await res.json();

    return items.map((item) => ({
        ...item,
        htmlFile: withBasePath(item.htmlFile),
        svgFile: withBasePath(item.svgFile),
    }));
}

export async function loadD3TextFromFile(filePath: string): Promise<string> {
    const res = await fetch(filePath, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to load D3 graph file: ${filePath}`);
    }

    return res.text();
}
