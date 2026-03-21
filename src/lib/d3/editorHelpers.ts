export type PreviewMode = "graph" | "html";

const MIN_LOADING_MS = 500;

export async function ensureMinimumLoadingTime(
    startTime: number,
    minMs = MIN_LOADING_MS
) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minMs - elapsed);

    if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
    }
}

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export type HtmlErrorLocation = {
    line: number;
    column: number;
} | null;

export function getLineNumbers(text: string): number[] {
    const count = text.split("\n").length;
    return Array.from({ length: count }, (_, i) => i + 1);
}

export function highlightHtml(html: string, errorLocation?: HtmlErrorLocation): string {
    const tokenRegex =
        /(&lt;!--[\s\S]*?--&gt;)|(<\/?[A-Za-z][^>]*>)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;

    const escaped = escapeHtml(html);

    let result = "";
    let lastIndex = 0;

    for (const match of escaped.matchAll(tokenRegex)) {
        const index = match.index ?? 0;
        const full = match[0];

        result += escaped.slice(lastIndex, index);

        if (full.startsWith("&lt;!--")) {
            result += `<span class="html-comment">${full}</span>`;
        } else if (full.startsWith("&lt;") || full.startsWith("</")) {
            result += `<span class="html-tag">${full}</span>`;
        } else if (full.startsWith('"') || full.startsWith("'")) {
            result += `<span class="html-string">${full}</span>`;
        } else {
            result += full;
        }

        lastIndex = index + full.length;
    }

    result += escaped.slice(lastIndex);

    const lines = result.split("\n");

    return lines
        .map((lineHtml, i) => {
            const lineNumber = i + 1;
            const hasError = errorLocation?.line === lineNumber;

            return hasError
                ? `<span class="html-error-line">${lineHtml || " "}</span>`
                : lineHtml || " ";
        })
        .join("\n");
}
