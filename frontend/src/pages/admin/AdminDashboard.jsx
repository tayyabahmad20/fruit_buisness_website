import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../data/products';

const MOCK_ORDERS = [
  { id: 'FL001', customer: 'Ahmed Khan', phone: '0300-1234567', address: 'Gulshan, Karachi', items: '5kg Box', total: 1800, status: 'delivered', date: '2024-01-08' },
  { id: 'FL002', customer: 'Sara Ali', phone: '0311-9876543', address: 'DHA, Lahore', items: '10kg Box', total: 3200, status: 'out_for_delivery', date: '2024-01-08' },
  { id: 'FL003', customer: 'Bilal Raza', phone: '0333-4567890', address: 'F-7, Islamabad', items: 'Mangoes 5kg, Grapes 5kg', total: 2750, status: 'packed', date: '2024-01-08' },
  { id: 'FL004', customer: 'Fatima Sheikh', phone: '0345-1112233', address: 'Clifton, Karachi', items: 'Custom Box', total: 2200, status: 'pending', date: '2024-01-07' },
  { id: 'FL005', customer: 'Usman Tariq', phone: '0321-6667788', address: 'Johar Town, Lahore', items: '5kg Box', total: 1800, status: 'delivered', date: '2024-01-07' },
];

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  packed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  out_for_delivery: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

const STATUS_LABELS = { pending: 'Pending', packed: 'Packed', out_for_delivery: 'Out for Delivery', delivered: 'Delivered' };

