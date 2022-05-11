// This file contains all the validations required for signup

const User = require('../models/user.model');

exports.validateSignup = async (req, res, next) => {
    // validate if name is present
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! name is not provided."
        })
    }


    // *validate if userId is present
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed! userId is not provided."
        })
    }

    // **validate if userId is not present in database (must be unique)
    const userid = await User.findOne({ userId: req.body.userId });

    if (userid) {
        return res.status(400).send({
            message: "Failed! userid already exists."
        })
    }

    // *validate if email is present
    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed! email is not provided."
        })
    }

    // **validate if email is not present in database (must be unique)
    const userEmail = await User.findOne({ email: req.body.email });

    if (userEmail) {
        return res.status(400).send({
            message: "Failed! email already exists."
        })
    }

    // validate if password is present
    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed! password is not provided."
        })
    }

    next();
}