import { Divider, Stack, Typography } from "@mui/material";
import * as React from "react";

interface PageHeaderProps {
    eyebrowLabel?: string;
    mainHeader: string;
    subheader?: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    eyebrowLabel,
    mainHeader,
    subheader,
    children,
}) => {
    return (
        <Stack spacing={3} alignItems="center" mb={6}>
            {/* subtle eyebrow label */}
            <Typography
                variant="overline"
                sx={{
                    letterSpacing: 2,
                    fontWeight: 700,
                    color: "primary.main",
                }}
            >
                {eyebrowLabel}
            </Typography>
            <Typography variant="h3" fontWeight={700}>
                {mainHeader}
            </Typography>
            <Typography color="text.secondary" textAlign="center">
                {subheader}
            </Typography>
            {children}
            <Divider sx={{ width: "100%" }} />
        </Stack>
    );
};

export default PageHeader;
