const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection URI
const uri = process.env.MONGO_URI || "mongodb+srv://arungupta0984:W3Q53b3H6biwC3qA@job-portal-demo.kbinj.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo";

// MongoDB Client Setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Database & Collection
    const db = client.db("mernJobPortal");
    const jobsCollection = db.collection("demoJobs");

    // POST: Add a Job
    app.post("/post-job", async (req, res) => {
      try {
        const job = req.body;

        // Log the received data to check what is being sent
        console.log("📥 Received data:", JSON.stringify(job, null, 2));

        // Validate input fields
        // if (!job.title || !job.company || !job.location) {
        //   return res.status(400).json({ message: "Missing required fields" });
        // }

        job.createdAt = new Date(); // Set creation date

        const result = await jobsCollection.insertOne(job);
        if (result.insertedId) {
          return res.status(201).json({ message: "Job posted successfully", jobId: result.insertedId });
        } else {
          return res.status(500).json({ message: "Failed to insert job" });
        }
      } catch (error) {
        console.error("Error inserting job:", error);
        res.status(500).json({ error: error.message });
      }
    });

    // all Jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollection.find({}).toArray();
        res.status(200).json(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: error.message });
      }
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

run();

// Root Route
app.get('/', (req, res) => {
  res.send('Hello Developers!');
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
