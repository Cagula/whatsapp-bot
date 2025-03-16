const express = require('express');
const app = express();
const fetch = require('node-fetch'); // Necesită instalare cu "npm install node-fetch"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Pentru a servi fișierele statice, inclusiv "index.html"

// Endpoint pentru generare QR folosind API externă
app.post('/generate-qr', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Textul pentru generarea QR este obligatoriu!');
    }

    try {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=150x150`;
        res.send({ qrCodeUrl: qrApiUrl });
    } catch (error) {
        res.status(500).send('A apărut o eroare la generarea codului QR.');
    }
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
