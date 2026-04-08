import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const price = size === '10kg' ? product.price10kg : product.price5kg;
      const cartItemId = `${product.id}-${size}`;
      const existing = state.items.find(i => i.cartItemId === cartItemId);
      let items;
      if (existing) {
        items = state.items.map(i =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.price }
            : i
        );
      } else {
        items = [...state.items, {
          cartItemId, id: product.id, name: product.name,
          emoji: product.emoji, image: product.image,
          size, price, quantity: 1, subtotal: price
        }];
      }
      return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
    }
    case 'ADD_BOX': {
      const items = [...state.items, { ...action.payload, quantity: 1, subtotal: action.payload.price }];
      return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.cartItemId !== action.payload);
      return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
    }
    case 'UPDATE_QTY': {
      const { cartItemId, qty } = action.payload;
      if (qty <= 0) {
        const items = state.items.filter(i => i.cartItemId !== cartItemId);
        return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
      }
      const items = state.items.map(i =>
        i.cartItemId === cartItemId ? { ...i, quantity: qty, subtotal: qty * i.price } : i
      );
      return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('freshlux_cart');
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('freshlux_cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, size) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size } });
    setIsOpen(true);
  };

  const addBox = (payload) => {
    dispatch({ type: 'ADD_BOX', payload });
    setIsOpen(true);
  };

  const removeItem = (cartItemId) => dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
  const updateQty = (cartItemId, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartItemId, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, addBox, removeItem, updateQty, clearCart, isOpen, setIsOpen, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
