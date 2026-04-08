import HeroSection from '../components/HeroSection';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import FruitBoxBuilder from '../components/FruitBoxBuilder';
import TestimonialsSection from '../components/TestimonialsSection';
import DeliveryTracker from '../components/DeliveryTracker';
import { FEATURED_PRODUCTS } from '../data/products';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const WHY_US = [
  { icon: '🌿', title: 'Fresh Daily', desc: 'Harvested fresh every morning from certified farms across Pakistan.' },
  { icon: '🚚', title: 'Free Delivery', desc: 'Free delivery on all orders above Rs.1,000. Fast and reliable.' },
  { icon: '✅', title: 'Quality Guaranteed', desc: '100% satisfaction guarantee — full refund if you\'re not happy.' },
  { icon: '📞', title: '24/7 Support', desc: 'WhatsApp support available anytime. We\'re always here for you.' },
];

const STEPS = [
  { icon: '🌾', title: 'Farm Harvested', desc: 'Fresh each morning' },
  { icon: '🧺', title: 'Quality Checked', desc: 'Grade A sorting' },
  { icon: '🚗', title: 'Fast Dispatch', desc: 'Same-day delivery' },
  { icon: '🏠', title: 'At Your Door', desc: 'Within hours' },
];

export default function Home() {
  const { addItem } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', boxType: '5kg', fruits: '', instructions: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) { setError('Please fill in all required fields.'); return; }
    setError('');
    const msg = `🛒 *New Order - FreshLux Fruits*\n\n👤 *Name:* ${form.name}\n📱 *Phone:* ${form.phone}\n📍 *Address:* ${form.address}\n📦 *Box:* ${form.boxType}\n${form.fruits ? `🍎 *Fruits:* ${form.fruits}\n` : ''}${form.instructions ? `📝 *Notes:* ${form.instructions}\n` : ''}\n💰 *Payment:* Cash on Delivery\n\n_Thank you for choosing FreshLux! 🍊_`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div>
      <HeroSection />

      {/* Freshness badge */}
      <div style={{ background: 'var(--primary-green)' }} className="py-3 text-white text-center text-sm font-semibold">
        ✅ 100% Freshness Guaranteed &nbsp;|&nbsp; Same-Day Delivery &nbsp;|&nbsp; Farm to Door
      </div>

      {/* Fresh Picks */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Today's Fresh Picks 🍃</h2></ScrollReveal>
          <ScrollReveal delay={100}><p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>Handpicked this morning from certified farms</p></ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_PRODUCTS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Box Builder */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Build Your Fruit Box 📦</h2></ScrollReveal>
          <ScrollReveal delay={100}><p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>Choose your box size, select your fruits, and enjoy!</p></ScrollReveal>
          <FruitBoxBuilder />
        </div>
      </section>

      {/* Farm to Doorstep */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80" alt="Farm" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-fl-dark/85" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-2">From Farm to Doorstep 🚚</h2>
          <p className="text-center text-white/70 mb-10">Our seamless delivery process</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-3xl mx-auto mb-3">{s.icon}</div>
                  <p className="text-white font-bold">{s.title}</p>
                  <p className="text-white/60 text-sm">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Why Choose Us? 💚</h2></ScrollReveal>
          <ScrollReveal delay={100}><p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>We set the standard for premium fruit delivery</p></ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {WHY_US.map((f, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="glass-card p-5 text-center hover:-translate-y-1 transition-transform">
                  <span className="text-4xl block mb-3">{f.icon}</span>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <DeliveryTracker />

      {/* Order Form */}
      <section id="order-form" className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal><h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Place Your Order 🛒</h2></ScrollReveal>
          <ScrollReveal delay={100}><p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>Fill in your details and order via WhatsApp instantly</p></ScrollReveal>
          {submitted ? (
            <div className="glass-card p-8 text-center">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--primary-green)' }}>Order Sent!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We'll confirm your order via WhatsApp shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleOrder} className="glass-card p-6 space-y-4">
              <div className="inline-flex items-center gap-2 bg-fl-green/10 border border-fl-green text-fl-green text-sm font-semibold px-4 py-2 rounded-full">💰 Cash on Delivery Available</div>
              {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Full Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition" placeholder="Ahmed Khan" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Phone *</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition" placeholder="03XX-XXXXXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Address *</label>
                <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition" placeholder="House No., Street, Area, City" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Box Type</label>
                  <select value={form.boxType} onChange={e => setForm(f => ({ ...f, boxType: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition">
                    <option value="5kg">5kg Box – Rs.1,800</option>
                    <option value="10kg">10kg Box – Rs.3,200</option>
                    <option value="custom">Custom Box</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Preferred Fruits</label>
                  <input value={form.fruits} onChange={e => setForm(f => ({ ...f, fruits: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition" placeholder="Mangoes, Grapes…" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Special Instructions</label>
                <textarea value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} rows={2} className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition resize-none" placeholder="Any special requests…" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#25d366] text-white font-bold rounded-full text-lg hover:bg-[#1fbb58] transition shadow-lg">
                💬 Send Order via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
