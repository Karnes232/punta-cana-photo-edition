const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const analyticsPath = path.join(root, "src", "utils", "analytics.js");
const transformed = babel.transformFileSync(analyticsPath, {
  presets: ["@babel/preset-env"],
  filename: analyticsPath,
}).code;

const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};

const calls = [];
global.window = {
  location: {
    pathname: "/es/packages/infinity-love/",
    href: "https://sertuinevents.com/es/packages/infinity-love/?utm_source=google",
    origin: "https://sertuinevents.com",
  },
  gtag: (...args) => calls.push(args),
};
global.localStorage = storage();
global.sessionStorage = storage();
global.document = {
  cookie: "",
  getElementById: () => null,
  querySelector: () => null,
};

const moduleUnderTest = { exports: {} };
new Function("module", "exports", "require", transformed)(
  moduleUnderTest,
  moduleUnderTest.exports,
  require,
);
const analytics = moduleUnderTest.exports;

const context = analytics.getPageContext(window.location.pathname);
if (
  context.language !== "es" ||
  context.page_type !== "package_detail" ||
  context.package_id !== "infinity-love"
) {
  throw new Error(`Unexpected package context: ${JSON.stringify(context)}`);
}

analytics.trackEvent("form_submit", {
  form_name: "package-detail",
  email: "private@example.com",
  telephone: "+1 829 555 0101",
});
const eventPayload = calls.at(-1)?.[2];
const serializedPayload = JSON.stringify(eventPayload);
if (
  !eventPayload ||
  serializedPayload.includes("private@example.com") ||
  serializedPayload.includes("829 555") ||
  eventPayload.send_to !== analytics.GA_MEASUREMENT_ID
) {
  throw new Error(`Analytics PII guard failed: ${serializedPayload}`);
}

const source = fs.readFileSync(analyticsPath, "utf8");
if (
  /elements\.namedItem\(["'](?:name|email|phone|telephone|message)/i.test(
    source,
  )
) {
  throw new Error("Analytics reads a prohibited personal-information field.");
}

console.log(
  "Analytics behavior passed: page context, destination and PII redaction verified.",
);
