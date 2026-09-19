import { cp, mkdir, symlink, lstat, readlink, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const standalone = path.join(root, ".next/standalone");
await access(path.join(standalone, "server.js"));
await cp(path.join(root, "public"), path.join(standalone, "public"), { recursive: true });
await cp(path.join(root, ".next/static"), path.join(standalone, ".next/static"), { recursive: true });

// Keep local account data outside the build directory across rebuilds.
const data = path.join(root, ".data");
const link = path.join(standalone, ".data");
await mkdir(data, { recursive: true, mode: 0o700 });
const existing = await lstat(link).catch((error) => {
  if (error.code === "ENOENT") return null;
  throw error;
});
if (!existing) {
  await symlink(data, link, "dir");
} else if (!existing.isSymbolicLink() || await readlink(link) !== data) {
  throw new Error(`Refusing to replace existing account data at ${link}`);
}
console.log("Standalone assets and persistent account directory prepared.");
