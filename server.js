const express = require('express');
const path = require('path');
const QRCode = require('qrcode'); // Biblioteca pentru generarea codurilor QR

const app = express();

// Middleware pentru procesarea datelor JSON și URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servește fișierul HTML la ruta principală "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pentru generarea codului QR
app.post('/generate-qr', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Te rog să furnizezi textul pentru codul QR!');
    }

    // Generează codul QR sub formă de URL de imagine
    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            return res.status(500).send('A apărut o eroare la generarea codului QR!');
        }

        res.send({ qrCodeUrl: url });
    });
});

// Pornire server
const
