const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressmongo');
const Schema = mongoose.Schema

// Collection schema
const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number
}, {
  timestamps: true
});

// Model
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;