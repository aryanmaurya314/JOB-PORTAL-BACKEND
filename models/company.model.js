// This file contains the company resource

const mongoose = require('mongoose');
const constants = require('../utils/constants');


const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    description:{
        type:String, 
        required: true
    },
    companyEmail:{
        type:String,
        match:/.+\@.+\../,
        required: true,
        unique:true
    },
    address:{
        city:{
            type: String,
            required:true
        },
        pincode:{
            type:Number,
            minimum:100000,
            maximum: 999999,
            required: true
        }
    },
    verification:{
        type: String,
        default: constants.verification.notVerified        // verified | not verified
    },
    createdAt:{
        type: Date,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default:()=>{
            return Date.now();
        }
    },
    jobsPosted:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }
})

module.exports = mongoose.model("Company", companySchema);
