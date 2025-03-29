const eventRentalEmail = require('../src/emails/eventRentalEmail.jsx');
const { render } = require('@react-email/render');
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { name, email, items } = JSON.parse(event.body);

        // Set up email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });

        // Render the React email to HTML and await the result
        const emailHtml = await render(eventRentalEmail({ name, items }));
        
        // Send the email
        await transporter.sendMail({
            from: {
                name: "Sertuin Events",
                address: process.env.SMTP_USER
            },
            replyTo: 'info@sertuinevents.com',
            to: {
                name: name,
                address: email
            },
            subject: 'Your Rental Order Confirmation - Sertuin Events',
            html: emailHtml,
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high',
                'List-Unsubscribe': `<mailto:unsubscribe@sertuinevents.com?subject=unsubscribe>, <https://sertuinevents.com/unsubscribe>`,
                'Feedback-ID': 'rental-confirmation:sertuinevents',
                'X-Entity-Ref-ID': new Date().getTime().toString(),
            },
            messageId: `<${new Date().getTime()}@sertuinevents.com>`,
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Confirmation email sent successfully' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};