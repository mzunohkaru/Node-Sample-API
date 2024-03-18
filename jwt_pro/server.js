const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/post");

const app = express();

// 扱うデータをJSON形式と指定
app.use(express.json());

app.use("/auth", auth);
app.use("/post", post);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
