import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiX, FiCheck } from 'react-icons/fi';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives', color: '#2d6a4f' },
  { id: 'jazzcash', label: 'JazzCash', icon: '📱', desc: 'Mobile wallet payment', color: '#dc1b4b' },
  { id: 'easypaisa', label: 'EasyPaisa', icon: '💚', desc: 'Telenor mobile wallet', color: '#00a651' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦', desc: 'Direct bank transfer', color: '#1a56db' },
];

export default function PaymentModal({ onClose }) {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState('details');
  const [payMethod, setPayMethod] = useState('cod');
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [orderId] = useState(() => 'FL' + Math.random().toString(36).substr(2, 6).toUpperCase());

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    if (payMethod === 'cod') {
      const items = cart.items
        .map(i => `• ${i.emoji} ${i.name} (${i.size}) x${i.quantity} = Rs.${i.subtotal.toLocaleString()}`)
        .join('\n');
      const msg = `New Order - FreshLux Fruits\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPayment: Cash on Delivery\n\nItems:\n${items}\n\nTotal: Rs.${cart.total.toLocaleString()}\nOrder ID: #${orderId}`;
      window.open(`https://wa.me/923001234567?text=${encodeURIComponent(msg)}`, '_blank');
    }
    clearCart();
    setStep('confirm');
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-secondary)] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-fl-green to-fl-orange rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">
            {step === 'details' ? '📋 Delivery Details' : step === 'payment' ? '💳 Payment Method' : '✅ Order Confirmed!'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">
            <FiX />
          </button>
        </div>

        <div className="p-6">
          {step === 'details' && (
            <>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">
                Order Total:{' '}
                <span className="font-bold text-fl-green dark:text-fl-orange text-base">
                  Rs.{cart.total.toLocaleString()}
                </span>
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[var(--text-primary)]">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none transition ${
                      errors.name ? 'border-red-400' : 'border-[var(--border-color)] focus:border-fl-green'
                    }`}
                    placeholder="e.g. Ahmed Khan"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[var(--text-primary)]">Phone Number *</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none transition ${
                      errors.phone ? 'border-red-400' : 'border-[var(--border-color)] focus:border-fl-green'
                    }`}
                    placeholder="03XX-XXXXXXX"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[var(--text-primary)]">Delivery Address *</label>
                  <textarea
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none transition resize-none ${
                      errors.address ? 'border-red-400' : 'border-[var(--border-color)] focus:border-fl-green'
                    }`}
                    placeholder="House No., Street, Block, Area, City"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-6 w-full py-3 bg-gradient-to-r from-fl-green to-fl-orange text-white font-bold rounded-full hover:opacity-90 transition text-lg"
              >
                Continue to Payment →
              </button>
            </>
          )}

          {step === 'payment' && (
            <>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Select your preferred payment method:</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      payMethod === m.id
                        ? 'border-fl-green bg-fl-green/10 dark:border-fl-orange dark:bg-fl-orange/10'
                        : 'border-[var(--border-color)] hover:border-fl-green/50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{m.icon}</span>
                    <span className="font-semibold text-sm text-[var(--text-primary)]">{m.label}</span>
                    <span className="text-xs text-[var(--text-secondary)] text-center mt-1">{m.desc}</span>
                    {payMethod === m.id && <FiCheck className="mt-1 text-fl-green dark:text-fl-orange" />}
                  </button>
                ))}
              </div>

              {payMethod === 'jazzcash' && (
                <div className="bg-[#dc1b4b]/10 border border-[#dc1b4b]/30 rounded-xl p-4 mb-4 text-sm">
                  <p className="font-bold text-[#dc1b4b]">JazzCash Details:</p>
                  <p className="text-[var(--text-secondary)] mt-1">
                    Account: <strong>0300-1234567</strong> (FreshLux Fruits)
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Send Rs.{cart.total.toLocaleString()} and share screenshot on WhatsApp.
                  </p>
                </div>
              )}
              {payMethod === 'easypaisa' && (
                <div className="bg-[#00a651]/10 border border-[#00a651]/30 rounded-xl p-4 mb-4 text-sm">
                  <p className="font-bold text-[#00a651]">EasyPaisa Details:</p>
                  <p className="text-[var(--text-secondary)] mt-1">
                    Account: <strong>0300-1234567</strong> (FreshLux Fruits)
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Send Rs.{cart.total.toLocaleString()} and share screenshot on WhatsApp.
                  </p>
                </div>
              )}
              {payMethod === 'bank' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4 text-sm">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Bank Transfer Details:</p>
                  <p className="text-[var(--text-secondary)] mt-1">Bank: <strong>Meezan Bank</strong></p>
                  <p className="text-[var(--text-secondary)]">Account: <strong>0123-4567890-00</strong></p>
                  <p className="text-[var(--text-secondary)]">Title: <strong>FreshLux Fruits</strong></p>
                  <p className="text-[var(--text-secondary)]">
                    Amount: <strong>Rs.{cart.total.toLocaleString()}</strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 py-3 border-2 border-[var(--border-color)] text-[var(--text-primary)] font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-gradient-to-r from-fl-green to-fl-orange text-white font-bold rounded-full hover:opacity-90 transition"
                >
                  {payMethod === 'cod' ? '💬 Place via WhatsApp' : '✅ Confirm Order'}
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-fl-green dark:text-fl-orange mb-2">Order Placed!</h3>
              <p className="text-[var(--text-secondary)] mb-2">
                Order ID: <strong className="text-[var(--text-primary)]">#{orderId}</strong>
              </p>
              <p className="text-[var(--text-secondary)] mb-6">
                {payMethod === 'cod'
                  ? "Your order has been sent via WhatsApp. We'll confirm shortly!"
                  : 'Please complete your payment and share the screenshot on WhatsApp.'}
              </p>
              <div className="bg-fl-green/10 dark:bg-fl-orange/10 rounded-xl p-4 mb-6 text-sm text-left">
                <p className="font-bold mb-1 text-[var(--text-primary)]">📦 Delivery Details:</p>
                <p className="text-[var(--text-secondary)]">Name: {form.name}</p>
                <p className="text-[var(--text-secondary)]">Phone: {form.phone}</p>
                <p className="text-[var(--text-secondary)]">Address: {form.address}</p>
                <p className="text-[var(--text-secondary)]">
                  Payment: {PAYMENT_METHODS.find(m => m.id === payMethod)?.label}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-fl-green to-fl-orange text-white font-bold rounded-full hover:opacity-90 transition"
              >
                Continue Shopping 🍎
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
