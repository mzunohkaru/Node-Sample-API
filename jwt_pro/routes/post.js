const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db/Post");
const checkJWT = require("../middleware/checkJWT");

// すべてのユーザー用の投稿記事
router.get("/public", (req, res) => {
  res.json(publicPosts);
});

// JWTを持っているユーザー用の投稿記事
router.get("/private", checkJWT, (req, res) => {
  res.json(privatePosts);
});

module.exports = router;
