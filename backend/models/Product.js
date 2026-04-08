const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  category: { type: String, default: 'Fruit' },
  price: {
    fiveKg: { type: Number, required: true },
    tenKg: { type: Number, required: true }
  },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
