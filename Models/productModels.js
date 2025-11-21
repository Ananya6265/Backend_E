const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
 rating: {
  type: Number,
  min: 1,
  max: 5,
  required: true
},

  
  image: {
    type: String,
    required: true
  }
});

const products = mongoose.model("products", productSchema);
module.exports = products;
