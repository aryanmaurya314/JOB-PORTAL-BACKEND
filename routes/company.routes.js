// API for CRUD operations with company resource
const companyController = require('../controllers/company.controller');
const {auth} = require('../middlewares');



module.exports = (app)=>{

    //create POST  127.0.0.1:8080/jobhunt/api/v1/companies
    app.post("/jobhunt/api/v1/companies", [auth.authjwt.verifyToken, auth.authjwt.isAdminOrRecruiter], companyController.createCompany);

    // Update PUT  127.0.0.1:8080/jobhunt/api/v1/companies/:id
    app.put("/jobhunt/api/v1/companies/:id", [auth.authjwt.verifyToken, auth.authjwt.isAdminOrRecruiter], companyController.updateCompany);

    //delete DELETE  127.0.0.1:8080/jobhunt/api/v1/companies/:id
    app.delete("/jobhunt/api/v1/companies/:id", [auth.authjwt.verifyToken, auth.authjwt.isAdminOrRecruiter], companyController.deleteCompany);

    // All the above APIs is called by admin/owner of company
    


    // search list of all companies
    // GET  127.0.0.1:8080/jobhunt/api/v1/companies
    app.get("/jobhunt/api/v1/companies", [auth.authjwt.verifyToken], companyController.getAllCompanies);


    // search company by id
    // GET  127.0.0.1:8080/jobhunt/api/v1/companies/:id
    app.get("/jobhunt/api/v1/companies/:id", [auth.authjwt.verifyToken], companyController.getOneCompany);

}