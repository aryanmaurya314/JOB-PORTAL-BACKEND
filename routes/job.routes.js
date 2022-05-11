// This file contains all the logic for job routes

const jobController = require('../controllers/job.controller');

const { authjwt } = require('../middlewares/authJwt');


module.exports = (app)=>{
    // create job 
    //POST   127.0.0.1:8080/jobhunt/api/v1/jobs


    app.post("/jobhunt/api/v1/jobs", [authjwt.verifyToken, authjwt.isAdminOrRecruiter], jobController.createJob);

    // get all jobs
    //GET   127.0.0.1:8080/jobhunt/api/v1/jobs


    app.get("/jobhunt/api/v1/jobs", [authjwt.verifyToken], jobController.getALlJobs);


    // get one job 
    //GET   127.0.0.1:8080/jobhunt/api/v1/jobs/:id


    app.get("/jobhunt/api/v1/jobs/:id", [authjwt.verifyToken], jobController.getOneJob);

    // update job 
    //PUT   127.0.0.1:8080/jobhunt/api/v1/jobs/:id



    app.put("/jobhunt/api/v1/jobs/:id", [authjwt.verifyToken, authjwt.isAdminOrRecruiter], jobController.updateJob);

    // delete job 
    //DELETE   127.0.0.1:8080/jobhunt/api/v1/jobs/:id

    app.delete("/jobhunt/api/v1/jobs/:id", [authjwt.verifyToken, authjwt.isAdminOrRecruiter], jobController.deleteJob);

    // apply for job 
    //POST   127.0.0.1:8080/jobhunt/api/v1/jobs/:id?applyJob=true
    app.post("/jobhunt/api/v1/jobs/:id", [authjwt.verifyToken], jobController.applyForJob);
}