# Where Next – Travel Planner

A full-stack travel planning website with Admin and User roles.

## Project Structure

```
wherenext/
├── frontend/          # Pure HTML + CSS + JavaScript
│   ├── index.html     # Home page (video slideshow, destinations, packages)
│   ├── login.html     # Login page
│   ├── signup.html    # Signup page (NEW)
│   ├── explore.html   # Explore packages
│   ├── plan.html      # Trip planner (users input destination/budget/days)
│   ├── dashboard.html # My saved trips
│   ├── admin.html     # Admin panel (manage destinations & hotels)
│   ├── css/style.css  # All styles
│   └── js/
│       ├── api.js     # API client + auth helpers + toast
│       ├── script.js  # Home page animations
│       ├── plan.js    # Planner logic + itinerary renderer
│       └── admin.js   # Admin CRUD logic
└── backend/           # Node.js + Express + MongoDB
    ├── server.js
    ├── .env
    ├── models/
    │   ├── User.js
    │   ├── Destination.js
    │   └── TravelPlan.js
    ├── routes/
    │   ├── auth.js    # Register, Login, Me
    │   ├── planner.js # Generate plan, My plans
    │   └── admin.js   # Destination CRUD, Hotel CRUD, Stats
    ├── middleware/auth.js
    └── data/mockDestinations.js  # 10 built-in destinations
```

## Quick Start

### 1. Start MongoDB
```bash
brew services start mongodb-community
# or
mongod
```

### 2. Start Backend
```bash
cd wherenext/backend
npm install     # first time only
node server.js  # or: npm run dev (with nodemon)
```
Server runs on **http://localhost:5000**

### 3. Open Frontend
Open `wherenext/frontend/index.html` directly in your browser — no build step needed.

---

## Default Accounts

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| Admin | admin@wherenext.com     | admin123  |

New users can register at `signup.html`.

---

## Features

### Normal User
- Sign up / Login
- Enter destination, budget (USD), number of days, travelers
- Get a full **day-by-day itinerary** instantly
- View **recommended hotels** with star rating, price/night, amenities
- Get **direct booking links** (Booking.com, Skyscanner, Airbnb, TripAdvisor, Viator)
- Save and manage trips in **My Trips** dashboard

### Admin
- Add / Edit / Delete destinations with details
- Add hotels to destinations (name, stars, price, booking URL, amenities)
- View platform statistics (users, destinations, travel plans)

### Data Priority
1. **DB first** – If admin has added the destination, uses that rich data
2. **Mock data** – 10 built-in destinations: Bali, Paris, Maldives, Tokyo, Santorini, Swiss Alps, New York, Dubai, Kerala, Goa
3. **Generated** – Any other destination gets a smart generated itinerary

---

## API Endpoints

### Auth
| Method | Endpoint          | Access |
|--------|-------------------|--------|
| POST   | /api/auth/register | Public |
| POST   | /api/auth/login   | Public |
| GET    | /api/auth/me      | Auth   |

### Planner
| Method | Endpoint                  | Access |
|--------|---------------------------|--------|
| POST   | /api/planner/generate     | Auth   |
| GET    | /api/planner/my-plans     | Auth   |
| GET    | /api/planner/my-plans/:id | Auth   |
| DELETE | /api/planner/my-plans/:id | Auth   |
| GET    | /api/planner/destinations | Public |

### Admin
| Method | Endpoint                              | Access |
|--------|---------------------------------------|--------|
| GET    | /api/admin/destinations               | Admin  |
| POST   | /api/admin/destinations               | Admin  |
| PUT    | /api/admin/destinations/:id           | Admin  |
| DELETE | /api/admin/destinations/:id           | Admin  |
| POST   | /api/admin/destinations/:id/hotels    | Admin  |
| DELETE | /api/admin/destinations/:id/hotels/:hid | Admin |
| GET    | /api/admin/stats                      | Admin  |
