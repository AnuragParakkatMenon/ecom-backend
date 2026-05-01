const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://anuragmenon94_db_user:X7qWzCYYU3Jidi2c@cluster0.tippo7a.mongodb.net/Products?appName=Cluster0/")
    console.log("DB connected")
}


module.exports = { connectDB }