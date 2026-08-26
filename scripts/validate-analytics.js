const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");
const sourceExtensions = new Set([".js", ".jsx", ".json"]);

const collectFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });

const files = [
  path.join(root, "gatsby-browser.js"),
  path.join(root, "gatsby-config.js"),
  path.join(root, "gatsby-node.js"),
  path.join(root, "gatsby-ssr.js"),
  ...collectFiles(path.join(root, "src")),
];
const source = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const analytics = fs.readFileSync(
  path.join(root, "src", "utils", "analytics.js"),
  "utf8",
);

files.forEach((file) => {
  if (!/\.[jt]sx?$/.test(file)) return;
  try {
    babel.parseSync(fs.readFileSync(file, "utf8"), {
      filename: file,
      sourceType: "unambiguous",
      parserOpts: { plugins: ["jsx", "dynamicImport"] },
    });
  } catch (error) {
    console.error(
      `JavaScript syntax validation failed in ${file}:\n${error.message}`,
    );
    process.exit(1);
  }
});

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(
  source.includes("G-QTDC0PBVYX"),
  "The current GA4 measurement ID is missing.",
);
expect(
  !source.includes("G-1JE4933FBR"),
  "The retired GA4 measurement ID is still present.",
);
expect(
  !source.includes("?name="),
  "A form still places a visitor name in a URL.",
);
expect(
  analytics.includes("send_to: GA_MEASUREMENT_ID"),
  "Custom events are not restricted to the GA4 destination.",
);
expect(
  analytics.includes("isAdminPath"),
  "Admin-route analytics exclusion is missing.",
);
expect(
  analytics.includes("form_validation_error") &&
    analytics.includes("generate_lead") &&
    analytics.includes("web_vital"),
  "Required form, conversion or Web Vitals events are missing.",
);

[
  "contact",
  "home-page",
  "elopement-request",
  "corporate-event-planner",
  "gender-reveal",
  "wedding-planner",
  "package-detail",
  "testimonial",
].forEach((formName) => {
  expect(
    source.includes(`name="${formName}"`),
    `Expected public form '${formName}' was not found.`,
  );
});

if (failures.length) {
  console.error("Analytics validation failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(
  "Analytics validation passed: GA4, consent, forms and PII guards are present.",
);
