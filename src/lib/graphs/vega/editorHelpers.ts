import type { InputSpec, Category } from "@/lib/graphs/vega/buildVega";

export type PreviewMode = "graph" | "json";

export function createDefaultCategory(index: number, previousEnd: number): Category {
    const colors = ["#ef4444", "#22c55e", "#ef4444", "#f59e0b", "#3b82f6"];
    const names = ["Low", "Normal", "High", `Range ${index + 1}`];

    return {
        name: names[index] ?? `Category ${index + 1}`,
        end: previousEnd + 50,
        color: colors[index % colors.length],
    };
}

export function createDefaultInputSpec(): InputSpec {
    return {
        title: {
            text: "Example RRNL",
            align: "center",
            font: "Arial",
            fontSize: 16,
            color: "#111827",
        },
        data: {
            start: 40,
            categories: [
                { name: "Low", end: 90, color: "#ef4444" },
                { name: "Normal", end: 140, color: "#22c55e" },
                { name: "High", end: 190, color: "#ef4444" },
            ],
        },
        separation: {
            color: "#111111",
            width: 2,
        },
        labels: {
            position: "on",
        },
        tickmarks: {
            tickCount: 4,
            position: "bottom",
        },
        value_indicator: {
            value: 112,
            title: "Patient Value",
        },
    };
}

export function normalizeInputSpec(input: InputSpec): InputSpec {
    return {
        ...input,
        title: {
            text: input.title?.text ?? "",
            align: input.title?.align ?? "center",
            font: input.title?.font ?? "Arial",
            fontSize: input.title?.fontSize ?? 16,
            color: input.title?.color ?? "#111827",
        },
        data: {
            start: input.data?.start ?? 0,
            categories: input.data?.categories?.length
                ? input.data.categories
                : [
                      { name: "Low", end: 90, color: "#ef4444" },
                      { name: "Normal", end: 140, color: "#22c55e" },
                      { name: "High", end: 190, color: "#ef4444" },
                  ],
        },
        separation: {
            color: input.separation?.color ?? "#111111",
            width: input.separation?.width ?? 2,
            ...input.separation,
        },
        labels: {
            position: input.labels?.position ?? "on",
            ...input.labels,
        },
        tickmarks: {
            position: input.tickmarks?.position ?? "bottom",
            tickCount: input.tickmarks?.tickCount ?? 4,
            ...input.tickmarks,
        },
        value_indicator: input.value_indicator
            ? {
                  ...input.value_indicator,
                  value: input.value_indicator.value,
                  title: input.value_indicator.title ?? "",
              }
            : undefined,
    };
}

export function updateCategoryAt(
    categories: Category[],
    index: number,
    patch: Partial<Category>,
): Category[] {
    return categories.map((cat, i) => (i === index ? { ...cat, ...patch } : cat));
}

export function removeCategoryAt(categories: Category[], index: number): Category[] {
    return categories.filter((_, i) => i !== index);
}

export function addCategory(categories: Category[]): Category[] {
    const previousEnd = categories.length > 0 ? categories[categories.length - 1].end : 0;
    return [...categories, createDefaultCategory(categories.length, previousEnd)];
}
