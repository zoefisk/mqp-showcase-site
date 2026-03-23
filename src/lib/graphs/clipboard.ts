export async function copyText(value: string) {
    try {
        await navigator.clipboard.writeText(value);
    } catch {
        // no-op
    }
}
