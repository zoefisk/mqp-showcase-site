import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { Box } from "@mui/material";
import FloatingNav from "@/components/layout/FloatingNav";
import SiteBadge from "@/components/layout/SiteBadge";
import ThemeRegistry from "@/theme/ThemeRegistry";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import PageShell from "@/components/layout/PageShell";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "RRNL MQP",
    description: "RRNL MQP",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeRegistry>
                    <Box
                        sx={{
                            position: "relative",
                            minHeight: "100vh",
                            bgcolor: "background.default",
                        }}
                    >
                        <BackgroundEffects />

                        <Box sx={{ position: "relative", zIndex: 1 }}>
                            <SiteBadge />
                            <FloatingNav />
                            <PageShell>
                                {children}
                            </PageShell>
                        </Box>
                    </Box>
                </ThemeRegistry>
            </body>
        </html>
    );
}
