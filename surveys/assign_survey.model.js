const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default:null},
    survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default:null},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AssignSurvey', schema);