"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, ButtonBase, Stack, Typography, alpha, CircularProgress } from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
    { label: "About", href: "/", icon: InfoOutlinedIcon },
    { label: "Case Study", href: "/case-study", icon: FactCheckOutlinedIcon },
    { label: "Graph Editor", href: "/graph-editor", icon: InsightsOutlinedIcon },
    { label: "Meet the Team", href: "/meet-the-team", icon: Groups2OutlinedIcon },
    { label: "View the Report", href: "/report", icon: DescriptionOutlinedIcon },
];

const COLLAPSED_SIZE = 56;
const EXPANDED_WIDTH = 220;

function NavRail({ children }: React.PropsWithChildren) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: 24,
                transform: "translateY(-50%)",
                zIndex: 1200,
                width: 260,
                display: { xs: "none", md: "block" },
            }}
        >
            {children}
        </Box>
    );
}

function NavList() {
    const pathname = usePathname();

    const [loadingHref, setLoadingHref] = React.useState<string | null>(null);

    React.useEffect(() => {
        setLoadingHref(null);
    }, [pathname]);

    return (
        <Stack spacing={1.5} alignItems="flex-start">
            {NAV_ITEMS.map((item) => (
                <NavListItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    isLoading={loadingHref === item.href}
                    onNavigate={() => setLoadingHref(item.href)}
                />
            ))}
        </Stack>
    );
}

function NavListItem({
    item,
    isActive,
    isLoading,
    onNavigate,
}: {
    item: NavItem;
    isActive: boolean;
    isLoading: boolean;
    onNavigate: () => void;
}) {
    const Icon = item.icon;

    return (
        <ButtonBase
            component={Link}
            href={item.href}
            onClick={onNavigate}
            sx={(theme) => ({
                position: "relative",
                overflow: "hidden",
                justifyContent: "flex-start",
                width: COLLAPSED_SIZE,
                height: COLLAPSED_SIZE,
                borderRadius: "999px",
                px: 0,
                color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
                backgroundColor: isActive
                    ? theme.palette.primary.main
                    : alpha(theme.palette.background.paper, 0.92),
                border: "1px solid",
                borderColor: isActive
                    ? theme.palette.primary.main
                    : alpha(theme.palette.primary.main, 0.28),
                backdropFilter: "blur(10px)",
                boxShadow: isActive
                    ? "0 10px 28px rgba(25,118,210,0.28)"
                    : "0 6px 18px rgba(15,23,42,0.08)",
                transition:
                    "width 0.28s ease, background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease",
                "&:hover": {
                    width: EXPANDED_WIDTH,
                    transform: "translateX(4px)",
                    backgroundColor: isActive
                        ? theme.palette.primary.dark
                        : alpha(theme.palette.background.paper, 1),
                    borderColor: theme.palette.primary.main,
                    boxShadow: "0 10px 24px rgba(15,23,42,0.14)",
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: isActive
                        ? "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.00) 100%)"
                        : "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.00) 100%)",
                    pointerEvents: "none",
                },
                "& .nav-label": {
                    opacity: 0,
                    transform: "translateX(-6px)",
                    transition: "opacity 0.18s ease, transform 0.22s ease",
                    whiteSpace: "nowrap",
                },
                "&:hover .nav-label": {
                    opacity: 1,
                    transform: "translateX(0)",
                },
            })}
        >
            <NavIconSlot isActive={isActive}>
                {isLoading ? (
                    <CircularProgress size={18} thickness={5} color="inherit" />
                ) : (
                    <Icon fontSize="small" />
                )}
            </NavIconSlot>

            <NavLabel>{item.label}</NavLabel>
        </ButtonBase>
    );
}

function NavIconSlot({ children, isActive }: React.PropsWithChildren<{ isActive: boolean }>) {
    return (
        <Box
            sx={{
                width: COLLAPSED_SIZE,
                minWidth: COLLAPSED_SIZE,
                height: COLLAPSED_SIZE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                color: "inherit",
                "& svg": {
                    fontSize: isActive ? 22 : 21,
                },
            }}
        >
            {children}
        </Box>
    );
}

function NavLabel({ children }: React.PropsWithChildren) {
    return (
        <Box
            sx={{
                pr: 3,
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                minWidth: 0,
            }}
        >
            <Typography
                className="nav-label"
                sx={{
                    fontWeight: 700,
                    fontSize: "0.97rem",
                    letterSpacing: 0.1,
                    color: "inherit",
                }}
            >
                {children}
            </Typography>
        </Box>
    );
}

export default function FloatingNav() {
    return (
        <NavRail>
            <NavList />
        </NavRail>
    );
}
