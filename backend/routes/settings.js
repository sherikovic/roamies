const router = require("express").Router();
const settingsCtls = require("../controllers/settings");

module.exports = router.patch(
	"/updateuserpersonalinfo",
	settingsCtls.updateUserPersonalInfo
);
