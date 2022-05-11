/**
 * This file contains job resource
 */

 const mongoose = require('mongoose');
 const constants = require('../utils/constants');
 
 
 
 const jobSchema = new mongoose.Schema({
     title: {
         type: String,
         required: true
     },
     description:{
        type:String,
        required: true
    },
    companyId:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default:constants.status.active     // active   | expired
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
     students:{
         type:[mongoose.SchemaTypes.ObjectId],
         ref: "User"
     }
 })
 
 module.exports = mongoose.model("Job", jobSchema);