const jwt = require("jwt-simple")
const moment = require("moment")
require("dotenv").config()

const secret = process.env.JWT_SECRET

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        created_at: user.created_at,
        iat: moment().unix(),
        exp: moment().add(5, "days").unix()
    }

    return jwt.encode(payload, secret)
}

module.exports = {
    secret,
    createToken
}