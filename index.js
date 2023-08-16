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

const javaCategories = {
  "Data structures": [
    "Searching",
    "Sorting",
    "Linked List",
    "Stack",
    "Queue",
    "Hashset",
    "Hashmap",
    "Binary Tree",
    "Graph",
    "Binary Search Tree",
    "Heap",
    "Arrays",
    "Trie",
    "Treemap",
    "Arraylist",
    "Vector",
    "Deque",
    "Hashtable",
  ],
  AWS: [
    "SDK",
    "API Gateway",
    "DynamoDB",
    "RDS",
    "EC2",
    "S3",
    "Lambda",
    "Virtual Private Cloud (VPC)",
    "Beanstalk",
    "IAM",
    "CDK",
  ],
  "Pattern Printing": [],
  Collections: [],
  "Java Object Oriented Programming": [
    "Multithreading",
    "Inheritance",
    "Multi processing",
    "Method overriding",
    "Method overloading",
    "Interface",
    "Abstraction",
    "Constructors",
    "Encapsulation",
    "Polymorphism",
    "Generics",
    "File I/O and Serialization",
    "Reflection API",
    "Design Patterns",
    "Enumerations",
    "Exception handling",
    "Getters & Setters",
    "Access Modifiers",
    "Loops",
    "Strings",
    "Control statements",
    "Composition",
    "Packages",
  ],
  "File Handling": [],
  Regex: [],
  "Date and Time": [],
  Applet: [],
  "Spring boot": [],
  Lambda: [],
  Swings: ["MVC", "Event Handling"],
  "Java 8 Stream": [],
  "Java-fx": [],
  Maven: [],
  "Apache POI": [],
  Eclipse: [],
  "Spring-MVC": [],
  Servlet: [],
  Hibernate: [],
  JDBC: [],
  "AWT and Events": [],
  "Math Operations": [],
  Database: [],
  Networking: [],
  "Remote Method Invocation (RMI)": ["Stub", "Skeleton"],
  "Java ServerFaces (JSF)": [],
  "Java Server Pages (JSP)": [],
  "Java Assertion": [],
  JUnit: [],
  JFrame: [],
  "Control statements": [],
};

const pythonCategories = {
  "Data structures": [
    "Searching",
    "Linked List",
    "Stack",
    "Queue",
    "Hashmap",
    "Binary Tree",
    "Graph",
    "Binary Search Tree",
    "Arrays",
    "Divide & Conquer",
    "Space Complexity",
    "Circular Linked List",
    "Heap",
  ],
  AWS: [
    "SDK",
    "API Gateway",
    "DynamoDB",
    "RDS",
    "EC2",
    "S3",
    "Lambda",
    "Virtual Private Cloud (VPC)",
    "Beanstalk",
    "IAM",
    "CDK",
    "CI/CD",
  ],
  "Object Oriented Programming": [
    "Multi processing",
    "Method overriding",
    "Method overloading",
    "Interface",
    "Abstraction",
    "Constructors",
    "Encapsulation",
    "Generics",
    "File I/O and Serialization",
    "Reflection API",
    "Design Patterns",
    "Enumerations",
    "Multithreading",
  ],
  Libraries: [
    "Pandas Data Aggregations",
    "SkLearn for ML",
    "Matplotlib for visualizations",
    "numpy",
    "Normal Math operations",
    "CSV",
    "sklearn for ML",
    "sqlite",
    "matplotlib for visualizations",
  ],
  Threading: ["MultiThreading"],
  "Computer Vision": ["OpenCV", "SciPy", "Pillow", "sckit-image"],
};

app.get("/cqJavaCategory", (req, res) => {
  res.status(200).json(javaCategories);
});

app.get("/cqPythonCategory", (req, res) => {
  res.status(200).json(pythonCategories);
});

app.get("/cqJavaScriptCategory", (req, res) => {
  res.status(200).json(javaCategories);
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
