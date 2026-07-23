import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Calendar, Heart, Award, Ticket, Settings, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase, type Order, type Reservation, type Address } from '@/lib/supabase';

const tabs = [
  { key: 'info', label: 'Personal Info', icon: User },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'reservations', label: 'Reservations', icon: Calendar },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'rewards', label: 'Rewards', icon: Award },
  { key: 'coupons', label: 'Coupons', icon: Ticket },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function Profile() {
  const { user, profile, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') ?? 'info');
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: o }, { data: r }, { data: a }] = await Promise.all([
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('reservations').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('addresses').select('*').eq('user_id', user.id),
      ]);
      setOrders(o ?? []);
      setReservations(r ?? []);
      setAddresses(a ?? []);
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-cream/50 mb-4">Please login to view your profile.</p>
          <Link to="/login" className="btn-gold">Login</Link>
        </div>
      </div>
    );
  }

  const setTab = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="container-lux">
        {/* Header */}
        <div className="glass-strong rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center text-royal text-2xl font-heading font-bold">
            {(profile?.full_name ?? 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-heading text-cream">{profile?.full_name ?? 'Member'}</h1>
            <p className="text-cream/50">{user.email}</p>
            <span className="inline-block mt-2 text-xs bg-gold/20 text-gold px-3 py-1 rounded-full">{profile?.loyalty_tier ?? 'Silver'} Member</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-3xl font-heading gold-text">{profile?.loyalty_points ?? 0}</p>
            <p className="text-sm text-cream/50">Loyalty Points</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setTab(tab.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body whitespace-nowrap transition-all w-full text-left ${
                    activeTab === tab.key ? 'bg-gold/10 text-gold' : 'text-cream/60 hover:text-gold'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
              <button onClick={signOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 transition-colors w-full text-left">
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {activeTab === 'info' && (
                <div className="glass-strong rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-heading text-cream mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="text-sm text-gold/70">Name</label><p className="text-cream mt-1">{profile?.full_name ?? '—'}</p></div>
                    <div><label className="text-sm text-gold/70">Email</label><p className="text-cream mt-1">{user.email}</p></div>
                    <div><label className="text-sm text-gold/70">Phone</label><p className="text-cream mt-1">{profile?.phone ?? '—'}</p></div>
                    <div><label className="text-sm text-gold/70">Member Since</label><p className="text-cream mt-1">{new Date(user.created_at ?? '').toLocaleDateString()}</p></div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-3">
                  {orders.length === 0 ? <p className="text-cream/50 text-center py-10">No orders yet.</p> : orders.map((order) => (
                    <div key={order.id} className="glass rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-cream font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs text-cream/50">{new Date(order.created_at).toLocaleDateString()} • {order.order_type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-semibold">${order.total.toFixed(2)}</p>
                        <span className="text-xs capitalize text-cream/50">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reservations' && (
                <div className="space-y-3">
                  {reservations.length === 0 ? <p className="text-cream/50 text-center py-10">No reservations yet.</p> : reservations.map((res) => (
                    <div key={res.id} className="glass rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-cream font-medium">{res.reservation_date} at {res.reservation_time}</p>
                        <p className="text-xs text-cream/50">{res.guest_count} guests • {res.table_type}</p>
                      </div>
                      <span className="text-xs capitalize text-gold/70">{res.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <p className="text-cream/50 text-center py-10">Your wishlist items will appear here.</p>
              )}

              {activeTab === 'rewards' && (
                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-xl font-heading text-cream mb-4">Your Rewards</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4 text-center"><p className="text-3xl font-heading gold-text">{profile?.loyalty_points ?? 0}</p><p className="text-sm text-cream/50 mt-1">Points</p></div>
                    <div className="glass rounded-xl p-4 text-center"><p className="text-3xl font-heading gold-text">{profile?.loyalty_tier ?? 'Silver'}</p><p className="text-sm text-cream/50 mt-1">Tier</p></div>
                  </div>
                  <Link to="/loyalty" className="btn-outline-gold mt-4 inline-flex">View Loyalty Program</Link>
                </div>
              )}

              {activeTab === 'coupons' && (
                <p className="text-cream/50 text-center py-10">Available coupons will appear here. Visit the Offers page to see current deals.</p>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-3">
                  {addresses.length === 0 ? <p className="text-cream/50 text-center py-10">No saved addresses.</p> : addresses.map((addr) => (
                    <div key={addr.id} className="glass rounded-2xl p-4">
                      <p className="text-cream font-medium">{addr.label}</p>
                      <p className="text-sm text-cream/50">{addr.full_address}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-xl font-heading text-cream mb-4">Settings</h3>
                  <div className="space-y-4">
                    <div><label className="text-sm text-gold/70 mb-2 block">Preferred Language</label><select className="input-lux"><option>English</option><option>தமிழ்</option><option>हिन्दी</option><option>العربية</option></select></div>
                    <div><label className="flex items-center gap-2 cursor-pointer text-cream/70"><input type="checkbox" defaultChecked className="accent-gold" /> Email notifications</label></div>
                    <div><label className="flex items-center gap-2 cursor-pointer text-cream/70"><input type="checkbox" defaultChecked className="accent-gold" /> SMS notifications</label></div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
