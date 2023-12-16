const User = require('../models/user');

module.exports.updateUserPersonalInfo = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findByIdAndUpdate(req.user.id, { ...req.body });
            await user.save();
            res.json({ message: "User personal info was updated!" });
        }
    } catch (e) {
        res.status(500).json({ message: 'An error occured while updating user personal details!' });
    }
}

module.exports.getUserPersonalInfo = async (req, res) => {
    if (req.user) {
        const userData = await User.findOne({ username: req.user.username })
        if (userData) {
            res.status(201).json({ user: userData });
        } else {
            res.status(500).json({ message: "Error occured while retrieving user data!" });
        }
    } else {
        res.status(500).json({ message: "No user is logged in!" })
    }
}
