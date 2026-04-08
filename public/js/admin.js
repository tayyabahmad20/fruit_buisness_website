/**
 * FreshLux Fruits – admin.js
 * Complete admin dashboard logic.
 */

/* ─────────────────────────────────────
   AUTH CHECK
───────────────────────────────────── */
(function authCheck() {
  if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
  }
})();

/* ─────────────────────────────────────
   DEMO DATA – initialise localStorage if empty
───────────────────────────────────── */
const sampleOrders = [
  {
    id: 'ORD001', customerName: 'Ahmed Khan', phone: '03001234567',
    address: 'House 12, Block B, DHA Karachi', boxType: '10kg',
    items: [{ name: 'Sindhri Mangoes', emoji: '🥭', quantity: 1, price: 1600 }],
    totalAmount: 1600, status: 'delivered', date: '2024-01-15'
  },
  {
    id: 'ORD002', customerName: 'Sara Ahmed', phone: '03211234567',
    address: 'Flat 5, Gulshan-e-Iqbal, Karachi', boxType: '5kg',
    items: [{ name: 'Strawberries', emoji: '🍓', quantity: 1, price: 1200 }],
    totalAmount: 1200, status: 'out_for_delivery', date: '2024-01-15'
  },
  {
    id: 'ORD003', customerName: 'Usman Tariq', phone: '03451234567',
    address: 'Plot 22, F-8, Islamabad', boxType: '10kg',
    items: [{ name: 'Kashmiri Apples', emoji: '🍎', quantity: 2, price: 2800 }],
    totalAmount: 2800, status: 'packed', date: '2024-01-14'
  },
  {
    id: 'ORD004', customerName: 'Fatima Malik', phone: '03331234567',
    address: 'Street 7, Model Town, Lahore', boxType: '5kg',
    items: [{ name: 'Blood Oranges', emoji: '🍊', quantity: 1, price: 600 }],
    totalAmount: 600, status: 'pending', date: '2024-01-14'
  },
  {
    id: 'ORD005', customerName: 'Ali Hassan', phone: '03041234567',
    address: 'Sector G-10, Islamabad', boxType: 'custom',
    items: [
      { name: 'Green Grapes', emoji: '🍇', quantity: 1, price: 950 },
      { name: 'Bananas', emoji: '🍌', quantity: 1, price: 400 }
    ],
    totalAmount: 1350, status: 'delivered', date: '2024-01-13'
  },
  {
    id: 'ORD006', customerName: 'Zara Qureshi', phone: '03121234567',
    address: 'Block 14, Federal B Area, Karachi', boxType: '10kg',
    items: [{ name: 'Sindhri Mangoes', emoji: '🥭', quantity: 1, price: 1600 }],
    totalAmount: 1600, status: 'pending', date: '2024-01-13'
  },
  {
    id: 'ORD007', customerName: 'Bilal Shah', phone: '03051234567',
    address: 'Johar Town, Lahore', boxType: '5kg',
    items: [{ name: 'Strawberries', emoji: '🍓', quantity: 2, price: 2400 }],
    totalAmount: 2400, status: 'delivered', date: '2024-01-12'
  },
  {
    id: 'ORD008', customerName: 'Hina Baig', phone: '03231234567',
    address: 'Bahria Town, Rawalpindi', boxType: '10kg',
    items: [{ name: 'Kashmiri Apples', emoji: '🍎', quantity: 1, price: 1400 }],
    totalAmount: 1400, status: 'packed', date: '2024-01-12'
  }
];

const sampleProducts = [
  { id: 'mango',      name: 'Sindhri Mangoes',  emoji: '🥭', category: 'Fruit', price5kg: 850,  price10kg: 1600, available: true,  featured: true  },
  { id: 'strawberry', name: 'Strawberries',      emoji: '🍓', category: 'Fruit', price5kg: 1200, price10kg: 2200, available: true,  featured: true  },
  { id: 'grapes',     name: 'Green Grapes',      emoji: '🍇', category: 'Fruit', price5kg: 950,  price10kg: 1800, available: true,  featured: false },
  { id: 'orange',     name: 'Blood Oranges',     emoji: '🍊', category: 'Fruit', price5kg: 600,  price10kg: 1100, available: true,  featured: false },
  { id: 'apple',      name: 'Kashmiri Apples',   emoji: '🍎', category: 'Fruit', price5kg: 750,  price10kg: 1400, available: true,  featured: true  },
  { id: 'banana',     name: 'Bananas',           emoji: '🍌', category: 'Fruit', price5kg: 400,  price10kg: 750,  available: true,  featured: false }
];

