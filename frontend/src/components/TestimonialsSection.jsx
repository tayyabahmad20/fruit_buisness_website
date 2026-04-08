const testimonials = [
  {
    name: 'Sara Ahmed',
    city: 'Lahore',
    rating: 5,
    text: "FreshLux has completely changed how we buy fruits. The Sindhri mangoes were the best I've ever tasted. Delivered within 2 hours, perfectly packed!",
    emoji: '👩',
    since: 'Customer since 2023',
  },
  {
    name: 'Bilal Qureshi',
    city: 'Karachi',
    rating: 5,
    text: "I order the 10kg seasonal box every week. The quality is consistently amazing and the WhatsApp ordering is so convenient. Highly recommended!",
    emoji: '👨',
    since: 'Customer since 2022',
  },
  {
    name: 'Fatima Malik',
    city: 'Islamabad',
    rating: 5,
    text: "The exotic fruits selection is unmatched. Fresh kiwis and lychees delivered to my doorstep! The custom box feature is brilliant — I can pick exactly what I want.",
    emoji: '👩‍💼',
    since: 'Customer since 2024',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-fl-orange font-semibold mb-2">Testimonials</p>
          <h2 className="text-4xl font-extrabold text-[var(--text-primary)]">
            What Our Customers Say
          </h2>
          <p className="text-[var(--text-secondary)] mt-2">
            Over 10,000 happy customers across Pakistan
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-fl-orange text-lg">★</span>
                ))}
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-fl-green/10 dark:bg-fl-orange/10 flex items-center justify-center text-xl">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{t.city} · {t.since}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
