const { render } = require("@react-pdf/renderer");
const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { name, email, pdf, language } = JSON.parse(event.body);

    // Validate the PDF data
    if (!pdf) {
      throw new Error("PDF data is missing");
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
      pool: true, // Use pooled connections
      maxConnections: 3,
      rateDelta: 1000, // Minimum time between messages
      rateLimit: 3, // Max messages per rateDelta
    });

    // Convert base64 to Buffer
    const pdfBuffer = Buffer.from(pdf, "base64");

    // Email content based on language
    const emailSubject =
      language === "es"
        ? `Cotización para ${name} - Sertuin Events`
        : `Quote for ${name} - Sertuin Events`;

    const emailBody =
      language === "es"
        ? `<p>Estimado/a ${name},</p>
         <p>Gracias por su interés en Sertuin Events. Adjunto encontrará su cotización.</p>
         <p>Saludos cordiales,<br>Equipo de Sertuin Events</p>`
        : `<p>Dear ${name},</p>
         <p>Thank you for your interest in Sertuin Events. Please find your quote attached.</p>
         <p>Best regards,<br>Sertuin Events Team</p>`;

    await transporter.sendMail({
      from: `"Sertuin Events" <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailBody,
      attachments: [
        {
          filename: language === "es" ? "cotizacion.pdf" : "quote.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending email",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
    };
  }
};
