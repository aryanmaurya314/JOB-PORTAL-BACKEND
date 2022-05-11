const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');


// create express server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// connect database to server
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("MongoDB connected.");

    // initilisation to create admin
    init();
})


// create admin if not present any
async function init() {
    const user = await User.findOne({ userType: "ADMIN" });
    if (user) {
        return;
    }
    else {
            await User.create({
            name: "Aryan Maurya",
            userId: "admin",
            password: bcrypt.hashSync("admin", 8),
            email: "admin@jobhunt.com",
            userType: "ADMIN"
        })
    }
    console.log("Admin user created");
}




// get routes to redirect request
require('./routes')(app);




// start express server
app.listen(serverConfig.PORT, () => {
    console.log("Application has started on port", serverConfig.PORT);
})
