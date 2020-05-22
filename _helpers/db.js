const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    Employee: require('../employee/employee.model'),
    Survey:require('./../surveys/survey.model'), 
    AssignSurvey:require("./../surveys/assign_survey.model")
};