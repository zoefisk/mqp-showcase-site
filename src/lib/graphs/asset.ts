import { basePath } from "@/lib/basePath";

export function withBasePath(path?: string) {
    if (!path) return undefined;
    return path.startsWith(basePath) ? path : `${basePath}${path}`;
}
