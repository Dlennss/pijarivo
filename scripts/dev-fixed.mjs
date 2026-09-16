import { spawn } from "node:child_process";

const port = process.argv[2] || "3000";
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--turbopack", "--hostname", "127.0.0.1", "--port", port],
  { stdio: "inherit", shell: false },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
