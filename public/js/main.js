/**
 * FreshLux Fruits – main.js
 * Complete frontend logic for the customer-facing website.
 */

/* ─────────────────────────────────────
   1. LOADING SCREEN
───────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.classList.add('hidden');
  }, 1500);
});

/* ─────────────────────────────────────
   2. DARK MODE TOGGLE
───────────────────────────────────── */
function applyDarkMode(dark) {
  const html = document.documentElement;
  const btn = document.getElementById('dark-mode-btn');
  if (dark) {
    html.classList.add('dark');
    if (btn) btn.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    if (btn) btn.textContent = '🌙';
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('freshlux_dark', !isDark);
  applyDarkMode(!isDark);
}

// Persist dark mode preference on load
(function initDarkMode() {
  const saved = localStorage.getItem('freshlux_dark');
  applyDarkMode(saved === 'true');
})();

/* ─────────────────────────────────────
   3. PRODUCTS DATA ARRAY
───────────────────────────────────── */
const products = [
  { id: 'mango',      name: 'Sindhri Mangoes',  emoji: '🥭', price5kg: 850,  price10kg: 1600 },
  { id: 'strawberry', name: 'Strawberries',      emoji: '🍓', price5kg: 1200, price10kg: 2200 },
  { id: 'grapes',     name: 'Green Grapes',      emoji: '🍇', price5kg: 950,  price10kg: 1800 },
  { id: 'orange',     name: 'Blood Oranges',     emoji: '🍊', price5kg: 600,  price10kg: 1100 },
  { id: 'apple',      name: 'Kashmiri Apples',   emoji: '🍎', price5kg: 750,  price10kg: 1400 },
  { id: 'banana',     name: 'Bananas',           emoji: '🍌', price5kg: 400,  price10kg: 750  }
];

/* ─────────────────────────────────────
   4. CART STATE (persisted in localStorage)
───────────────────────────────────── */
let cart = { items: [], total: 0 };

function loadCart() {
  try {
    const saved = localStorage.getItem('freshlux_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = { items: [], total: 0 };
  }
}

function saveCart() {
  localStorage.setItem('freshlux_cart', JSON.stringify(cart));
}

/* ─────────────────────────────────────
   5. CART FUNCTIONS
───────────────────────────────────── */

/**
 * Add a product to the cart.
 * @param {Object} product - Product object from the products array
 * @param {string} size - '5kg' or '10kg'
 */
function addToCart(product, size) {
  const price = size === '10kg' ? product.price10kg : product.price5kg;
  const cartItemId = `${product.id}-${size}`;
  const existing = cart.items.find(i => i.cartItemId === cartItemId);

  if (existing) {
    existing.quantity += 1;
    existing.subtotal = existing.quantity * existing.price;
  } else {
    cart.items.push({
      cartItemId,
      id: product.id,
      name: product.name,
      emoji: product.emoji,
      size,
      price,
      quantity: 1,
      subtotal: price
    });
  }

  recalcTotal();
  saveCart();
  updateCartUI();
  openCart();
  showAddedFeedback(product.name);
}

/**
 * Remove an item from the cart by cartItemId.
 */
function removeFromCart(cartItemId) {
  cart.items = cart.items.filter(i => i.cartItemId !== cartItemId);
  recalcTotal();
  saveCart();
  updateCartUI();
  renderCartPanel();
}

/**
 * Recalculate the cart total from items.
 */
function recalcTotal() {
  cart.total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Update the cart badge count in the navbar.
 */
function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  if (badge) {
    badge.textContent = totalItems;
    badge.classList.toggle('show', totalItems > 0);
  }
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `Rs. ${cart.total.toLocaleString()}`;
}

/**
 * Render all cart items inside the cart panel.
 */
function renderCartPanel() {
  const list = document.getElementById('cart-items-list');
  const emptyMsg = document.getElementById('cart-empty-msg');
  if (!list) return;

  // Clear old items (keep empty message)
  list.querySelectorAll('.cart-item').forEach(el => el.remove());

  if (cart.items.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  cart.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="text-3xl">${item.emoji}</span>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm truncate" style="color:var(--text-primary)">${item.name}</div>
        <div class="text-xs" style="color:var(--text-secondary)">${item.size} × ${item.quantity}</div>
        <div class="font-bold text-sm" style="color:var(--primary-green)">Rs. ${item.subtotal.toLocaleString()}</div>
      </div>
      <button onclick="removeFromCart('${item.cartItemId}')"
        class="text-red-400 hover:text-red-600 text-xl leading-none flex-shrink-0" title="Remove">×</button>
    `;
    list.appendChild(div);
  });
}

/* ─────────────────────────────────────
   6. CART PANEL TOGGLE
───────────────────────────────────── */
function openCart() {
  const panel = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  if (panel) panel.classList.add('open');
  if (overlay) overlay.classList.add('visible');
  renderCartPanel();
}

function closeCart() {
  const panel = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  if (panel && panel.classList.contains('open')) {
    closeCart();
  } else {
    openCart();
  }
}

/* ─────────────────────────────────────
   7. BOX BUILDER
───────────────────────────────────── */
let boxType = '5kg';
const selectedFruits = new Set();
const BOX_PRICES = { '5kg': 1800, '10kg': 3200 };

function setBoxType(type) {
  boxType = type;
  // Update button active states
  ['5kg', '10kg', 'custom'].forEach(t => {
    const btn = document.getElementById(`btn-${t}`);
    if (btn) btn.classList.toggle('active', t === type);
  });
  updateBoxPriceDisplay();
}

function toggleFruit(el) {
  const fruitId = el.dataset.fruitId;
  if (selectedFruits.has(fruitId)) {
    selectedFruits.delete(fruitId);
    el.classList.remove('selected');
  } else {
    selectedFruits.add(fruitId);
    el.classList.add('selected');
  }
  updateBoxPriceDisplay();
}

function calculateBoxPrice() {
  if (boxType === 'custom') {
    let total = 0;
    selectedFruits.forEach(fruitId => {
      const product = products.find(p => p.id === fruitId);
      if (product) total += product.price5kg;
    });
    return total;
  }
  return BOX_PRICES[boxType] || 1800;
}

function updateBoxPriceDisplay() {
  const priceEl = document.getElementById('box-price-display');
  const labelEl = document.getElementById('box-summary-label');
  const price = calculateBoxPrice();

  if (priceEl) priceEl.textContent = `Rs. ${price.toLocaleString()}`;

  if (labelEl) {
    if (boxType === 'custom') {
      const count = selectedFruits.size;
      labelEl.textContent = count > 0 ? `${count} fruit(s) selected` : 'Select fruits below';
    } else {
      labelEl.textContent = `${boxType} Box Selected`;
    }
  }
}

function addBoxToCart() {
  const price = calculateBoxPrice();
  if (price === 0) {
    alert('Please select at least one fruit for your custom box!');
    return;
  }

  const selectedNames = Array.from(selectedFruits).map(id => {
    const p = products.find(pr => pr.id === id);
    return p ? `${p.emoji} ${p.name}` : id;
  });

  const label = boxType === 'custom'
    ? `Custom Box (${selectedNames.join(', ')})`
    : `${boxType} Fruit Box`;

  const fruitEmojis = selectedFruits.size > 0
    ? Array.from(selectedFruits).map(id => products.find(p => p.id === id)?.emoji || '').join('')
    : '📦';

  cart.items.push({
    cartItemId: `box-${Date.now()}`,
    id: `box-${boxType}`,
    name: label,
    emoji: fruitEmojis,
    size: boxType,
    price,
    quantity: 1,
    subtotal: price
  });

  recalcTotal();
  saveCart();
  updateCartUI();
  openCart();
  showAddedFeedback('Fruit Box');
}

/* ─────────────────────────────────────
   8. INTERSECTION OBSERVER (scroll animations)
───────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    observer.observe(el);
  });
}

/* ─────────────────────────────────────
   9. GSAP ANIMATIONS
───────────────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  // Hero entrance animation
  gsap.from('#hero-heading', { duration: 1, y: 60, opacity: 0, ease: 'power3.out', delay: 1.6 });
  gsap.from('#hero-sub',     { duration: 1, y: 40, opacity: 0, ease: 'power3.out', delay: 1.9 });

  // Floating emojis subtle entrance
  gsap.from('.float-animation', {
    duration: 1.2,
    scale: 0,
    opacity: 0,
    stagger: 0.15,
    ease: 'back.out(1.7)',
    delay: 1.8
  });

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

/* ─────────────────────────────────────
   10. ORDER FORM SUBMIT → WHATSAPP
───────────────────────────────────── */
function buildWhatsAppMessage(name, phone, address, boxType, fruits, instructions, cartItems) {
  let itemsText = '';

  if (cartItems && cartItems.length > 0) {
    itemsText = cartItems.map(i => `  • ${i.emoji} ${i.name} (${i.size}) × ${i.quantity} = Rs.${i.subtotal.toLocaleString()}`).join('\n');
  } else {
    itemsText = `  • ${boxType} Box`;
    if (fruits) itemsText += ` — ${fruits}`;
  }

  const total = cartItems && cartItems.length > 0
    ? cart.total
    : (boxType === '5kg' ? 1800 : boxType === '10kg' ? 3200 : 0);

  return `🛒 *New Order - FreshLux Fruits*

👤 *Name:* ${name}
📱 *Phone:* ${phone}
📍 *Address:* ${address}
📦 *Box Type:* ${boxType}
💰 *Payment:* Cash on Delivery

🍎 *Order Details:*
${itemsText}

${instructions ? `📝 *Instructions:* ${instructions}\n` : ''}💵 *Total:* Rs.${total.toLocaleString()}

_Thank you for choosing FreshLux! 🍊_`;
}

function initOrderForm() {
  const form = document.getElementById('main-order-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('customer-name').value.trim();
    const phone   = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const boxTypeSel = document.getElementById('order-box-type').value;
    const fruits  = document.getElementById('order-fruits').value.trim();
    const instructions = document.getElementById('special-instructions').value.trim();
    const errorDiv = document.getElementById('form-error');

    // Validation
    if (!name) {
      showFormError(errorDiv, 'Please enter your full name.');
      return;
    }
    if (!phone) {
      showFormError(errorDiv, 'Please enter your phone number.');
      return;
    }
    if (!address) {
      showFormError(errorDiv, 'Please enter your delivery address.');
      return;
    }

    // Hide error
    errorDiv.classList.add('hidden');

    const message = buildWhatsAppMessage(name, phone, address, boxTypeSel, fruits, instructions, cart.items);
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');

    // Show success
    form.style.display = 'none';
    const successEl = document.getElementById('order-success');
    if (successEl) successEl.classList.add('show');

    // Clear cart after order
    cart = { items: [], total: 0 };
    saveCart();
    updateCartUI();
  });
}

function showFormError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─────────────────────────────────────
   CART CHECKOUT VIA WHATSAPP (from cart panel)
───────────────────────────────────── */
function checkoutWhatsApp() {
  if (cart.items.length === 0) {
    alert('Your cart is empty! Add some fruits first. 🍎');
    return;
  }
  closeCart();
  // Scroll to order form
  const orderSection = document.getElementById('order-form');
  if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
}

/* ─────────────────────────────────────
   11. SMOOTH SCROLL FOR NAV LINKS
───────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─────────────────────────────────────
   HELPER: Show brief add-to-cart feedback
───────────────────────────────────── */
function showAddedFeedback(name) {
  const div = document.createElement('div');
  div.textContent = `✅ ${name} added to cart!`;
  Object.assign(div.style, {
    position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--primary-green)',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    zIndex: '9000',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    transition: 'opacity 0.5s ease',
    fontSize: '0.9rem'
  });
  document.body.appendChild(div);
  setTimeout(() => { div.style.opacity = '0'; }, 1800);
  setTimeout(() => { div.remove(); }, 2400);
}

/* ─────────────────────────────────────
   12. DOMContentLoaded — INIT ALL
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartUI();
  initScrollAnimations();
  initGSAP();
  initOrderForm();
  initSmoothScroll();
  updateBoxPriceDisplay();
});
