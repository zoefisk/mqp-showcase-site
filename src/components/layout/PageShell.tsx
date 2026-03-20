import * as React from "react";
import { Box, Container } from "@mui/material";

type Props = {
    children: React.ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function PageShell({ children, maxWidth = "md" }: Props) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: { xs: 6, sm: 8, md: 10 },
                ml: {
                    xs: 0,
                    md: "96px",
                    lg: "104px",
                },
                pr: {
                    xs: 0,
                    md: 3,
                    lg: 4,
                },
                transition: "margin-left 0.25s ease",
            }}
        >
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
    );
}
