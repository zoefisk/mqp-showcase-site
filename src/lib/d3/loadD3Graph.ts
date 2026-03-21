export type D3GraphManifestItem = {
    id: string;
    label: string;
    file: string;
};

export async function loadD3GraphManifest(): Promise<D3GraphManifestItem[]> {
    const res = await fetch("/d3-graphs/index.json", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load D3 graph manifest.");
    }

    return res.json();
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
