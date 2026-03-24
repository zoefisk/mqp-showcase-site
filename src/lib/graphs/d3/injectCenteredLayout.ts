

export function injectCenteredLayout(html: string) {
    const centeringStyles = `
<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: white;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  body > * {
    transform: scale(1.3);
    flex: 0 0 auto;
  }
</style>`;

    if (/<head[^>]*>/i.test(html)) {
        return html.replace(/<head([^>]*)>/i, `<head$1>${centeringStyles}`);
    }

    if (/<html[^>]*>/i.test(html)) {
        return html.replace(/<html([^>]*)>/i, `<html$1><head>${centeringStyles}</head>`);
    }

    return `<!DOCTYPE html><html><head>${centeringStyles}</head><body>${html}</body></html>`;
}
