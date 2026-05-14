// Rich mock destination data used as fallback when destination not in DB
module.exports = [
  {
    name: 'Bali', city: 'Bali', country: 'Indonesia',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    rating: 4.9,
    avgDailyBudget: { budget: 40, mid: 100, luxury: 280 },
    hotels: [
      { name: 'Kuta Beach Hostel', stars: 2, pricePerNight: 18, rating: 4.1, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', amenities: ['WiFi', 'Pool', 'Breakfast'], bookingUrl: 'https://www.booking.com/search.html?ss=Kuta+Beach+Bali', address: 'Kuta, Bali' },
      { name: 'Ubud Tropical Inn', stars: 3, pricePerNight: 65, rating: 4.5, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'], bookingUrl: 'https://www.booking.com/search.html?ss=Ubud+Bali', address: 'Ubud, Bali' },
      { name: 'The Mulia Resort', stars: 5, pricePerNight: 420, rating: 4.9, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', amenities: ['Private Beach', 'Infinity Pool', 'Butler', 'Spa', 'Fine Dining'], bookingUrl: 'https://www.booking.com/hotel/id/the-mulia.html', address: 'Nusa Dua, Bali' }
    ],
    attractions: [
      { name: 'Tanah Lot Temple', type: 'Cultural', description: 'Iconic sea temple at sunset', entryFee: 5, duration: '2 hours' },
      { name: 'Ubud Monkey Forest', type: 'Nature', description: 'Sacred forest with macaque monkeys', entryFee: 5, duration: '1-2 hours' },
      { name: 'Tegallalang Rice Terraces', type: 'Nature', description: 'Stunning terraced rice paddies', entryFee: 2, duration: '1 hour' },
      { name: 'Seminyak Beach', type: 'Beach', description: 'Upscale beach with beach clubs', entryFee: 0, duration: 'Half day' },
      { name: 'Uluwatu Temple', type: 'Cultural', description: 'Clifftop temple with Kecak dance', entryFee: 4, duration: '2 hours' }
    ]
  },
  {
    name: 'Paris', city: 'Paris', country: 'France',
    category: 'City',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    rating: 4.9,
    avgDailyBudget: { budget: 80, mid: 180, luxury: 500 },
    hotels: [
      { name: 'Generator Paris Hostel', stars: 2, pricePerNight: 35, rating: 4.2, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Bar', 'Lounge'], bookingUrl: 'https://www.booking.com/search.html?ss=Paris+Hostel', address: '9th Arrondissement, Paris' },
      { name: 'Hotel du Louvre', stars: 4, pricePerNight: 250, rating: 4.6, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', amenities: ['WiFi', 'Restaurant', 'Concierge', 'Gym'], bookingUrl: 'https://www.booking.com/search.html?ss=Hotel+du+Louvre+Paris', address: 'Place André Malraux, Paris' },
      { name: 'Ritz Paris', stars: 5, pricePerNight: 1200, rating: 5.0, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', amenities: ['Fine Dining', 'Spa', 'Pool', 'Butler', 'Concierge'], bookingUrl: 'https://www.ritzparis.com', address: '15 Place Vendôme, Paris' }
    ],
    attractions: [
      { name: 'Eiffel Tower', type: 'Landmark', description: 'Iconic iron lattice tower', entryFee: 28, duration: '2-3 hours' },
      { name: 'Louvre Museum', type: 'Museum', description: 'World\'s largest art museum', entryFee: 17, duration: '3-5 hours' },
      { name: 'Notre-Dame Cathedral', type: 'Cultural', description: 'Medieval Catholic cathedral', entryFee: 0, duration: '1-2 hours' },
      { name: 'Montmartre & Sacré-Cœur', type: 'Cultural', description: 'Artistic hilltop neighbourhood', entryFee: 0, duration: 'Half day' },
      { name: 'Seine River Cruise', type: 'Experience', description: 'Panoramic boat tour of Paris', entryFee: 15, duration: '1 hour' }
    ]
  },
  {
    name: 'Maldives', city: 'Malé', country: 'Maldives',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    rating: 5.0,
    avgDailyBudget: { budget: 150, mid: 350, luxury: 900 },
    hotels: [
      { name: 'Summer Island Maldives', stars: 4, pricePerNight: 220, rating: 4.5, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', amenities: ['Beach', 'Snorkeling', 'Restaurant', 'Pool'], bookingUrl: 'https://www.booking.com/hotel/mv/summer-island-maldives.html', address: 'North Malé Atoll, Maldives' },
      { name: 'Soneva Fushi', stars: 5, pricePerNight: 1800, rating: 5.0, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80', amenities: ['Private Villa', 'Butler', 'Overwater Bungalow', 'Spa', 'Fine Dining'], bookingUrl: 'https://soneva.com/soneva-fushi', address: 'Baa Atoll, Maldives' }
    ],
    attractions: [
      { name: 'Snorkeling at House Reef', type: 'Adventure', description: 'Colorful coral reef with marine life', entryFee: 0, duration: '2-3 hours' },
      { name: 'Sunset Dolphin Cruise', type: 'Experience', description: 'Spot dolphins at sunset', entryFee: 45, duration: '2 hours' },
      { name: 'Malé Fish Market', type: 'Cultural', description: 'Local island life experience', entryFee: 0, duration: '1 hour' },
      { name: 'Scuba Diving', type: 'Adventure', description: 'World-class dive sites', entryFee: 80, duration: 'Half day' }
    ]
  },
  {
    name: 'Tokyo', city: 'Tokyo', country: 'Japan',
    category: 'City',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    rating: 4.9,
    avgDailyBudget: { budget: 60, mid: 150, luxury: 400 },
    hotels: [
      { name: 'K\'s House Tokyo', stars: 2, pricePerNight: 30, rating: 4.3, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Kitchen', 'Lounge'], bookingUrl: 'https://www.booking.com/search.html?ss=Tokyo+Hostel', address: 'Asakusa, Tokyo' },
      { name: 'Shibuya Stream Excel Hotel', stars: 4, pricePerNight: 180, rating: 4.6, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', amenities: ['WiFi', 'Gym', 'Restaurant', 'Bar'], bookingUrl: 'https://www.booking.com/search.html?ss=Shibuya+Hotel+Tokyo', address: 'Shibuya, Tokyo' },
      { name: 'Park Hyatt Tokyo', stars: 5, pricePerNight: 700, rating: 4.9, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', amenities: ['Pool', 'Spa', 'Multiple Restaurants', 'Club Lounge', 'City Views'], bookingUrl: 'https://www.hyatt.com/park-hyatt-tokyo', address: 'Shinjuku, Tokyo' }
    ],
    attractions: [
      { name: 'Shibuya Crossing', type: 'Landmark', description: 'World\'s busiest pedestrian crossing', entryFee: 0, duration: '30 mins' },
      { name: 'Senso-ji Temple', type: 'Cultural', description: 'Ancient Buddhist temple in Asakusa', entryFee: 0, duration: '1-2 hours' },
      { name: 'teamLab Borderless', type: 'Experience', description: 'Immersive digital art museum', entryFee: 32, duration: '3 hours' },
      { name: 'Tsukiji Outer Market', type: 'Food', description: 'Fresh seafood and street food', entryFee: 0, duration: '2 hours' },
      { name: 'Mt Fuji Day Trip', type: 'Nature', description: 'Iconic volcanic mountain', entryFee: 10, duration: 'Full day' }
    ]
  },
  {
    name: 'Santorini', city: 'Santorini', country: 'Greece',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    rating: 4.8,
    avgDailyBudget: { budget: 70, mid: 170, luxury: 450 },
    hotels: [
      { name: 'Airds Budget Stay', stars: 2, pricePerNight: 45, rating: 4.0, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Breakfast'], bookingUrl: 'https://www.booking.com/search.html?ss=Santorini+budget', address: 'Fira, Santorini' },
      { name: 'Katikies Hotel', stars: 5, pricePerNight: 680, rating: 4.9, image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80', amenities: ['Infinity Pool', 'Sunset Views', 'Spa', 'Fine Dining', 'Butler'], bookingUrl: 'https://www.katikies.com', address: 'Oia, Santorini' }
    ],
    attractions: [
      { name: 'Oia Sunset', type: 'Nature', description: 'World-famous sunset views', entryFee: 0, duration: '2 hours' },
      { name: 'Red Beach', type: 'Beach', description: 'Volcanic red sand beach', entryFee: 0, duration: 'Half day' },
      { name: 'Akrotiri Archaeological Site', type: 'Cultural', description: 'Prehistoric Minoan city ruins', entryFee: 12, duration: '2 hours' },
      { name: 'Caldera Boat Tour', type: 'Experience', description: 'Sail around the volcanic caldera', entryFee: 50, duration: 'Full day' }
    ]
  },
  {
    name: 'Swiss Alps', city: 'Interlaken', country: 'Switzerland',
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    rating: 4.8,
    avgDailyBudget: { budget: 100, mid: 220, luxury: 600 },
    hotels: [
      { name: 'Backpackers Villa Sonnenhof', stars: 2, pricePerNight: 55, rating: 4.4, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Kitchen', 'Garden'], bookingUrl: 'https://www.booking.com/search.html?ss=Interlaken+Hostel', address: 'Interlaken, Switzerland' },
      { name: 'Victoria-Jungfrau Grand Hotel', stars: 5, pricePerNight: 850, rating: 4.9, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', amenities: ['Spa', 'Pool', 'Fine Dining', 'Mountain Views', 'Butler'], bookingUrl: 'https://www.victoria-jungfrau.ch', address: 'Interlaken, Switzerland' }
    ],
    attractions: [
      { name: 'Jungfraujoch', type: 'Nature', description: 'Top of Europe, 3454m altitude', entryFee: 210, duration: 'Full day' },
      { name: 'Paragliding over Alps', type: 'Adventure', description: 'Tandem paragliding with mountain views', entryFee: 170, duration: '30 mins' },
      { name: 'Lake Brienz Boat Cruise', type: 'Nature', description: 'Turquoise alpine lake cruise', entryFee: 35, duration: '2 hours' },
      { name: 'Harder Kulm', type: 'Nature', description: 'Panoramic viewpoint over Interlaken', entryFee: 38, duration: '2 hours' }
    ]
  },
  {
    name: 'New York', city: 'New York City', country: 'USA',
    category: 'City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    rating: 4.7,
    avgDailyBudget: { budget: 90, mid: 200, luxury: 550 },
    hotels: [
      { name: 'HI NYC Hostel', stars: 2, pricePerNight: 45, rating: 4.1, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Lounge', 'Tours'], bookingUrl: 'https://www.booking.com/search.html?ss=NYC+Hostel', address: 'Upper West Side, NYC' },
      { name: 'The Standard High Line', stars: 4, pricePerNight: 320, rating: 4.5, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', amenities: ['Rooftop Bar', 'Restaurant', 'Gym', 'City Views'], bookingUrl: 'https://www.booking.com/search.html?ss=The+Standard+NYC', address: 'Meatpacking District, NYC' },
      { name: 'The Plaza Hotel', stars: 5, pricePerNight: 1100, rating: 5.0, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', amenities: ['Spa', 'Fine Dining', 'Concierge', 'Butler', 'Central Park Views'], bookingUrl: 'https://www.theplazany.com', address: '768 5th Ave, New York, NY' }
    ],
    attractions: [
      { name: 'Central Park', type: 'Nature', description: '843-acre urban park', entryFee: 0, duration: '2-4 hours' },
      { name: 'Statue of Liberty', type: 'Landmark', description: 'Iconic symbol of freedom', entryFee: 24, duration: 'Half day' },
      { name: 'Metropolitan Museum of Art', type: 'Museum', description: 'World-class art collection', entryFee: 30, duration: '3-5 hours' },
      { name: 'Times Square', type: 'Landmark', description: 'The crossroads of the world', entryFee: 0, duration: '1 hour' },
      { name: 'Brooklyn Bridge Walk', type: 'Landmark', description: 'Iconic suspension bridge walk', entryFee: 0, duration: '1 hour' }
    ]
  },
  {
    name: 'Dubai', city: 'Dubai', country: 'UAE',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    rating: 4.8,
    avgDailyBudget: { budget: 80, mid: 200, luxury: 600 },
    hotels: [
      { name: 'Citymax Hotel Bur Dubai', stars: 3, pricePerNight: 55, rating: 4.0, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', amenities: ['WiFi', 'Pool', 'Restaurant'], bookingUrl: 'https://www.booking.com/search.html?ss=Dubai+3star', address: 'Bur Dubai, Dubai' },
      { name: 'Burj Al Arab', stars: 5, pricePerNight: 2000, rating: 5.0, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', amenities: ['Private Beach', 'Helipad', 'Butler', 'Rolls-Royce Transfer', 'Spa', 'Multiple Restaurants'], bookingUrl: 'https://www.jumeirah.com/burj-al-arab', address: 'Jumeirah Beach Road, Dubai' }
    ],
    attractions: [
      { name: 'Burj Khalifa', type: 'Landmark', description: 'World\'s tallest skyscraper', entryFee: 35, duration: '2 hours' },
      { name: 'Dubai Mall', type: 'Shopping', description: 'World\'s largest mall', entryFee: 0, duration: '3-5 hours' },
      { name: 'Desert Safari', type: 'Adventure', description: 'Dune bashing and camel riding', entryFee: 60, duration: 'Half day' },
      { name: 'Dubai Frame', type: 'Landmark', description: 'Giant picture frame with city views', entryFee: 20, duration: '1 hour' },
      { name: 'Palm Jumeirah', type: 'Landmark', description: 'Iconic man-made island', entryFee: 0, duration: '2 hours' }
    ]
  },
  {
    name: 'Kerala', city: 'Kochi', country: 'India',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    rating: 4.7,
    avgDailyBudget: { budget: 25, mid: 70, luxury: 200 },
    hotels: [
      { name: 'Zostel Kochi', stars: 2, pricePerNight: 12, rating: 4.3, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Common Room', 'Breakfast'], bookingUrl: 'https://www.zostel.com/zostel/kochi', address: 'Fort Kochi, Kerala' },
      { name: 'Kumarakom Lake Resort', stars: 5, pricePerNight: 350, rating: 4.9, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80', amenities: ['Houseboat', 'Ayurvedic Spa', 'Backwater Views', 'Pool', 'Restaurant'], bookingUrl: 'https://www.kumarakomlakeresort.in', address: 'Kumarakom, Kerala' }
    ],
    attractions: [
      { name: 'Alleppey Backwaters Houseboat', type: 'Experience', description: 'Overnight houseboat on Kerala backwaters', entryFee: 80, duration: 'Full day' },
      { name: 'Munnar Tea Gardens', type: 'Nature', description: 'Scenic hill station with tea estates', entryFee: 5, duration: 'Full day' },
      { name: 'Periyar Wildlife Sanctuary', type: 'Nature', description: 'Elephant and tiger reserve', entryFee: 25, duration: 'Full day' },
      { name: 'Fort Kochi Beach', type: 'Beach', description: 'Historical beach with Chinese fishing nets', entryFee: 0, duration: '2 hours' }
    ]
  },
  {
    name: 'Goa', city: 'Panaji', country: 'India',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    rating: 4.5,
    avgDailyBudget: { budget: 30, mid: 80, luxury: 220 },
    hotels: [
      { name: 'Anjuna Beach Hostel', stars: 2, pricePerNight: 15, rating: 4.2, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', amenities: ['WiFi', 'Pool', 'Bar'], bookingUrl: 'https://www.booking.com/search.html?ss=Goa+Hostel', address: 'Anjuna Beach, Goa' },
      { name: 'Taj Exotica Goa', stars: 5, pricePerNight: 380, rating: 4.9, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', amenities: ['Private Beach', 'Pool', 'Spa', 'Casino', 'Fine Dining'], bookingUrl: 'https://www.tajhotels.com/taj-exotica-goa', address: 'Benaulim Beach, Goa' }
    ],
    attractions: [
      { name: 'Calangute Beach', type: 'Beach', description: 'Queen of beaches in Goa', entryFee: 0, duration: 'Half day' },
      { name: 'Basilica of Bom Jesus', type: 'Cultural', description: 'UNESCO World Heritage Church', entryFee: 0, duration: '1 hour' },
      { name: 'Dudhsagar Falls', type: 'Nature', description: 'Magnificent 4-tier waterfall', entryFee: 20, duration: 'Full day' },
      { name: 'Anjuna Flea Market', type: 'Shopping', description: 'Vibrant market with handicrafts', entryFee: 0, duration: '2 hours' }
    ]
  }
];
