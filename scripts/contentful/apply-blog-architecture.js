const fetch = require("node-fetch");

const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!token || !spaceId) {
  throw new Error(
    "CONTENTFUL_MANAGEMENT_TOKEN and CONTENTFUL_SPACE_ID are required.",
  );
}

const baseUrl = `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}/content_types`;

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(`Contentful request failed (${response.status}).`);
    error.cause = detail;
    throw error;
  }

  return response.status === 204 ? null : response.json();
};

const field = (id, name, type, options = {}) => ({
  id,
  name,
  type,
  localized: options.localized ?? true,
  required: options.required ?? false,
  validations: options.validations || [],
  disabled: false,
  omitted: false,
  ...(options.linkType ? { linkType: options.linkType } : {}),
  ...(options.items ? { items: options.items } : {}),
});

const upsertContentType = async ({ id, name, displayField, fields }) => {
  let current;
  try {
    current = await request(`${baseUrl}/${id}`);
  } catch (error) {
    if (!String(error.cause || "").includes("NotFound")) throw error;
  }

  const mergedFields = current
    ? [
        ...current.fields.map(
          (existing) =>
            fields.find((item) => item.id === existing.id) || existing,
        ),
        ...fields.filter(
          (item) => !current.fields.some((existing) => existing.id === item.id),
        ),
      ]
    : fields;

  const saved = await request(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: current ? { "X-Contentful-Version": current.sys.version } : {},
    body: JSON.stringify({ name, displayField, fields: mergedFields }),
  });

  if (
    !saved.sys.publishedVersion ||
    saved.sys.version > saved.sys.publishedVersion + 1
  ) {
    await request(`${baseUrl}/${id}/published`, {
      method: "PUT",
      headers: { "X-Contentful-Version": saved.sys.version },
    });
  }

  process.stdout.write(`Updated ${name}.\n`);
};

const urlValidation = {
  regexp: {
    pattern: "^(https:\\/\\/|\\/|mailto:|tel:).+",
    flags: "i",
  },
  message: "Enter an HTTPS URL, internal path, mailto or tel link.",
};

const run = async () => {
  let galleryType;
  try {
    galleryType = await request(`${baseUrl}/floralItem`);
  } catch (error) {
    if (!String(error.cause || "").includes("NotFound")) throw error;
  }
  if (!galleryType) {
    throw new Error(
      'The retired "floralItem" content type was not found and cannot be reused for blog gallery images.',
    );
  }

  await upsertContentType({
    id: "floralItem",
    name: "Blog gallery image",
    displayField: "altText",
    fields: [
      ...galleryType.fields.map((existingField) => ({
        ...existingField,
        required: false,
        disabled: true,
      })),
      field("image", "Image", "Link", {
        localized: false,
        required: true,
        linkType: "Asset",
        validations: [{ linkMimetypeGroup: ["image"] }],
      }),
      field("altText", "Alt text", "Symbol", {
        required: true,
        validations: [{ size: { min: 5, max: 180 } }],
      }),
      field("caption", "Caption", "Symbol"),
    ],
  });

  let socialType;
  try {
    socialType = await request(`${baseUrl}/socialMediaEmbed`);
  } catch (error) {
    if (!String(error.cause || "").includes("NotFound")) throw error;
  }
  if (!socialType) {
    throw new Error(
      'The existing "socialMediaEmbed" content type was not found.',
    );
  }

  await upsertContentType({
    id: "socialMediaEmbed",
    name: "Blog social embed",
    displayField: "url",
    fields: [
      ...socialType.fields
        .filter((existingField) => existingField.id !== "platform")
        .map((existingField) => ({
          ...existingField,
          required: false,
          disabled: true,
        })),
      field("platform", "Platform", "Symbol", {
        localized: false,
        required: true,
        validations: [
          {
            in: [
              "Instagram",
              "TikTok",
              "Facebook",
              "YouTube",
              "Vimeo",
              "Other",
            ],
          },
        ],
      }),
      field("url", "URL", "Symbol", {
        localized: false,
        required: true,
        validations: [
          {
            regexp: { pattern: "^https:\\/\\/.+", flags: "i" },
            message: "Use the complete HTTPS URL of the post.",
          },
        ],
      }),
    ],
  });

  const blogFields = [
    field("directAnswer", "Direct answer", "Text", { required: true }),
    field("primaryCtaTitle", "Primary CTA title", "Symbol"),
    field("primaryCtaText", "Primary CTA text", "Text"),
    field("primaryCtaButtonText", "Primary CTA button text", "Symbol"),
    field("primaryCtaButtonUrl", "Primary CTA button URL", "Symbol", {
      validations: [urlValidation],
    }),
    field("galleryImages", "Gallery images", "Array", {
      required: true,
      validations: [{ size: { min: 2 } }],
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["floralItem"] }],
      },
    }),
    field("articleContent", "Article content", "RichText", { required: true }),
    field("socialEmbeds", "Social embeds", "Array", {
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["socialMediaEmbed"] }],
      },
    }),
    field("helpTitle", "Help title", "Symbol"),
    field("helpText", "Help text", "Text"),
    field("helpWhatsAppEnabled", "Help WhatsApp Enabled", "Boolean", {
      localized: false,
    }),
    field("helpWhatsAppUrl", "Help WhatsApp URL", "Symbol", {
      validations: [urlValidation],
    }),
    field("helpEmailEnabled", "Show email link", "Boolean", {
      localized: false,
    }),
    field("helpEmailAddress", "Email address", "Symbol", {
      validations: [
        {
          regexp: {
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            flags: "i",
          },
          message: "Enter a valid email address.",
        },
      ],
    }),
    field("helpCustomLinkEnabled", "Show custom link", "Boolean", {
      localized: false,
    }),
    field("helpCustomLinkText", "Custom link text", "Symbol"),
    field("helpCustomLinkUrl", "Custom link URL", "Symbol", {
      validations: [urlValidation],
    }),
  ];

  let existing;
  try {
    existing = await request(`${baseUrl}/blogPost`);
  } catch (error) {
    if (!String(error.cause || "").includes("NotFound")) throw error;
  }

  if (!existing) {
    throw new Error(
      'The existing "blogPost" content type was not found; it was not recreated to avoid losing its current fields.',
    );
  }

  const legacyFieldIds = new Set([
    "backgroundImage",
    "body",
    "tags",
    "blogCategory",
  ]);
  const legacyFields = existing.fields
    .filter((existingField) => legacyFieldIds.has(existingField.id))
    .map((existingField) => ({
      ...existingField,
      required: false,
      disabled: true,
    }));
  const slugField = existing.fields.find(({ id }) => id === "slug");
  const descriptionField = existing.fields.find(
    ({ id }) => id === "description",
  );

  await upsertContentType({
    id: "blogPost",
    name: existing.name,
    displayField: existing.displayField,
    fields: [
      ...legacyFields,
      ...(slugField ? [{ ...slugField, required: true }] : []),
      ...(descriptionField
        ? [
            {
              ...descriptionField,
              required: true,
              validations: [{ size: { min: 50, max: 170 } }],
            },
          ]
        : []),
      ...blogFields,
    ],
  });
};

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
