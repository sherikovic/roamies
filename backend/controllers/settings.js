const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.updateUserPersonalInfo = async (req, res) => {
	try {
		if (req.user) {
			if (req.body.type === "personal") {
				const user = await User.findByIdAndUpdate(req.user.id, { ...req.body });
				await user.save();
				res.json({ message: "User personal info was updated!" });
			} else if (req.body.type === "email") {
				let user = await User.findById(req.user.id);
				if (req.body.oldEmail !== user.email) {
					return res.status(501).json({ message: "Old emails don't match!" });
				}
				if (req.body.newEmail !== req.body.confirmNewEmail) {
					return res
						.status(502)
						.json({ message: "The new email fields don't match!" });
				}
				user = await User.findByIdAndUpdate(req.user.id, {
					email: req.body.newEmail,
				});
				await user.save();
				res.json({ message: "Email was successfully updated!" });
			} else if (req.body.type === "password") {
				let user = await User.findById(req.user.id);
				if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
					return res
						.status(501)
						.json({ message: "Old passwords don't match!" });
				} else if (req.body.newPassword !== req.body.confirmNewPassword) {
					return res
						.status(502)
						.json({ message: "The new password fields don't match!" });
				}
				const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);
				user = await User.findByIdAndUpdate(req.user.id, {
					password: newHashedPassword,
				});
				await user.save();
				res.status(201).json({ message: "Password was successfully updated!" });
			}
		} else {
			// this is coming from forgot password
			try {
				const newHashedPassword = await bcrypt.hash(req.body.password, 10);
				const user = await User.findById(req.body._id);
				user.password = newHashedPassword;
				await user.save();
				res.status(201).json({ message: "Password was successfully updated!" });
			} catch (e) {
				res
					.status(500)
					.json({
						message: "Something went wrong, couldn't change the password!",
					});
			}
		}
	} catch (e) {
		res.status(500).json({
			message: "An error occured while updating user personal details!",
			error: e.name + ": " + e.message,
		});
	}
};
