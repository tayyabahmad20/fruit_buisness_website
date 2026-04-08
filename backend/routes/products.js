const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');
const { body, param, validationResult } = require('express-validator');

// GET /api/products - public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products - admin only
router.post('/', authenticateToken, [
  body('name').notEmpty().trim().escape(),
  body('emoji').notEmpty().trim(),
  body('category').optional().trim().escape(),
  body('price5kg').isNumeric(),
  body('price10kg').isNumeric(),
  body('available').optional().isBoolean(),
  body('featured').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, emoji, category, price5kg, price10kg, available, featured } = req.body;
    const product = new Product({ name, emoji, category, price5kg, price10kg, available, featured });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id - admin only
router.put('/:id', authenticateToken, [
  param('id').isMongoId(),
  body('name').optional().trim().escape(),
  body('emoji').optional().trim(),
  body('category').optional().trim().escape(),
  body('price5kg').optional().isNumeric(),
  body('price10kg').optional().isNumeric(),
  body('available').optional().isBoolean(),
  body('featured').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, emoji, category, price5kg, price10kg, available, featured } = req.body;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (emoji !== undefined) updateFields.emoji = emoji;
    if (category !== undefined) updateFields.category = category;
    if (price5kg !== undefined) updateFields.price5kg = price5kg;
    if (price10kg !== undefined) updateFields.price10kg = price10kg;
    if (available !== undefined) updateFields.available = available;
    if (featured !== undefined) updateFields.featured = featured;

    const productId = new (require('mongoose').Types.ObjectId)(req.params.id);
    const product = await Product.findByIdAndUpdate(productId, updateFields, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id - admin only
router.delete('/:id', authenticateToken, [
  param('id').isMongoId()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const productId = new (require('mongoose').Types.ObjectId)(req.params.id);
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
