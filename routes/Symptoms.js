const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const verify = require("../middleware/auth.js");
const Disease = require("../models/diseases.js");

const  items  = require("../Symptoms.js")
console.log(items)


router.use(bodyParser.json());

router.post("/getdesc",verify, async (req, res) => {
  const { disease } = req.body;
  try {
    // console.log(disease);
    const data = await Disease.findOne({ disease: disease });
    console.log(data)
    console.log(data.cure);
    res.json({success:true,description:data.description,cure:data.cure})
  } catch (error) {
    console.error("Error fetching diseases:", error);
  }
});

router.post("/", verify, async (req, res) => {
  if (!req.body.Symptoms) {
    return res.status(400).json({ error: "Symptoms are required" });
  }
  const Symptoms = req.body.Symptoms;
  console.log(Symptoms);
  const itemKeys = Object.keys(items);
  let arr = new Array(itemKeys.length).fill(0);

  Symptoms.forEach((symptom) => {
    const index = itemKeys.indexOf(symptom);
    if (index !== -1) {
      arr[index] = 1;
    }
  });
  const data = [arr];
  const d = { data };
  // console.log(d);
  const mlres = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: JSON.stringify(d),
  });
  const result = await mlres.json();
  const diseaseCount = {};
  Object.values(result).forEach((predictions) => {
    predictions.forEach((disease) => {
      if (!diseaseCount[disease]) {
        diseaseCount[disease] = 0;
      }
      diseaseCount[disease]++;
    });
  });

  console.log("Disease Count:", diseaseCount);

  let maxCount = 0;
  let mostCommonDiseases = [];

  for (const [disease, count] of Object.entries(diseaseCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonDiseases = [disease];
    } else if (count === maxCount) {
      mostCommonDiseases.push(disease);
    }
  }

  console.log("Most Common Diseases:", mostCommonDiseases);

  res.json({
    message: "Symptoms received successfully",
    Disease: mostCommonDiseases,
  });
});

router.post("/", verify, async (req, res) => {
  if (!req.body.attributes) {
    return res.status(400).json({ error: "attributes are required" });
  }
  const attributes=req.body.attributes;
  
})


module.exports = router;
