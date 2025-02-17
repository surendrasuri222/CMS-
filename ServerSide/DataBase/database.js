const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DataBase Connected Succesfully")
    }
    catch (err) {
        console.log("Error Mongoose-", err)
    }
}

module.exports = connectDB