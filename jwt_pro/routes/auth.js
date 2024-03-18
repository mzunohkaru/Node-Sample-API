const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../db/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = User.find((user) => user.email == email);
  if (!user) {
    return res.status(400).json({
      msg: "ユーザーが存在しません",
    });
  }

  // パスワードの複合・照合
  const iszMatch = await bcrypt.compare(password, user.password);
  if (!iszMatch) {
    return res.status(400).json({
      msg: "パスワードが一致しません",
    });
  }

  // JWTの発行
  const token = await JWT.sign(
    {
      email,
    },
    "SECRET_KEY",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    msg: "ログインに成功しました",
    token: token,
  });
});

router.get("/users", (req, res) => {
  res.status(200).json({
    users: User,
  });
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // DBにユーザーが存在しているか確認
    const user = User.find((user) => user.email == email);
    if (user) {
      return res.status(400).json({
        msg: "ユーザーが既に存在しています",
      });
    }

    // パスワードの暗号化
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hashSync(password, salt);

    User.push({
      email: email,
      password: hashPassword,
    });

    // JWTの発行
    const token = await JWT.sign(
      {
        email,
      },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      msg: "ユーザー登録に成功しました",
      email: email,
      password: hashPassword,
      token: token,
    });
  }
);

module.exports = router;
