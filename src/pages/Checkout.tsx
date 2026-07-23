import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Wallet, Banknote, MapPin, Check } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay via UPI / QR Code' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Apple Pay, Google Pay' },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { discount = 0, couponCode = '' } = (location.state ?? {}) as { discount?: number; couponCode?: string };
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [address, setAddress] = useState({ label: 'Home', full_address: '', city: '', pincode: '', phone: '' });
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const tax = subtotal * 0.08;
  const deliveryCharge = orderType === 'pickup' ? 0 : subtotal > 50 ? 0 : 5;
  const total = subtotal + tax + deliveryCharge - discount;

  const placeOrder = async () => {
    if (orderType === 'delivery' && !address.full_address) return;
    setSubmitting(true);
    const { data: order } = await supabase.from('orders').insert({
      user_id: user?.id,
      status: 'pending',
      total,
      subtotal,
      tax,
      delivery_charge: deliveryCharge,
      discount,
      order_type: orderType,
      address: orderType === 'delivery' ? address : null,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
      coupon_code: couponCode || null,
      notes,
    }).select().single();

    if (order) {
      await supabase.from('order_items').insert(
        items.map((item) => ({
          order_id: order.id,
          food_id: item.food.id,
          name: item.food.name,
          quantity: item.quantity,
          price: item.food.price,
          image_url: item.food.image_url,
        }))
      );
      clearCart();
      navigate('/order-success', { state: { orderId: order.id } });
    }
    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/50 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="btn-gold">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="container-lux">
        <h1 className="text-4xl font-heading text-cream mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order type */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-lg font-heading text-cream mb-4">Order Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['delivery', 'pickup'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-3 rounded-xl text-sm font-body capitalize transition-all ${
                      orderType === type ? 'bg-gold-gradient text-royal font-semibold' : 'glass text-cream/60'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            {orderType === 'delivery' && (
              <motion.div className="glass-strong rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="flex items-center gap-2 text-lg font-heading text-cream mb-4">
                  <MapPin size={18} className="text-gold" /> Delivery Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gold/70 mb-1 block">Label</label>
                    <input value={address.label} onChange={(e) => setAddress({ ...address, label: e.target.value })} className="input-lux" placeholder="Home, Work..." />
                  </div>
                  <div>
                    <label className="text-sm text-gold/70 mb-1 block">Full Address</label>
                    <textarea value={address.full_address} onChange={(e) => setAddress({ ...address, full_address: e.target.value })} className="input-lux min-h-[80px] resize-none" placeholder="Street address, building, unit..." />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-lux" placeholder="City" />
                    <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="input-lux" placeholder="Pincode" />
                    <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="input-lux" placeholder="Phone" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment method */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-lg font-heading text-cream mb-4">Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all border ${
                      paymentMethod === pm.id ? 'border-gold bg-gold/10' : 'glass border-transparent hover:border-gold/30'
                    }`}
                  >
                    <pm.icon size={22} className={paymentMethod === pm.id ? 'text-gold' : 'text-cream/60'} />
                    <div className="text-left flex-1">
                      <p className="text-cream font-medium">{pm.label}</p>
                      <p className="text-xs text-cream/50">{pm.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === pm.id ? 'border-gold' : 'border-cream/20'
                    }`}>
                      {paymentMethod === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="text-sm text-gold/70 mb-2 block">Order Notes (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input-lux min-h-[80px] resize-none" placeholder="Special instructions for your order..." />
            </div>
          </div>

          {/* Summary */}
          <div className="glass-strong rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-heading text-cream mb-6">Review Order</h3>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto scrollbar-hide">
              {items.map((item) => (
                <div key={item.food.id} className="flex items-center gap-3">
                  <img src={item.food.image_url ?? ''} alt={item.food.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream truncate">{item.food.name}</p>
                    <p className="text-xs text-cream/50">x{item.quantity}</p>
                  </div>
                  <p className="text-sm text-cream">${(item.food.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t border-gold/10 pt-4">
              <div className="flex justify-between text-cream/60"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-cream/60"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-cream/60"><span>Delivery</span><span>{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-lg font-heading pt-3 border-t border-gold/10"><span className="text-cream">Total</span><span className="gold-text">${total.toFixed(2)}</span></div>
            </div>
            <button onClick={placeOrder} disabled={submitting || (orderType === 'delivery' && !address.full_address)} className="btn-gold w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-40">
              {submitting ? 'Placing Order...' : <><Check size={18} /> Place Order</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
