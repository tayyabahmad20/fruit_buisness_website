const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');
const { body, param, validationResult } = require('express-validator');

const VALID_STATUSES = ['pending', 'packed', 'out_for_delivery', 'delivered'];

// GET /api/orders - admin only
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/orders - public
router.post('/', [
  body('customerName').notEmpty().trim().escape(),
  body('phone').notEmpty().trim().escape(),
  body('address').notEmpty().trim().escape(),
  body('boxType').notEmpty().trim().isIn(['5kg', '10kg', 'custom']),
  body('paymentMethod').optional().trim().isIn(['COD']),
  body('totalAmount').optional().isNumeric(),
  body('items').optional().isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { customerName, phone, address, boxType, paymentMethod, totalAmount, items, notes } = req.body;
    const order = new Order({ customerName, phone, address, boxType, paymentMethod, totalAmount, items, notes });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status - admin only
router.put('/:id/status', authenticateToken, [
  param('id').isMongoId(),
  body('status').notEmpty().isIn(VALID_STATUSES)
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { status } = req.body;
    const orderId = new (require('mongoose').Types.ObjectId)(req.params.id);
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: String(status) },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
