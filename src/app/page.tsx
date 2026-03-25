import * as React from "react";
import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";

import SectionTitle from "@/components/ui/SectionTitle";
import WPIContent from "@/content/about/WPI.mdx";
import QuickOverviewContent from "@/content/about/QuickOverview.mdx";
import PageHeaderContent from "@/content/about/PageHeader.mdx";
import MoreDetailsContent from "@/content/about/MoreDetails.mdx";

import Explore from "@/components/ui/Explore";
import SectionBlock from "@/components/ui/SectionBlock";

export default function Home() {
    return (
        <Box sx={{ minHeight: "100vh", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="md">
                <PageHeaderContent/>

                {/*QUICK OVERVIEW */}
                <QuickOverviewContent/>

                {/* DETAILS */}
                <MoreDetailsContent/>

                {/* EXPLORE */}
                <Explore/>

                {/* WPI */}
                <WPIContent/>
            </Container>
        </Box>
    );
}
