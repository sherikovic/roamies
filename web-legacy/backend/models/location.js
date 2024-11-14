const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("location", LocationSchema);
