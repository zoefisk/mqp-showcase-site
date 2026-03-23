"use client";

import * as React from "react";
import { Stack } from "@mui/material";
import SidebarAccordionSkeleton from "./SidebarAccordionSkeleton";

type Item = {
    titleWidth?: number | string;
    rows?: number;
};

type Props = {
    items: Item[];
};

export default function SidebarGroupSkeleton({ items }: Props) {
    return (
        <Stack spacing={2}>
            {items.map((item, index) => (
                <SidebarAccordionSkeleton
                    key={index}
                    titleWidth={item.titleWidth}
                    rows={item.rows}
                />
            ))}
        </Stack>
    );
}
