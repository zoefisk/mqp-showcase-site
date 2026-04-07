"use client";

import * as React from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";

type ExpandableTextSectionProps = {
    previewText: string;
    expandedText: string;
};

export default function ExpandableTextSection({
    previewText,
    expandedText,
}: ExpandableTextSectionProps) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Box>
            <Typography>
                {previewText}
            </Typography>

            <Collapse in={expanded}>
                <Typography sx={{ mt: 2 }}>
                    {expandedText}
                </Typography>
            </Collapse>

            <Button
                onClick={() => setExpanded((prev) => !prev)}
                sx={{ mt: 2, px: 0, minWidth: 0 }}
            >
                {expanded ? "Show less" : "Read more..."}
            </Button>
        </Box>
    );
}
