// This file contains all the company controller logic

const Company = require('../models/company.model');
const constants = require('../utils/constants');
const User = require('../models/user.model');





// create company
exports.createCompany = async (req, res) => {
    try {
        // make company object
        const companyObj = {
            companyName: req.body.companyName,
            description: req.body.description,
            companyEmail: req.body.companyEmail,
            address: req.body.address
        }
        // create company
        const createdCompany = await Company.create(companyObj);
        // make company creation response object
        const companyCreationResponse = {
            companyName: createdCompany.companyName,
            description: createdCompany.description,
            companyEmail: createdCompany.companyEmail,
            address: createdCompany.address,
            verification: createdCompany.verification,
            createdAt: createdCompany.createdAt,
            updatedAt: createdCompany.updatedAt
        }
        // send response
        res.status(200).send(companyCreationResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Some Internal error while creating company."
        })
    }
}


// update company
exports.updateCompany = async (req, res) => {
    // get company from database
    const company = await Company.findOne({ _id: req.params.id });
    // if company not found
    if (!company) {
        return res.status(200).send({
            message: "Company not found"
        })
    }

    // company found update its attributes
    company.companyName = req.body.companyName != undefined ? req.body.companyName : company.companyName;
    company.companyEmail = req.body.companyEmail != undefined ? req.body.companyEmail : company.companyEmail;
    company.description = req.body.description != undefined ? req.body.description : company.description;
    company.address = req.body.address != undefined ? req.body.address : company.address;
    // verification status cheanged by admin only
    const user = await User.findOne({ userId: req.userId });

    if (user.userType == constants.userTypes.admin) {
        company.verification = req.body.verification != undefined ? req.body.verification : company.verification;
    }else{
        res.status(403).send({
            message: "Requires Admin Role."
        })
    }

    // save the updated company
    await company.save();

    // send updated response
    res.status(201).send({
        message: "company updated successfully."
    })

}

// delete company
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.deleteOne({ _id: req.params.id });

        res.status(200).send(company);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal Error"
        })
    }

}

// get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        res.status(200).send(companies);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal Error"
        })
    }
}

// get one company
exports.getOneCompany = async (req, res) => {
    try {
        const company = await Company.findOne({_id: req.params.id});

        res.status(200).send(company);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal Error"
        })
    }
}