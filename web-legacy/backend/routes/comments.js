const router = require("express").Router();
const commentsCtls = require("../controllers/comments");

router
	.route("/")
	.get(commentsCtls.index) // should retrieve all comments corresponding to event
	.post(commentsCtls.postComment); // post a comment under the event

module.exports = router;
