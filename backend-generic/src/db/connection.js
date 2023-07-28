const mongoose = require("mongoose")
require('dotenv').config()

const connection = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.NAME_DB}.d8kio3e.mongodb.net/?retryWrites=true&w=majority`)
        console.log("La conexion a la base de datos ha sido exitosa!!")
    } catch (e) {
        console.log(e)
        throw new Error("No se ha podido conectar a la base de datos!!")
    }
}

module.exports = connection