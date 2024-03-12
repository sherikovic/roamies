const Element = require('../models/element');

module.exports.index = async (req, res) => {
	try {
		const elements = await Element.find({});
		res.json({ objects: elements });
	} catch (e) {
		res.status(500).json({
			message:
				'An error occured while fetching the details of the elements from the database!',
			error: e,
		});
	}
};

module.exports.createElement = async (req, res) => {
	try {
		const element = new Element(req.body);
		await element.save();
		res.status(201).json({ message: 'Element saved.', element: element });
	} catch (e) {
		res.status(500).json({
			message: 'An error occured while creating an element!',
			error: e,
		});
	}
};

module.exports.showElement = async (req, res) => {
	try {
		const element = await Element.findById(req.params.id);
		res.json({ element: element });
	} catch (e) {
		res.status(500).json({
			message:
				'An error occured while fetching element details from the database',
			error: e,
		});
	}
};

module.exports.editElement = async (req, res) => {
	try {
		const element = await Element.findByIdAndUpdate(req.params.id, {
			...req.body,
		});
		await element.save();
		res.json({ message: 'Element was successfully updated!' });
	} catch (e) {
		res.status(500).json({
			message: 'An error occured while updating element details!',
			error: e,
		});
	}
};

module.exports.deleteElement = async (req, res) => {
	try {
		await Element.findByIdAndDelete(req.params.id);
		res.json({ message: 'Element deleted!' });
	} catch (e) {
		res
			.status(500)
			.json({ message: 'An error occured while deleting element!', error: e });
	}
};
