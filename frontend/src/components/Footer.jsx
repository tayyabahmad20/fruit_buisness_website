import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: '#e2e8f0' }} className="pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-2xl font-extrabold text-fl-orange mb-3">🍊 FreshLux</p>
            <p className="text-gray-400 text-sm leading-relaxed">Pakistan's premium fruit delivery service — bringing the freshest produce from farm to your doorstep within hours.</p>
            <div className="flex gap-3 mt-4">
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 text-xl">💬</a>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-xl">📘</a>
              <a href="#" className="text-pink-400 hover:text-pink-300 text-xl">📸</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Quick Links</h4>
            {[['/', 'Home'], ['/seasonal', 'Seasonal Fruits'], ['/exotic', 'Exotic Fruits'], ['/boxes', 'Fruit Boxes'], ['/about', 'About Us'], ['/admin', 'Admin Panel']].map(([to, label]) => (
              <Link key={to} to={to} className="block text-gray-400 hover:text-fl-orange text-sm mb-1.5 transition-colors">{label}</Link>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Contact Us</h4>
            <p className="text-gray-400 text-sm mb-1.5">📍 Karachi, Pakistan</p>
            <a href="tel:+923001234567" className="block text-gray-400 hover:text-fl-orange text-sm mb-1.5 transition-colors">📞 +92 300 1234567</a>
            <a href="mailto:hello@freshlux.pk" className="block text-gray-400 hover:text-fl-orange text-sm mb-1.5 transition-colors">📧 hello@freshlux.pk</a>
            <p className="text-gray-400 text-sm mt-2">Mon–Sat: 7am–8pm</p>
            <p className="text-gray-400 text-sm">Sun: 9am–6pm</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 FreshLux Fruits. All rights reserved. Made with 💚 in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
