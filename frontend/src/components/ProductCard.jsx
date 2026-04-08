import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiStar, FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState('5kg');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-fl-orange text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 text-xs font-semibold px-2 py-1 rounded-full text-[var(--text-primary)]">
          {product.origin}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-[var(--text-primary)] text-base">{product.name}</h3>
          <div className="flex items-center gap-1 text-fl-orange text-sm">
            <FiStar className="fill-current" />
            <span className="font-semibold">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-1">{product.description}</p>
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          <span className="font-semibold">{product.reviews}</span> reviews
        </p>

        {/* Size selector */}
        <div className="flex gap-2 mb-3">
          {['5kg', '10kg'].map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${
                size === s
                  ? 'bg-fl-green text-white border-fl-green dark:bg-fl-orange dark:border-fl-orange'
                  : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-fl-green'
              }`}
            >
              {s} — Rs.{(s === '5kg' ? product.price5kg : product.price10kg).toLocaleString()}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-fl-green to-fl-orange text-white hover:opacity-90'
          }`}
        >
          {added ? '✅ Added!' : <><FiShoppingCart /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}
