const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeOfStore = new Schema({
    type:{
        type: String
    },
    status:{
        type: String,
        default:'Active'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const TypeOfStoreSchema = mongoose.model('TypeOfStoreSchema',typeOfStore)

exports.TypeOfStoreSchema = TypeOfStoreSchema