const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");
async function prepare(file) {
  if (!file)
    throw new Error(
      "Pass the absolute path to the original owner-supplied photograph.",
    );
  const original = fs.readFileSync(file),
    hash = crypto.createHash("sha256").update(original).digest("hex");
  const metadata = await sharp(original).metadata();
  fs.mkdirSync(".tmp", { recursive: true });
  fs.mkdirSync("static/__about-review__", { recursive: true });
  fs.writeFileSync(".tmp/about-original.jpeg", original);
  fs.writeFileSync("static/__about-review__/founders.jpeg", original);
  const documents = JSON.parse(
    fs.readFileSync("scripts/migrations/about-initial-documents.json", "utf8"),
  );
  const alt = {
    en: "Alex Castro and Grecia Mejía, owners of Sertuin SRL, standing together outdoors",
    es: "Alex Castro y Grecia Mejía, propietarios de Sertuin SRL, juntos al aire libre",
    pt: "Alex Castro e Grecia Mejía, proprietários da Sertuin SRL, juntos ao ar livre",
    fr: "Alex Castro et Grecia Mejía, propriétaires de Sertuin SRL, ensemble en plein air",
  };
  const index = Object.fromEntries(documents.map((d) => [d._id, d]));
  const company = structuredClone(index.generalLayout);
  company.corporateProfile.founders = company.corporateProfile.founders.map(
    (r) => index[r._ref],
  );
  const pages = documents
    .filter((d) => d._type === "aboutPage")
    .map((p) => ({
      ...p,
      company,
      brands: p.brands.map((r) => index[r._ref]),
      foundersPhoto: {
        _type: "imageWithAlt",
        asset: {
          url: "/__about-review__/founders.jpeg",
          width: metadata.width,
          height: metadata.height,
        },
        alt: alt[p.language],
      },
    }));
  fs.writeFileSync(
    ".tmp/about-local-content.json",
    JSON.stringify({ pages }, null, 2),
  );
  fs.writeFileSync(
    ".tmp/about-photo-evidence.json",
    JSON.stringify(
      {
        originalPath: path.resolve(file),
        sha256: hash,
        width: metadata.width,
        height: metadata.height,
        uploaded: false,
        localCopyIdentical:
          crypto
            .createHash("sha256")
            .update(fs.readFileSync(".tmp/about-original.jpeg"))
            .digest("hex") === hash,
      },
      null,
      2,
    ),
  );
  console.log(
    `Prepared four local pages and the unchanged original photograph (${metadata.width}×${metadata.height}). No uploads.`,
  );
}
if (require.main === module)
  prepare(process.argv[2]).catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
module.exports = prepare;
