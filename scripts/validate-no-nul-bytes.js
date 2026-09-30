// Fails the build if any built page contains a NUL byte. React 18.3.1's
// streaming renderer flushes its whole 2048-byte buffer when a multi-byte
// character (é, ñ, ’) doesn't fit at the end, leaking the buffer's unused zero
// bytes into the HTML. patches/react-dom+18.3.1.patch fixes that; this check
// catches the patch no longer applying after a React or Gatsby upgrade.
const fs = require("node:fs");
const path = require("node:path");

const publicDir = path.resolve(__dirname, "..", "public");

const htmlFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "studio" ? [] : htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });

const files = htmlFiles(publicDir);
const affected = files.filter((file) => fs.readFileSync(file).includes(0));

if (affected.length) {
  console.error(`NUL bytes found in ${affected.length} of ${files.length} built pages:`);
  for (const file of affected) console.error(`  ${path.relative(publicDir, file)}`);
  console.error("Check that patches/react-dom+18.3.1.patch was applied (npm runs it on postinstall).");
  process.exit(1);
}

console.log(`Validated ${files.length} built pages: no NUL bytes.`);
