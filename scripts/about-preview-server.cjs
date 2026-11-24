// Loopback-only static preview. No mutation endpoints, credentials or uploads.
const http = require("http"),
  fs = require("fs"),
  path = require("path"),
  sharp = require("sharp");
const root = path.resolve("public");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
};
http
  .createServer(async (req, res) => {
    try {
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        return res.end();
      }
      const url = new URL(req.url, "http://127.0.0.1:9001");
      let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        return res.end();
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, "index.html");
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
      res.setHeader("Cache-Control", "no-store");
      if (!fs.existsSync(file)) {
        res.writeHead(404);
        return res.end("Not found");
      }
      if (url.pathname === "/__about-review__/founders.jpeg") {
        const width = Math.min(
          3120,
          Math.max(100, Number(url.searchParams.get("w")) || 900),
        );
        const format = url.searchParams.get("fm") === "webp" ? "webp" : "jpeg";
        const bytes = await sharp(file)
          .resize({ width, withoutEnlargement: true })
          .toFormat(format, { quality: 80 })
          .toBuffer();
        res.setHeader("Content-Type", `image/${format}`);
        return res.end(req.method === "HEAD" ? undefined : bytes);
      }
      res.setHeader(
        "Content-Type",
        types[path.extname(file)] || "application/octet-stream",
      );
      if (req.method === "HEAD") return res.end();
      fs.createReadStream(file).pipe(res);
    } catch {
      res.writeHead(500);
      res.end("Preview error");
    }
  })
  .listen(9001, "127.0.0.1", () =>
    console.log("Local owner review: http://127.0.0.1:9001/about/"),
  );
