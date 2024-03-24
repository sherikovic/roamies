const router = require("express").Router();
const eventsCtls = require("../controllers/events");

router
	.route("/") // the optional parameters are passed as optional queries
	.get(eventsCtls.index) // available for everyone, gets narrowed down dep. on the query params
	.post(eventsCtls.createEvent); // requires login

router
	.route("/:id") // id for each event
	.get(eventsCtls.showEvent) // doesn't require login
	.patch(eventsCtls.updateEvent) // requries login
	.delete(eventsCtls.deleteEvent); // requires login

// router
// 	.route('/user/:userId') // in case user is logged in, would be accessed from the profile for example
// 	.get(eventsCtls.userIndex); // retrieves events of that user

module.exports = router;
