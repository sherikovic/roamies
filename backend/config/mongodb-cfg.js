const mongoose = require('mongoose');

const username = encodeURIComponent("sherikovic");
const password = encodeURIComponent("A1234a4321");
const mongoDBUrl = `mongodb+srv://${username}:${password}@cluster0.ah7ultu.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDBUrl);
const db = mongoose.connection;
db.on('error', (err) => { console.error("Connection error:", err) });
db.once('open', () => { console.log("Database connected"); });
