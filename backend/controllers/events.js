const Broadcast = require("../models/broadcast");
const User = require("../models/user");

module.exports.index = async (req, res) => {
	try {
		// get all events in the database
		// TODO filter according to the queries passed, for example by email
		if (req.query.user) {
			const user = await User.findOne({ email: req.query.email });
			const events = await Broadcast.find({ owner: { $in: user } });
			res.json({ objects: events });
		} else {
			const events = await Broadcast.find({});
			res.json({ objects: events });
		}
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching the details of the events from the database!",
			error: e,
		});
	}
};

module.exports.createEvent = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const newBroadcast = new Broadcast({
			title: req.body.title,
			location: req.body.location,
			category: req.body.category,
			datetime: new Date(req.body.datetime),
			description: req.body.description,
			owner: user,
		});
		newBroadcast.rsvp = req.body.rsvp && req.body.rsvp;
		await newBroadcast.save();
		res.status(201).json({
			message: "Event was successfully created.",
			objects: newBroadcast,
		});
	} catch (e) {
		res.status(500).json({
			message: "A server side error occured while creating the event!",
			error: e,
		});
	}
};

module.exports.showEvent = async (req, res) => {
	try {
		const event = await Broadcast.findById(req.params.id);
		res.json({ objects: event });
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching event details from the database",
			error: e,
		});
	}
};

module.exports.updateEvent = async (req, res) => {
	try {
		const event = await Broadcast.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		await Broadcast.save();
		res.json({ message: "Event was successfully updated!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while updating event details!",
			error: e,
		});
	}
};

module.exports.deleteEvent = async (req, res) => {
	try {
		await Broadcast.findByIdAndDelete(req.params.id);
		res.json({ message: "Event deleted!" });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while deleting event!", error: e });
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
