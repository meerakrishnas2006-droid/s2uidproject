const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5, default: 3 },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 4.0 },
  image: { type: String, default: '' },
  amenities: [String],
  bookingUrl: { type: String, default: '' },
  address: { type: String, default: '' }
});

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'Sightseeing' },
  description: { type: String, default: '' },
  entryFee: { type: Number, default: 0 },
  duration: { type: String, default: '2-3 hours' },
  image: { type: String, default: '' }
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Beach', 'Mountain', 'City', 'Adventure', 'Luxury', 'Cultural', 'Nature'],
    default: 'City'
  },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  rating: { type: Number, default: 4.5 },
  avgDailyBudget: {
    budget: { type: Number, default: 50 },
    mid: { type: Number, default: 120 },
    luxury: { type: Number, default: 300 }
  },
  bestMonths: [String],
  tags: [String],
  hotels: [hotelSchema],
  attractions: [attractionSchema],
  flightSearchUrl: { type: String, default: '' },
  mapUrl: { type: String, default: '' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Text index for search
destinationSchema.index({ name: 'text', country: 'text', city: 'text', tags: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);
