/**
 * This file contains user resource
 */

const mongoose = require('mongoose');
const constants = require('../utils/constants');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        match: /.+\@.+\..+/,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        default: constants.userTypes.student            // Student | Admin | Recruiter
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    jobsApplied:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }
})

module.exports = mongoose.model("User", userSchema);