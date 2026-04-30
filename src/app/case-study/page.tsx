"use client";

import * as React from "react";
import {
    Accordion, AccordionDetails, AccordionSummary,
    alpha,
    Box,
    Chip,
    Container,
    List, ListItem, ListItemIcon, ListItemText,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";

import PageHeader from "@/components/layout/PageHeader";
import PythonCodeViewer from "@/components/ui/PythonCodeViewer";
import ExpandableTextSection from "@/components/ui/ExpandableTextSection";
import D3GraphCardGrid from "@/components/features/visualizations/d3/D3GraphCardGrid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageModal from "@/components/ui/ImageModal";

// ─── Dummy data ──────────────────────────────────────────────────────────────

type JourneyStep = {
    id: string;
    phase: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accentColor: string;
    body: React.ReactNode;
    highlights?: string[];
    detail?: React.ReactNode;
    details?: DetailBlock[];
    afterDetail?: React.ReactNode;
};

type DetailBlock = {
    title?: React.ReactNode;
    content: React.ReactNode;
    afterCard?: React.ReactNode;
};

const STEPS: JourneyStep[] = [
    {
        id: "research",
        phase: "Phase 1",
        title: "Research & Discovery",
        subtitle: "Choosing a study to replicate",
        icon: <LightbulbOutlinedIcon />,
        accentColor: "#6366f1",
        body: "We looked at a few different studies to replicate, but landed on the Zikmund Fisher study, as it uses reference range number lines and focuses on the health industry.",
        highlights: ["Zikmund-Fisher et al.", "Reference Range Number Lines", "DSL Validation"],
        details: [
            {
                title: "Why this paper matters",
                content: (
                    <ExpandableTextSection
                        previewText={"Electronic health records commonly display laboratory results in table format. However, number line designs have the potential to improve understanding. Zikmund-FIsher et al. tested this hypothesis by surveying 1620 adults about various visual displays of laboratory test results. Each participant was shown one of four visualization formats: standard table format, a 2-color number line, a number line with diagnostic categories coded with colored blocks, and a number line with a color gradient."}

                        expandedText={"The study recorded how these formats influenced urgency with consideration for individual difference measures of participants including numeracy, health literacy, and graph literacy. The results of this study support that the number line display impacts urgency and desire to contact health care providers for near-normal test results, but not for extreme values. Of all the display types and individual difference measures, gradient line displays caused the greatest sensitivity to changes in test results. This study supports the usefulness of number line visualizations for increasing meaningfulness of test results.\n"}
                    />
                )
            },
            {
                title: "Why this study is relevant to our project",
                content: (
                    <Typography>
                        By replicating the methodology of the Zikmund-Fisher study, we can validate our DSL and the resulting RRNL visualizations. This case study highlights existing research into RRNLs and includes a wide range of RRNL variations, allowing us to identify any limitations of our DSL.
                    </Typography>
                )
            }
        ]
    },
    {
        id: "design",
        phase: "Phase 2",
        title: "Study Design",
        subtitle: "Building a rigorous experiment",
        icon: <ScienceOutlinedIcon />,
        accentColor: "#8b5cf6",
        body: "We recreated the RRNL conditions using our DSL and reproduced the table condition separately using D3.",
        highlights: ["4 Visualization Conditions", "3 Lab Tests", "Between-Subjects Design"],
        detail: (
            <Stack spacing={2}>
                <Typography>
                    Each condition included the same six underlying lab-result scenarios: platelet count,
                    ALT, and creatinine, each shown once slightly outside the standard range and once
                    further outside it. The visualization style changed by condition, while the medical
                    scenarios stayed consistent.
                </Typography>

                <Typography>
                    The example cards below are included to show that process in practice. Rather than
                    displaying every stimulus, we surface a small sample across the study’s formats so
                    visitors can quickly compare how the same general experimental structure was expressed
                    as a simple line, gradient RRNL, block RRNL, and table.
                </Typography>
            </Stack>
        ),
        afterDetail: (
            <Stack spacing={2.5}>
                <D3GraphCardGrid
                    showTitles={true}
                    cols={3}
                    previewHeight={120}
                    graphIds={["alt-simple", "creatinine-gradient", "platelet-block", "platelet-table"]}
                />

                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "48rem" }}>
                    Participants saw six graphs total within a single visualization condition. For each
                    graph, they answered the same response questions, followed later by preference,
                    demographic, numeracy, literacy, and familiarity sections.
                </Typography>

                <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={600}>Questions participants were asked</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1.5}>

                            <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography fontWeight={500}>1. Per-graph response questions</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            These were asked after each of the six graph stimuli.
                                        </Typography>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Alarming question</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack spacing={1}>
                                                    <Typography>
                                                        “How alarming does this result feel to you?”
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        6-point scale: Not at all alarming → Very alarming
                                                    </Typography>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Urgency question</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack spacing={1}>
                                                    <Typography>
                                                        “How urgent of an issue is this result?”
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        6-point scale: Not at all urgent → Very urgent
                                                    </Typography>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Behavior / action question</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack spacing={1}>
                                                    <Typography>
                                                        “Which of the following best describes what you would do in response to your [test] result?”
                                                    </Typography>
                                                    <List dense sx={{ py: 0 }}>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Nothing" />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Talk to your doctor about this test result at your next regular appointment" />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Ask to see your doctor at the first available appointment" />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Go to a hospital or your doctor’s office tomorrow" />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Go to a hospital as soon as you can get free later today" />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0 }}>
                                                            <ListItemText primary="Go to a hospital immediately" />
                                                        </ListItem>
                                                    </List>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography fontWeight={500}>2. Post-study preference questions</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={1.5}>
                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Descriptiveness</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    “In your opinion, how well did these images describe the test results?”
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    5-point scale: Not well at all → Extremely well
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Helpfulness</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    “How helpful were these images in helping you to understand the test results?”
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    5-point scale: Not helpful at all → Extremely helpful
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Would want this format in real life</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    “If you were receiving laboratory test results in real life, would you like to see the test results presented using this type of image?”
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    5-point scale: Definitely no → Definitely yes
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Trust</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    “How much would you trust what these images are telling you about your health?”
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    5-point scale: Do not trust at all → Trust completely
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography fontWeight={500}>3. Demographics</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={1}>
                                        <Typography>Please enter your age.</Typography>
                                        <Typography>Please select your gender.</Typography>
                                        <Typography>Please select your ethnicity.</Typography>
                                        <Typography>Please select your race(s).</Typography>
                                        <Typography>Please select your highest completed level of education.</Typography>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography fontWeight={500}>4. Individual difference measures</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={1.25}>
                                        <Typography>
                                            Participants also completed three established measure sections:
                                        </Typography>
                                        <List dense sx={{ py: 0 }}>
                                            <ListItem sx={{ py: 0 }}>
                                                <ListItemText primary="Subjective Numeracy Scale" />
                                            </ListItem>
                                            <ListItem sx={{ py: 0 }}>
                                                <ListItemText primary="Chew’s health literacy screening questions" />
                                            </ListItem>
                                            <ListItem sx={{ py: 0 }}>
                                                <ListItemText primary="Graph literacy items Q5–Q9, Q11, and Q13" />
                                            </ListItem>
                                        </List>

                                        <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent" }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={500}>Familiarity question</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    “How familiar are you with the medical test results like the ones discussed in the survey?”
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    5-point scale: Not at all familiar → Extremely familiar
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        )
    },
    {
        id: "platform",
        phase: "Phase 3",
        title: "Platform Development",
        subtitle: "Creating the testing environment",
        icon: <BuildOutlinedIcon />,
        accentColor: "#ec4899",
        body: "We used ReVISit.dev to host the study, embedding our replicated HTML visualizations directly into the survey flow. REVISIT handled condition assignment, response logging, and timing automatically, letting us focus on replicating the original study structure as closely as possible.",
        highlights: ["REVISIT.dev", "Four Between-Subjects Conditions", "Automated Response Logging"],
        detail:
            "Each participant was assigned to one of four visualization conditions — simple, gradient, block, or table — and shown six graphs total. REVISIT recorded every response and timestamp, giving us clean, structured data to work with immediately after the study closed.",
    },
    {
        id: "collection",
        phase: "Phase 4",
        title: "Data Collection",
        subtitle: "Running the study",
        icon: <DatasetOutlinedIcon />,
        accentColor: "#f59e0b",
        body: "We started with a small-scale pilot involving family, friends, and classmates, before moving on to a pilot on Prolific that involved 5 participants. After validating and analyzing the data, we launched the full study on Prolific, which involved 123 participants.",
        highlights: ["~30 per Condition", "Prolific Platform", "Latin Square Assignment"],
        details: [
            {
                title: "Small-scale study",
                content: (
                    <Stack>
                        <Typography>To begin, we sent our survey to family, friends, and classmates. This allowed us to:
                        </Typography>
                        <List>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24, fontSize: 30 }}>
                                    •
                                </ListItemIcon>
                                <ListItemText primary={"Get technical feedback on the site hosting the survey"} />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24, fontSize: 30 }}>
                                    •
                                </ListItemIcon>
                                <ListItemText primary={"Ensure that there are no major bugs or problems that prevent people from properly completing the survey"} />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24, fontSize: 30 }}>
                                    •
                                </ListItemIcon>
                                <ListItemText primary={"Verify that results looked accurate to the original study so that we can properly replicate it"} />
                            </ListItem>
                        </List>
                    </Stack>
                )
            },
            {
                title: "Prolific pilot study",
                content: (
                    <Stack>
                        <Stack spacing={1.5}>
                            <Typography>
                                After we made revisions based on the feedback from the small-scale study and felt confident in the next step, we uploaded the survey information to Prolific and recruited five anonymous participants.
                            </Typography>
                            <Typography>
                                Using the participant data, we validated, manipulated, and analyzed the results (see the following phases for more details).
                            </Typography>
                            <Typography>
                                Major differences between the pilot study and final study:
                            </Typography>
                        </Stack>
                        <List>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24, fontSize: 30 }}>
                                    •
                                </ListItemIcon>
                                <ListItemText primary={"Not nearly as much of a sample size."} />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24, fontSize: 30 }}>
                                    •
                                </ListItemIcon>
                                <ListItemText primary={"Pilot study used to validate setup before full deployment"} />
                            </ListItem>
                        </List>
                    </Stack>
                )
            },
            {
                title: "Prolific full study",
                content: (
                    <Stack>
                        <Stack spacing={1.5}>
                            <Typography>
                                After we felt comfortable with our small-scale results and analysis, we launched the full study, consisting of 123 participants, on Prolific. This number allowed us to have approximately thirty participants per condition (block, simple, gradient, and table).
                            </Typography>
                            <Typography>
                                When we started the study, we were using simple randomization for assigning each participant with a condition. However, we realized that this may cause a problem where one condition has way more participants than another group. To solve that, we researched and found the LatinSquare option with Revisit, which checks against existing participants to determine which bucket to assign a new participant to.
                            </Typography>
                        </Stack>
                    </Stack>
                )
            }
        ]
    },
    {
        id: "validation",
        phase: "Phase 5",
        title: "Validation",
        subtitle: "Filtering the participants and confirming valid results",
        icon: <FactCheckOutlinedIcon />,
        accentColor: "#22c55e",
        body: "Before analyzing results, we filtered out participants whose data could not be considered valid. This ensured that only complete, trustworthy responses contributed to the analysis.",
        highlights: ["Prolific ID Check", "Age Verification", "Critical Trial Coverage"],
        detail: (
            <>
                <Typography>
                    We applied three exclusion criteria. First, we removed participants with a missing or invalid Prolific ID. Second, we excluded anyone under 18 — although Prolific enforces this, we verified it against the age entered in the survey itself. Finally, we removed any participant missing at least one response for each of the critical trial categories.
                </Typography>
                <PythonCodeViewer
                    mode={"compact"}
                    code={"critical_categories = {\n" +
                        "   'Platelet', \n" +
                        "   'ALT',\n" +
                        "   'Creatinine',\n" +
                        "   'subjective-numeracy-scale',\n" +
                        "   'chews-screening-question',\n" +
                        "   'familiarity-question',\n" +
                        "   '$graph-literacy-scale',\n" +
                        "}"}
                />
            </>
        ),
    },
    {
        id: "feature-engineering",
        phase: "Phase 6",
        title: "Feature Engineering & Data Manipulation",
        subtitle: "Preparing the data for analysis",
        icon: <InsightsOutlinedIcon />,
        accentColor: "#06b6d4",
        highlights: ["Perceived Urgency Score", "Urgency Difference Score", "Behavioral Recoding"],
        body: (
            <Stack spacing={2}>
                <Typography>
                    Raw survey responses were collected at the level of individual questions and trials. To enable meaningful analysis, we transformed this data into structured participant-level features aligned with the goals of the study.
                </Typography>

                <Typography>
                    These transformations focused on combining related responses, quantifying sensitivity to abnormal results, and standardizing behavioral outcomes.
                </Typography>
            </Stack>
        ),
        details: [
            {
                title: "Combining responses into perceived urgency",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            Each graph produced two related responses:
                        </Typography>

                        <List dense>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Alarming score" />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Urgency score" />
                            </ListItem>
                        </List>

                        <Typography>
                            These were averaged to create a single <b>perceived urgency</b> metric for each trial.
                        </Typography>

                        <PythonCodeViewer
                            mode="compact"
                            code={`combined = pd.DataFrame({'alarming': alarming_vals, 'urgent': urgent_vals})
combined[f'{trial}_urgency'] = combined.mean(axis=1)`}
                        />
                    </Stack>
                )
            },
            {
                title: "Capturing sensitivity to abnormal values",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            Each test appeared in two conditions: slightly abnormal and further abnormal.
                        </Typography>

                        <Typography>
                            We computed a difference score:
                        </Typography>

                        <Typography sx={{ fontStyle: "italic" }}>
                            urgency_diff = further − slightly
                        </Typography>

                        <Typography>
                            This represents how strongly participants reacted to increasing severity.
                        </Typography>

                        <PythonCodeViewer
                            mode="compact"
                            code={`result[diff_col] = result[further_col] - result[slightly_col]`}
                        />
                    </Stack>
                )
            },
            {
                title: "Standardizing behavioral responses",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            Action responses were recoded into two categories to simplify analysis:
                        </Typography>

                        <List dense>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Willingness to wait" />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Immediate action" />
                            </ListItem>
                        </List>

    {/*                    <PythonCodeViewer*/}
    {/*                        mode="compact"*/}
    {/*                        code={`def recode_intention(ans):*/}
    {/*if ans in willingness_to_wait:*/}
    {/*    return "Willingness to wait"*/}
    {/*elif ans in immediate_action:*/}
    {/*    return "Immediate action"`}*/}
    {/*                    />*/}
                    </Stack>
                )
            },
            {
                title: "Constructing participant-level variables",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            We aggregated responses across sections to create participant-level predictors:
                        </Typography>

                        <List dense>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Subjective numeracy (mean score)" />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Graph literacy (correct answers)" />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Health literacy" />
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemText primary="Familiarity with test results" />
                            </ListItem>
                        </List>

                        <Typography>
                            These variables were summarized to describe the study population and provide context for interpreting the results.
                        </Typography>
                    </Stack>
                )
            }
        ]
    },
    {
        id: "analysis",
        phase: "Phase 7",
        title: "Statistical Analysis",
        subtitle: "Evaluating the impact of visualization design",
        icon: <InsightsOutlinedIcon />,
        accentColor: "#06b6d4",
        highlights: ["Summary Statistics", "Violin Plots", "Behavioral Analysis"],
        body: (
            <Stack spacing={2}>
                <Typography>
                    After preparing the data, we used summary statistics and distribution
                    visualizations to evaluate how visualization format influenced participant interpretation.
                </Typography>

                <Typography>
                    This phase focused on comparing perceived urgency and urgency difference scores
                    across display formats to determine how effectively each format conveyed severity.
                </Typography>
            </Stack>
        ),
        details: [
            {
                title: "Participant overview",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            We summarized participant demographics and individual-difference
                            measures, including age, education, health literacy, subjective numeracy,
                            graphical literacy, and familiarity with medical tests.
                        </Typography>

                        <Typography>
                            These measures provide context for the study population but were not used
                            directly in statistical modeling.
                        </Typography>
                    </Stack>
                ),
                afterCard: (
                    <ImageModal
                        src="/statistical-analysis/TABLE1.png"
                        alt="Table 1..."
                        label="Table 1: Demographic and Literacy Summary"
                    />
                )
            },
            {
                title: "Condition-level summary statistics",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            We computed means and standard deviations for perceived urgency
                            and urgency difference scores across each visualization format and test type.
                        </Typography>

                        <Typography>
                            These summaries allowed us to compare how strongly each format
                            distinguished between near-normal and extreme values.
                        </Typography>

{/*                        <PythonCodeViewer*/}
{/*                            mode="compact"*/}
{/*                            code={`summary = (*/}
{/*    df.groupby(['test_type', 'display_format'])*/}
{/*      .agg(*/}
{/*          urgency_mean=('urgency', 'mean'),*/}
{/*          diff_mean=('urgency_diff', 'mean')*/}
{/*      )*/}
{/*)`}*/}
{/*                        />*/}
                    </Stack>
                ),
                afterCard: (
                    <ImageModal
                        src="/statistical-analysis/TABLE2.png"
                        alt="Table 2..."
                        label="Table 2: Urgency Scores by Format"
                    />
                )
            },
            {
                title: "Distribution analysis with violin plots",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            To examine how responses varied across participants, we visualized
                            urgency difference scores using violin plots.
                        </Typography>

                        <Typography>
                            These plots show the spread and concentration of responses,
                            highlighting how consistently each format conveyed changes in severity.
                        </Typography>

{/*                        <PythonCodeViewer*/}
{/*                            mode="compact"*/}
{/*                            code={`sns.violinplot(*/}
{/*    data=df,*/}
{/*    x='display_format',*/}
{/*    y='urgency_diff'*/}
{/*)`}*/}
{/*                        />*/}
                    </Stack>
                ),
                afterCard: (
                    <ImageModal
                        src="/statistical-analysis/Replicated_Violin_plots.png"
                        alt="Violin plots of urgency difference scores by display format"
                        label="Figure 1: Urgency Difference Score Distributions"
                    />
                )
            },
            {
                title: "Behavioral response analysis",
                content: (
                    <Stack spacing={1.5}>
                        <Typography>
                            We analyzed participants’ reported actions by grouping responses
                            into two categories: willingness to wait and immediate action.
                        </Typography>

                        <Typography>
                            This allowed us to summarize behavioral responses alongside urgency measures.
                        </Typography>

    {/*                    <PythonCodeViewer*/}
    {/*                        mode="compact"*/}
    {/*                        code={`def recode(ans):*/}
    {/*if ans in wait:*/}
    {/*    return "Wait"*/}
    {/*else:*/}
    {/*    return "Immediate"`}*/}
    {/*                    />*/}
                    </Stack>
                )
            }
        ]
    },
    {
        id: "findings",
        phase: "Phase 8",
        title: "Findings & Impact",
        subtitle: "What we learned",
        icon: <RocketLaunchOutlinedIcon />,
        accentColor: "#1976d2",
        body: "Visualizations generated using our DSL pipeline as the original study, showing that RRNL formats help users better distinguish severity than tables.",
        highlights: ["Format Comparisons", "Urgency Sensitivity", "Individual Differences"],
        detail:
            "Our results closely matched the patterns found in the original Zikmund-Fisher study. Participants were better able to distinguish between near-normal and more severe values when using RRNL formats compared to tables, and this difference was reflected in higher urgency difference scores and fewer zero-difference responses. Because these effects were observed using visual stimuli based on our DSL-generated RRNLs, this suggests our approach can reproduce the key interpretive behaviors seen in prior research..",
    },
];

