const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Survey', schema);