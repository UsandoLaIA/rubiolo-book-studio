import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../dist/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(path, "utf8"));

if (!config.compatibility_flags?.length) {
  delete config.compatibility_flags;
}

await writeFile(path, JSON.stringify(config));
