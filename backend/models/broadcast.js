const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BroadcastSchema = new Schema({
	name: {
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
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: Buffer,
		required: false,
	},
	rsvp: {
		type: Number,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	participants: {
		type: [Schema.Types.ObjectId],
		ref: "User",
	},
	comments: {
		type: [Schema.Types.ObjectId],
		ref: "Comment",
	},
});

module.exports = mongoose.model("broadcast", BroadcastSchema);
