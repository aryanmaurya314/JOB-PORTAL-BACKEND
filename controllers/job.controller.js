// This file contains the controller logic of job
const Job = require('../models/job.model');
const Company = require('../models/company.model');
const Student = require('../models/user.model');



// create job
exports.createJob = async (req, res) => {
    // create job object
    const jobObj = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        companyId: req.body.companyId
    }

    try {
        const createdjob = await Job.create(jobObj);

        const company = await Company.findOne({ _id: createdjob.companyId });
        company.jobsPosted.push(createdjob);
        await company.save();
        res.status(201).send(createdjob);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error while creating job"
        })
    }
}

// get all the jobs
exports.getALlJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).send(jobs);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error while fetching job"
        })
    }
}

// get one the job by id
exports.getOneJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id });
        if (!job) {
            return res.status(200).send({
                message: "Job doesn't exits."
            })
        }
        res.status(200).send(job);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error while fetching job"
        })
    }
}

// update job
exports.updateJob = async (req, res) => {

    try {
        const job = await Job.findOne({ _id: req.params.id });

        if (!job) {
            return res.status(200).send({
                message: "Job doesn't exists."
            })
        }

        job.title = req.body.title != undefined ? req.body.title : job.title;
        job.description = req.body.description != undefined ? req.body.description : job.description;
        job.status = req.body.status != undefined ? req.body.status : job.status;

        // save the updated job

        await job.save();
        // send response

        res.status(201).send(job);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error while updating job"
        })
    }
}

// delete job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id });

        if (!job) {
            return res.status(200).send({
                message: "Job doesn't exists."
            })
        }
        await Job.deleteOne();
        res.status(200).send({
            message: "Job with id " + job._id + " deleted successfully"
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error while deleting job"
        })
    }
}

// apply for job
exports.applyForJob = async (req, res) => {

    if (req.query.applyJob != "true") {
        return res.status(401).send({
            message: "Provided path to apply job is not valid."
        })
    }
    try {
        const student = await Student.findOne({ userId: req.userId });
        const job = await Job.findOne({ _id: req.params.id });

        if (!job) {
            return res.status(200).send({
                message: "Job doesn't exists."
            })
        }

        // update job 
        job.students.push(student);
        await job.save();
        // update student
        student.jobsApplied.push(job);

        res.status(200).send({
            message: "Successfully applied for job"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Some internal server error while applying job"
        })
    }
}