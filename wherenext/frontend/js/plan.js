// plan.js – Trip Planner Logic
requireAuth();
syncNav();

// Budget tier detector
const daysInp   = document.getElementById('days');
const budgetInp = document.getElementById('budget');
const travInp   = document.getElementById('travelers');

function updateTier() {
  const d = parseFloat(daysInp.value) || 1;
  const b = parseFloat(budgetInp.value) || 0;
  const t = parseFloat(travInp.value)  || 1;
  if (!b) { document.getElementById('budgetTiers').style.display = 'none'; return; }
  const ppd = b / d / t;
  document.getElementById('budgetTiers').style.display = 'block';
  document.getElementById('tierBudget').classList.toggle('active', ppd < 80);
  document.getElementById('tierMid').classList.toggle('active', ppd >= 80 && ppd < 200);
  document.getElementById('tierLuxury').classList.toggle('active', ppd >= 200);
}
[daysInp, budgetInp, travInp].forEach(el => el && el.addEventListener('input', updateTier));

// Form submit
document.getElementById('plannerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const destination = document.getElementById('destination').value.trim();
  const days        = parseInt(document.getElementById('days').value);
  const budget      = parseFloat(document.getElementById('budget').value);
  const travelers   = parseInt(document.getElementById('travelers').value) || 1;
  const btn         = document.getElementById('generateBtn');
  const spinner     = document.getElementById('generateSpinner');
  const btnText     = document.getElementById('generateBtnText');

  btn.disabled = true; btnText.style.display = 'none'; spinner.style.display = 'inline';
  try {
    const res  = await Planner.generate({ destination, days, budget, travelers });
    const plan = res.data;
    renderPlan(plan);
    document.getElementById('plannerCard').style.display = 'none';
    document.getElementById('planResults').style.display = 'block';
    document.getElementById('planResults').scrollIntoView({ behavior: 'smooth' });
    showToast('Travel plan generated! 🗺️', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false; btnText.style.display = 'inline'; spinner.style.display = 'none';
  }
});

function renderPlan(plan) {
  // Overview
  const catIcon = { budget: '💰', mid: '✈️', luxury: '💎' };
  document.getElementById('planOverview').innerHTML = `
    <div class="overview-card">
      <div class="overview-dest">
        <h2><i class="ri-map-pin-2-fill"></i> ${plan.destination}${plan.country ? ', ' + plan.country : ''}</h2>
        <div class="overview-meta">
          <span><i class="ri-calendar-line"></i> ${plan.days} Days</span>
          <span><i class="ri-group-line"></i> ${plan.travelers} Traveler${plan.travelers > 1 ? 's' : ''}</span>
          <span>${catIcon[plan.budgetCategory] || '✈️'} ${plan.budgetCategory.charAt(0).toUpperCase() + plan.budgetCategory.slice(1)} Budget</span>
          <span><i class="ri-money-dollar-circle-line"></i> Budget: $${plan.budget.toLocaleString()}</span>
          <span class="est-cost"><i class="ri-price-tag-3-line"></i> Est. Total: $${(plan.totalEstimatedCost||0).toLocaleString()}</span>
        </div>
      </div>
      <div class="source-badge source-${plan.source}">
        ${plan.source === 'db' ? '<i class="ri-database-2-line"></i> From our database' : '<i class="ri-sparkling-line"></i> Smart generated plan'}
      </div>
    </div>`;

  // Itinerary
  const itin = document.getElementById('itineraryContainer');
  itin.innerHTML = '';
  (plan.itinerary || []).forEach(day => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="day-header" onclick="this.parentElement.classList.toggle('open')">
        <div class="day-num">Day ${day.day}</div>
        <div class="day-title">${day.title}</div>
        <i class="ri-arrow-down-s-line day-chevron"></i>
      </div>
      <div class="day-body">
        ${(day.activities||[]).map(a => `
          <div class="activity-row">
            <div class="activity-time">${a.time||''}</div>
            <div class="activity-dot"></div>
            <div class="activity-info">
              <div class="activity-name">${a.activity}</div>
              ${a.location ? `<div class="activity-location"><i class="ri-map-pin-line"></i>${a.location}</div>` : ''}
              ${a.notes ? `<div class="activity-notes">${a.notes}</div>` : ''}
            </div>
            <div class="activity-cost">${a.cost > 0 ? '$' + a.cost : 'Free'}</div>
          </div>`).join('')}
      </div>`;
    itin.appendChild(card);
    // Open first day by default
    if (day.day === 1) card.classList.add('open');
  });

  // Hotels
  const hotelsCont = document.getElementById('hotelsContainer');
  if (plan.recommendedHotels && plan.recommendedHotels.length > 0) {
    hotelsCont.innerHTML = plan.recommendedHotels.map(h => `
      <div class="hotel-card">
        <div class="hotel-img">
          <img src="${h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'}" alt="${h.name}" loading="lazy">
          <div class="hotel-stars">${'★'.repeat(h.stars||3)}</div>
        </div>
        <div class="hotel-body">
          <h3>${h.name}</h3>
          ${h.address ? `<p class="hotel-addr"><i class="ri-map-pin-line"></i>${h.address}</p>` : ''}
          <div class="hotel-amenities">${(h.amenities||[]).slice(0,4).map(a=>`<span>${a}</span>`).join('')}</div>
          <div class="hotel-footer">
            <div class="hotel-price"><span class="price-amt">$${h.pricePerNight}</span><span>/night</span></div>
            <div class="hotel-rating"><i class="ri-star-fill"></i>${h.rating||4.0}</div>
          </div>
          ${h.bookingUrl ? `<a href="${h.bookingUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm hotel-book-btn"><i class="ri-hotel-line"></i> Book Now</a>` : ''}
        </div>
      </div>`).join('');
  } else {
    hotelsCont.innerHTML = `<div class="empty-state"><i class="ri-hotel-line"></i><p>No hotel data available for this destination yet.</p></div>`;
  }

  // Booking Links
  const destSlug = encodeURIComponent(plan.destination);
  document.getElementById('bookingLinksContainer').innerHTML = `
    <a href="https://www.booking.com/search.html?ss=${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-hotel-line"></i><div><strong>Booking.com</strong><span>Hotels, apartments &amp; more</span></div><i class="ri-external-link-line"></i>
    </a>
    <a href="https://www.skyscanner.com/transport/flights/${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-flight-takeoff-line"></i><div><strong>Skyscanner</strong><span>Find cheapest flights</span></div><i class="ri-external-link-line"></i>
    </a>
    <a href="https://www.airbnb.com/s/${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-home-heart-line"></i><div><strong>Airbnb</strong><span>Unique stays &amp; experiences</span></div><i class="ri-external-link-line"></i>
    </a>
    <a href="https://www.tripadvisor.com/Search?q=${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-star-line"></i><div><strong>TripAdvisor</strong><span>Reviews &amp; attractions</span></div><i class="ri-external-link-line"></i>
    </a>
    <a href="https://www.viator.com/search/${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-map-2-line"></i><div><strong>Viator</strong><span>Tours, activities &amp; day trips</span></div><i class="ri-external-link-line"></i>
    </a>
    <a href="https://maps.google.com/search/${destSlug}" target="_blank" rel="noopener" class="booking-link-card">
      <i class="ri-road-map-line"></i><div><strong>Google Maps</strong><span>Explore &amp; navigate</span></div><i class="ri-external-link-line"></i>
    </a>`;
}
