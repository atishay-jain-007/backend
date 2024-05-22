const mongoose = require ('mongoose')
// const uri = "mongodb+srv://atishay:rppfDlr0hBQgb0Kl@cluster0.githuhx.mongodb.net/";

const uri="mongodb+srv://atishay:gta5vsthegus@cluster0.githuhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connecttomongo = ()=>{
    mongoose.connect(uri)
    console.log("connecte1d")
}
module.exports = connecttomongo;