function renderBodyContent(content: React.ReactNode) {
    if (typeof content === "string") {
        return (
            <Typography variant="body1" sx={{ lineHeight: 1.85, mb: 3, maxWidth: "48rem" }}>
                {content}
            </Typography>
        );
    }

    return <Box sx={{ mb: 3, maxWidth: "48rem" }}>{content}</Box>;
}

function renderDetailContent(content: React.ReactNode) {
    if (typeof content === "string") {
        return (
            <Typography variant="body2" sx={{ lineHeight: 1.75, color: "text.secondary" }}>
                {content}
            </Typography>
        );
    }

    return content;
}

function getDetailBlocks(step: JourneyStep): DetailBlock[] {
    const legacyDetail = step.detail ? [{ content: step.detail }] : [];
    return [...legacyDetail, ...(step.details ?? [])];
}

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
`;

// ─── Scroll-spy hook ─────────────────────────────────────────────────────────

function useScrollSpy(
    ids: string[],
    onSectionChange: (id: string) => void,
    offset = 140,
): (id: string) => void {
    // Holds the ID we explicitly navigated to. While set, the spy does not
    // call onSectionChange — it just waits until the natural scroll position
    // catches up to the target, then clears itself and resumes normally.
    const pendingRef = React.useRef<string | null>(null);

    const lock = React.useCallback((id: string) => {
        pendingRef.current = id;
    }, []);

    React.useEffect(() => {
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (sections.length === 0) return;

        const updateActiveSection = () => {
            const atBottom =
                window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

            let naturalId = ids[0];

            if (atBottom) {
                naturalId = ids[ids.length - 1];
            } else {
                const scrollPosition = window.scrollY + offset + window.innerHeight * 0.18;
                sections.forEach((section) => {
                    if (section.offsetTop <= scrollPosition) naturalId = section.id;
                });
            }

            // While a click-navigation is pending, hold off on updating until
            // the scroll position has actually reached the target section.
            if (pendingRef.current !== null) {
                if (naturalId === pendingRef.current) {
                    pendingRef.current = null;
                    onSectionChange(naturalId);
                }
                return;
            }

            onSectionChange(naturalId);
        };

        updateActiveSection();

        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [ids, offset, onSectionChange]);

    return lock;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
    const theme = useTheme();

    return (
        <Box
            component="nav"
            aria-label="Journey phases"
            sx={{
                position: "sticky",
                top: 100,
                alignSelf: "flex-start",
                display: { xs: "none", md: "block" },
                pr: 3,
            }}
        >
            {/* Vertical connector line behind all nodes */}
            <Box
                sx={{
                    position: "absolute",
                    left: 11,
                    top: 12,
                    bottom: 12,
                    width: 2,
                    bgcolor: alpha(theme.palette.divider, 0.4),
                    borderRadius: 1,
                }}
            />

            <Stack spacing={0}>
                {STEPS.map((step, i) => {
                    const isActive = step.id === activeId;
                    const isPast =
                        STEPS.findIndex((s) => s.id === activeId) > i;

                    return (
                        <Box
                            key={step.id}
                            component="button"
                            type="button"
                            onClick={() => onNavigate(step.id)}
                            aria-current={isActive ? "true" : undefined}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1.5,
                                py: 1.5,
                                pl: 0,
                                cursor: "pointer",
                                position: "relative",
                                width: "100%",
                                textAlign: "left",
                                background: "transparent",
                                border: 0,
                                "&:hover .sidebar-title": {
                                    color: step.accentColor,
                                },
                            }}
                        >
                            {/* Node dot */}
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    flexShrink: 0,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: isActive
                                        ? step.accentColor
                                        : isPast
                                          ? alpha(step.accentColor, 0.2)
                                          : "background.paper",
                                    border: `2px solid ${
                                        isActive
                                            ? step.accentColor
                                            : isPast
                                              ? alpha(step.accentColor, 0.4)
                                              : theme.palette.divider
                                    }`,
                                    transition: "all 0.3s ease",
                                    zIndex: 1,
                                    boxShadow: isActive
                                        ? `0 0 0 4px ${alpha(step.accentColor, 0.15)}`
                                        : "none",
                                }}
                            >
                                {isActive && (
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            bgcolor: "#fff",
                                        }}
                                    />
                                )}
                                {isPast && !isActive && (
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            bgcolor: alpha(step.accentColor, 0.6),
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Text */}
                            <Box sx={{ pt: "2px" }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 700,
                                        letterSpacing: 1,
                                        textTransform: "uppercase",
                                        fontSize: "0.65rem",
                                        color: isActive
                                            ? step.accentColor
                                            : "text.disabled",
                                        transition: "color 0.3s ease",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {step.phase}
                                </Typography>
                                <Typography
                                    className="sidebar-title"
                                    sx={{
                                        fontWeight: isActive ? 700 : 500,
                                        fontSize: "0.85rem",
                                        color: isActive
                                            ? "text.primary"
                                            : "text.secondary",
                                        transition: "all 0.3s ease",
                                        lineHeight: 1.35,
                                    }}
                                >
                                    {step.title}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}

// ─── Mobile navigation (top, horizontal) ─────────────────────────────────────

function MobileNav({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll active chip into view
    React.useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const activeChip = container.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
        if (activeChip) {
            activeChip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, [activeId]);

    return (
        <Box
            sx={{
                display: { xs: "block", md: "none" },
                position: "sticky",
                top: 0,
                zIndex: 10,
                bgcolor: alpha("#fafafc", 0.88),
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid",
                borderColor: "divider",
                mx: { xs: -2, sm: -3 },
                px: { xs: 2, sm: 3 },
                py: 1.5,
                mb: 3,
            }}
        >
            <Stack
                ref={scrollRef}
                direction="row"
                spacing={1}
                sx={{
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {STEPS.map((step) => {
                    const isActive = step.id === activeId;
                    return (
                        <Chip
                            key={step.id}
                            data-id={step.id}
                            label={step.title}
                            size="small"
                            onClick={() => onNavigate(step.id)}
                            sx={{
                                flexShrink: 0,
                                fontWeight: isActive ? 700 : 500,
                                fontSize: "0.75rem",
                                bgcolor: isActive
                                    ? alpha(step.accentColor, 0.12)
                                    : "transparent",
                                color: isActive ? step.accentColor : "text.secondary",
                                border: "1px solid",
                                borderColor: isActive
                                    ? alpha(step.accentColor, 0.3)
                                    : "divider",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    bgcolor: alpha(step.accentColor, 0.08),
                                },
                            }}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}

// ─── Content section ─────────────────────────────────────────────────────────

function ContentSection({ step }: { step: JourneyStep }) {
    return (
        <Box
            id={step.id}
            sx={{
                scrollMarginTop: 100,
                mb: { xs: 8, md: 10 },
                animation: `${fadeInUp} 0.5s ease both`,
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    pl: { xs: 2.5, sm: 3.5, md: 4 },
                }}
            >
                {/* Left accent bar */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: 4,
                        background: `linear-gradient(to bottom, ${step.accentColor}, ${alpha(step.accentColor, 0.2)})`,
                        borderRadius: 999,
                    }}
                />

                {/* Phase + icon header */}
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: alpha(step.accentColor, 0.1),
                            color: step.accentColor,
                            flexShrink: 0,
                        }}
                    >
                        {step.icon}
                    </Box>
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{
                                letterSpacing: 1.5,
                                fontWeight: 700,
                                color: step.accentColor,
                                lineHeight: 1.4,
                            }}
                        >
                            {step.phase}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                            {step.title}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="text.secondary">
                            {step.subtitle}
                        </Typography>
                    </Box>
                </Stack>

                {/* Body */}
                {renderBodyContent(step.body)}

                {/* Highlight chips */}
                {step.highlights && (
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2.5 }}>
                        {step.highlights.map((h) => (
                            <Chip
                                key={h}
                                label={h}
                                size="small"
                                sx={{
                                    bgcolor: alpha(step.accentColor, 0.08),
                                    color: step.accentColor,
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    borderRadius: "999px",
                                }}
                            />
                        ))}
                    </Stack>
                )}

                {/* Detail callouts */}
                {getDetailBlocks(step).length > 0 && (
                    <Stack spacing={2.5} sx={{ maxWidth: "48rem" }}>
                        {getDetailBlocks(step).map((detailBlock, index) => (
                            <Stack key={index} spacing={2}>
                                <Box
                                    sx={{
                                        p: { xs: 2, sm: 2.5 },
                                        borderRadius: 3,
                                        bgcolor: alpha(step.accentColor, 0.04),
                                        borderLeft: `4px solid ${alpha(step.accentColor, 0.35)}`,
                                    }}
                                >
                                    {detailBlock.title && (
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                display: "block",
                                                mb: 1,
                                                letterSpacing: 1.2,
                                                fontWeight: 700,
                                                color: step.accentColor,
                                            }}
                                        >
                                            {detailBlock.title}
                                        </Typography>
                                    )}
                                    {renderDetailContent(detailBlock.content)}
                                </Box>

                                {detailBlock.afterCard && <Box>{detailBlock.afterCard}</Box>}
                            </Stack>
                        ))}
                    </Stack>
                )}

                {step.afterDetail && (
                    <Box sx={{ mt: 3, maxWidth: "48rem" }}>
                        {step.afterDetail}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const STEP_IDS = STEPS.map((s) => s.id);

export default function CaseStudyPage() {
    const [activeId, setActiveId] = React.useState(STEP_IDS[0]);

    const lockScrollSpy = useScrollSpy(STEP_IDS, setActiveId);

    function handleNavigate(id: string) {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 110;
            setActiveId(id);
            lockScrollSpy(id);
            window.scrollTo({ top, behavior: "smooth" });
        }
    }

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: "md", mx: "auto", mb: 6 }}>
                    <PageHeader
                        eyebrowLabel="ZIKMUND FISHER REPLICATED STUDY"
                        mainHeader="Case Study"
                        subheader="Follow our research process from initial discovery through final findings — step by step."
                    />
                </Box>

                {/* Mobile navigation */}
                <MobileNav activeId={activeId} onNavigate={handleNavigate} />

                {/* Two-column layout: sidebar + content */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
                        gap: { xs: 0, md: 5 },
                    }}
                >
                    <Sidebar activeId={activeId} onNavigate={handleNavigate} />

                    <Box>
                        {STEPS.map((step) => (
                            <ContentSection key={step.id} step={step} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
