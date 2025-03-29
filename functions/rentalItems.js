const eventRentalEmail = require('../src/emails/eventRentalEmail.jsx');
const { render } = require('@react-email/render');
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    // Log incoming request
    console.log('Received request:', {
        body: event.body,
        headers: event.headers
    });

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Parse and validate input
        const { name, email, items } = JSON.parse(event.body);
        
        if (!name || !email || !items) {
            throw new Error('Missing required fields: name, email, or items');
        }

        console.log('Parsed data:', { name, email, itemsCount: items.length });

        // Set up email transporter with better configuration
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

        // Log transport creation
        console.log('Transporter created');

        // Verify transporter
        await transporter.verify();
        console.log('Transporter verified');

        // Render the React email to HTML and await the result
        console.log('Rendering email template');
        const emailHtml = await render(eventRentalEmail({ name, items }));
        console.log('Email template rendered');
        
        // Send the email with improved headers
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
            text: render(eventRentalEmail({ name, items }), { plainText: true }), // Add plain text version
            headers: {
                'Precedence': 'bulk',
                'X-Auto-Response-Suppress': 'OOF, AutoReply',
                'Auto-Submitted': 'auto-generated',
                'Content-Type': 'text/html; charset=utf-8',
                'X-Mailer': 'Sertuin Events Mailer',
                'Date': new Date().toUTCString(),
            },
        });
        
        console.log('Email sent successfully');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Add CORS headers
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'Confirmation email sent successfully' })
        };
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Add CORS headers
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ 
                error: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            })
        };
    }
};