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

// Pentru a stoca codurile temporar (în realitate, folosește o bază de date)
const codes = {};

// Servește pagina HTML pentru interfață
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru trimiterea codului de verificare
app.post('/send-code', (req, res) => {
    const { myNumber } = req.body;

    if (!myNumber) {
        return res.status(400).send('Te rog să introduci un număr de telefon!');
    }

    // Generează un cod de verificare de 6 cifre
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    codes[myNumber] = verificationCode; // Salvează codul pentru numărul respectiv

    // Trimite codul prin WhatsApp
    client.messages
        .create({
            from: `whatsapp:+14155238886`, // Numărul Twilio
            to: `whatsapp:${myNumber}`,
            body: `Codul tău de verificare este: ${verificationCode}`,
        })
        .then(() => res.send('Codul de verificare a fost trimis!'))
        .catch(error => res.status(500).send(`Eroare la trimiterea codului
