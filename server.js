const express = require('express');
const QRCode = require('qrcode'); // Asigură-te că este instalat
const path = require('path');

const app = express();

// Middleware pentru procesarea datelor din formulare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servește fișierul HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru generarea codului QR
app.post('/generate-qr', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Textul este obligatoriu pentru generarea QR!');
    }

    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            return res.status(500).send('A apărut o eroare la generarea QR.');
        }
        res.send({ qrCodeUrl: url });
    });
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server pornit pe portul ${PORT}`);
});
