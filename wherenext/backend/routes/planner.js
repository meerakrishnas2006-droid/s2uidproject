const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const TravelPlan = require('../models/TravelPlan');
const { protect } = require('../middleware/auth');
const mockData = require('../data/mockDestinations');

// ── Helper: build day-by-day itinerary ──────────────────────────────────────
function buildItinerary(destName, days, attractions = []) {
  const genericActivities = [
    { time: '08:00', activity: 'Breakfast at a local café', location: 'City Centre', cost: 15, notes: 'Try local specialties' },
    { time: '10:00', activity: 'City sightseeing walk', location: destName, cost: 0, notes: 'Comfortable shoes recommended' },
    { time: '13:00', activity: 'Lunch at a recommended restaurant', location: 'Town Square', cost: 25, notes: 'Reservation advised' },
    { time: '15:00', activity: 'Visit local museum or landmark', location: destName, cost: 20, notes: '' },
    { time: '18:00', activity: 'Sunset viewing', location: 'Best viewpoint', cost: 0, notes: '' },
    { time: '20:00', activity: 'Dinner at a rooftop restaurant', location: destName, cost: 40, notes: 'Book in advance' },
  ];

  const dayThemes = [
    'Arrival & City Exploration',
    'Historical & Cultural Day',
    'Nature & Adventure',
    'Food & Market Tour',
    'Relaxation & Leisure',
    'Day Trip Excursion',
    'Shopping & Farewell',
  ];

  const itinerary = [];
  for (let d = 1; d <= days; d++) {
    const themeIdx = (d - 1) % dayThemes.length;
    const dayAttractions = attractions.slice((d - 1) * 2, d * 2);
    const activities = [];

    activities.push({ time: '08:00', activity: 'Breakfast', location: 'Hotel / Local Café', cost: 15, notes: 'Start the day refreshed' });

    if (dayAttractions.length > 0) {
      dayAttractions.forEach((attr, i) => {
        activities.push({
          time: i === 0 ? '10:00' : '14:00',
          activity: `Visit ${attr.name}`,
          location: attr.name,
          cost: attr.entryFee || 0,
          notes: attr.description ? attr.description.slice(0, 80) : ''
        });
      });
    } else {
      activities.push(genericActivities[2]);
      activities.push(genericActivities[3]);
    }

    activities.push({ time: '13:00', activity: 'Lunch', location: 'Local Restaurant', cost: 20, notes: '' });
    activities.push({ time: '19:00', activity: 'Dinner & Evening Stroll', location: destName, cost: 35, notes: '' });

    itinerary.push({ day: d, title: `Day ${d}: ${dayThemes[themeIdx]}`, activities });
  }
  return itinerary;
}

// ── Classify budget ──────────────────────────────────────────────────────────
function getBudgetCategory(budget, days, travelers) {
  const perPersonPerDay = budget / days / travelers;
  if (perPersonPerDay < 80) return 'budget';
  if (perPersonPerDay < 200) return 'mid';
  return 'luxury';
}

// ── Filter hotels by budget ──────────────────────────────────────────────────
function filterHotels(hotels, budgetCategory) {
  if (!hotels || hotels.length === 0) return [];
  const sorted = [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight);
  if (budgetCategory === 'budget') return sorted.slice(0, 2);
  if (budgetCategory === 'luxury') return sorted.slice(-2).reverse();
  return sorted.slice(0, 3);
}

// POST /api/planner/generate ─────────────────────────────────────────────────
router.post('/generate', protect, async (req, res) => {
  try {
    const { destination, days, budget, travelers = 1 } = req.body;
    if (!destination || !days || !budget)
      return res.status(400).json({ success: false, message: 'destination, days and budget are required' });

    const budgetCategory = getBudgetCategory(Number(budget), Number(days), Number(travelers));

    // 1️⃣ Check DB first
    const dbDest = await Destination.findOne({
      $or: [
        { name: { $regex: destination, $options: 'i' } },
        { city: { $regex: destination, $options: 'i' } },
        { country: { $regex: destination, $options: 'i' } }
      ],
      isActive: true
    });

    let planData = {};

    if (dbDest) {
      // Use DB data
      const hotels = filterHotels(dbDest.hotels, budgetCategory);
      const itinerary = buildItinerary(dbDest.city || dbDest.name, Number(days), dbDest.attractions || []);
      const hotelCost = hotels.length > 0 ? hotels[0].pricePerNight * Number(days) * Number(travelers) : 0;
      const activityCost = itinerary.reduce((sum, day) => sum + day.activities.reduce((s, a) => s + (a.cost || 0), 0), 0);

      planData = {
        user: req.user._id,
        destination: dbDest.name,
        country: dbDest.country,
        days: Number(days),
        budget: Number(budget),
        budgetCategory,
        travelers: Number(travelers),
        itinerary,
        recommendedHotels: hotels,
        totalEstimatedCost: hotelCost + activityCost,
        source: 'db',
        destinationRef: dbDest._id
      };
    } else {
      // 2️⃣ Try mock data
      const mock = mockData.find(m =>
        m.name.toLowerCase().includes(destination.toLowerCase()) ||
        m.city.toLowerCase().includes(destination.toLowerCase()) ||
        m.country.toLowerCase().includes(destination.toLowerCase())
      );

      const base = mock || {
        name: destination,
        city: destination,
        country: 'Unknown',
        hotels: [],
        attractions: [],
        avgDailyBudget: { budget: 60, mid: 150, luxury: 350 }
      };

      const hotels = filterHotels(base.hotels, budgetCategory);
      const itinerary = buildItinerary(base.city || destination, Number(days), base.attractions || []);
      const hotelCost = hotels.length > 0 ? hotels[0].pricePerNight * Number(days) * Number(travelers) : Number(days) * (budgetCategory === 'budget' ? 50 : budgetCategory === 'luxury' ? 300 : 120);
      const activityCost = Number(days) * (budgetCategory === 'budget' ? 30 : budgetCategory === 'luxury' ? 150 : 70);

      planData = {
        user: req.user._id,
        destination: base.name || destination,
        country: base.country || '',
        days: Number(days),
        budget: Number(budget),
        budgetCategory,
        travelers: Number(travelers),
        itinerary,
        recommendedHotels: hotels,
        totalEstimatedCost: hotelCost + activityCost,
        source: mock ? 'mock' : 'mock'
      };
    }

    const savedPlan = await TravelPlan.create(planData);
    res.status(201).json({ success: true, data: savedPlan, message: 'Travel plan generated!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/planner/my-plans ──────────────────────────────────────────────────
router.get('/my-plans', protect, async (req, res) => {
  try {
    const plans = await TravelPlan.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/planner/my-plans/:id ──────────────────────────────────────────────
router.get('/my-plans/:id', protect, async (req, res) => {
  try {
    const plan = await TravelPlan.findOne({ _id: req.params.id, user: req.user._id });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/planner/my-plans/:id ──────────────────────────────────────────
router.delete('/my-plans/:id', protect, async (req, res) => {
  try {
    const plan = await TravelPlan.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/planner/destinations – public search for destinations
router.get('/destinations', async (req, res) => {
  try {
    const { q } = req.query;
    let filter = { isActive: true };
    if (q) filter.$text = { $search: q };
    const destinations = await Destination.find(filter).select('name city country category image rating').limit(20);
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
