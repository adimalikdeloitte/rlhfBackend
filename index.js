// index.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Record = require("./Record");
const Rejection = require("./Rejection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const dbName = "rlhfDB";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://adityamalik2023:Deloitte@cluster0.j1d4on4.mongodb.net/" +
      dbName,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Route to handle POST requests
app.post("/records", (req, res) => {
  const recordData = req.body;

  // Create a new record using the Record model
  const record = new Record(recordData);

  // Save the record to the database
  record
    .save()
    .then(() => {
      res.status(201).json({ message: "Record created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error saving the record" });
    });
});

app.post("/log-rejection", (req, res) => {
  const rejectionData = req.body;
  // console.log({ rejectionData });
  // Create a new rejection using the Rejection model
  const rejection = new Rejection(rejectionData);

  // Save the rejection to the database
  rejection
    .save()
    .then(() => {
      res.status(201).json({ message: "Rejection logged successfully" });
    })
    .catch((error) => {
      // console.log({ error });
      res.status(500).json({ message: "Error logging rejection", error });
    });
});

app.post("/check-file", (req, res) => {
  const fileName = req.body.fileName;
  // Save the record to the database
  Rejection.find({ fileName })
    .then((rejections) => {
      console.log({ rejections });
      res.status(201).json({
        message: "File check successfull",
        rejections,
        isRejected: rejections.length != 0 ? true : false,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error checking file" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
