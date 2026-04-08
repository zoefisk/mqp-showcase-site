import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const repo = "mqp-showcase-site";

const nextConfig: NextConfig = {
    // reactCompiler: true,

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,

    images: {
        unoptimized: true,
    },

    pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
