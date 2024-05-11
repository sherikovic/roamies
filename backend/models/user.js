const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: false,
	},
	googleId: {
		type: String,
		required: false,
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		min: -1,
	},
	country: String,
	bio: String,
	social: {
		instagram: String,
		twitter: String,
	},
	trips: {
		type: [Schema.Types.ObjectId],
		ref: "trip",
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "broadcast",
	},
});

module.exports = mongoose.model("user", UserSchema);
