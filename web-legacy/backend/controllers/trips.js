const Trip = require("../models/trip");
const User = require("../models/user");
const Broadcast = require("../models/broadcast");

module.exports.index = async (req, res) => {
	try {
		// getAllTrips in the database
		// TODO filter according to the queries passed, for example by email
		if (req.query.userId) {
			const user = await User.findById(req.query.userId).populate("trips");
			res.status(201).json({ objects: user.trips });
		} else {
			const trips = await Trip.find({}).populate("owner").populate("events");
			res.status(201).json({ objects: trips });
		}
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching the details of the trips from the database!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.createTrip = async (req, res) => {
	try {
		// TODO check if the user has an ongoing trip
		const owner = await User.findById(req.user.id);
		// TODO images are set to empty array until we incorporate aws
		const newTrip = new Trip({
			...req.body,
			...{ images: [], events: [], owner },
		});
		const response = await newTrip.save();
		owner.trips.push(response._id);
		await owner.save();
		res
			.status(201)
			.json({ message: "Trip was successfully created.", objects: newTrip });
	} catch (e) {
		res.status(500).json({
			message: "A server side error occured while creating a trip!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.showTrip = async (req, res) => {
	try {
		const trip = await Trip.findById(req.params.id)
			.populate("owner")
			.populate("events");
		res.status(201).json({ objects: trip });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while fetching trip details from the database",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.updateTrip = async (req, res) => {
	try {
		// TODO images are set to empty array until we incorporate aws
		await Trip.findByIdAndUpdate(req.params.id, {
			...req.body,
			images: [],
		});
		res.status(201).json({ message: "Trip was successfully updated!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while updating trip details!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.deleteTrip = async (req, res) => {
	try {
		const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
		let owner;
		if (deletedTrip.owner) {
			owner = await User.findById(deletedTrip.owner);
			const updatedTrips = owner.trips.filter((trip) => {
				return trip.toString() !== deletedTrip._id.toString();
			});
			owner.trips = updatedTrips;
			await owner.save();
		}
		if (deletedTrip.events) {
			deletedTrip.events.map(
				async (event) => await Broadcast.findByIdAndDelete(event)
			);
			if (deletedTrip.owner) {
				const updatedEvents = owner.events.filter((event) => {
					return !deletedTrip.events.includes(event);
				});
				owner.events = updatedEvents;
				await owner.save();
			}
		}
		res.status(201).json({ message: "Trip was successfully deleted!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while deleting trip!",
			error: e.name + ": " + e.message,
		});
	}
};

// module.exports.userIndex = async (req, res) => {
// 	try {
// 		const trips = await Trip.find({});
// 		res.json({ trips });
// 	} catch (e) {
// 		res.status(500).json({
// 			message:
// 				'An error occured while fetching the details of the trips from the database!',
// 			error: e,
// 		});
// 	}
// };
