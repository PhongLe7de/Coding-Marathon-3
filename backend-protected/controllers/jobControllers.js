const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// Get all jobs
const getAllJobs = async (req, res) => {

  try {
    const jobs = await Job.find({}).sort({createdAt: -1});
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({error: "Server Error"});
  }
};

// Create a new job
const createJob = async (req, res) => {

  try {
    const user_id = req.user.id;
    const newJob = new Job({
      ...req.body,
      user_id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({error: "Server Error"});
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const {jobId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({error: "No such job"});
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found");
      return res.status(404).json({message: "Job not found"});
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({error: "Server Error"});
  }
};

// Update job by ID
const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }


    if (!user_id.equals(job.user_id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Safely merge the company object if updating it
    if (req.body.company) {
      req.body.company = {
        ...job.company.toObject(),
        ...req.body.company,
      };
    }

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Failed to update job" });
  }
};


// Delete job by ID
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    const user_id = req.user.id;
const query = await Job.findById(jobId);
    if (!query) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (user_id !== query.user_id.toString()) {
      return res.status(404).json({ message: "Not authorized" });
    }
    await Job.findByIdAndDelete(jobId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob
};
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
