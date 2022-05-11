// this file contains logic for auth routes


const authController = require('../controllers/auth.controller');
const {verifySignup, auth} = require('../middlewares');



module.exports = (app)=>{

    // signup --> POST   127.0.0.1:8080/jobhunt/api/v1/auth/signup
    app.post('/jobhunt/api/v1/auth/signup',[verifySignup.validateSignup], authController.signup);


    // signin --> POST   127.0.0.1:8080/jobhunt/api/v1/auth/signin
    app.post('/jobhunt/api/v1/auth/signin', authController.signin);

}