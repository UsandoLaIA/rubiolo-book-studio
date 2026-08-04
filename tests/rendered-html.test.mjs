import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Rubiolo Book Studio entry experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<title>Rubiolo Book Studio<\/title>/i);
  assert.match(html, /De una captura CAD/);
  assert.match(html, /HO1028/);
  assert.match(html, /HO1012/);
  assert.match(html, /HO1003/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the complete six-step flow and editorial draft in the client", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  for (const label of ["Referencias", "Materiales", "Movilidad", "Contexto", "Información", "Composición"]) {
    assert.match(page, new RegExp(label));
  }
  for (const capability of [
    "Carrocería",
    "material-sphere",
    "Fotos del vehículo particular",
    "Contextos complementarios",
    "FUENTE DE VERDAD",
    "ESTIMACIÓN DE GENERACIÓN",
    "Vista previa PDF",
    "REGENERAR ESTA PÁGINA",
    "créditos",
  ]) {
    assert.match(page, new RegExp(capability));
  }
  assert.match(page, /setMode\("generating"\)/);
  assert.match(page, /setMode\("book"\)/);
  assert.match(page, /setMode\("pdf"\)/);
  assert.match(page, /index > 0 && <img/);
  assert.match(page, /activePage > 0 && <img/);
  assert.match(page, /\{shot\.category\} · 0\{activePage \+ 1\}/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/hero-technical-clean.png", import.meta.url));
});
