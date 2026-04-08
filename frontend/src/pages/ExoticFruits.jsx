import { EXOTIC_PRODUCTS, TROPICAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

const ALL_EXOTIC = [...EXOTIC_PRODUCTS, ...TROPICAL_PRODUCTS];

export default function ExoticFruits() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&q=80"
          alt="Exotic fruits"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-fl-orange/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white/70 text-sm font-semibold mb-2">🌴 Imported & Rare</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Exotic & Tropical Fruits 🍍</h1>
          <p className="text-white/80 mt-2 max-w-lg">
            Rare and tropical fruits sourced from around the world, delivered fresh to your door.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-14" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
              Explore Exotic Selection 🥝
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
              Premium imports and tropical varieties available year-round
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {ALL_EXOTIC.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing info */}
      <section className="py-10" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>
            How We Source Exotic Fruits 🌍
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Our exotic and tropical fruits are carefully imported from certified suppliers across Southeast Asia, the Middle East, and South America. Each shipment is quality-checked on arrival to ensure peak freshness and taste before reaching your doorstep.
          </p>
        </div>
      </section>
    </div>
  );
}
