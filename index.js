require('dotenv').config();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client();
const ownerNumber = process.env.OWNER_NUMBER;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    sendOwnerMessage('Client is ready!');
});

async function sendOwnerMessage(message) {
    try {
        const ownerChatId = ownerNumber.substring(1) + '@c.us';
        await client.sendMessage(ownerChatId, message);
        console.log(Message sent to owner (${ownerNumber}): ${message});
    } catch (error) {
        console.error('Error sending message to owner:', error);
    }
}

client.initialize();

app.get('/', (req, res) => {
    res.send('WhatsApp bot is running!');
});

app.listen(port, () => {
    console.log(Server listening on port ${port});
});
