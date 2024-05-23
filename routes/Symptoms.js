const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const verify = require('../middleware/auth.js')
const items = {
    "itching": true,
    "skin rash": true,
    "nodal skin eruptions": true,
    "continuous sneezing": true,
    "shivering": true,
    "chills": true,
    "joint pain": true,
    "stomach pain": true,
    "acidity": true,
    "ulcers on tongue": true,
    "muscle wasting": true,
    "vomiting": true,
    "burning micturition": true,
    "spotting urination": true,
    "fatigue": true,
    "weight gain": true,
    "anxiety": true,
    "cold hands and feets": true,
    "mood swings": true,
    "weight loss": true,
    "restlessness": true,
    "lethargy": true,
    "patches in throat": true,
    "irregular sugar level": true,
    "cough": true,
    "high fever": true,
    "sunken eyes": true,
    "breathlessness": true,
    "sweating": true,
    "dehydration": true,
    "indigestion": true,
    "headache": true,
    "yellowish skin": true,
    "dark urine": true,
    "nausea": true,
    "loss of appetite": true,
    "pain behind the eyes": true,
    "back pain": true,
    "constipation": true,
    "abdominal pain": true,
    "diarrhoea": true,
    "mild fever": true,
    "yellow urine": true,
    "yellowing of eyes": true,
    "acute liver failure": true,
    "fluid overload": true,
    "swelling of stomach": true,
    "swelled lymph nodes": true,
    "malaise": true,
    "blurred and distorted vision": true,
    "phlegm": true,
    "throat irritation": true,
    "redness of eyes": true,
    "sinus pressure": true,
    "runny nose": true,
    "congestion": true,
    "chest pain": true,
    "weakness in limbs": true,
    "fast heart rate": true,
    "pain during bowel movements": true,
    "pain in anal region": true,
    "bloody stool": true,
    "irritation in anus": true,
    "neck pain": true,
    "dizziness": true,
    "cramps": true,
    "bruising": true,
    "obesity": true,
    "swollen legs": true,
    "swollen blood vessels": true,
    "puffy face and eyes": true,
    "enlarged thyroid": true,
    "brittle nails": true,
    "swollen extremeties": true,
    "excessive hunger": true,
    "extra marital contacts": true,
    "drying and tingling lips": true,
    "slurred speech": true,
    "knee pain": true,
    "hip joint pain": true,
    "muscle weakness": true,
    "stiff neck": true,
    "swelling joints": true,
    "movement stiffness": true,
    "spinning movements": true,
    "loss of balance": true,
    "unsteadiness": true,
    "weakness of one body side": true,
    "loss of smell": true,
    "bladder discomfort": true,
    "foul smell of urine": true,
    "continuous feel of urine": true,
    "passage of gases": true,
    "internal itching": true,
    "toxic look (typhos)": true,
    "depression": true,
    "irritability": true,
    "muscle pain": true,
    "altered sensorium": true,
    "red spots over body": true,
    "belly pain": true,
    "abnormal menstruation": true,
    "dischromic patches": true,
    "watering from eyes": true,
    "increased appetite": true,
    "polyuria": true,
    "family history": true,
    "mucoid sputum": true,
    "rusty sputum": true,
    "lack of concentration": true,
    "visual disturbances": true,
    "receiving blood transfusion": true,
    "receiving unsterile injections": true,
    "coma": true,
    "stomach bleeding": true,
    "distention of abdomen": true,
    "history of alcohol consumption": true,
    "blood in sputum": true,
    "prominent veins on calf": true,
    "palpitations": true,
    "painful walking": true,
    "pus filled pimples": true,
    "blackheads": true,
    "scurring": true,
    "skin peeling": true,
    "silver like dusting": true,
    "small dents in nails": true,
    "inflammatory nails": true,
    "blister": true,
    "red sore around nose": true,
    "yellow crust ooze": true,
    "prognosis": true
};

router.use(bodyParser.json());

router.post("/",verify, async (req, res) => {
    if (!req.body.Symptoms) {
        return res.status(400).json({ error: "Symptoms are required" });
    }
    const Symptoms = req.body.Symptoms;
    console.log(Symptoms)
    const itemKeys = Object.keys(items);
    let arr = new Array(itemKeys.length).fill(0);

    Symptoms.forEach(symptom => {
        const index = itemKeys.indexOf(symptom);
        if (index !== -1) {
            arr[index] = 1;
        }
    });
    const data = [arr];
    const d={data}
    console.log(d)
    const mlres = await fetch(
        "http://127.0.0.1:5000/predict",
        {
           
            method: "POST",
            body: JSON.stringify(d),
        }
    );
    const result = await mlres.json();
    const diseaseCount = {};
    Object.values(result).forEach(predictions => {
        predictions.forEach(disease => {
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

  
   

   
    res.json({ message: "Symptoms received successfully", Disease: mostCommonDiseases });
    });
   

module.exports = router;
