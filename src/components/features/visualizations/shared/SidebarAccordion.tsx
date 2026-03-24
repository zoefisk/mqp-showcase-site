import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SidebarAccordion({
                              title,
                              icon,
                              children,
                          }: React.PropsWithChildren<{
    title: string;
    icon?: React.ReactNode;
}>) {

    return (
        <Accordion
            defaultExpanded={false}
            disableGutters
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "18px !important",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,1) 100%)",
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    px: 2.25,
                    py: 0.25,
                }}
            >
                <Stack direction="row" spacing={1.25} alignItems="center">
                    {icon}
                    <Typography fontWeight={700}>{title}</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2.25, pb: 2.25 }}>{children}</AccordionDetails>
        </Accordion>
    );
}
