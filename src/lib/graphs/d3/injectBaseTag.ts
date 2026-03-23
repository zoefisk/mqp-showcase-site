export function injectBaseTag(html: string, filePath?: string): string {
    // If no filePath or running on server, return as-is
    if (!filePath || typeof window === "undefined") return html;

    const origin = window.location.origin;

    // Normalize file path (ensure it starts with "/")
    const normalized = filePath.startsWith("/") ? filePath : `/${filePath}`;

    // Get directory of the file
    const directory = normalized.slice(0, normalized.lastIndexOf("/") + 1);

    // Build base href (important for GitHub Pages subpaths)
    const baseHref = `${origin}${directory}`;

    const baseTag = `<base href="${baseHref}">`;

    // Case 1: <head> exists → inject inside it
    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);
    }

    // Case 2: <html> exists but no <head> → create one
    if (/<html[^>]*>/i.test(html)) {
        return html.replace(
            /<html([^>]*)>/i,
            `<html$1><head>${baseTag}</head>`,
        );
    }

    // Case 3: no structure → wrap whole document
    return `<!DOCTYPE html><html><head>${baseTag}</head><body>${html}</body></html>`;
}
