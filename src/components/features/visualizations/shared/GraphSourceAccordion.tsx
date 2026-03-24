"use client";

import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";

type Item = {
    id: string;
    label: string;
};

type Props = {
    title?: string;
    items: Item[];
    value: string;
    onChange: (value: string) => void;
    loading?: boolean;
    disabled?: boolean;
};

export default function GraphSourceAccordion({
    title = "Graph Source",
    items,
    value,
    onChange,
    loading = false,
    disabled = false,
}: Props) {
    return (
        <Accordion
            disableGutters
            defaultExpanded={false}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
                "&:before": { display: "none" },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <SourceOutlinedIcon fontSize="small" />
                    <Typography fontWeight={700}>{title}</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails>
                {loading ? (
                    <Skeleton variant="rounded" width="100%" height={56} />
                ) : (
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel id="graph-source-select-label">Graph</InputLabel>
                        <Select
                            labelId="graph-source-select-label"
                            label="Graph"
                            value={value}
                            onChange={(e) => onChange(String(e.target.value))}
                        >
                            {items.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
