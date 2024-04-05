const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	startdate: {
		type: Date,
		required: true,
	},
	enddate: {
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
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "Broadcast",
	},
});

module.exports = mongoose.model("trip", TripSchema);
