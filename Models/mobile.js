const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const mobileSchema = new mongoose.Schema(
  {
    product: { type: String },

    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    screensize: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mobile", mobileSchema);
