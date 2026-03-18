// src/lib/vega/buildVega.ts
import { z } from "zod";

/* ============================================================
   ZOD SCHEMAS (runtime validation + correct TS narrowing)
   ============================================================ */

const TitleInputSchema = z.object({
    text: z.string(),
    align: z.enum(["left", "center", "right"]).optional(),
    font: z.string().optional(),
    fontSize: z.number().optional(),
    color: z.string().optional(),
});

const CategorySchema = z.object({
    name: z.string(),
    end: z.number(), // cumulative
    color: z.string(),
});

const NumberLineDataSchema = z.object({
    start: z.number(),
    categories: z.array(CategorySchema),
});

// We accept extra properties in these objects (like excludeEnds, align, showNumbers)
const CategorySeparationSchema = z
    .object({
        color: z.string().optional(),
        width: z.number().optional(),
    })
    .passthrough();

const CategoryLabelsSchema = z
    .object({
        position: z.enum(["over", "on", "under"]).optional(),
    })
    .passthrough();

const TickMarksSchema = z
    .object({
        position: z.enum(["top", "bottom"]).optional(),
        tickCount: z.number().optional(),
    })
    .passthrough();

const ValueIndicatorSchema = z
    .object({
        value: z.number(),
        title: z.string().optional(),
    })
    .passthrough();

const InputSpecSchema = z
    .object({
        title: TitleInputSchema,
        data: NumberLineDataSchema,

        // optional feature blocks
        separation: CategorySeparationSchema.optional(),
        labels: CategoryLabelsSchema.optional(),
        tickmarks: TickMarksSchema.optional(),
        value_indicator: ValueIndicatorSchema.optional(),

        // allow extra top-level keys you have in JSON (coloring, etc.)
    })
    .passthrough();

const ManyInputSchema = z.union([InputSpecSchema, z.array(InputSpecSchema)]);

/* ============================================================
   TYPES (inferred from Zod)
   ============================================================ */

export type TitleInput = z.infer<typeof TitleInputSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type NumberLineData = z.infer<typeof NumberLineDataSchema>;
export type CategorySeparationInput = z.infer<typeof CategorySeparationSchema>;
export type CategoryLabelsInput = z.infer<typeof CategoryLabelsSchema>;
export type TickMarksInput = z.infer<typeof TickMarksSchema>;
export type ValueIndicator = z.infer<typeof ValueIndicatorSchema>;
export type InputSpec = z.infer<typeof InputSpecSchema>;

// Minimal Vega spec typing (intentionally loose)
export type VegaSpec = Record<string, unknown>;

/* ============================================================
   DEFAULTS
   ============================================================ */

const DEFAULT_TITLE = {
    align: "center" as const,
    font: "sans-serif",
    fontSize: 16,
    color: "#111827",
};

const DEFAULT_SEPARATION = {
    color: "#000000",
    width: 2,
};

const DEFAULT_LABELS = {
    position: "on" as const,
};

const DEFAULT_TICKMARKS = {
    position: "bottom" as const,
    tickCount: 5,
};

/* ============================================================
   PUBLIC PARSER
   Use this when loading JSON from file/fetch.
   ============================================================ */

export function parseInputSpecs(raw: unknown): InputSpec[] {
    const parsed = ManyInputSchema.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
}

/* ============================================================
   HELPERS
   ============================================================ */

function resolveTitle(input: TitleInput) {
    return {
        text: input.text,
        align: input.align ?? DEFAULT_TITLE.align,
        font: input.font ?? DEFAULT_TITLE.font,
        fontSize: input.fontSize ?? DEFAULT_TITLE.fontSize,
        color: input.color ?? DEFAULT_TITLE.color,
    };
}

function computeOffsets(
    tickPos: "top" | "bottom",
    labelPos: "over" | "on" | "under"
) {
    let offset = 0;
    let indicatorOffset = 0;
    let categoryLabelY = "height/2";

    if (tickPos === "top") {
        if (labelPos === "over") {
            categoryLabelY = "0";
            indicatorOffset = -15;
            offset = 30;
        } else if (labelPos === "on") {
            indicatorOffset = -15;
        } else {
            categoryLabelY = "height + 10";
        }
    } else {
        if (labelPos === "over") {
            categoryLabelY = "0";
            offset = 10;
        } else if (labelPos === "under") {
            categoryLabelY = "height + 30";
            indicatorOffset = 20;
        }
    }

    return { offset, indicatorOffset, categoryLabelY };
}

/* ============================================================
   MAIN BUILDER
   ============================================================ */

