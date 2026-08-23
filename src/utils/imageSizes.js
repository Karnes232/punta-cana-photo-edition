/**
 * Override the `sizes` attribute on gatsby-plugin-image data.
 *
 * gatsby-plugin-image derives `sizes` from the source width, so a 700px source
 * rendered in a 320px grid cell still tells the browser to fetch a 700px image.
 * Contentful's `gatsbyImage` resolver silently ignores a `sizes` argument -- it
 * accepts it without error and drops it -- so the value has to be applied to
 * the image data on the way to <GatsbyImage>.
 *
 * Returns a new object; the input is not mutated.
 */
export const withSizes = (image, sizes) =>
  image && {
    ...image,
    images: {
      ...image.images,
      fallback: image.images?.fallback && {
        ...image.images.fallback,
        sizes,
      },
      sources: image.images?.sources?.map((source) => ({ ...source, sizes })),
    },
  };

export default withSizes;
