import * as React from "react";
import {Box, Container, Typography} from "@mui/material";

import PageHeaderContent from "@/content/case-study/PageHeader.mdx";
import StudySnapshotContent from "@/content/case-study/StudySnapshot.mdx";
import ProjectConnectionContent from "@/content/case-study/ProjectConnection.mdx";
import StudyQuestionsContent from "@/content/case-study/StudyQuestions.mdx";
import SpecificationPreviewContent from "@/content/case-study/SpecificationPreview.mdx";
import PythonCodeViewer from "@/components/ui/PythonCodeViewer";
import InlineCode from "@/components/ui/InlineCode";

export default function CaseStudyPage() {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                py: { xs: 6, sm: 10 },
            }}
        >
            <Container maxWidth="md">
                <PageHeaderContent />
                <StudySnapshotContent />
                <ProjectConnectionContent />
                <StudyQuestionsContent />
                <SpecificationPreviewContent />

                <PythonCodeViewer
                    src="/python/case-study/featureEngineering.py"
                    label="Feature Engineering"
                    filename="featureEngineering.py"
                    defaultSoftWrap={true}
                />

                {/*<Typography>*/}
                {/*    Use <InlineCode>process_data(df, threshold=0.5)</InlineCode> to begin.*/}
                {/*</Typography>*/}


            </Container>
        </Box>
    );
}
