export function getLineNumbers(text: string): number[] {
    const count = text.split("\n").length;
    return Array.from({ length: count }, (_, i) => i + 1);
}
