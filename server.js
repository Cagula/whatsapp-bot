const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Procesare date formular

// Endpoint pentru a servi pagina HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru trimiterea mesajelor
app.post('/send-message', (req, res) => {
    const { myNumber, target, text, delay } = req.body;

    if (!myNumber || !target || !text || !delay) {
        return res.status(400).send('Te rog să furnizezi numărul tău, un număr țintă, un mesaj și întârzierea!');
    }

    const delaySeconds = parseInt(delay, 10);
    const formattedMyNumber = `whatsapp:${myNumber}`;

    setTimeout(() => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        client.messages
            .create({
                from: formattedMyNumber,
                to: `whatsapp:${target}`,
                body: text,
            })
            .then(message => res.send(`Mesaj trimis cu SID: ${message.sid}`))
            .catch(error => res.status(500).send(`Eroare: ${error.message}`));
    }, delaySeconds * 1000);
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT}`));
