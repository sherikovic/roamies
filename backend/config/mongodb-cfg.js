const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/elementsDB');
const db = mongoose.connection;
db.on('error', (err) => { console.error("Connection error:", err) });
db.once('open', () => { console.log("Database connected"); });
