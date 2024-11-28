const mongoose = require("mongoose");
const connectdb = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Atlas Connected"))
    .catch((error)=>console.error("Atlas not connected",error));
};

module.exports = connectdb;