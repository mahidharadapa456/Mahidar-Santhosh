const mongoose = require("mongoose")
require("dotenv").config()

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dpm6qj8.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true})
    .then(() => console.log("database connected to the server"))
    .catch((error) => console.log(error))


module.exports = mongoose;