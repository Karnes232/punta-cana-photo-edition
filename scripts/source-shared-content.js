const fetch = require("node-fetch");
module.exports = async ({ actions, createNodeId, createContentDigest }) => {
  const project = process.env.SANITY_PROJECT_ID || "mj6f2710",
    dataset = process.env.SANITY_DATASET || "production";
  const query = '*[_id == "generalLayout"][0].sharedContent';
  const response = await fetch(
    `https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`,
    { timeout: 30000 },
  );
  if (!response.ok)
    throw new Error(`Shared content request failed (${response.status})`);
  const { result } = await response.json();
  if (
    !result?.navigation?.length ||
    !result?.labels?.length ||
    result.languages?.length !== 4
  )
    throw new Error(
      "Publish General Layout > Shared Website Content before building; editorial fallbacks are intentionally disabled.",
    );
  const contentJson = JSON.stringify(result);
  actions.createNode({
    id: createNodeId("shared-website-content"),
    parent: null,
    children: [],
    contentJson,
    internal: {
      type: "SharedSiteContent",
      contentDigest: createContentDigest(contentJson),
    },
  });
};
