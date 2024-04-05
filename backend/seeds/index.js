const mongoose = require("mongoose");

const trips = require("./tripsDummy");
const broadcasts = require("./broadcastsDummy");

const Trip = require("../models/trip");
const Broadcast = require("../models/broadcast");

// establish connection to monogodb
mongoose.connect("mongodb://127.0.0.1:27017/playground");
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
	// create a user DB
	const user = await logUserIn({
		email: "tim@tim.com",
		password: "tim",
	});
	// clear the database
	await Trip.deleteMany({});
	await Broadcast.deleteMany({});

	// loop over the imported data
	// I tried to do this with foreach and map, but the connection.close() throws an error
	// that the connection is not open
	for (let i = 0; i < trips.length; i++) {
		const trip = new Trip({
			name: trips[i].name,
			description: trips[i].description,
			location: trips[i].location,
			startdate: trips[i].startdate,
			enddate: trips[i].enddate,
			owner: user,
		});
		await trip.save();
	}
	for (let i = 0; i < broadcasts.length; i++) {
		const broadcast = new Broadcast({
			name: broadcasts[i].name,
			description: broadcasts[i].description,
			location: broadcasts[i].location,
			date: broadcasts[i].date,
			category: broadcasts[i].category,
			time: broadcasts[i].time,
			rsvp: broadcasts[i].rsvp,
			participants: [],
			owner: user,
		});
		await broadcast.save();
	}
};

seedDB().then(() =>
	mongoose.connection.close().then(console.log("Connection closed!"))
);
