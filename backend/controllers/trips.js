const Trip = require('../models/trip');

module.exports.index = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.json({ trips });
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while fetching the details of the elements from the database!', error: e }
            );
    }
}

module.exports.userIndex = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.json({ trips });
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while fetching the details of the elements from the database!', error: e }
            );
    }
}

module.exports.createTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();
        res.
            status(201)
            .json(
                { message: 'Trip created.', trip: trip }
            );
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while creating a trip!', error: e }
            );
    }
}


module.exports.showTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        res.json({ trip: trip });
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while fetching trip details from the database', error: e }
            );
    }
}

module.exports.editTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, { ...req.body });
        await trip.save();
        res.json({ message: "Trip was successfully updated!" });
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while updating trip details!', error: e }
            );
    }
}

module.exports.deleteTrip = async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Trip deleted!' });
    } catch (e) {
        res.
            status(500).
            json(
                { message: 'An error occured while deleting trip!', error: e }
            );
    }
}