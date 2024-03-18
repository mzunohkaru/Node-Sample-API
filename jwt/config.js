require("dotenv").config()

module.exports = {
  jwt: {
    secret: process.env.SECRET_KEY,
    options: {
      algorithm: "HS256",
      expiresIn: "1h",
    },
  },
};
