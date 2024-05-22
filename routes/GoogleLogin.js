const express = require("express");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User=require('../models/User')
const CLIENT_ID = '123937925398-ttr09bpba16rkhuiun1ol7ckc00duf3t.apps.googleusercontent.com'; 
const client = new OAuth2Client(CLIENT_ID);

const verifyToken = require('../middleware/auth.js');

router.post("/", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();

        // Check if the user already exists in your database
        const userExists = await User.findOne({ email: payload.email });

        if (!userExists) {
            // User doesn't exist, store their information in the database
            const newUser = new User({
                name: payload.name,
                email: payload.email,
                // Add other relevant user information here
            });
            await newUser.save();
        }

        // Generate JWT for further authentication
        const authToken = jwt.sign(payload, 'your_secret_key_here');

        console.log(payload);
        res.json({ authToken }); // Send JWT to client
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});



module.exports = router;
