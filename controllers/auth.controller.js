/**
 * This file contains logic for signup and signin
 */

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const configs = require('../configs/auth.config');





// logic for signup

exports.signup = async (req, res) => {
    // create user
    const userObj = {
        name : req.body.name,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        email : req.body.email,
        userType: req.body.userType
    }
    try {
        const userCreated = await User.create(userObj);
        console.log("User created", userCreated);

        const userCreationResponse = {
            name : userCreated.name,
            userId : userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }

        res.status(201).send(userCreationResponse);
    }
    catch (err) {
        console.log("Error while creating user", err);
        res.status(500).send({
            message: "Some internal error in creating user."
        })
    }
}


// logic for signin

exports.signin = async(req, res)=>{
    // find user in DB
    const user = await User.findOne({userId:req.body.userId});

    // user doesn't exist
    if(user == null){
        return res.status(400).send({
            message: "Failed! user doesn't exist."
        })
    }

    // validate password
    const isUserValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isUserValid){
        return res.status(401).send({
            message: "Password incorrect."
        })
    }

    // successfully login
    // generate access token now
    const token = jwt.sign({id:user.userId}, configs.secret, {expiresIn:600});

    // send response
    const signinResponse = {
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    }
    res.status(200).send(signinResponse);
}

