const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  emoji: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [orderItemSchema],
  boxType: { type: String, enum: ['5kg', '10kg', 'custom'], required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'COD' },
  status: {
    type: String,
    enum: ['pending', 'packed', 'out_for_delivery', 'delivered'],
    default: 'pending'
  },
  specialInstructions: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
