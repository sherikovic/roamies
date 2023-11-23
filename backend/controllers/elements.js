const Element = require('../models/element');

module.exports.index = async (req, res) => {
    try {
        const elements = await Element.find({});
        res.json({ elements });
    } catch (e) {
        console.log(e);
    }
};

module.exports.createElement = async (req, res) => {
    console.log(req.user)
    const element = new Element(req.body);
    await element.save();
    res.status(201).json({ message: 'Element saved.', element: element });
};

module.exports.showElement = async (req, res) => {
    try {
        const element = await Element.findById(req.params.id);
        res.json({ element: element });
    } catch (e) {
        console.log(e);
    }
};

module.exports.editElement = async (req, res) => {
    const element = await Element.findByIdAndUpdate(req.params.id, { ...req.body });
    await element.save();
    res.json({ message: "Element was updated!" });
};

module.exports.deleteElement = async (req, res) => {
    try {
        await Element.findByIdAndDelete(req.params.id);
        res.json({ message: 'Element deleted!' });
    } catch (e) {
        console.log(e);
    }
};
