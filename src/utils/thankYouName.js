/**
 * The thank-you page greets the visitor with the ?name= query parameter
 * (see src/pages/contact/thankyou.js).
 *
 * The contact form builds that URL from React state because its name input is
 * controlled. The other forms use uncontrolled inputs, so instead we rewrite the
 * action as the form is submitted — the browser resolves a form's action after
 * the submit event fires, so the updated value is the one it posts to. We never
 * call preventDefault, so the native Netlify submission is untouched.
 *
 * Pass the name of whichever field holds the visitor's name, e.g.
 *   <form onSubmit={passVisitorName("couple-names")}>
 */
export const passVisitorName =
  (fieldName = "name") =>
  (event) => {
    const form = event.currentTarget;
    const visitor = (form.elements.namedItem(fieldName)?.value ?? "").trim();
    const [base] = form.action.split("?");
    form.action = visitor
      ? `${base}?name=${encodeURIComponent(visitor)}`
      : base;
  };
