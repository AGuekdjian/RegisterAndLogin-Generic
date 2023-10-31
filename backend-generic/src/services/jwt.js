const jwt = require("jwt-simple");
const moment = require("moment");
require("dotenv").config();

const secret = "b5a1453zxk";

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
    exp: moment().add(5, "days").unix(),
  };

  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken,
};
