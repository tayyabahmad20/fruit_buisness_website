const steps = [
  { icon: '📝', label: 'Order Placed', done: true },
  { icon: '📦', label: 'Packed', done: true },
  { icon: '🚗', label: 'On the Way', active: true },
  { icon: '🏠', label: 'Delivered', done: false },
];

export default function DeliveryTracker() {
  return (
    <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Live Order Tracking 📍</h2>
        <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>Track your order every step of the way</p>
        <div className="glass-card p-6 md:p-10">
          <div className="flex items-start justify-between relative">
            {/* Progress line */}
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 mx-8" />
            <div className="absolute top-7 left-0 h-0.5 bg-fl-green mx-8" style={{ width: '60%' }} />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1 relative z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 mb-2 transition-all
                  ${step.active ? 'bg-fl-green border-fl-green shadow-lg shadow-fl-green/30' : step.done ? 'bg-fl-green/80 border-fl-green/80' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                  {step.icon}
                </div>
                <p className={`text-xs font-semibold text-center ${step.active ? 'text-fl-green' : ''}`} style={{ color: step.active ? undefined : 'var(--text-secondary)' }}>
                  {step.label}
                  {step.active && <span className="block text-[10px] text-fl-orange font-bold">● LIVE</span>}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Your order is approximately <strong style={{ color: 'var(--text-primary)' }}>30 minutes</strong> away!
          </p>
        </div>
      </div>
    </section>
  );
}
