app.post('/send-code', (req, res) => {
    const { myNumber } = req.body;

    if (!myNumber) {
        return res.status(400).send('Introduceți un număr valid!');
    }

    // Generează codul și trimite-l prin Twilio
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    client.messages.create({
        from: 'whatsapp:+14155238886', // Numărul Twilio
        to: `whatsapp:${myNumber}`,
        body: `Codul de verificare este: ${verificationCode}`,
    }).then(() => res.send('Cod trimis!'))
      .catch(error => res.status(500).send(`Eroare: ${error.message}`));
});
