import { useState } from 'react';
import { SEASONAL_PRODUCTS, SEASONS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export default function SeasonalFruits() {
  const [activeSeason, setActiveSeason] = useState('all');
  const filtered = activeSeason === 'all' ? SEASONAL_PRODUCTS : SEASONAL_PRODUCTS.filter(p => p.season === activeSeason);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80" alt="Seasonal fruits" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-fl-green/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white/70 text-sm font-semibold mb-2">🌿 Freshly Sourced</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Seasonal Fruits 🍂</h1>
          <p className="text-white/80 mt-2 max-w-lg">Pakistan's finest seasonal fruits, harvested at peak freshness and delivered to your door.</p>
        </div>
      </section>

      {/* Season Tabs */}
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <button onClick={() => setActiveSeason('all')}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 ${activeSeason === 'all' ? 'bg-fl-green text-white border-fl-green' : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-fl-green'}`}>
              🌿 All Seasons
            </button>
            {SEASONS.map(s => (
              <button key={s.id} onClick={() => setActiveSeason(s.id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border-2 ${activeSeason === s.id ? 'text-white border-transparent' : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-fl-green'}`}
                style={activeSeason === s.id ? { background: s.color, borderColor: s.color } : {}}>
                {s.icon} {s.label} <span className="opacity-60 text-xs">({s.months})</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center py-12 text-[var(--text-secondary)]">No fruits available for this season right now.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 60}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-10" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>Why Seasonal Fruits? 🌱</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Seasonal fruits are harvested at their natural peak — meaning better taste, higher nutritional value, and lower prices. At FreshLux, we work directly with farmers to bring you the freshest seasonal produce from across Pakistan's most fertile regions.
          </p>
        </div>
      </section>
    </div>
  );
}
