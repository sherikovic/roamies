const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
		type: Buffer,
		required: false,
	},
	rsvp: {
		type: Number,
		required: false,
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
