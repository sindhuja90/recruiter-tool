// Importing required modules and libraries
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Loading environment variables from .env file
require("dotenv").config();

// Initializing Express app
const app = express();

// Setting up the port for the server
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev")); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON requests

// Creating a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connecting to the PostgreSQL database
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

// Route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to TalentHive!");
});

// Route for adding a new candidate
app.post("/add-candidate", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // Calculate scores based on experience for Node.js and React.js
  let nodeJsScore = 0;
  if (formData.nodeJsExperience < 1) {
    nodeJsScore = 1;
  } else if (formData.nodeJsExperience <= 2) {
    nodeJsScore = 2;
  } else {
    nodeJsScore = 3;
  }

  let reactJsScore = 0;
  if (formData.reactJsExperience < 1) {
    reactJsScore = 1;
  } else if (formData.reactJsExperience <= 2) {
    reactJsScore = 2;
  } else {
    reactJsScore = 3;
  }

  const computedScore = nodeJsScore + reactJsScore;
  console.log("Computed score:", computedScore);

  // SQL query to insert candidate details into the database
  const query = {
    text: `INSERT INTO candidates (candidate_name, email_id, phone_no, skills_qualifications, status, expected_salary, computed_score) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    values: [
      formData.candidateName,
      formData.emailId,
      formData.phoneNumber,
      formData.skillsQualifications,
      formData.currentStatus,
      formData.expectedSalary,
      computedScore,
    ],
  };

  // Execute the query and handle the response
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json("Failed to submit form");
    } else {
      console.log("Candidate details added successfully");
      res.status(200).json("Form submitted successfully");
    }
  });
});

// Route for fetching all candidates
app.get("/read-candidates", async (req, res) => {
  // Fetch all candidates from the database and send the response
  try {
    const result = await pool.query("SELECT * FROM candidates");
    const candidates = result.rows;
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for updating a candidate's status
app.post("/update-candidate", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // SQL query to update the status of a candidate
  const query = {
    text: `UPDATE candidates SET status = $1 WHERE candidate_name = $2`,
    values: [formData.currentStatus, formData.candidateName],
  };

  // Execute the query and handle the response
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json("Error updating candidate details");
    } else {
      console.log("Candidate details updated successfully");
      res.status(200).json("Form submitted successfully");
    }
  });
});

// Route for deleting a candidate
app.post("/delete-candidate", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // SQL query to delete a candidate from the database
  const query = {
    text: `DELETE FROM candidates WHERE candidate_name = $1`,
    values: [formData.candidateName],
  };

  // Execute the query and handle the response
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json("Error deleting candidate details");
    } else {
      console.log("Candidate details deleted successfully");
      res.status(200).json("Form submitted successfully");
    }
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
