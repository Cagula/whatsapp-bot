const express = require('express');
const QRCode = require('qrcode'); // Asigură-te că această bibliotecă este instalată

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint pentru generarea codului QR
app.post('/generate-qr', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Textul pentru generarea QR este obligatoriu!');
    }

    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            return res.status(500).send('A apărut o eroare la generarea codului QR.');
        }

        res.send({ qrCodeUrl: url });
    });
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server pornit pe portul ${PORT}`);
});
