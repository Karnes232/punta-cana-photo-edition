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
      pool: true,
      maxConnections: 3,
      rateDelta: 1000,
      rateLimit: 3,
    });

    // Convert base64 to Buffer
    const pdfBuffer = Buffer.from(pdf, "base64");

    // Email content based on language
    const emailSubject =
      language === "es"
        ? `Contrato para ${name} - Sertuin Events`
        : `Contract for ${name} - Sertuin Events`;

    const emailBody =
      language === "es"
        ? `<p>Estimado/a ${name},</p>
         <p>Gracias por elegir Sertuin Events. Adjunto encontrará su contrato para revisar y firmar.</p>
         <p>Por favor, revise el documento detenidamente y devuélvanos una copia firmada.</p>
         <p>Si tiene alguna pregunta, no dude en contactarnos.</p>
         <p>Saludos cordiales,<br>Equipo de Sertuin Events</p>`
        : `<p>Dear ${name},</p>
         <p>Thank you for choosing Sertuin Events. Please find your contract attached for review and signature.</p>
         <p>Please review the document carefully and return a signed copy to us.</p>
         <p>If you have any questions, please don't hesitate to contact us.</p>
         <p>Best regards,<br>Sertuin Events Team</p>`;

    await transporter.sendMail({
      from: `"Sertuin Events" <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailBody,
      attachments: [
        {
          filename: language === "es" ? "contrato.pdf" : "contract.pdf",
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
