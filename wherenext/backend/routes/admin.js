const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/destinations  – list all
router.get('/destinations', protect, adminOnly, async (req, res) => {
  try {
    const destinations = await Destination.find().sort('-createdAt');
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/destinations – add new
router.post('/destinations', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.create({ ...req.body, addedBy: req.user._id });
    res.status(201).json({ success: true, data: dest, message: 'Destination added successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/destinations/:id – update
router.put('/destinations/:id', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: dest, message: 'Destination updated' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/destinations/:id
router.delete('/destinations/:id', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.findByIdAndDelete(req.params.id);
    if (!dest) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/destinations/:id/hotels – add hotel to destination
router.post('/destinations/:id/hotels', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    dest.hotels.push(req.body);
    await dest.save();
    res.status(201).json({ success: true, data: dest, message: 'Hotel added' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/destinations/:id/hotels/:hotelId
router.delete('/destinations/:id/hotels/:hotelId', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    dest.hotels.id(req.params.hotelId).deleteOne();
    await dest.save();
    res.json({ success: true, message: 'Hotel removed' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const UserModel = require('../models/User');
    const TravelPlanModel = require('../models/TravelPlan');
    const destCount  = await Destination.countDocuments();
    const userCount  = await UserModel.countDocuments({ role: 'user' });
    const planCount  = await TravelPlanModel.countDocuments();
    res.json({ success: true, data: { destinations: destCount, users: userCount, plans: planCount } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
