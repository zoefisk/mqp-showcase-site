import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const repo = "mqp-showcase-site";

const withMDX = createMDX({
    extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,

    images: {
        unoptimized: true,
    },

    basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",

    pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
