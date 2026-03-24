import { parseInputSpecs, type InputSpec } from "@/lib/graphs/vega/buildVega";
import { withBasePath } from "@/lib/graphs/asset";

export type VegaGraphManifestItem = {
    id: string;
    label: string;
    file: string;
};

export async function loadVegaGraphManifest(): Promise<VegaGraphManifestItem[]> {
    const res = await fetch(withBasePath("/vega-graphs/index.json")!, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load Vega graph manifest.");
    }

    const items: VegaGraphManifestItem[] = await res.json();

    return items.map((item) => ({
        ...item,
        file: withBasePath(item.file)!,
    }));
}

export async function loadVegaInputSpecsFromFile(filePath: string): Promise<InputSpec[]> {
    const res = await fetch(filePath, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to load Vega graph file: ${filePath}`);
    }

    const raw = await res.json();
    return parseInputSpecs(raw);
}
