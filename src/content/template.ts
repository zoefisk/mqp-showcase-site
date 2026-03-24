/**
 * TEMPLATE: Page Content Structure
 *
 * Copy this file and rename it for each page:
 * e.g. caseStudyContent.ts, aboutContent.ts, etc.
 * Copy whichever sections you need for the given page.
 */

export const pageContent = {
    // ─────────────────────────────
    // PAGE HEADER
    // ─────────────────────────────
    pageHeader: {
        eyebrowLabel: "OPTIONAL SMALL LABEL",
        mainHeader: "Page Title",
        subheader:
            "Short description or introduction for the page. This should summarize what the user will see.",
    },

    // ─────────────────────────────
    // HERO / INTRO SECTION
    // ─────────────────────────────
    intro: {
        title: "Section Title",
        body: ["First paragraph of the section.", "Second paragraph if needed."],
    },

    // ─────────────────────────────
    // GENERIC CONTENT SECTION
    // ─────────────────────────────
    section: {
        title: "Section Title",
        subtitle: "Optional subtitle",
        body: ["Paragraph one.", "Paragraph two."],
    },

    // ─────────────────────────────
    // CARD GRID / SNAPSHOT SECTION
    // ─────────────────────────────
    cards: {
        title: "Section Title",
        items: [
            {
                label: "Card Label",
                value: "Main Value",
                description: "Short explanation of this item.",
            },
            {
                label: "Another Card",
                value: "Value",
                description: "Description here.",
            },
        ],
    },

    // ─────────────────────────────
    // QUESTION / LIST SECTION
    // ─────────────────────────────
    questions: {
        title: "Section Title",
        intro: "Optional intro text.",
        groups: [
            {
                title: "Group Title",
                description: "What this group represents.",
            },
        ],
    },

    // ─────────────────────────────
    // PREVIEW / DEMO SECTION
    // ─────────────────────────────
    preview: {
        title: "Section Title",
        intro: "Explain what the user is seeing.",
        items: [
            {
                title: "Preview Title",
                description: "Short description of this preview.",
            },
        ],
    },
};
