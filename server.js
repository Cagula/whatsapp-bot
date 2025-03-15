const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

// Acreditive Twilio din variabile de mediu
const accountSid = AC28759a3d5e8b8bc4a9a39e2c5623c9f3; // Definite în mediu
const authToken = 481e6059e88e0ecf4f2ddc12fc54c511;   // Definite în mediu
const client = twilio(accountSid, authToken);

// Detalii predefinite
const myNumber = 'whatsapp:+393533870586'; // Numărul tău
const delaySeconds = 10; // Întârziere în secunde

app.post('/send-message', (req, res) => {
    const { target, text } = req.body;

    if (!target || !text) {
        return res.status(400).send('Te rog să furnizezi un număr țintă și un mesaj!');
    }

    setTimeout(() => {
        client.messages
            .create({
                from: myNumber,
                to: `whatsapp:${target}`,
                body: text,
            })
            .then(message => res.status(200).send(`Mesaj trimis cu SID: ${message.sid}`))
            .catch(error => res.status(500).send(`Eroare: ${error.message}`));
    }, delaySeconds * 1000);
});
