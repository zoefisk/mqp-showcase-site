"use client";

import * as React from "react";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import Graph from "@/components/showcase/Graph";


export default function ProjectShowcasePage() {


    const exampleCode = `
        const data = [1, 2, 3, 4];
        
        renderChart({
          type: "line",
          data,
        });
        `;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 6, sm: 10 } }}>
            <Container maxWidth="md">
                <Stack spacing={3} alignItems="center" mb={6}>
                    <Typography variant="h3" fontWeight={700}>
                        Project Showcase
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                        Explore the highlights of this project.
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                </Stack>

                <Graph
                    title="Line Chart Example"
                    description="Description"
                    imageSrc="/placeholder-graph.png"
                    code={exampleCode}
                />
            </Container>
        </Box>
    );
}
