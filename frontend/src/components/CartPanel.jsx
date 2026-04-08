import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import PaymentModal from './PaymentModal';

export default function CartPanel() {
  const { cart, isOpen, setIsOpen, removeItem, updateQty, totalItems } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[190]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[380px] max-w-[95vw] z-[200] bg-[var(--bg-secondary)] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-fl-green to-fl-orange text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.items.length === 0 ? (
            <div className="text-center mt-12">
              <p className="text-5xl mb-3">🛒</p>
              <p className="text-[var(--text-secondary)]">Your cart is empty</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Add some delicious fruits!</p>
            </div>
          ) : (
            cart.items.map(item => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center">
                    {item.emoji}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{item.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.size}</p>
                  <p className="font-bold text-sm text-fl-green dark:text-fl-orange">
                    Rs.{item.subtotal.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => updateQty(item.cartItemId, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-fl-green hover:text-white transition"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.cartItemId, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-fl-green hover:text-white transition"
                  >
                    <FiPlus size={12} />
                  </button>
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="ml-1 w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-500 hover:text-white transition text-red-400"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-[var(--text-primary)]">Total:</span>
            <span className="font-bold text-2xl text-fl-green dark:text-fl-orange">
              Rs.{cart.total.toLocaleString()}
            </span>
          </div>
          <button
            disabled={cart.items.length === 0}
            onClick={() => { setIsOpen(false); setShowPayment(true); }}
            className="w-full py-3 bg-gradient-to-r from-fl-green to-fl-orange text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            💳 Proceed to Checkout
          </button>
        </div>
      </div>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </>
  );
}
