const MIN_LOADING_MS = 500;

export async function ensureMinimumLoadingTime(startTime: number, minMs = MIN_LOADING_MS) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minMs - elapsed);

    if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
    }
}
