const nodemailer = require("nodemailer");
const dns = require("node:dns").promises;

const DESTINATION_EMAIL = "info@sertuinevents.com";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const clean = (value, maxLength = 500) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const hasActiveEmailDomain = async (email) => {
  const domain = email.split("@").pop()?.toLowerCase();
  if (!domain) return false;

  try {
    const mxRecords = await dns.resolveMx(domain);
    if (mxRecords.some((record) => record.exchange)) return true;
  } catch (error) {
    // A domain may legally receive mail through its A/AAAA record.
  }

  try {
    const addresses = await dns.resolve4(domain);
    if (addresses.length) return true;
  } catch (error) {
    // Try IPv6 before rejecting the domain.
  }

  try {
    const addresses = await dns.resolve6(domain);
    return addresses.length > 0;
  } catch (error) {
    return false;
  }
};

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
      phoneCountry: clean(body["phone-country"], 2).toUpperCase(),
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
      request.phoneCountry,
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

    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(request.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    if (!(await hasActiveEmailDomain(request.email))) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email domain" }),
      };
    }

    if (
      !/^\+[1-9]\d{7,14}$/.test(request.whatsapp) ||
      !/^[A-Z]{2}$/.test(request.phoneCountry)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid phone number" }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const rows = [
      ["Pareja / Couple", request.names],
      ["Correo / Email", request.email],
      ["Phone / WhatsApp", request.whatsapp],
      ["País del teléfono / Phone country", request.phoneCountry],
      ["Fecha preferida / Preferred date", request.date],
      ["Personas / Guests", request.guests],
      ["Hotel / Accommodation", request.hotel],
      ["Experiencia / Experience", request.experience],
      ["Decoración / Décor", request.decoration],
      ["Ceremonia / Ceremony", request.ceremony],
      ["Total estimado / Estimated total", request.estimatedTotal],
      ["Idioma / Language", request.language],
      ["Mensaje / Message", request.message || "—"],
    ];

    const htmlRows = rows
      .map(
        ([label, value]) =>
          `<tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e7e5e4">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e7e5e4">${escapeHtml(value)}</td></tr>`,
      )
      .join("");
    const textRows = rows
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: {
        name: "Sertuin Events Website",
        address: process.env.SMTP_USER,
      },
      to: DESTINATION_EMAIL,
      replyTo: request.email,
      subject: `Elopement request — ${request.names} — ${request.date}`,
      text: `Nueva solicitud de elopement desde sertuinevents.com\n\n${textRows}`,
      html: `<h2 style="font-family:Arial,sans-serif">Nueva solicitud de elopement</h2><p style="font-family:Arial,sans-serif">Enviada desde sertuinevents.com. Responde este correo para contactar directamente a la pareja.</p><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${htmlRows}</table>`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Request emailed successfully" }),
    };
  } catch (error) {
    console.error("Elopement request email failed:", error.message);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unable to send request" }),
    };
  }
};
