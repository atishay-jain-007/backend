const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_DB_URL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

module.exports = connectToMongo;