function initDemoData() {
  if (!localStorage.getItem('fl_orders')) {
    localStorage.setItem('fl_orders', JSON.stringify(sampleOrders));
  }
  if (!localStorage.getItem('fl_products')) {
    localStorage.setItem('fl_products', JSON.stringify(sampleProducts));
  }
}

function getOrders()   { return JSON.parse(localStorage.getItem('fl_orders') || '[]'); }
function getProducts() { return JSON.parse(localStorage.getItem('fl_products') || '[]'); }
function saveOrders(o)   { localStorage.setItem('fl_orders', JSON.stringify(o)); }
function saveProducts(p) { localStorage.setItem('fl_products', JSON.stringify(p)); }

/* ─────────────────────────────────────
   NAVIGATION – show/hide sections
───────────────────────────────────── */
const sections = ['dashboard', 'orders', 'products', 'analytics'];

function showSection(name, btn) {
  // Hide all sections
  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) el.classList.add('hidden');
  });
  // Show target
  const target = document.getElementById(`section-${name}`);
  if (target) target.classList.remove('hidden');

  // Update sidebar active state
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Update page title
  const titles = { dashboard: 'Dashboard', orders: 'Orders', products: 'Products', analytics: 'Analytics' };
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = titles[name] || name;

  // Lazy-init charts when analytics section opens
  if (name === 'analytics') initCharts();

  // Close mobile sidebar
  closeSidebar();
}

/* ─────────────────────────────────────
   SIDEBAR – mobile toggle
───────────────────────────────────── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (sb.classList.contains('open')) {
    closeSidebar();
  } else {
    sb.classList.add('open');
    if (ov) ov.classList.add('show');
  }
}

function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
}

/* ─────────────────────────────────────
   DASHBOARD – stats & recent orders
───────────────────────────────────── */
function renderDashboard() {
  const orders = getOrders();

  // Stats
  const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const pending   = orders.filter(o => o.status === 'pending').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;

  setEl('stat-orders',   orders.length);
  setEl('stat-revenue',  `Rs.${totalRevenue.toLocaleString()}`);
  setEl('stat-pending',  pending);
  setEl('stat-delivered', delivered);

  // Recent orders (last 5)
  const recent = [...orders].reverse().slice(0, 5);
  const tbody = document.getElementById('recent-orders-body');
  if (!tbody) return;
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td class="font-mono text-xs">${o.id}</td>
      <td>${escHtml(o.customerName)}</td>
      <td>${o.boxType}</td>
      <td class="font-semibold" style="color:var(--primary-green)">Rs.${(o.totalAmount||0).toLocaleString()}</td>
      <td><span class="badge badge-${o.status}">${formatStatus(o.status)}</span></td>
      <td class="text-xs" style="color:var(--text-secondary)">${o.date || ''}</td>
    </tr>
  `).join('');
}

/* ─────────────────────────────────────
   ORDERS – full table with status update
───────────────────────────────────── */
function renderOrdersTable(ordersArr) {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;
  if (!ordersArr || ordersArr.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8" style="color:var(--text-secondary)">No orders found.</td></tr>';
    return;
  }
  tbody.innerHTML = ordersArr.map(o => `
    <tr>
      <td class="font-mono text-xs">${o.id}</td>
      <td class="font-semibold">${escHtml(o.customerName)}</td>
      <td><a href="tel:${o.phone}" style="color:var(--primary-green)">${o.phone}</a></td>
      <td>${o.boxType}</td>
      <td class="font-semibold" style="color:var(--primary-orange)">Rs.${(o.totalAmount||0).toLocaleString()}</td>
      <td>
        <select class="form-input text-xs py-1 px-2 w-36"
          onchange="updateOrderStatus('${o.id}', this.value)">
          ${['pending','packed','out_for_delivery','delivered'].map(s =>
            `<option value="${s}" ${o.status===s?'selected':''}>${formatStatus(s)}</option>`
          ).join('')}
        </select>
      </td>
      <td class="text-xs" style="color:var(--text-secondary)">${o.date || ''}</td>
    </tr>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx > -1) {
    orders[idx].status = newStatus;
    saveOrders(orders);
    renderDashboard();
    filterOrders();
  }
}

