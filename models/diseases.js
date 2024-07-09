const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    disease: String,
    description: String,
    cure:[]
});

const Disease = mongoose.model('diseases', diseaseSchema);

module.exports = Disease;
