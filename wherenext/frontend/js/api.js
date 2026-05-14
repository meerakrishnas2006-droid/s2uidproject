// Central API helper for all frontend pages
const API_BASE = 'http://localhost:5000/api';

// ── Token helpers ──────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('wn_token'); }
function getUser()  { const u = localStorage.getItem('wn_user'); return u ? JSON.parse(u) : null; }
function setAuth(token, user) {
  localStorage.setItem('wn_token', token);
  localStorage.setItem('wn_user', JSON.stringify(user));
}
function clearAuth() {
  localStorage.removeItem('wn_token');
  localStorage.removeItem('wn_user');
}
function isLoggedIn() { return !!getToken(); }
function isAdmin()    { const u = getUser(); return u && u.role === 'admin'; }

// ── Generic fetch wrapper ──────────────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Auth API ───────────────────────────────────────────────────────────────
const Auth = {
  async register(payload) { return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }); },
  async login(payload)    { return apiFetch('/auth/login',    { method: 'POST', body: JSON.stringify(payload) }); },
  async me()              { return apiFetch('/auth/me'); },
  logout() { clearAuth(); window.location.href = 'login.html'; }
};

// ── Planner API ────────────────────────────────────────────────────────────
const Planner = {
  async generate(payload) { return apiFetch('/planner/generate', { method: 'POST', body: JSON.stringify(payload) }); },
  async myPlans()         { return apiFetch('/planner/my-plans'); },
  async getPlan(id)       { return apiFetch(`/planner/my-plans/${id}`); },
  async deletePlan(id)    { return apiFetch(`/planner/my-plans/${id}`, { method: 'DELETE' }); },
  async destinations(q)   { return apiFetch(`/planner/destinations${q ? '?q=' + encodeURIComponent(q) : ''}`); }
};

// ── Admin API ──────────────────────────────────────────────────────────────
const Admin = {
  async getDestinations()       { return apiFetch('/admin/destinations'); },
  async addDestination(data)    { return apiFetch('/admin/destinations', { method: 'POST', body: JSON.stringify(data) }); },
  async updateDestination(id, data) { return apiFetch(`/admin/destinations/${id}`, { method: 'PUT', body: JSON.stringify(data) }); },
  async deleteDestination(id)   { return apiFetch(`/admin/destinations/${id}`, { method: 'DELETE' }); },
  async addHotel(destId, data)  { return apiFetch(`/admin/destinations/${destId}/hotels`, { method: 'POST', body: JSON.stringify(data) }); },
  async deleteHotel(destId, hotelId) { return apiFetch(`/admin/destinations/${destId}/hotels/${hotelId}`, { method: 'DELETE' }); },
  async getStats()              { return apiFetch('/admin/stats'); }
};

// ── Guard helpers ──────────────────────────────────────────────────────────
function requireAuth(redirectTo = 'login.html') {
  if (!isLoggedIn()) { window.location.href = redirectTo; return false; }
  return true;
}
function requireAdmin() {
  if (!isLoggedIn()) { window.location.href = 'login.html'; return false; }
  if (!isAdmin())    { window.location.href = 'plan.html'; return false; }
  return true;
}

// ── Update navbar based on auth state ─────────────────────────────────────
function syncNav() {
  const user = getUser();
  const navRight = document.getElementById('navRight');
  if (!navRight) return;
  if (user) {
    navRight.innerHTML = `
      ${user.role === 'admin' ? '<a href="admin.html" class="nav-link">Admin Panel</a>' : ''}
      <a href="plan.html" class="nav-link">Plan Trip</a>
      <a href="dashboard.html" class="nav-link">My Trips</a>
      <div class="nav-user">
        <span class="nav-avatar">${user.name.charAt(0).toUpperCase()}</span>
        <span>${user.name.split(' ')[0]}</span>
        <button onclick="Auth.logout()" class="nav-logout" title="Sign out"><i class="ri-logout-box-r-line"></i></button>
      </div>`;
  } else {
    navRight.innerHTML = `<a href="login.html" class="nav-cta">Sign In</a><button class="mobile-toggle" id="mobileToggle"><i class="ri-menu-line"></i></button>`;
  }
}

// ── Toast notifications ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="ri-${type === 'success' ? 'check' : 'error-warning'}-line"></i> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

// ── Spinner helpers ────────────────────────────────────────────────────────
function showSpinner(id) { const el = document.getElementById(id); if (el) el.style.display = 'flex'; }
function hideSpinner(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
