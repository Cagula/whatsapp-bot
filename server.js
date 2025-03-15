const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

// Acreditive Twilio din variabile de mediu
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Variabilă de mediu
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Variabilă de mediu
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT}`));
