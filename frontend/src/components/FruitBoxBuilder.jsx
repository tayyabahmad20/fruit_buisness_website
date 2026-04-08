import { useState } from 'react';
import { ALL_PRODUCTS, BOX_TYPES } from '../data/products';
import { useCart } from '../context/CartContext';

export default function FruitBoxBuilder() {
  const { addBox } = useCart();
  const [boxType, setBoxType] = useState('5kg');
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [added, setAdded] = useState(false);

  const toggleFruit = (id) => {
    setSelectedFruits(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const selectedBox = BOX_TYPES.find(b => b.id === boxType);

  const customPrice = boxType === 'custom'
    ? selectedFruits.reduce((sum, id) => {
        const p = ALL_PRODUCTS.find(p => p.id === id);
        return sum + (p ? p.price5kg : 0);
      }, 0)
    : selectedBox.price;

  const handleAddToCart = () => {
    if (boxType === 'custom' && selectedFruits.length === 0) return;
    const label = boxType === 'custom'
      ? `Custom Box (${selectedFruits.length} varieties)`
      : selectedBox.label;
    addBox({
      cartItemId: `box-${Date.now()}`,
      id: `box-${boxType}`,
      name: label,
      emoji: '📦',
      image: null,
      size: boxType,
      price: customPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">🍱 Build Your Fruit Box</h3>
      <p className="text-[var(--text-secondary)] text-sm mb-6">
        Choose a box size or create your own custom mix
      </p>

      {/* Box type tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {BOX_TYPES.map(b => (
          <button
            key={b.id}
            onClick={() => setBoxType(b.id)}
            className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
              boxType === b.id
                ? 'bg-fl-green text-white border-fl-green dark:bg-fl-orange dark:border-fl-orange'
                : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-fl-green'
            }`}
          >
            <div>{b.label}</div>
            <div className="text-xs font-normal mt-0.5 opacity-80">{b.description}</div>
            {b.price > 0 && <div className="font-extrabold mt-1">Rs.{b.price.toLocaleString()}</div>}
          </button>
        ))}
      </div>

      {/* Fruit selector (for custom or just display) */}
      {boxType === 'custom' ? (
        <>
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Select fruits for your custom box:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {ALL_PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => toggleFruit(p.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedFruits.includes(p.id)
                    ? 'border-fl-green bg-fl-green/10 text-fl-green dark:border-fl-orange dark:bg-fl-orange/10 dark:text-fl-orange'
                    : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-fl-green/50'
                }`}
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="text-xs">{p.name}</span>
              </button>
            ))}
          </div>
          {selectedFruits.length > 0 && (
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {selectedFruits.length} varieties selected &mdash;{' '}
              <span className="font-bold text-fl-green dark:text-fl-orange">
                Rs.{customPrice.toLocaleString()}
              </span>
            </p>
          )}
        </>
      ) : (
        <div className="bg-fl-green/5 dark:bg-fl-orange/5 rounded-xl p-4 mb-6 text-sm text-[var(--text-secondary)]">
          <p className="font-semibold text-[var(--text-primary)] mb-1">
            Includes {selectedBox.fruits} of seasonal fruits
          </p>
          <p>Handpicked by our experts based on the best produce available today.</p>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={boxType === 'custom' && selectedFruits.length === 0}
        className={`w-full py-3 rounded-full font-bold text-lg transition-all ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-fl-green to-fl-orange text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
      >
        {added ? '✅ Added to Cart!' : '🛒 Add Box to Cart — Rs.' + customPrice.toLocaleString()}
      </button>
    </div>
  );
}
