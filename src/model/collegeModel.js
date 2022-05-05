const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true,

    },
    logoLink: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false

    },

}, { timestamps: true });


module.exports = mongoose.model('College', collegeSchema)