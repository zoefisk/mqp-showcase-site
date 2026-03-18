"use client";

import * as React from "react";
import vegaEmbed, { type VisualizationSpec, type Result } from "vega-embed";

type Props = {
    spec: VisualizationSpec;
};

export default function VegaView({ spec }: Props) {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!ref.current) return;

        const embedPromise = vegaEmbed(ref.current, spec, { actions: false });

        return () => {
            embedPromise
                .then((result: Result) => {
                    result.view.finalize();
                })
                .catch(() => {});
        };
    }, [spec]);

    return <div ref={ref} />;
}
