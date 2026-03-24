import * as React from "react";

export type SharedPreviewMode = string;

export type GraphPreviewModeOption<TMode extends string = string> = {
    value: TMode;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
};

export type GraphBadge = {
    label: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
};
