const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const elementsRoutes = require('./routes/elements');

// establish connection to monogodb
mongoose.connect('mongodb://127.0.0.1:27017/elementsDB');
const db = mongoose.connection;
db.on('error', (err) => { console.error("Connection error:", err) });
db.once('open', () => { console.log("Database connected"); });

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/elements', elementsRoutes);

app.listen(8080, () => {
    console.log('Serving on Port 8080...');
});
