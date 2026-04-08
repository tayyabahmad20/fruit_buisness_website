import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-fl-green to-fl-orange flex flex-col items-center justify-center">
      <span className="text-6xl animate-spin-bounce">🍊</span>
      <p className="text-white text-3xl font-extrabold tracking-widest mt-4">FreshLux</p>
      <p className="text-white/70 text-sm mt-1 tracking-widest">PREMIUM FRUITS</p>
      <div className="mt-6 w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
