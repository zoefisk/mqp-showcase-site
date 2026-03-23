"use client";

import * as React from "react";
import { ensureMinimumLoadingTime } from "@/lib/graphs/loading";

type Loader<T> = () => Promise<T[]>;

export function useGraphManifest<T extends { id: string }>(
    loader: Loader<T>,
    initialSelectedId?: string,
) {
    const [manifest, setManifest] = React.useState<T[]>([]);
    const [selectedId, setSelectedId] = React.useState(initialSelectedId ?? "");
    const [loadingManifest, setLoadingManifest] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;

        async function init() {
            const startedAt = Date.now();

            try {
                setLoadingManifest(true);
                setError(null);

                const items = await loader();
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;

                setManifest(items);

                const nextSelectedId =
                    initialSelectedId || items[0]?.id || "";

                setSelectedId(nextSelectedId);
            } catch (err) {
                await ensureMinimumLoadingTime(startedAt);

                if (!mounted) return;
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load graph manifest.",
                );
            } finally {
                if (mounted) setLoadingManifest(false);
            }
        }

        init();

        return () => {
            mounted = false;
        };
    }, [loader, initialSelectedId]);

    const selectedItem = React.useMemo(
        () => manifest.find((item) => item.id === selectedId) ?? null,
        [manifest, selectedId],
    );

    return {
        manifest,
        selectedId,
        setSelectedId,
        selectedItem,
        loadingManifest,
        error,
        setError,
    };
}
