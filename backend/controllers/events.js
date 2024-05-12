const Broadcast = require("../models/broadcast");
const User = require("../models/user");
const Trip = require("../models/trip");

module.exports.index = async (req, res) => {
	try {
		// getAllEvents in the database
		// TODO filter according to the queries passed, for example by email
		if (req.query.userId) {
			const user = await User.findById(req.query.userId).populate("events");
			res.status(201).json({ objects: user.events });
		} else {
			const events = await Broadcast.find({})
				.populate("owner")
				.populate("trip")
				.populate("participants")
				.populate(["comments"]);
			res.status(201).json({ objects: events });
		}
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching the details of the events from the database!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.createEvent = async (req, res) => {
	try {
		const owner = await User.findById(req.user.id);
		const trip = await Trip.findById(req.body.trip);
		// TODO images are set to empty array until we incorporate aws
		const newBroadcast = new Broadcast({
			...req.body,
			...{ images: [], trip, owner },
		});
		const response = await newBroadcast.save();
		trip.events.push(response._id);
		await trip.save();
		owner.events.push(response._id);
		await owner.save();
		res.status(201).json({
			message: "Event was successfully created.",
			objects: newBroadcast,
		});
	} catch (e) {
		res.status(500).json({
			message: "A server side error occured while creating the event!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.showEvent = async (req, res) => {
	try {
		const event = await Broadcast.findById(req.params.id)
			.populate("owner")
			.populate("trip")
			.populate("participants")
			.populate("comments");
		res.status(201).json({ objects: event });
	} catch (e) {
		res
			.status(201)
			.status(500)
			.json({
				message:
					"An error occured while fetching event details from the database",
				error: e.name + ": " + e.message,
			});
	}
};

module.exports.updateEvent = async (req, res) => {
	try {
		// TODO images are set to empty array until we incorporate aws
		await Broadcast.findByIdAndUpdate(req.params.id, {
			...req.body,
			images: [],
		});
		res.status(201).json({ message: "Event was successfully updated!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while updating event details!",
			error: e.name + ": " + e.message,
		});
	}
};

module.exports.deleteEvent = async (req, res) => {
	try {
		const deletedEvent = await Broadcast.findByIdAndDelete(req.params.id);
		if (deletedEvent.owner) {
			const owner = await User.findById(deletedEvent.owner);
			let updatedEvents = owner.events.filter((event) => {
				return event.toString() !== deletedEvent._id.toString();
			});
			owner.events = updatedEvents;
			await owner.save();
		}
		if (deletedEvent.trip) {
			const trip = await Trip.findById(deletedEvent.trip);
			updatedEvents = trip.events.filter((event) => {
				return event.toString() !== deletedEvent._id.toString();
			});
			trip.events = updatedEvents;
			await trip.save();
		}
		res.status(201).json({ message: "Event was sucessfully deleted!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while deleting event!",
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
