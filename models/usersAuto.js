const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userAutoSchema = new Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('UserAuto', userAutoSchema, 'users');
