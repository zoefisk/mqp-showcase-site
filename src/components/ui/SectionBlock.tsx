import SectionTitle from "@/components/ui/SectionTitle";
import { Paper, Stack } from "@mui/material";
import * as React from "react";

type SectionBlockProps = {
    title: string;
    mainText: React.ReactNode;
};

export default function SectionBlock({ title, mainText }: SectionBlockProps) {
    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2.5, sm: 3.5 },
                    borderRadius: 4,
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                }}
            >
                <Stack spacing={2.5}>{mainText}</Stack>
            </Paper>
        </>
    );
}