function filterOrders() {
  const query = (document.getElementById('order-search')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('order-status-filter')?.value || '';
  let orders = getOrders();

  if (query) {
    orders = orders.filter(o =>
      o.customerName.toLowerCase().includes(query) ||
      o.phone.includes(query) ||
      o.id.toLowerCase().includes(query)
    );
  }
  if (statusFilter) {
    orders = orders.filter(o => o.status === statusFilter);
  }

  renderOrdersTable(orders);
}

/* ─────────────────────────────────────
   PRODUCTS – table, modal, CRUD
───────────────────────────────────── */
function renderProductsTable() {
  const products = getProducts();
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  tbody.innerHTML = products.map(p => `
    <tr>
      <td class="text-2xl">${p.emoji}</td>
      <td class="font-semibold">${escHtml(p.name)}</td>
      <td style="color:var(--text-secondary)">${p.category || 'Fruit'}</td>
      <td style="color:var(--primary-green)">Rs.${(p.price5kg||0).toLocaleString()}</td>
      <td style="color:var(--primary-green)">Rs.${(p.price10kg||0).toLocaleString()}</td>
      <td>
        <button onclick="toggleAvailability('${p.id}')"
          class="badge ${p.available ? 'badge-delivered' : 'badge-pending'} cursor-pointer">
          ${p.available ? '✅ Yes' : '❌ No'}
        </button>
      </td>
      <td>
        <span class="badge ${p.featured ? 'badge-packed' : ''}">
          ${p.featured ? '⭐ Yes' : '—'}
        </span>
      </td>
      <td>
        <button onclick="openProductModal('${p.id}')"
          class="text-blue-500 hover:text-blue-700 mr-2 font-semibold text-sm">✏️ Edit</button>
        <button onclick="deleteProduct('${p.id}')"
          class="text-red-500 hover:text-red-700 font-semibold text-sm">🗑️ Del</button>
      </td>
    </tr>
  `).join('');
}

function toggleAvailability(productId) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === productId);
  if (idx > -1) {
    products[idx].available = !products[idx].available;
    saveProducts(products);
    renderProductsTable();
  }
}

