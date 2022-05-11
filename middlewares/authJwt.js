//Authentication -- If token passed is valid or not

// 1. If no token provided in the request header --> Not Allowed
// 2. If token is passed: authenticate  --> if correct = allow, else reject

const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const User = require('../models/user.model');
const constants = require('../utils/constants');



verifyToken = (req, res, next) => {
    // read token from the request header
    const token = req.headers['x-access-token'];
    // if token not provided
    if (!token) {
        return res.status(403).send({
            message: "Failed! No token provided."
        })
    }

    // if token provided
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorised"
            })
        }
        // I will read userId and pass it in req object
        req.userId = decoded.id;
        next();
    })
}

// if passed token is of admin
isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId })

    // check type of user
    if (user && user.userType == constants.userTypes.admin) {
        next();
    }
    else {
        return res.status(403).send({
            message: "Requires ADMIN role."
        })
    }
}

isAdminOrRecruiter = async (req, res, next)=>{
    const user = await User.findOne({userId: req.userId});

    if(user && (user.userType == constants.userTypes.admin || user.userType == constants.userTypes.recruiter)){
        next();
    }else{
        res.status(403).send({
            message: "Requires admin or recruiter role."
        })
    }
}

exports.authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAdminOrRecruiter: isAdminOrRecruiter
}
