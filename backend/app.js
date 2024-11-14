const express = require("express");
const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin:
    process.env.MODE === "dev"
    ? "http://localhost:3000"
    : /^https?:\/\/(?:.*\.)?roamies\.org$/,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type",
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.listen(8080, () => {
    console.log("Serving on Port 8080");
});

app.post("/sendemail", async (req, res) => {
    try {
      const { name, email, msg } = req.body;
      if(name === '' || email === '' || msg === '') {
          return res.status(400).json({ message: 'All fields are required!' });
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const message = {
          to: "sherif.amer01@gmail.com",
          from: "no-reply@roamies.org",
          subject: `${name} sent you a message`,
          text: msg,
          replyTo: email
        };
      sgMail
        .send(message)
        .then(() => {
            res.status(201).json({ message: 'Thank you, we will get back to you!' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Failed to send email.', error: error });
        });
    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong while sending the email!',
        error: e,
      });
    }
});

