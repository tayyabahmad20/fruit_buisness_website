import FruitBoxBuilder from '../components/FruitBoxBuilder';
import ScrollReveal from '../components/ScrollReveal';
import { BOX_TYPES } from '../data/products';

export default function FruitBoxes() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80"
          alt="Fruit boxes"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-fl-dark/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white/70 text-sm font-semibold mb-2">📦 Curated Collections</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Fruit Boxes 📦</h1>
          <p className="text-white/80 mt-2">Choose a box, pick your fruits, and enjoy farm-fresh delivery.</p>
        </div>
      </section>

      {/* Box options overview */}
      <section className="py-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
              Choose Your Box 🎁
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
              All boxes include free delivery and are packed same-day
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {BOX_TYPES.map((box, i) => (
              <ScrollReveal key={box.id} delay={i * 80}>
                <div className="glass-card p-6 text-center hover:-translate-y-1 transition-transform">
                  <span className="text-4xl block mb-3">📦</span>
                  <h3 className="font-extrabold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{box.label}</h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{box.description}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>🍎 {box.fruits}</p>
                  {box.price > 0 && (
                    <p className="text-xl font-extrabold text-fl-green dark:text-fl-orange">
                      Rs.{box.price.toLocaleString()}
                    </p>
                  )}
                  {box.price === 0 && (
                    <p className="text-xl font-extrabold text-fl-orange">Custom Price</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Box Builder */}
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
              Build Your Custom Box 🛠️
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
              Mix and match your favourite fruits
            </p>
          </ScrollReveal>
          <FruitBoxBuilder />
        </div>
      </section>
    </div>
  );
}
