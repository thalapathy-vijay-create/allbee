import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar, Users, Award,
  Ticket, Star, FileText, Settings, LogOut, Menu, X, TrendingUp, DollarSign,
  Plus, Edit, Trash2, Eye, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase, type Food, type Order, type Reservation, type Review, type Coupon } from '@/lib/supabase';

const sections = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'products', label: 'Products', icon: UtensilsCrossed },
  { key: 'orders', label: 'Orders', icon: ShoppingBag },
  { key: 'tables', label: 'Tables', icon: Calendar },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'coupons', label: 'Coupons', icon: Ticket },
  { key: 'reviews', label: 'Reviews', icon: Star },
  { key: 'blog', label: 'Blog', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stats, setStats] = useState({ revenue: 0, orderCount: 0, reservationCount: 0, customerCount: 0 });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    (async () => {
      const [{ data: f }, { data: o }, { data: r }, { data: rv }, { data: c }, { data: profiles }] = await Promise.all([
        supabase.from('foods').select('*'),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('coupons').select('*'),
        supabase.from('profiles').select('*'),
      ]);
      setFoods(f ?? []);
      setOrders(o ?? []);
      setReservations(r ?? []);
      setReviews(rv ?? []);
      setCoupons(c ?? []);
      const orderData = o ?? [];
      setStats({
        revenue: orderData.reduce((s, ord) => s + (ord.total ?? 0), 0),
        orderCount: orderData.length,
        reservationCount: r?.length ?? 0,
        customerCount: profiles?.length ?? 0,
      });
    })();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-royal flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div className="fixed inset-0 z-40 bg-royal/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-64 glass-strong border-r border-gold/10 flex flex-col transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gold/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold gold-text">ALLBEE</span>
            <span className="text-xs tracking-[0.2em] text-gold/50 uppercase">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => { setActive(s.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all ${
                active === s.key ? 'bg-gold/10 text-gold' : 'text-cream/60 hover:text-gold hover:bg-white/5'
              }`}
            >
              <s.icon size={18} />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gold/10">
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-0 min-w-0">
        {/* Top bar */}
        <header className="glass-strong border-b border-gold/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-cream/60">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-heading text-cream capitalize">{sections.find((s) => s.key === active)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-cream/50 hidden md:inline">{profile?.full_name ?? 'Admin'}</span>
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-bold text-sm">
              {(profile?.full_name ?? 'A')[0]}
            </div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {/* Overview */}
              {active === 'overview' && (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-400' },
                      { label: 'Orders', value: stats.orderCount, icon: ShoppingBag, color: 'text-gold' },
                      { label: 'Reservations', value: stats.reservationCount, icon: Calendar, color: 'text-blue-400' },
                      { label: 'Customers', value: stats.customerCount, icon: Users, color: 'text-purple-400' },
                    ].map((stat, i) => (
                      <div key={i} className="glass-strong rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon size={20} className={stat.color} />
                          <TrendingUp size={14} className="text-green-400/50" />
                        </div>
                        <p className="text-2xl font-heading text-cream">{stat.value}</p>
                        <p className="text-xs text-cream/50 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="glass-strong rounded-2xl p-6">
                      <h3 className="text-lg font-heading text-cream mb-4">Recent Orders</h3>
                      <div className="space-y-3">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between py-2 border-b border-gold/5">
                            <div>
                              <p className="text-sm text-cream">#{order.id.slice(0, 8).toUpperCase()}</p>
                              <p className="text-xs text-cream/40">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gold">${order.total.toFixed(2)}</p>
                              <span className="text-xs capitalize text-cream/40">{order.status}</span>
                            </div>
                          </div>
                        ))}
                        {orders.length === 0 && <p className="text-cream/40 text-sm text-center py-4">No orders yet.</p>}
                      </div>
                    </div>
                    <div className="glass-strong rounded-2xl p-6">
                      <h3 className="text-lg font-heading text-cream mb-4">Recent Reservations</h3>
                      <div className="space-y-3">
                        {reservations.slice(0, 5).map((res) => (
                          <div key={res.id} className="flex items-center justify-between py-2 border-b border-gold/5">
                            <div>
                              <p className="text-sm text-cream">{res.name}</p>
                              <p className="text-xs text-cream/40">{res.reservation_date} • {res.guest_count} guests</p>
                            </div>
                            <span className="text-xs capitalize text-gold/70">{res.status}</span>
                          </div>
                        ))}
                        {reservations.length === 0 && <p className="text-cream/40 text-sm text-center py-4">No reservations yet.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Products */}
              {active === 'products' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-cream/50 text-sm">{foods.length} products</p>
                    <button className="btn-gold flex items-center gap-2 text-sm"><Plus size={16} /> Add Product</button>
                  </div>
                  <div className="glass-strong rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gold/10 text-left text-xs text-gold/70 uppercase tracking-wider">
                          <th className="p-4">Name</th>
                          <th className="p-4 hidden md:table-cell">Price</th>
                          <th className="p-4 hidden md:table-cell">Rating</th>
                          <th className="p-4 hidden lg:table-cell">Available</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foods.map((food) => (
                          <tr key={food.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={food.image_url ?? ''} alt={food.name} className="w-10 h-10 rounded-lg object-cover" />
                                <span className="text-sm text-cream">{food.name}</span>
                              </div>
                            </td>
                            <td className="p-4 hidden md:table-cell text-sm text-gold">${food.price.toFixed(2)}</td>
                            <td className="p-4 hidden md:table-cell text-sm text-cream/60">{food.rating.toFixed(1)} ★</td>
                            <td className="p-4 hidden lg:table-cell"><span className={`text-xs px-2 py-1 rounded-full ${food.is_available ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>{food.is_available ? 'Yes' : 'No'}</span></td>
                            <td className="p-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button className="text-cream/40 hover:text-gold transition-colors"><Eye size={16} /></button>
                                <button className="text-cream/40 hover:text-gold transition-colors"><Edit size={16} /></button>
                                <button className="text-cream/40 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders */}
              {active === 'orders' && (
                <div className="glass-strong rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10 text-left text-xs text-gold/70 uppercase tracking-wider">
                        <th className="p-4">Order ID</th>
                        <th className="p-4 hidden md:table-cell">Date</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gold/5 hover:bg-white/5">
                          <td className="p-4 text-sm text-cream">#{order.id.slice(0, 8).toUpperCase()}</td>
                          <td className="p-4 hidden md:table-cell text-sm text-cream/50">{new Date(order.created_at).toLocaleDateString()}</td>
                          <td className="p-4 text-sm text-gold">${order.total.toFixed(2)}</td>
                          <td className="p-4"><span className="text-xs capitalize px-2 py-1 rounded-full bg-gold/10 text-gold">{order.status}</span></td>
                          <td className="p-4 text-right">
                            <select
                              value={order.status}
                              onChange={async (e) => {
                                await supabase.from('orders').update({ status: e.target.value }).eq('id', order.id);
                                setOrders(orders.map((o) => o.id === order.id ? { ...o, status: e.target.value } : o));
                              }}
                              className="bg-white/5 border border-gold/20 rounded-lg px-2 py-1 text-xs text-cream"
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="packed">Packed</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tables */}
              {active === 'tables' && (
                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-lg font-heading text-cream mb-4">Table Reservations</h3>
                  <div className="space-y-3">
                    {reservations.map((res) => (
                      <div key={res.id} className="flex items-center justify-between py-3 border-b border-gold/5">
                        <div>
                          <p className="text-sm text-cream">{res.name} — {res.guest_count} guests</p>
                          <p className="text-xs text-cream/40">{res.reservation_date} at {res.reservation_time} • {res.table_type}</p>
                        </div>
                        <select
                          value={res.status}
                          onChange={async (e) => {
                            await supabase.from('reservations').update({ status: e.target.value }).eq('id', res.id);
                            setReservations(reservations.map((r) => r.id === res.id ? { ...r, status: e.target.value } : r));
                          }}
                          className="bg-white/5 border border-gold/20 rounded-lg px-2 py-1 text-xs text-cream"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    ))}
                    {reservations.length === 0 && <p className="text-cream/40 text-sm text-center py-4">No reservations yet.</p>}
                  </div>
                </div>
              )}

              {/* Customers */}
              {active === 'customers' && (
                <div className="glass-strong rounded-2xl p-6 text-center">
                  <Users size={48} className="text-gold/30 mx-auto mb-4" />
                  <p className="text-cream/50">{stats.customerCount} registered customers</p>
                  <p className="text-cream/40 text-sm mt-2">Customer management features available with full data access.</p>
                </div>
              )}

              {/* Coupons */}
              {active === 'coupons' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-cream/50 text-sm">{coupons.length} coupons</p>
                    <button className="btn-gold flex items-center gap-2 text-sm"><Plus size={16} /> Create Coupon</button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {coupons.map((c) => (
                      <div key={c.id} className="glass rounded-2xl p-5">
                        <code className="text-gold font-button font-bold">{c.code}</code>
                        <p className="text-sm text-cream/60 mt-2">{c.description}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-cream/40">
                          <span>Used: {c.used_count}/{c.max_uses}</span>
                          <span className={c.is_active ? 'text-green-400' : 'text-red-400'}>{c.is_active ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {active === 'reviews' && (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="glass rounded-2xl p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-cream font-medium">{review.name}</p>
                          <div className="flex">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} size={12} className="text-gold fill-gold" />)}</div>
                        </div>
                        <p className="text-sm text-cream/60">{review.comment}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={async () => { await supabase.from('reviews').update({ is_approved: !review.is_approved }).eq('id', review.id); setReviews(reviews.map((r) => r.id === review.id ? { ...r, is_approved: !r.is_approved } : r)); }} className={`text-xs px-3 py-1 rounded-full ${review.is_approved ? 'bg-green-400/20 text-green-300' : 'bg-yellow-400/20 text-yellow-300'}`}>
                          {review.is_approved ? 'Approved' : 'Pending'}
                        </button>
                        <button onClick={async () => { await supabase.from('reviews').delete().eq('id', review.id); setReviews(reviews.filter((r) => r.id !== review.id)); }} className="text-cream/40 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Blog */}
              {active === 'blog' && (
                <div className="glass-strong rounded-2xl p-6 text-center">
                  <FileText size={48} className="text-gold/30 mx-auto mb-4" />
                  <p className="text-cream/50 mb-4">Manage blog posts, articles, and news.</p>
                  <button className="btn-gold flex items-center gap-2 mx-auto"><Plus size={16} /> Create Post</button>
                </div>
              )}

              {/* Settings */}
              {active === 'settings' && (
                <div className="glass-strong rounded-2xl p-6 space-y-6 max-w-2xl">
                  <h3 className="text-lg font-heading text-cream">Restaurant Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="text-sm text-gold/70 mb-2 block">Restaurant Name</label><input defaultValue="ALLBEE RESTAURANT" className="input-lux" /></div>
                    <div><label className="text-sm text-gold/70 mb-2 block">Phone</label><input defaultValue="+1 (555) 100-2000" className="input-lux" /></div>
                    <div><label className="text-sm text-gold/70 mb-2 block">Email</label><input defaultValue="reservations@allbee.com" className="input-lux" /></div>
                    <div><label className="text-sm text-gold/70 mb-2 block">Tax Rate (%)</label><input defaultValue="8" className="input-lux" /></div>
                    <div><label className="text-sm text-gold/70 mb-2 block">Delivery Charge</label><input defaultValue="5" className="input-lux" /></div>
                    <div><label className="text-sm text-gold/70 mb-2 block">Currency</label><select className="input-lux"><option>USD ($)</option><option>INR (₹)</option><option>AED (د.إ)</option></select></div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm text-gold/70 uppercase tracking-wider">Notifications</h4>
                    <label className="flex items-center gap-2 cursor-pointer text-cream/70"><input type="checkbox" defaultChecked className="accent-gold" /> Email notifications</label>
                    <label className="flex items-center gap-2 cursor-pointer text-cream/70"><input type="checkbox" defaultChecked className="accent-gold" /> SMS notifications</label>
                    <label className="flex items-center gap-2 cursor-pointer text-cream/70"><input type="checkbox" className="accent-gold" /> WhatsApp confirmations</label>
                  </div>
                  <button className="btn-gold">Save Settings</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
