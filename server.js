const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Static Files
app.use(express.static(path.join(__dirname)));

// Route: Contact Form
app.post('/contact.php', async (req, res) => {
    // NOTE: We keep the endpoint as /contact.php to match the existing frontend AJAX call
    const { name, email, subject, message } = req.body;
    let errors = '';

    // Validation
    if (!name || !email || !subject || !message) {
        errors += '\n Error: Required Field';
    }
    const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
    if (!emailRegex.test(email)) {
        errors += '\n Error: Invalid Email Address';
    }

    if (errors) {
        console.log('Validation errors:', errors);
        return res.status(400).send(errors);
    }

    // SMTP Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.SMTP_USER, // Sender address
        to: process.env.EMAIL_TO, // Receiver address
        replyTo: email,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send('Success');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

// Route: Subscribe Form
app.post('/subscribe.php', async (req, res) => {
    // NOTE: We keep the endpoint as /subscribe.php to match the existing frontend AJAX call
    const email = req.body['subscribe-email'];
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const datacenter = process.env.MAILCHIMP_DC;

    if (!email) {
        return res.status(400).send('Error: Email is required');
    }

    if (!apiKey || !listId || !datacenter) {
        console.error('MailChimp configuration missing');
        // Return 200 with error message as existing frontend seemingly expects that or handles errors loosely?
        // Actually, looking at the JS, it checks if it fails.
        return res.status(500).send('Server configuration error');
    }

    const url = `https://us${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

    try {
        const response = await axios.post(url, {
            email_address: email,
            status: 'subscribed'
        }, {
            headers: {
                Authorization: `apikey ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 || response.status === 201) {
            // success
            res.status(200).send('Success'); // Frontend expects success response
        } else {
            res.status(400).send('Failed');
        }

    } catch (error) {
        console.error('MailChimp Error:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data.title === 'Member Exists') {
            return res.status(200).send('Success'); // Treat as success if already subscribed? Or return check logic. 
            // Original PHP used MCAPI which handled it. For simplicity let's assume success or return error.
        }
        res.status(500).send('Error subscribing');
    }
});

// Fallback for SPA (if needed, but this is a static site) or 404
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index-HTML5-VIDEO.html'));
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
