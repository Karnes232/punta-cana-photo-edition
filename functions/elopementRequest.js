const clean = (value, maxLength = 500) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    if (!event.body || event.body.length > 20000) {
      throw new Error("Invalid request body");
    }

    const body = JSON.parse(event.body);

    if (body["bot-field"]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Request received" }),
      };
    }

    const request = {
      names: clean(body["couple-names"], 160),
      email: clean(body.email, 200),
      whatsapp: clean(body.whatsapp, 80),
      date: clean(body.date, 40),
      guests: clean(body.guests, 10),
      hotel: clean(body.hotel, 200),
      experience: clean(body.experience, 160),
      decoration: clean(body.decoration, 160),
      ceremony: clean(body.ceremony, 160),
      estimatedTotal: clean(body["estimated-total"], 80),
      message: clean(body.message, 2000),
      language: clean(body.language, 10),
    };

    const required = [
      request.names,
      request.email,
      request.whatsapp,
      request.date,
      request.guests,
      request.hotel,
      request.experience,
      request.decoration,
      request.ceremony,
    ];

    if (required.some((value) => !value)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Request accepted; delivery is handled by Netlify Forms",
      }),
    };
  } catch (error) {
    console.error("Elopement compatibility request failed:", error.message);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unable to send request" }),
    };
  }
};
