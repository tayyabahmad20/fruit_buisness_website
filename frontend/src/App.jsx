import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import WhatsAppFloat from './components/WhatsAppFloat';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const SeasonalFruits = lazy(() => import('./pages/SeasonalFruits'));
const ExoticFruits = lazy(() => import('./pages/ExoticFruits'));
const FruitBoxes = lazy(() => import('./pages/FruitBoxes'));
const About = lazy(() => import('./pages/About'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <CartPanel />
      <main>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <span className="text-4xl animate-spin-bounce">🍊</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seasonal" element={<SeasonalFruits />} />
            <Route path="/exotic" element={<ExoticFruits />} />
            <Route path="/boxes" element={<FruitBoxes />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
