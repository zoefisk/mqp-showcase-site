import type { NextConfig } from "next";

const repo = "mqp-showcase-site"

const nextConfig: NextConfig = {
    reactCompiler: true,

    output: "export",
    trailingSlash: true,

    images: {
        unoptimized: true
    },

    basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
};

export default nextConfig;
