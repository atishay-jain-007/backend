
const bodyParser = require('body-parser');
const fetch = async (...args) => {
    const module = await import('node-fetch');
    return module.default(...args);
};



const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.post("/", async (req, res) => {
    try {
        const data =  req.body.text
        

        const response = await fetch(
            "https://api-inference.huggingface.co/models/pineiden/nominal-groups-recognition-medical-disease-competencia2-bert-medical-ner",
            {
                headers: { Authorization: "Bearer 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", "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        res.json({ message: "Text received successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

module.exports = router;
