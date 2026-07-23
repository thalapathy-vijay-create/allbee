import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChefHat, Package, Bike, Home, Search } from 'lucide-react';
import { supabase, type Order, type OrderItem } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

const statusSteps = [
  { key: 'pending', label: 'Order Received', icon: Check, desc: 'Your order has been confirmed' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Our chefs are cooking your meal' },
  { key: 'packed', label: 'Packed', icon: Package, desc: 'Your order is ready for dispatch' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Bike, desc: 'Your order is on its way' },
  { key: 'delivered', label: 'Delivered', icon: Home, desc: 'Enjoy your meal!' },
];

export default function TrackOrder() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { data } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
      setOrders(data ?? []);
      if (data && data.length > 0) {
        setSelectedOrder(data[0] as Order);
      }
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!selectedOrder) return;
      const { data } = await supabase.from('order_items').select('*').eq('order_id', selectedOrder.id);
      setItems(data ?? []);
    })();
  }, [selectedOrder]);

  const currentStepIndex = selectedOrder ? statusSteps.findIndex((s) => s.key === selectedOrder.status) : -1;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-cream/50 mb-4">Please log in to track your orders.</p>
          <a href="/login" className="btn-gold">Login</a>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <Search size={48} className="text-gold/30 mx-auto mb-4" />
          <p className="text-cream/50 mb-4">No orders found yet.</p>
          <a href="/menu" className="btn-gold">Start Ordering</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="container-lux">
        <h1 className="text-4xl font-heading text-cream mb-8">Track Your Order</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order list */}
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left glass rounded-2xl p-4 transition-all ${
                  selectedOrder?.id === order.id ? 'border-gold bg-gold/10' : 'hover:border-gold/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cream font-medium text-sm">#{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-gold text-sm">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cream/50 capitalize">{order.status.replace(/_/g, ' ')}</span>
                  <span className="text-xs text-cream/40">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tracking timeline */}
          <div className="lg:col-span-2">
            {selectedOrder && (
              <div className="glass-strong rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-heading text-cream">Order #{selectedOrder.id.slice(0, 8).toUpperCase()}</h3>
                    <p className="text-sm text-cream/50">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                  <span className="text-gold font-semibold text-lg">${selectedOrder.total.toFixed(2)}</span>
                </div>

                {/* Timeline */}
                <div className="space-y-6 mb-8">
                  {statusSteps.map((step, i) => {
                    const isComplete = i <= currentStepIndex;
                    const isCurrent = i === currentStepIndex;
                    return (
                      <div key={step.key} className="flex items-start gap-4">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isComplete ? 'bg-gold-gradient' : 'glass'
                          } ${isCurrent ? 'ring-4 ring-gold/20' : ''}`}>
                            <step.icon size={18} className={isComplete ? 'text-royal' : 'text-cream/40'} />
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div className={`absolute left-1/2 -translate-x-1/2 top-10 w-px h-8 ${isComplete ? 'bg-gold' : 'bg-cream/10'}`} />
                          )}
                        </div>
                        <div className="pt-1.5">
                          <p className={`font-medium ${isComplete ? 'text-cream' : 'text-cream/40'}`}>{step.label}</p>
                          <p className="text-sm text-cream/50">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Items */}
                <div className="border-t border-gold/10 pt-6">
                  <h4 className="text-sm tracking-wider uppercase text-gold/70 mb-4">Order Items</h4>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image_url ?? ''} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm text-cream">{item.name}</p>
                          <p className="text-xs text-cream/50">x{item.quantity}</p>
                        </div>
                        <p className="text-sm text-cream">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live map placeholder */}
                {selectedOrder.status !== 'delivered' && selectedOrder.order_type === 'delivery' && (
                  <div className="mt-6 rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-charcoal to-royal flex items-center justify-center border border-gold/10">
                    <div className="text-center">
                      <Bike size={32} className="text-gold/40 mx-auto mb-2 animate-bounce" />
                      <p className="text-cream/40 text-sm">Live tracking will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
