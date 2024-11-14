const location = require("../models/location");

module.exports.index = async (req, res) => {
	try {
		const locations = await location.find({});
		res.json({ locations });
	} catch (e) {
		res
			.status(500)
			.json({
				message:
					"An error occured while fetching the details of the locations from the database!",
			});
	}
};

module.exports.createLocation = async (req, res) => {
	try {
		const location = new location(req.body);
		await location.save();
		res.status(201).json({ message: "location saved.", location: location });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while creating an location!" });
	}
};

module.exports.showLocation = async (req, res) => {
	try {
		const location = await location.findById(req.params.id);
		res.json({ location: location });
	} catch (e) {
		res
			.status(500)
			.json({
				message:
					"An error occured while fetching location details from the database",
			});
	}
};

module.exports.editLocation = async (req, res) => {
	try {
		const location = await location.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		await location.save();
		res.json({ message: "location was updated!" });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while updating location details!" });
	}
};

module.exports.deleteLocation = async (req, res) => {
	try {
		await location.findByIdAndDelete(req.params.id);
		res.json({ message: "location deleted!" });
	} catch (e) {
		res
			.status(500)
			.json({ message: "An error occured while deleting location!" });
	}
};
