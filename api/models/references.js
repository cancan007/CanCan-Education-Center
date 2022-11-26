const mongoose = require("mongoose");
const Joi = require("joi");
const { tagSchema } = require("./tags");

const referenceSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    minlength: 5,
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  language: {
    type: String,
    required: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  tags: {
    type: [tagSchema], // tag's _id
    required: true,
  },
});

const Reference = mongoose.model("Reference", referenceSchema);

function validateReference(reference) {
  const schema = Joi.object({
    url: Joi.string().min(5).required(),
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(0).max(255).required(),
    language: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.required(),
  });
  return schema.validate(reference);
}

module.exports.referenceSchema = referenceSchema;
module.exports.Reference = Reference;
module.exports.validate = validateReference;
