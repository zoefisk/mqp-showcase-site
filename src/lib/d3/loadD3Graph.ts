import { basePath } from "@/lib/basePath";

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
    const res = await fetch(`${basePath}/d3-graphs/index.json`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load D3 graph manifest.");
    }

    const items: D3GraphManifestItem[] = await res.json();

    return items.map((item) => ({
        ...item,
        htmlFile: item.htmlFile ? `${basePath}${item.htmlFile}` : undefined,
        svgFile: item.svgFile ? `${basePath}${item.svgFile}` : undefined,
    }));
}

export async function loadD3HtmlFromFile(filePath: string): Promise<string> {
    const res = await fetch(filePath, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to load D3 graph file: ${filePath}`);
    }

    return res.text();
}
