const mongoose = require("mongoose");
const Joi = require("joi");


const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        lowercase: true
    },
    language: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true
    }
})

const Tag = mongoose.model("Tag", tagSchema);

function validateTag(tag) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        language: Joi.string().min(3).max(20).required(),
        category: Joi.string().min(3).max(20).required()
    })
    return schema.validate(tag);
}



module.exports.tagSchema = tagSchema;
module.exports.Tag = Tag;
module.exports.validate = validateTag;