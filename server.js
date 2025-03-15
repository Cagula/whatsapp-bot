const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Acreditive Twilio din variabile de mediu
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Endpoint pentru răspuns pe pagina principală
app.get('/', (req, res) => {
    res.send('Serverul funcționează corect!');
});

// Endpoint pentru verificare exemplu
app.post('/example', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Mesajul este obligatoriu!');
    }
    res.send(`Mesajul tău este: ${message}`);
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server pornit pe portul ${PORT}`);
});
