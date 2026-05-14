// admin.js – Admin Panel Logic
requireAdmin();
syncNav();

let allDests = [];

// ── Load stats ──────────────────────────────────────────────────────────────
async function loadStats() {
  try {
    const res = await Admin.getStats();
    document.getElementById('statDest').textContent  = res.data.destinations;
    document.getElementById('statUsers').textContent = res.data.users;
    document.getElementById('statPlans').textContent = res.data.plans;
  } catch (_) {}
}

// ── Load destinations ───────────────────────────────────────────────────────
async function loadDests() {
  try {
    const res = await Admin.getDestinations();
    allDests = res.data;
    document.getElementById('destsLoading').style.display = 'none';
    if (!allDests.length) { document.getElementById('destsEmpty').style.display = 'flex'; return; }
    renderDestsTable(allDests);
    document.getElementById('destsTableWrap').style.display = 'block';
  } catch (err) {
    document.getElementById('destsLoading').innerHTML = `<i class="ri-error-warning-line"></i><p>${err.message}</p>`;
  }
}

function renderDestsTable(dests) {
  const tbody = document.getElementById('destsBody');
  tbody.innerHTML = dests.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td>${d.country}</td>
      <td><span class="cat-badge cat-${d.category.toLowerCase()}">${d.category}</span></td>
      <td>${(d.hotels||[]).length} <button class="icon-btn" onclick="openHotelModal('${d._id}','${d.name}')" title="Add hotel"><i class="ri-add-circle-line"></i></button></td>
      <td><i class="ri-star-fill" style="color:var(--accent)"></i> ${d.rating}</td>
      <td class="table-actions">
        <button class="icon-btn edit-btn" onclick="openEditDestModal('${d._id}')" title="Edit"><i class="ri-edit-line"></i></button>
        <button class="icon-btn del-btn" onclick="deleteDest('${d._id}')" title="Delete"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>`).join('');
}

function filterDests(q) {
  const filtered = q ? allDests.filter(d =>
    d.name.toLowerCase().includes(q.toLowerCase()) ||
    d.country.toLowerCase().includes(q.toLowerCase())
  ) : allDests;
  renderDestsTable(filtered);
}

// ── Add Destination Modal ───────────────────────────────────────────────────
function openAddDestModal() {
  document.getElementById('destId').value = '';
  document.getElementById('destModalTitle').textContent = 'Add Destination';
  document.getElementById('destForm').reset();
  document.getElementById('destModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function openEditDestModal(id) {
  const d = allDests.find(x => x._id === id);
  if (!d) return;
  document.getElementById('destId').value = id;
  document.getElementById('destModalTitle').textContent = 'Edit Destination';
  document.getElementById('destName').value = d.name;
  document.getElementById('destCity').value = d.city;
  document.getElementById('destCountry').value = d.country;
  document.getElementById('destCategory').value = d.category;
  document.getElementById('destRating').value = d.rating;
  document.getElementById('destImage').value = d.image || '';
  document.getElementById('destDesc').value = d.description || '';
  document.getElementById('destTags').value = (d.tags||[]).join(', ');
  document.getElementById('destFlightUrl').value = d.flightSearchUrl || '';
  document.getElementById('destBudget').value = d.avgDailyBudget?.budget || '';
  document.getElementById('destMid').value = d.avgDailyBudget?.mid || '';
  document.getElementById('destLuxury').value = d.avgDailyBudget?.luxury || '';
  document.getElementById('destModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDestModal() {
  document.getElementById('destModal').style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('destForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id  = document.getElementById('destId').value;
  const btn = document.getElementById('destSaveBtn');
  const sp  = document.getElementById('destSaveSpinner');
  const tx  = document.getElementById('destSaveTxt');
  btn.disabled = true; tx.style.display = 'none'; sp.style.display = 'inline';

  const payload = {
    name: document.getElementById('destName').value.trim(),
    city: document.getElementById('destCity').value.trim(),
    country: document.getElementById('destCountry').value.trim(),
    category: document.getElementById('destCategory').value,
    rating: parseFloat(document.getElementById('destRating').value) || 4.5,
    image: document.getElementById('destImage').value.trim(),
    description: document.getElementById('destDesc').value.trim(),
    flightSearchUrl: document.getElementById('destFlightUrl').value.trim(),
    tags: document.getElementById('destTags').value.split(',').map(t => t.trim()).filter(Boolean),
    avgDailyBudget: {
      budget: parseFloat(document.getElementById('destBudget').value) || 60,
      mid: parseFloat(document.getElementById('destMid').value) || 150,
      luxury: parseFloat(document.getElementById('destLuxury').value) || 350
    }
  };

  try {
    if (id) { await Admin.updateDestination(id, payload); showToast('Destination updated!'); }
    else     { await Admin.addDestination(payload); showToast('Destination added!'); }
    closeDestModal();
    await loadDests();
    await loadStats();
  } catch (err) { showToast(err.message, 'error'); }
  finally { btn.disabled = false; tx.style.display = 'inline'; sp.style.display = 'none'; }
});

async function deleteDest(id) {
  if (!confirm('Delete this destination? All its hotels will also be removed.')) return;
  try {
    await Admin.deleteDestination(id);
    showToast('Destination deleted');
    await loadDests();
    await loadStats();
  } catch (err) { showToast(err.message, 'error'); }
}

// ── Hotel Modal ─────────────────────────────────────────────────────────────
function openHotelModal(destId, destName) {
  document.getElementById('hotelDestId').value = destId;
  document.getElementById('hotelDestName').textContent = `For: ${destName}`;
  document.getElementById('hotelForm').reset();
  document.getElementById('hotelModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeHotelModal() {
  document.getElementById('hotelModal').style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('hotelForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const destId = document.getElementById('hotelDestId').value;
  const payload = {
    name: document.getElementById('hotelName').value.trim(),
    stars: parseInt(document.getElementById('hotelStars').value) || 3,
    pricePerNight: parseFloat(document.getElementById('hotelPrice').value),
    rating: parseFloat(document.getElementById('hotelRating').value) || 4.0,
    address: document.getElementById('hotelAddress').value.trim(),
    image: document.getElementById('hotelImage').value.trim(),
    bookingUrl: document.getElementById('hotelBookingUrl').value.trim(),
    amenities: document.getElementById('hotelAmenities').value.split(',').map(a => a.trim()).filter(Boolean)
  };
  try {
    await Admin.addHotel(destId, payload);
    showToast('Hotel added!');
    closeHotelModal();
    await loadDests();
  } catch (err) { showToast(err.message, 'error'); }
});

// ── Init ────────────────────────────────────────────────────────────────────
loadStats();
loadDests();
