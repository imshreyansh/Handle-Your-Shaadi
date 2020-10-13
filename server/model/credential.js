const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const credential = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    password: {
        type: String
    },
    avatar: Object,
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE']
    },
    designation: {
        type: Schema.Types.ObjectId,
        ref: "Designations"
    }
})

credential.methods.generateToken = function () {
    let token = jwt.sign({
        id: this._id.toString(),
        name: this.name,
        avatar: this.avatar,
        designation: this.designation
    },
        SECRET,
        { expiresIn: 60 * 60 * 24 })
    return token
}

const CredentitalSchema = mongoose.model('CredentitalSchema', credential)

exports.CredentitalSchema = CredentitalSchema