"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
    title?: string;
    description?: string;
    imageSrc?: string;
    code: string;
};

export default function Graph({
                                         title = "Graph Example",
                                         description = "No description provided.",
                                         imageSrc = "/placeholder-graph.png",
                                         code,
                                     }: Props) {
    const [tab, setTab] = React.useState(0);
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardHeader
                title={title}
                subheader={description}
                titleTypographyProps={{ fontWeight: 700 }}
                action={
                    tab === 1 && (
                        <Tooltip title={copied ? "Copied!" : "Copy code"}>
                            <IconButton onClick={handleCopy} size="small">
                                {copied ? (
                                    <CheckIcon fontSize="small" color="success" />
                                ) : (
                                    <ContentCopyIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>
                    )
                }
            />

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{ px: 2 }}
            >
                <Tab label="Graph" />
                <Tab label="Code" />
            </Tabs>

            <CardContent sx={{ flexGrow: 1 }}>
                {tab === 0 && (
                    <Box
                        sx={{
                            width: "100%",
                            height: 320,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.50",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Box
                            component="img"
                            src={imageSrc}
                            alt="Graph preview"
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                )}

                {tab === 1 && (
                    <Box
                        sx={{
                            height: 320,
                            overflow: "auto",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "#0f172a",
                            color: "#e5e7eb",
                            fontFamily:
                                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            fontSize: 13,
                            p: 2,
                        }}
                    >
                        <Typography
                            component="pre"
                            sx={{
                                m: 0,
                                whiteSpace: "pre",
                            }}
                        >
                            {code}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