export function buildVegaFromInput(input: InputSpec): VegaSpec {
    if (!input.title?.text) throw new Error("A title is required.");
    if (!input.data) throw new Error("Data for the number line is required.");

    const title = resolveTitle(input.title);

    const separation = {
        ...DEFAULT_SEPARATION,
        ...(input.separation ?? {}),
    };

    const labels = {
        ...DEFAULT_LABELS,
        ...(input.labels ?? {}),
    };

    const tickmarks = {
        ...DEFAULT_TICKMARKS,
        ...(input.tickmarks ?? {}),
    };

    const valueIndicator = input.value_indicator;

    const { offset, indicatorOffset, categoryLabelY } = computeOffsets(
        tickmarks.position,
        labels.position
    );

    // Convert cumulative ends -> segment widths
    const values: Array<Record<string, unknown>> = [];
    let lastEnd = 0;

    input.data.categories.forEach((cat, idx) => {
        const width = cat.end - lastEnd;
        lastEnd = cat.end;

        values.push({
            ...cat,
            end: width,
            order: idx,
        });
    });

    const data = [
        { name: "table", values },
        {
            name: "stacked",
            source: "table",
            transform: [
                {
                    type: "stack",
                    field: "end",
                    sort: { field: "order" },
                    as: ["x0", "x1"],
                },
                {
                    type: "formula",
                    as: "x0",
                    expr: `datum.order === 0 ? datum.x0 + ${input.data.start} : datum.x0`,
                },
            ],
        },
        {
            name: "separators",
            source: "stacked",
            transform: [
                {
                    type: "filter",
                    expr:
                        "datum.x1 < data('stacked')[data('stacked').length - 1].x1",
                },
            ],
        },
    ];

    const scales = [
        {
            name: "xscale",
            domain: { data: "stacked", field: "x1" },
            range: "width",
            domainMin: input.data.start,
            zero: false,
        },
    ];

    const axes = [
        {
            orient: tickmarks.position,
            scale: "xscale",
            offset: tickmarks.position === "bottom" ? offset : -offset,
            tickCount: tickmarks.tickCount,
        },
    ];

    const marks: any[] = [];

    // Bars
    marks.push({
        type: "rect",
        from: { data: "stacked" },
        encode: {
            enter: {
                height: { value: 30 },
                x: { scale: "xscale", field: "x0" },
                x2: { scale: "xscale", field: "x1" },
                y: { signal: `${offset}` },
                fill: { field: "color" },
            },
        },
    });

    // Category labels
    marks.push({
        type: "text",
        from: { data: "stacked" },
        encode: {
            enter: {
                y: { signal: categoryLabelY },
                align: { value: "center" },
                baseline: { value: "middle" },
                fill: { value: "black" },
                fontSize: { value: 12 },
                text: { field: "name" },
            },
            update: {
                x: {
                    signal: "scale('xscale', (datum.x0 + datum.x1) / 2)",
                },
            },
        },
    });

    // Separators
    marks.push({
        type: "rule",
        from: { data: "separators" },
        encode: {
            enter: {
                x: { scale: "xscale", field: "x1" },
                y: { signal: `${offset}` },
                y2: { signal: `height + ${offset}` },
                stroke: { value: separation.color },
                strokeWidth: { value: separation.width },
            },
        },
    });

    // Optional value indicator
    if (valueIndicator) {
        // Arrow line
        marks.push({
            type: "rule",
            encode: {
                enter: {
                    x: { scale: "xscale", value: valueIndicator.value },
                    y: { signal: `height + 25 + ${offset} + ${indicatorOffset}` },
                    y2: { signal: `height + 70 + ${offset} + ${indicatorOffset}` },
                    stroke: { value: "black" },
                    strokeWidth: { value: 3 },
                },
            },
        });

        // Arrow head
        marks.push({
            type: "symbol",
            encode: {
                enter: {
                    x: { scale: "xscale", value: valueIndicator.value },
                    y: { signal: `height + 25 + ${offset} + ${indicatorOffset}` },
                    shape: { value: "triangle-up" },
                    fill: { value: "black" },
                    size: { value: 150 },
                },
            },
        });

        // Optional indicator title text
        if (valueIndicator.title && valueIndicator.title.trim().length > 0) {
            marks.push({
                type: "text",
                encode: {
                    enter: {
                        x: { scale: "xscale", value: valueIndicator.value },
                        y: { signal: `height + 85 + ${offset} + ${indicatorOffset}` },
                        text: { value: valueIndicator.title },
                        align: { value: "center" },
                        fill: { value: "black" },
                        fontSize: { value: 14 },
                    },
                },
            });
        }

        // Indicator number
        const numberYOffset =
            valueIndicator.title && valueIndicator.title.trim().length > 0
                ? indicatorOffset
                : indicatorOffset - 15;

        marks.push({
            type: "text",
            encode: {
                enter: {
                    x: { scale: "xscale", value: valueIndicator.value },
                    y: { signal: `height + 115 + ${offset} + ${numberYOffset}` },
                    text: { value: valueIndicator.value },
                    align: { value: "center" },
                    fill: { value: "black" },
                    fontSize: { value: 30 },
                },
            },
        });
    }

    return {
        width: 300,
        height: 30,
        padding: 10,
        title,
        data,
        scales,
        axes,
        marks,
    };
}

/* ============================================================
   MULTI-SPEC SUPPORT
   ============================================================ */

export function buildManyVega(raw: unknown): VegaSpec[] {
    // Parse + validate first (fixes the "align is string" problem)
    const inputs = parseInputSpecs(raw);
    return inputs.map(buildVegaFromInput);
}
