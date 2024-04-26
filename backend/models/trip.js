const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: false,
	},
	images: {
		type: Buffer,
		required: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "Broadcast",
		required: false,
	},
});

module.exports = mongoose.model("trip", TripSchema);
