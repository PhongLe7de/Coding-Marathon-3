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
    const newJob = new Job({
      ...req.body,
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
  const {jobId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({message: "Invalid job ID"});
  }

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({message: "Job not found"});
    }
    if (req.body.company) {
      req.body.company = {
        ...job.company.toObject(),
        ...req.body.company
      };
    }
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true
    });

    return res.status(200).json(updatedJob);
  } catch (error) {
    return res.status(500).json({message: "Failed to update job"});
  }
};

// Delete job by ID
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    const query = await Job.findById({ _id: jobId });
    if (!query) {
      return res.status(404).json({ message: "Job not found" });
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
  deleteJob,
};
