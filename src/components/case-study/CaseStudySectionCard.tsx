import * as React from "react";
import { Paper, SxProps, Theme } from "@mui/material";

type CaseStudySectionCardProps = {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

export default function CaseStudySectionCard({
                                                 children,
                                                 sx,
                                             }: CaseStudySectionCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 4,
                mb: 8,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                ...sx,
            }}
        >
            {children}
        </Paper>
    );
}
