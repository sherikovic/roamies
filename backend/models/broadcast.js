const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment");

const BroadcastSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	datetime: {
		type: Date,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: [Buffer],
		required: false,
	},
	rsvp: {
		type: Number,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	trip: {
		type: Schema.Types.ObjectId,
		ref: "trip",
	},
	participants: {
		type: [Schema.Types.ObjectId],
		ref: "user",
	},
	comments: {
		type: [Schema.Types.ObjectId],
		// ref: Comment.modelName,
		ref: "comment",
	},
});

module.exports = mongoose.model("broadcast", BroadcastSchema);
