// Preserve the original aspect ratio; Sanity crop edits are non-destructive.
export function aboutImageAsset(image) {
  const asset = image?.asset;
  if (!asset?.url || !asset.width || !asset.height) return null;
  const c = image.crop || {};
  const x = Math.round(asset.width * (c.left || 0));
  const y = Math.round(asset.height * (c.top || 0));
  const width = Math.max(
    1,
    Math.round(asset.width * (1 - (c.left || 0) - (c.right || 0))),
  );
  const height = Math.max(
    1,
    Math.round(asset.height * (1 - (c.top || 0) - (c.bottom || 0))),
  );
  const url =
    asset.url.includes("cdn.sanity.io") &&
    (x || y || width !== asset.width || height !== asset.height)
      ? `${asset.url}?rect=${x},${y},${width},${height}`
      : asset.url;
  return { url, width, height };
}
