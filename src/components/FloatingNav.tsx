"use client";

import * as React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItem = {
    label: string;
    href: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: "About", href: "/" },
    { label: "Project Showcase", href: "/project-showcase" },
    { label: "Case Study", href: "/case-study" },
    { label: "Graph Editor", href: "/graph-editor" },
    { label: "Meet the Team", href: "/meet-the-team" },
    { label: "View the Report", href: "/report" },
];

export default function FloatingNav() {
    const pathname = usePathname();

    return (
        <Box
            sx={{
                position: "fixed",
                top: "30%",
                left: 24,
                transform: "translateY(-50%)",
                zIndex: 1200,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <a href="https://www.wpi.edu/" style={{display: "block"}} target="_blank" rel="noopener noreferrer">
                    <img
                        src="/WPI.png"
                        alt="WPI Logo"
                        style={{
                            display: "block",
                            width: "80px",
                            height: "auto",
                        }}
                    />
                </a>
                <Typography variant="h6" fontWeight={600} sx={{marginLeft: "8px"}}>
                    Data Visualization MQP
                </Typography>
            </Box>
            <Stack spacing={2}>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Button
                            key={item.href}
                            component={Link}
                            href={item.href}
                            variant={isActive ? "contained" : "outlined"}
                            color="primary"
                            sx={{
                                borderRadius: "999px",
                                px: 3,
                                py: 1.25,
                                textTransform: "none",
                                fontWeight: 600,
                                minWidth: 180,
                                backdropFilter: "blur(8px)",
                                backgroundColor: isActive
                                    ? "primary.main"
                                    : "background.paper",
                                boxShadow: isActive
                                    ? "0 8px 24px rgba(0,0,0,0.25)"
                                    : "0 6px 18px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    transform: "translateX(4px)",
                                    boxShadow: "0 10px 28px rgba(0,0,0,0.3)",
                                },
                                transition: "all 0.25s ease",
                            }}
                        >
                            {item.label}
                        </Button>
                    );
                })}
            </Stack>
        </Box>
    );
}
