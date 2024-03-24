const Event = require("../models/broadcast");
const User = require("../models/user");

module.exports.index = async (req, res) => {
	try {
		// get all events in the database
		// TODO filter according to the queries passed, for example by username
		if (req.query.user) {
			const user = await User.findOne({ username: req.query.username });
			const events = await Event.find({ owner: { $in: user } });
			res.json({ objects: events });
		} else {
			const events = await Event.find({});
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
		const event = new Event(req.body);
		event.owner = req.user.id;
		await event.save();
		res
			.status(201)
			.json({ message: "Event was successfully created.", event: event });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while creating a event!", error: e });
	}
};

module.exports.showEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
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
		const event = await Event.findByIdAndUpdate(req.params.id, { ...req.body });
		await event.save();
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
		await Event.findByIdAndDelete(req.params.id);
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
