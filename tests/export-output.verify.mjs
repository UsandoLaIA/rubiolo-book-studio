import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("produces a complete static export", async () => {
  const index = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(index, /Rubiolo Book Studio/);
  if (process.env.GITHUB_ACTIONS === "true") {
    assert.match(index, /\/rubiolo-book-studio\/_next\/static\//);
    assert.match(index, /\/rubiolo-book-studio\/products\/logo4\.png/);
    assert.match(index, /\/rubiolo-book-studio\/products\/HO1028\.jpg/);
  }

  for (const asset of [
    "../out/og.png",
    "../out/products/logo4.png",
    "../out/products/HO1028.jpg",
    "../out/products/HO1012.jpg",
    "../out/products/HO1003.jpg",
  ]) {
    await access(new URL(asset, import.meta.url));
  }
});
