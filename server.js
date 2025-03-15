const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Procesare date formular

// Acreditive Twilio din variabile de mediu
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Stocare coduri de verificare (temporar)
const codes = {};

// Servește pagina HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru trimiterea codului de verificare
app.post('/send-code', (req, res) => {
    const { myNumber } = req.body;

    if (!myNumber) {
        return res.status(400).send('Te rog să introduci un număr de telefon!');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    codes[myNumber] = verificationCode;

    client.messages
        .create({
            from: 'whatsapp:+14155238886', // Numărul Twilio
            to: `whatsapp:${myNumber}`,
            body: `Codul tău de verificare este: ${verificationCode}`,
        })
        .then(()
