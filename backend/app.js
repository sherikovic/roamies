const app = require("express")();
const passport = require("passport");

require("./config/mongodb-cfg");
require("./config/express.cfg")(app);
require("./config/passport-cfg")(app, passport);

app.use("/trips", require("./routes/trips"));
app.use("/events", require("./routes/events"));
app.use("/locations", require("./routes/locations"));
app.use("/auth", require("./routes/users"));
app.use("/settings", require("./routes/settings"));
