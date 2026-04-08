import { Link } from 'react-router-dom';

const floatingFruits = ['🍎', '🍊', '🍋', '🍇', '🍓', '🥭', '🍌', '🍉'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1920&q=80"
          alt="Fresh fruits"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-fl-green/90 to-fl-dark/80" />
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingFruits.map((f, i) => (
          <span
            key={i}
            className={`absolute text-4xl select-none ${i % 2 === 0 ? 'animate-float' : 'animate-float-alt'}`}
            style={{
              left: `${8 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.5,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/30">
            🌾 Pakistan&apos;s #1 Premium Fruit Delivery
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-6">
            Farm Fresh.<br />
            <span className="text-fl-orange">Delivered Today.</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-lg">
            Premium fruits from Pakistan&apos;s finest farms, delivered to your doorstep within hours.
            100% fresh, 100% natural.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/boxes"
              className="px-8 py-4 bg-fl-orange text-white font-bold rounded-full hover:bg-orange-600 transition text-lg shadow-lg"
            >
              🛒 Order Your Box Now
            </Link>
            <Link
              to="/seasonal"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/50 hover:bg-white/30 transition text-lg"
            >
              🍎 Explore Fruits
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              ['500+', 'Daily Orders'],
              ['20+', 'Fruit Varieties'],
              ['3hrs', 'Avg Delivery'],
              ['4.9★', 'Rating'],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-fl-orange">{num}</p>
                <p className="text-white/70 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
