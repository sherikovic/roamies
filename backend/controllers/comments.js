const User = require("../models/user");
const Broadcast = require("../models/broadcast");
const Comment = require("../models/comment");

module.exports.index = async (req, res) => {
	try {
		const event = await Broadcast.findById(req.body.event);
		res.status(201).json({ objects: event.comments });
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching the details of the comments from the database!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.postComment = async (req, res) => {
	try {
		const owner = await User.findById(req.body.owner);
		const event = await Broadcast.findById(req.body.event);
		const newComment = new Comment({
			text: req.body.text,
			owner,
			event,
		});
		const response = await newComment.save();
		event.comments.push(response._id);
		await event.save();
		res
			.status(201)
			.json({ mesage: "Comment successfully posted.", objects: newComment });
	} catch (e) {
		res.status(500).json({
			message: "A server side error occured while posting your comment!",
			error: e.name + ": " + e.message,
		});
	}
};
