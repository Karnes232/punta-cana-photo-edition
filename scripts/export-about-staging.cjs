// Optional future adapter. Read-only; use ONLY after approval of isolated staging.
// Never queries production, never writes documents, and never puts a token in output.
const fs = require("fs");
const projection = `*[_type == "aboutPage"]{_id,language,eyebrow,heading,subtitle,introduction,foundersHeading,foundersSubtitle,biography,photoCaption,companyHeading,currentBrandLabel,brandHeading,brandDescription,serviceLinks,purposeHeading,purpose,commitmentHeading,commitment,processHeading,steps,valuesHeading,valuesIntro,valuesEnabled,directoryHeading,directorySubtitle,directoryIntro,directoryEnabled,
foundersPhoto{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}},
company->{corporateProfile{...,founders[]->{_id,name,title,biography,order,visible,photo{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}}}}},
brands[]->{_id,brandId,name,specialty,description,homepageUrl,homepageButtonLabel,homepageLinkEnabled,order,active,logo{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}},image{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}}},
closing{...,image{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}}},seo{...,image{...,asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}}}}`;
async function run() {
  const dataset = process.env.ABOUT_SANITY_DATASET;
  if (dataset !== "about-staging")
    throw new Error(
      "Only the separately approved about-staging dataset is accepted.",
    );
  if (!process.env.SANITY_READ_TOKEN)
    throw new Error("Set a read token in the process environment.");
  const perspective = process.argv.includes("--published")
    ? "published"
    : "drafts";
  const response = await fetch(
    `https://mj6f2710.api.sanity.io/v2025-02-19/data/query/${dataset}?perspective=${perspective}&query=${encodeURIComponent(projection)}`,
    { headers: { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` } },
  );
  if (!response.ok)
    throw new Error(`Read-only staging export failed (${response.status}).`);
  const { result } = await response.json();
  if (!result?.length) throw new Error("No staging About documents.");
  fs.mkdirSync(".tmp", { recursive: true });
  fs.writeFileSync(
    ".tmp/about-local-content.json",
    JSON.stringify({ pages: result }, null, 2),
  );
  console.log(
    `Exported ${result.length} ${perspective} pages to local review. Rebuild to refresh.`,
  );
}
if (require.main === module)
  run().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
module.exports = { projection };
