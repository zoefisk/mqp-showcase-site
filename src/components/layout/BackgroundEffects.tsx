"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const SPEED = 4;
// 1 = normal
// 0.75 = slower
// 1.25 = faster

const INTENSITY = 2;
// 0.5 = very subtle
// 1 = balanced
// 1.5 = more noticeable
// 2 = strong

const duration = (seconds: number) => `${seconds / SPEED}s`;

const createOrbitA = (i: number) => keyframes`
    0% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
    25% {
        transform: translate3d(${55 * i}px, ${-30 * i}px, 0) scale(${1 + 0.06 * i});
    }
    50% {
        transform: translate3d(${20 * i}px, ${-70 * i}px, 0) scale(${1 + 0.1 * i});
    }
    75% {
        transform: translate3d(${-40 * i}px, ${-35 * i}px, 0) scale(${1 + 0.04 * i});
    }
    100% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
`;

const createOrbitB = (i: number) => keyframes`
    0% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
    25% {
        transform: translate3d(${-45 * i}px, ${35 * i}px, 0) scale(${1 + 0.05 * i});
    }
    50% {
        transform: translate3d(${-75 * i}px, ${10 * i}px, 0) scale(${1 + 0.09 * i});
    }
    75% {
        transform: translate3d(${-20 * i}px, ${-45 * i}px, 0) scale(${1 + 0.03 * i});
    }
    100% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
`;

const createOrbitC = (i: number) => keyframes`
    0% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
    25% {
        transform: translate3d(${35 * i}px, ${45 * i}px, 0) scale(${1 + 0.04 * i});
    }
    50% {
        transform: translate3d(${70 * i}px, ${20 * i}px, 0) scale(${1 + 0.08 * i});
    }
    75% {
        transform: translate3d(${20 * i}px, ${-35 * i}px, 0) scale(${1 + 0.03 * i});
    }
    100% {
        transform: translate3d(0px, 0px, 0) scale(1);
    }
`;

const orbitA = createOrbitA(INTENSITY);
const orbitB = createOrbitB(INTENSITY);
const orbitC = createOrbitC(INTENSITY);

export default function BackgroundEffects() {
    return (
        <Box
            aria-hidden="true"
            sx={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: 0,
                background:
                    "linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(245,247,250,1) 100%)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-10%",
                    left: "-8%",
                    width: "42vw",
                    height: "42vw",
                    minWidth: 320,
                    minHeight: 320,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,
                        rgba(99,102,241,${0.12 * INTENSITY}) 0%,
                        rgba(99,102,241,${0.06 * INTENSITY}) 30%,
                        rgba(99,102,241,0) 72%)`,
                    filter: `blur(${55 * (1 + 0.15 * INTENSITY)}px)`,
                    animation: `${orbitA} ${duration(16)} ease-in-out infinite`,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "12%",
                    right: "-10%",
                    width: "38vw",
                    height: "38vw",
                    minWidth: 280,
                    minHeight: 280,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,
                        rgba(236,72,153,${0.1 * INTENSITY}) 0%,
                        rgba(236,72,153,${0.05 * INTENSITY}) 32%,
                        rgba(236,72,153,0) 74%)`,
                    filter: `blur(${60 * (1 + 0.15 * INTENSITY)}px)`,
                    animation: `${orbitB} ${duration(20)} ease-in-out infinite`,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "-12%",
                    left: "28%",
                    width: "44vw",
                    height: "44vw",
                    minWidth: 340,
                    minHeight: 340,
                    borderRadius: "50%",
                    background: `radial-gradient(circle,
                        rgba(34,197,94,${0.09 * INTENSITY}) 0%,
                        rgba(34,197,94,${0.04 * INTENSITY}) 28%,
                        rgba(34,197,94,0) 72%)`,
                    filter: `blur(${65 * (1 + 0.15 * INTENSITY)}px)`,
                    animation: `${orbitC} ${duration(18)} ease-in-out infinite`,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 22%, rgba(255,255,255,0) 55%)",
                }}
            />
        </Box>
    );
}
