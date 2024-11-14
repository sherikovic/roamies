const router = require("express").Router();
const tripsCtls = require("../controllers/trips");

router
	.route("/") // the optional parameters are passed as optional queries
	.get(tripsCtls.index) // available for everyone, gets narrowed down dep. on the query params
	.post(tripsCtls.createTrip); // requires login

router
	.route("/:id") // id for each trip
	.get(tripsCtls.showTrip) // doesn't require login
	.patch(tripsCtls.updateTrip) // requries login
	.delete(tripsCtls.deleteTrip); // requires login

// router
// 	.route('/user/:userId') // in case user is logged in, would be accessed from the profile for example
// 	.get(tripsCtls.userIndex); // retrieves trips of that user

module.exports = router;