const TABS = ['Dashboard', 'Orders', 'Products', 'Analytics'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('freshlux_admin_token')) {
      navigate('/admin');
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('freshlux_admin_token');
    navigate('/admin');
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  const STATS = [
    { label: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
    { label: 'Revenue', value: `Rs.${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-500' },
    { label: 'Pending', value: pendingCount, icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Delivered', value: deliveredCount, icon: '✅', color: 'bg-emerald-500' },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-60 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: 'var(--dark, #1a1a2e)', minHeight: '100vh' }}>
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-xl font-extrabold text-fl-orange">🍊 FreshLux</p>
          <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {TABS.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                ${activeTab === tab ? 'bg-fl-green text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              {tab === 'Dashboard' && '📊'} {tab === 'Orders' && '📋'} {tab === 'Products' && '🍎'} {tab === 'Analytics' && '📈'} {tab}
            </button>
          ))}
        </nav>
        <div className="p-3">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20 transition-all text-left">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(o => !o)} className="md:hidden text-[var(--text-primary)] text-xl">☰</button>
          <h1 className="font-extrabold text-lg flex-1" style={{ color: 'var(--text-primary)' }}>{activeTab}</h1>
          <span className="text-sm px-3 py-1 rounded-full bg-fl-green/10 text-fl-green dark:text-fl-orange font-semibold">Admin</span>
        </header>

        <div className="p-5">
          {/* ─── Dashboard Tab ─── */}
          {activeTab === 'Dashboard' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {STATS.map((s, i) => (
                  <div key={i} className="glass-card p-5 flex items-center gap-4">
                    <span className={`w-12 h-12 rounded-full ${s.color} flex items-center justify-center text-2xl flex-shrink-0`}>{s.icon}</span>
                    <div>
                      <p className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card p-5">
                <h2 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>Recent Orders</h2>
                <OrdersTable orders={orders.slice(0, 5)} onStatusChange={(id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))} />
              </div>
            </>
          )}

          {/* ─── Orders Tab ─── */}
          {activeTab === 'Orders' && (
            <div className="glass-card p-5">
              <h2 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>All Orders ({orders.length})</h2>
              <OrdersTable orders={orders} onStatusChange={(id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))} />
            </div>
          )}

          {/* ─── Products Tab ─── */}
          {activeTab === 'Products' && (
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Products ({products.length})</h2>
                <button onClick={() => { setEditingProduct({ name: '', price5kg: '', price10kg: '', category: 'seasonal', origin: '', description: '' }); setShowProductModal(true); }}
                  className="px-4 py-2 bg-fl-green text-white font-bold rounded-full text-sm hover:opacity-90 transition">
                  + Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      {['Product', 'Category', 'Origin', '5kg Price', '10kg Price', 'Actions'].map(h => (
                        <th key={h} className="text-left py-2 px-3 font-bold text-xs" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" loading="lazy" />
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 capitalize" style={{ color: 'var(--text-secondary)' }}>{p.category}</td>
                        <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>{p.origin}</td>
                        <td className="py-2 px-3 text-fl-green dark:text-fl-orange font-semibold">Rs.{p.price5kg.toLocaleString()}</td>
                        <td className="py-2 px-3 text-fl-green dark:text-fl-orange font-semibold">Rs.{p.price10kg.toLocaleString()}</td>
                        <td className="py-2 px-3">
                          <div className="flex gap-2">
                            <button onClick={() => { setEditingProduct(p); setShowProductModal(true); }} className="text-blue-500 hover:underline text-xs">Edit</button>
                            <button onClick={() => setProducts(prev => prev.filter(pr => pr.id !== p.id))} className="text-red-500 hover:underline text-xs">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Analytics Tab ─── */}
          {activeTab === 'Analytics' && (
            <div className="space-y-5">
              <div className="glass-card p-5">
                <h2 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>Orders by Status</h2>
                <div className="space-y-3">
                  {Object.entries(STATUS_LABELS).map(([key, label]) => {
                    const count = orders.filter(o => o.status === key).length;
                    const pct = Math.round((count / orders.length) * 100);
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ color: 'var(--text-primary)' }}>{label}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <div className="h-full bg-fl-green rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-5 text-center">
                  <p className="text-3xl font-extrabold text-fl-green dark:text-fl-orange">Rs.{totalRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Total Revenue</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <p className="text-3xl font-extrabold text-fl-green dark:text-fl-orange">{orders.length}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Total Orders</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <p className="text-3xl font-extrabold text-fl-green dark:text-fl-orange">
                    Rs.{Math.round(totalRevenue / orders.length).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Avg Order Value</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[var(--bg-secondary)] rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                {editingProduct.id ? 'Edit Product' : 'Add Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-2xl" style={{ color: 'var(--text-secondary)' }}>&times;</button>
            </div>
            <div className="space-y-3">
              {[['name', 'Product Name'], ['origin', 'Origin'], ['description', 'Description']].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</label>
                  <input value={editingProduct[field] || ''} onChange={e => setEditingProduct(p => ({ ...p, [field]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green text-sm" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[['price5kg', '5kg Price (Rs)'], ['price10kg', '10kg Price (Rs)']].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</label>
                    <input type="number" value={editingProduct[field] || ''} onChange={e => setEditingProduct(p => ({ ...p, [field]: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green text-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowProductModal(false)} className="flex-1 py-2 border-2 border-[var(--border-color)] rounded-full font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Cancel</button>
              <button onClick={() => {
                if (editingProduct.id) {
                  setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } : p));
                } else {
                  setProducts(prev => [...prev, { ...editingProduct, id: `p-${Date.now()}`, emoji: '🍎', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', featured: false, available: true, rating: 4.5, reviews: 0 }]);
                }
                setShowProductModal(false);
              }} className="flex-1 py-2 bg-fl-green text-white rounded-full font-bold text-sm hover:opacity-90 transition">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersTable({ orders, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date'].map(h => (
              <th key={h} className="text-left py-2 px-3 font-bold text-xs" style={{ color: 'var(--text-secondary)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition">
              <td className="py-2 px-3 font-mono font-bold text-fl-green dark:text-fl-orange text-xs">#{order.id}</td>
              <td className="py-2 px-3">
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{order.customer}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{order.phone}</p>
              </td>
              <td className="py-2 px-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{order.items}</td>
              <td className="py-2 px-3 font-bold" style={{ color: 'var(--text-primary)' }}>Rs.{order.total.toLocaleString()}</td>
              <td className="py-2 px-3">
                <select
                  value={order.status}
                  onChange={e => onStatusChange(order.id, e.target.value)}
                  className={`text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_STYLES[order.status]}`}
                >
                  {Object.entries(STATUS_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
