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
});

module.exports = mongoose.model("broadcast", BroadcastSchema);
