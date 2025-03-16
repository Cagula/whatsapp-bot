const express = require('express');
const path = require('path');

const app = express();

// Middleware pentru procesarea datelor JSON și URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servește fișierul HTML la ruta principală
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server pornit pe portul ${PORT}`);
});
