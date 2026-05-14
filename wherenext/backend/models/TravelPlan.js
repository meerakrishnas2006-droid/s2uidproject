const mongoose = require('mongoose');

const dayPlanSchema = new mongoose.Schema({
  day: Number,
  title: String,
  activities: [{
    time: String,
    activity: String,
    location: String,
    cost: Number,
    notes: String
  }]
});

const travelPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  country: { type: String },
  days: { type: Number, required: true },
  budget: { type: Number, required: true },
  budgetCategory: { type: String, enum: ['budget', 'mid', 'luxury'], default: 'mid' },
  travelers: { type: Number, default: 1 },
  itinerary: [dayPlanSchema],
  recommendedHotels: [{
    name: String,
    stars: Number,
    pricePerNight: Number,
    rating: Number,
    image: String,
    bookingUrl: String,
    address: String,
    amenities: [String]
  }],
  totalEstimatedCost: Number,
  source: { type: String, enum: ['db', 'api', 'mock'], default: 'mock' },
  destinationRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  status: { type: String, enum: ['draft', 'saved', 'completed'], default: 'saved' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TravelPlan', travelPlanSchema);
