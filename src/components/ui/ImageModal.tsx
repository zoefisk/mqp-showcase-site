"use client";

import * as React from "react";
import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
    src: string;
    alt: string;
    label?: string;
};

export default function ImageModal({ src, alt, label }: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {/* Button instead of image preview */}
            <Box
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") setOpen(true);
                }}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                        borderColor: "text.primary",
                        bgcolor: "action.hover",
                    },
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <OpenInFullIcon fontSize="small" />
                    <Typography fontWeight={600} fontSize="0.9rem">
                        {label || "View Image"}
                    </Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    Click to expand (scroll to view full image)
                </Typography>
            </Box>

            {/* Modal */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent
                    sx={{
                        p: 0,
                        position: "relative",
                        maxHeight: "85vh",
                        overflowY: "auto",
                    }}
                >
                    {/* Close button */}
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "fixed",
                            top: 16,
                            right: 16,
                            zIndex: 10,
                            bgcolor: "rgba(0,0,0,0.5)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Scroll hint (top) */}
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 5,
                            textAlign: "center",
                            py: 1,
                            bgcolor: "background.paper",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <Typography variant="caption">
                                Scroll to explore full image
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Image */}
                    <Box
                        component="img"
                        src={src}
                        alt={alt}
                        sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />

                    {/* Bottom fade hint */}
                    <Box
                        sx={{
                            position: "sticky",
                            bottom: 0,
                            height: 40,
                            background:
                                "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
                            pointerEvents: "none",
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
