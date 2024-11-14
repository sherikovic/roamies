const mongoose = require("mongoose");

const trips = require("./tripsDummy");
const broadcasts = require("./broadcastsDummy");

const Trip = require("../models/trip");
const Broadcast = require("../models/broadcast");
const User = require("../models/user");

// establish connection to monogodb
mongoose.connect("mongodb://127.0.0.1:27017/roamies");
const db = mongoose.connection;
db.on("error", (err) => {
	console.error("Connection error:", err);
});
db.once("open", () => {
	console.log("Database connected");
});

const logUserIn = async (data) => {
	const res = await fetch("http://localhost:8080/auth/login", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const resBody = await res.json();
	return resBody.user;
};

const seedDB = async () => {
	// find a user DB
	const user = await User.findById("6624eb67a7280a8d077a5a99");

	// clear the database
	await Trip.deleteMany({});
	await Broadcast.deleteMany({});

	// loop over the imported data
	// I tried to do this with foreach and map, but the connection.close() throws an error
	// that the connection is not open
	for (let i = 0; i < trips.length; i++) {
		const trip = new Trip({
			title: trips[i].title,
			description: trips[i].description,
			location: trips[i].location,
			startDate: trips[i].startDate,
			endDate: trips[i].endDate,
			owner: user,
			events: [],
		});
		await trip.save();
	}
	const tripsDB = await Trip.find({});
	for (let i = 0; i < broadcasts.length; i++) {
		const broadcast = new Broadcast({
			title: broadcasts[i].title,
			description: broadcasts[i].description,
			location: broadcasts[i].location,
			datetime: broadcasts[i].datetime,
			category: broadcasts[i].category,
			rsvp: broadcasts[i].rsvp,
			participants: [],
			owner: user,
			trip: tripsDB[0],
		});
		await broadcast.save();
	}
	const brDB = await Broadcast.find({});
	tripsDB[0].events = brDB;
	await tripsDB[0].save();
};

seedDB().then(() =>
	mongoose.connection.close().then(console.log("Connection closed!"))
);
