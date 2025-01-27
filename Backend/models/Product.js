const mongoose = require('mongoose');

// Ensure Category and SubCategory models are registered before using them
require('./SubCategory'); // Importing Category model
require('./Category'); // Importing SubCategory model

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  variants: [{
    ram: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
