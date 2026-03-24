export const caseStudyContent = {
    pageHeader: {
        eyebrowLabel: "ZIKMUND-FISHER REPLICATED STUDY",
        mainHeader: "Case Study",
        subheader:
            "To evaluate our specification approach in a realistic setting, we are replicating the study “Graphics help patients distinguish between urgent and non-urgent deviations in laboratory test results” by recreating its stimuli and adapting the workflow for a modern online experiment.",
    },

    studySnapshot: {
        title: "Study Snapshot",
        cards: {
            originalBasis: {
                label: "Original Basis",
                value: "Published Study",
                description:
                    "We are replicating a prior research study on patient interpretation of lab result graphics.",
            },
            stimulusBuild: {
                label: "Stimulus Build",
                value: "D3 Recreation",
                description:
                    "The original graphs are being recreated as closely as possible with D3.",
            },
            experimentPlatform: {
                label: "Experiment Platform",
                value: "ReVISit.dev",
                description: "The online study is being configured and deployed through ReVISit.",
            },
            recruitment: {
                label: "Recruitment",
                value: "Prolific",
                description:
                    "Participants are being recruited through Prolific for the live study.",
            },
        },
    },

    background: {
        title: "Background on the Original Study",
        noteTitle: "Why this paper matters",
        body: ["[write about why the zikmund fisher study matters and what it tells us]"],
    },

    projectConnection: {
        title: "Why This Case Study Matters for Our Project",
        body: ["[connect the study to our project]"],
    },

    studyQuestions: {
        title: "Study Questions",
        intro: "Users were asked the following question sets during the study.",
        perVisualization: {
            title: "For each visualization",
            description:
                "For every visualization that users saw, they were asked the following questions.",
        },
        finalQuestions: {
            title: "End of main visualizations",
            description:
                "After completing the main visualizations, users were asked the following questions.",
        },
    },

    specificationPreview: {
        title: "Stimulus / Specification Preview",
        intro: "This section uses the current Vega-based editor in a read-only configuration as a specification-oriented companion to the replication work. A dedicated D3 viewer can be added later as the recreated stimuli are finalized.",
    },
};
