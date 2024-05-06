const Trip = require("../models/trip");
const User = require("../models/user");

module.exports.index = async (req, res) => {
	try {
		// get all trips in the database
		// TODO filter according to the queries passed, for example by email
		if (req.query.user) {
			const user = await User.findOne({ email: req.query.email });
			const trips = await Trip.find({ owner: { $in: user } })
				.populate("owner")
				.populate("events");
			res.json({ objects: trips });
		} else {
			const trips = await Trip.find({}).populate("owner").populate("events");
			res.json({ objects: trips });
		}
	} catch (e) {
		res.status(500).json({
			message:
				"An error occured while fetching the details of the trips from the database!",
			error: e,
		});
	}
};

module.exports.createTrip = async (req, res) => {
	try {
		// TODO check if the user has an ongoing trip
		const user = await User.findById(req.user.id);
		const newTrip = new Trip({
			title: req.body.title,
			description: req.body.description,
			location: req.body.location,
			startDate: new Date(req.body.startDate),
			owner: user,
		});
		newTrip.endDate = req.body.endDate && new Date(req.boy.endDate);
		await newTrip.save();
		res
			.status(201)
			.json({ message: "Trip was successfully created.", objects: newTrip });
	} catch (e) {
		res.status(500).json({
			message: "A server side error occured while creating a trip!",
			error: e,
		});
	}
};

module.exports.showTrip = async (req, res) => {
	try {
		const trip = await Trip.findById(req.params.id)
			.populate("owner")
			.populate("events");
		res.json({ objects: trip });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while fetching trip details from the database",
			error: e,
		});
	}
};

module.exports.updateTrip = async (req, res) => {
	try {
		const trip = await Trip.findByIdAndUpdate(req.params.id, { ...req.body });
		await trip.save();
		res.json({ message: "Trip was successfully updated!" });
	} catch (e) {
		res.status(500).json({
			message: "An error occured while updating trip details!",
			error: e,
		});
	}
};

module.exports.deleteTrip = async (req, res) => {
	try {
		await Trip.findByIdAndDelete(req.params.id);
		res.json({ message: "Trip deleted!" });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while deleting trip!", error: e });
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
