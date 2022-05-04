const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    mobile: {
        required: true,
        type: Number,
        unique: true
    },
    collegeId: {
        required: true,
        type: ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false

    },


}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema)