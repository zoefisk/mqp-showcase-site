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
                pl: {
                    xs: 0,
                    md: "320px",
                    lg: "340px",
                },
            }}
        >
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
    );
}
