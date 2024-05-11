const router = require("express").Router();
const commentsCtls = require("../controllers/comments");

router.route("/").get(commentsCtls.index);

module.exports = router;
