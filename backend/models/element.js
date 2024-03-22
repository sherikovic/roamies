const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ElementSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("element", ElementSchema);
