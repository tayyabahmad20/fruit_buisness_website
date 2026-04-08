import ScrollReveal from '../components/ScrollReveal';

const TEAM = [
  { name: 'Ahmed Khan', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Sara Ali', role: 'Head of Operations', emoji: '👩‍💼' },
  { name: 'Bilal Raza', role: 'Farm Relations', emoji: '🧑‍🌾' },
];

const STATS = [
  ['500+', 'Daily Orders'],
  ['50+', 'Partner Farms'],
  ['20+', 'Fruit Varieties'],
  ['4.9★', 'Customer Rating'],
];

const VALUES = [
  { icon: '🌿', title: 'Freshness First', desc: 'We never compromise on quality. Every fruit is hand-checked before packing.' },
  { icon: '🤝', title: 'Farmer Partnerships', desc: 'We work directly with farmers to ensure fair prices and sustainable practices.' },
  { icon: '🌍', title: 'Eco-Friendly', desc: 'Our packaging is 100% biodegradable. We care for the environment.' },
  { icon: '💚', title: 'Community Focus', desc: 'Supporting local farmers and communities across Pakistan.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80"
          alt="Farm"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-fl-green/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white/70 text-sm font-semibold mb-2">🌾 Our Story</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">About FreshLux 🍊</h1>
          <p className="text-white/80 mt-2 max-w-lg">
            Pakistan's premium fruit delivery service — bringing the freshest produce from farm to doorstep since 2020.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10" style={{ background: 'var(--primary-green)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(([num, label]) => (
              <div key={label}>
                <p className="text-3xl font-black text-fl-orange">{num}</p>
                <p className="text-white/80 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>Our Story 📖</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              FreshLux was born out of a simple frustration — why is it so hard to get truly fresh fruit in Pakistan's cities? Our founder Ahmed Khan grew up visiting his family's mango orchard in Sindh every summer and was dismayed to see how much freshness was lost by the time fruit reached city markets.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              In 2020, he built FreshLux to bridge that gap — partnering directly with certified farms across Pakistan and building a same-day delivery network that ensures fruit arrives at your door at peak freshness, just hours after harvest.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-14" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-center mb-10" style={{ color: 'var(--text-primary)' }}>Our Values 💚</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="glass-card p-5 text-center">
                  <span className="text-4xl block mb-3">{v.icon}</span>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-center mb-10" style={{ color: 'var(--text-primary)' }}>Meet the Team 👥</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card p-6 text-center">
                  <span className="text-5xl block mb-3">{m.emoji}</span>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{m.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>Get in Touch 📞</h2>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>Have questions? We'd love to hear from you on WhatsApp.</p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#25d366] text-white font-bold rounded-full hover:bg-[#1fbb58] transition text-lg shadow-lg"
            >
              💬 Chat on WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
