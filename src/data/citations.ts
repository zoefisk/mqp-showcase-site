export type CitationCategory =
    | "Foundational Research"
    | "Healthcare Context"
    | "Visualization"
    | "Other";

export type Citation = {
    id: string;
    title: string;
    authors: string;
    year: string;
    source: string;
    category: CitationCategory;
    url?: string;
    doi?: string;
    note?: string;
};

export const CATEGORY_ORDER: CitationCategory[] = [
    "Foundational Research",
    "Healthcare Context",
    "Visualization",
    "Other",
];

export const CITATIONS: Citation[] = [
    {
        id: "zikmund-fisher-graphics",
        title: "Graphics help patients distinguish between urgent and non-urgent deviations in laboratory test results",
        authors: "Zikmund-Fisher, B. J., et al.",
        year: "2021",
        source: "Original study on reference range number lines",
        category: "Foundational Research",
        note: "Primary study replicated and discussed throughout the project.",
    },
    {
        id: "arcia-rrnl",
        title: "Reference range number lines and patient-facing laboratory result communication",
        authors: "Arcia, A., et al.",
        year: "2019",
        source: "Patient-facing health visualization research",
        category: "Foundational Research",
        note: "Provides supporting background for the use of RRNLs in patient communication.",
    },
    {
        id: "park-visualization",
        title: "Data visualization as support for interpretation and decision-making",
        authors: "Park, J., et al.",
        year: "2022",
        source: "Visualization literature",
        category: "Visualization",
        note: "Supports discussion of visualization as a way to reduce interpretation burden.",
    },
    {
        id: "smith-health-literacy",
        title: "Health literacy and barriers to understanding health information",
        authors: "Smith, S., et al.",
        year: "2009",
        source: "Health literacy literature",
        category: "Healthcare Context",
        note: "Used for broader context on patient understanding and literacy barriers.",
    },
    {
        id: "barker-health-data",
        title: "Patient portals, personal health data, and access to healthcare information",
        authors: "Barker, A., et al.",
        year: "2024",
        source: "Healthcare information access literature",
        category: "Healthcare Context",
    },
];
