import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the complete six-step product-book flow", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const label of ["Referencias", "Materiales", "Movilidad", "Contexto", "Información", "Composición"]) {
    assert.match(page, new RegExp(label));
  }
  for (const code of ["HO1028", "HO1012", "HO1003"]) {
    assert.match(page, new RegExp(code));
  }
  for (const capability of [
    "material-sphere",
    "Fotos del vehículo particular",
    "FUENTE DE VERDAD",
    "ESTIMACIÓN DE GENERACIÓN",
    "Vista previa PDF",
    "REGENERAR ESTA PÁGINA",
  ]) {
    assert.match(page, new RegExp(capability));
  }
});

test("is configured as a GitHub Pages static export", async () => {
  const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const workflow = await readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8");

  assert.match(config, /output: "export"/);
  assert.match(config, /\/rubiolo-book-studio/);
  assert.match(page, /assetPath/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /path: \.\/out/);

  for (const asset of [
    "../public/hero-technical-clean.png",
    "../public/og.png",
    "../public/products/logo4.png",
    "../public/products/HO1028.jpg",
    "../public/products/HO1012.jpg",
    "../public/products/HO1003.jpg",
  ]) {
    await access(new URL(asset, import.meta.url));
  }
});
