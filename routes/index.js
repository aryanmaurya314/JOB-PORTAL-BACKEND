

const authRoutes = require('./auth.routes');
const companyRoutes = require('./company.routes');
const jobRoutes = require('./job.routes');


module.exports = (app)=>{
    authRoutes(app),
    companyRoutes(app),
    jobRoutes(app)
}