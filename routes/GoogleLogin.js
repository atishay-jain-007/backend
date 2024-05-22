const express = require("express");
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const CLIENT_ID = '123937925398-ttr09bpba16rkhuiun1ol7ckc00duf3t.apps.googleusercontent.com'; 
const client = new OAuth2Client(CLIENT_ID);

router.post("/", async (req, res) => {
    const { token } = req.body;

    try {
      
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();

      
        console.log(payload);
        res.json(payload);
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});

module.exports = router;
