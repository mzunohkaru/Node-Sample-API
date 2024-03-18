const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");
const auth = require("./auth");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

app.post("/register", (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
  };

  const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
  const body = {
    username: req.body.username,
    email: req.body.email,
    token: token,
  };

  res.status(201).json(body);
});

app.get("/login", auth, (req, res) => {
  res.status(200).json({
    msg: "ログインに成功しました",
  });
});
