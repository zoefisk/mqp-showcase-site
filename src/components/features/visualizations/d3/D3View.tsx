"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { injectBaseTag } from "@/lib/graphs/d3/injectBaseTag";
import { injectCenteredLayout } from "@/lib/graphs/d3/injectCenteredLayout";

const FIT_INJECTION = `
<style>
  html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; width: 100%; height: 100%; background: white; }
  body { display: block; }
  #__fit_wrapper { position: absolute; top: 50%; left: 50%; transform-origin: center center; }
</style>
<script>
(function() {
  var observer = null;

  function fit() {
    var body = document.body;
    if (!body || body.children.length === 0) return;

    var wrapper = document.getElementById('__fit_wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = '__fit_wrapper';
      var children = Array.prototype.slice.call(body.childNodes);
      for (var i = 0; i < children.length; i++) wrapper.appendChild(children[i]);
      body.appendChild(wrapper);
    }

    wrapper.style.transform = 'translate(-50%, -50%) scale(1)';
    var rect = wrapper.getBoundingClientRect();
    var naturalW = rect.width || wrapper.scrollWidth;
    var naturalH = rect.height || wrapper.scrollHeight;
    if (!naturalW || !naturalH) return;

    if (observer) { observer.disconnect(); observer = null; }

    var scale = Math.min(window.innerWidth / naturalW, window.innerHeight / naturalH) * 0.92;
    wrapper.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
  }

  function tryFit() { requestAnimationFrame(function() { requestAnimationFrame(fit); }); }

  function startObserving() {
    if (observer || !document.body) return;
    observer = new MutationObserver(tryFit);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryFit(); startObserving();
  } else {
    window.addEventListener('load', function() { tryFit(); startObserving(); });
  }

  window.addEventListener('resize', fit);
})();
</script>`;

function injectFit(html: string): string {
    if (/<\/body>/i.test(html)) return html.replace(/<\/body>/i, `${FIT_INJECTION}</body>`);
    if (/<head[^>]*>/i.test(html)) return html.replace(/<head([^>]*)>/i, `<head$1>${FIT_INJECTION}`);
    return html + FIT_INJECTION;
}

type Props = {
    html: string;
    filePath?: string;
    title?: string;
    fitToContainer?: boolean;
};

export default function D3View({ html, filePath, title = "D3 Graph Preview", fitToContainer = false }: Props) {
    const srcDoc = React.useMemo(() => {
        const withBase = injectBaseTag(html, filePath);
        const withLayout = fitToContainer ? injectFit(withBase) : injectCenteredLayout(withBase);
        return withLayout;
    }, [html, filePath, fitToContainer]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <iframe
                title={title}
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 16,
                    background: "white",
                    display: "block",
                }}
            />
        </Box>
    );
}
