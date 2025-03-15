const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pentru procesarea datelor trimise din formular

// Acreditive Twilio din variabile de mediu
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Stocare coduri de verificare (doar temporar; pentru producție folosește o bază de date)
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
        .then(() => res.send('Codul de verificare a fost trimis cu succes!'))
        .catch(error => res.status(500).send(`Eroare la trimiterea codului: ${error.message}`));
});

// Endpoint pentru verificarea codului
app.post('/verify-code', (req, res) => {
    const { myNumber, code } = req.body;

    if (!myNumber || !code) {
        return res.status(400).send('Te rog să introduci numărul de telefon și codul de verificare!');
    }

    if (codes[myNumber] && parseInt(codes[myNumber]) === parseInt(code)) {
        delete codes[myNumber]; // Șterge codul după verificare
        return res.send('Verificare reușită! Ești conectat.');
    }

    res.status(400).send('Codul introdus este incorect sau a expirat.');
});

// Endpoint pentru trimiterea mesajelor
app.post('/send-message', (req, res) => {
    const { myNumber, target, text, delay } = req.body;

    if (!myNumber || !target || !text || !delay) {
        return res.status(400).send('Te rog să furnizezi numărul tău, un număr țintă, un mesaj și întârzierea!');
    }

    const delaySeconds = parseInt(delay, 10);

    setTimeout(() => {
        client.messages
