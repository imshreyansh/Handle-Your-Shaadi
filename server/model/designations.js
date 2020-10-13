const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designation = new Schema({
    designation: {
        type: String,
        enum: ['Customer', 'Admin', 'System Admin', 'Vendor']
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Designations = mongoose.model('Designations', designation)

exports.Designations = Designations