function openProductModal(productId) {
  const modal = document.getElementById('product-modal');
  const titleEl = document.getElementById('modal-title');
  const form = document.getElementById('product-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('product-edit-id').value = '';

  if (productId) {
    const products = getProducts();
    const p = products.find(pr => pr.id === productId);
    if (p) {
      titleEl.textContent = '✏️ Edit Product';
      document.getElementById('product-edit-id').value = p.id;
      document.getElementById('p-name').value = p.name || '';
      document.getElementById('p-emoji').value = p.emoji || '';
      document.getElementById('p-category').value = p.category || 'Fruit';
      document.getElementById('p-price5').value = p.price5kg || '';
      document.getElementById('p-price10').value = p.price10kg || '';
      document.getElementById('p-available').checked = !!p.available;
      document.getElementById('p-featured').checked = !!p.featured;
    }
  } else {
    titleEl.textContent = '+ Add Product';
    document.getElementById('p-available').checked = true;
    document.getElementById('p-category').value = 'Fruit';
  }

  modal.classList.remove('hidden');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
}

function saveProduct(e) {
  e.preventDefault();
  const editId = document.getElementById('product-edit-id').value;
  const name     = document.getElementById('p-name').value.trim();
  const emoji    = document.getElementById('p-emoji').value.trim();
  const category = document.getElementById('p-category').value.trim() || 'Fruit';
  const price5kg  = parseInt(document.getElementById('p-price5').value, 10);
  const price10kg = parseInt(document.getElementById('p-price10').value, 10);
  const available = document.getElementById('p-available').checked;
  const featured  = document.getElementById('p-featured').checked;

  if (!name || !emoji || isNaN(price5kg) || isNaN(price10kg)) {
    alert('Please fill in all required fields.');
    return;
  }

  const products = getProducts();

  if (editId) {
    const idx = products.findIndex(p => p.id === editId);
    if (idx > -1) {
      products[idx] = { ...products[idx], name, emoji, category, price5kg, price10kg, available, featured };
    }
  } else {
    const newId = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    products.push({ id: newId, name, emoji, category, price5kg, price10kg, available, featured });
  }

  saveProducts(products);
  closeProductModal();
  renderProductsTable();
}

function deleteProduct(productId) {
  if (!confirm('Delete this product? This cannot be undone.')) return;
  const products = getProducts().filter(p => p.id !== productId);
  saveProducts(products);
  renderProductsTable();
}

/* ─────────────────────────────────────
   ANALYTICS – Chart.js
───────────────────────────────────── */
let chartOrdersByDay = null;
let chartStatusDist  = null;

function initCharts() {
  const orders = getOrders();

  // Destroy existing chart instances before recreating
  if (chartOrdersByDay) { chartOrdersByDay.destroy(); chartOrdersByDay = null; }
  if (chartStatusDist)  { chartStatusDist.destroy();  chartStatusDist = null; }

  // ── Orders by Day (last 7 days) ──
  const days = getLast7Days();
  const countsByDay = days.map(day => orders.filter(o => o.date === day).length);

  const ctxDay = document.getElementById('chart-orders-by-day');
  if (ctxDay) {
    chartOrdersByDay = new Chart(ctxDay, {
      type: 'bar',
      data: {
        labels: days.map(d => {
          const dt = new Date(d);
          return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [{
          label: 'Orders',
          data: countsByDay,
          backgroundColor: 'rgba(45, 106, 79, 0.7)',
          borderColor: '#2d6a4f',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }

  // ── Status Distribution (Doughnut) ──
  const statusCounts = {
    pending:          orders.filter(o => o.status === 'pending').length,
    packed:           orders.filter(o => o.status === 'packed').length,
    out_for_delivery: orders.filter(o => o.status === 'out_for_delivery').length,
    delivered:        orders.filter(o => o.status === 'delivered').length
  };

  const ctxStatus = document.getElementById('chart-status-dist');
  if (ctxStatus) {
    chartStatusDist = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Packed', 'Out for Delivery', 'Delivered'],
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#fbbf24', '#60a5fa', '#fb923c', '#34d399'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

/** Return array of last 7 date strings (YYYY-MM-DD) */
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

/* ─────────────────────────────────────
   DARK MODE
───────────────────────────────────── */
function applyAdminDark(dark) {
  const html = document.documentElement;
  dark ? html.classList.add('dark') : html.classList.remove('dark');
}

function toggleAdminDark() {
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('freshlux_dark', !isDark);
  applyAdminDark(!isDark);
}

/* ─────────────────────────────────────
   LOGOUT
───────────────────────────────────── */
function logout() {
  if (confirm('Log out of admin panel?')) {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
  }
}

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────── */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatStatus(s) {
  const map = {
    pending: 'Pending',
    packed: 'Packed',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered'
  };
  return map[s] || s;
}

/* ─────────────────────────────────────
   INIT on DOMContentLoaded
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved dark mode
  const savedDark = localStorage.getItem('freshlux_dark') === 'true';
  applyAdminDark(savedDark);

  // Set admin username
  const adminName = localStorage.getItem('adminUsername') || 'Admin';
  setEl('admin-name', adminName);

  // Seed demo data
  initDemoData();

  // Render default dashboard
  renderDashboard();

  // Pre-render orders/products so they're ready when tab is clicked
  filterOrders();
  renderProductsTable();
});
