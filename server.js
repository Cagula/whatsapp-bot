const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pentru a procesa datele din formular

// Acreditive Twilio din variabile de mediu
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Variabilă de mediu
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Variabilă de mediu
const client = twilio(accountSid, authToken);

// Detalii predefinite
const myNumber = 'whatsapp:+393533870586'; // Numărul tău

// Servește pagina HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru trimiterea mesajelor
app.post('/send-message', (req, res) => {
    const { target, text, delay } = req.body;

    if (!target || !text || !delay) {
        return res.status(400).send('Te rog să furnizezi un număr țintă, un mesaj și întârzierea!');
    }

    const delaySeconds = parseInt(delay, 10);

    setTimeout(() => {
        client.messages
            .create({
                from: myNumber,
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
