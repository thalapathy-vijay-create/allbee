import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { supabase } from '@/lib/supabase';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const tax = subtotal * 0.08;
  const deliveryCharge = subtotal > 50 ? 0 : 5;
  const total = subtotal + tax + deliveryCharge - discount;

  const applyCoupon = async () => {
    if (!couponCode) return;
    setCouponError('');
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      setCouponError('Invalid coupon code');
      setDiscount(0);
      return;
    }
    if (data.min_order && subtotal < data.min_order) {
      setCouponError(`Minimum order of $${data.min_order} required`);
      setDiscount(0);
      return;
    }
    let disc = 0;
    if (data.discount_type === 'percentage') {
      disc = (subtotal * data.discount_value) / 100;
    } else {
      disc = data.discount_value;
    }
    setDiscount(disc);
    setAppliedCoupon(data.code);
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gold/30 mx-auto mb-6" />
          <h2 className="text-3xl font-heading text-cream mb-3">Your Cart is Empty</h2>
          <p className="text-cream/50 mb-8">Explore our menu and add some delicious dishes.</p>
          <Link to="/menu" className="btn-gold inline-flex items-center gap-2">
            Browse Menu <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="container-lux">
        <h1 className="text-4xl font-heading text-cream mb-8">Your Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.food.id}
                  className="glass rounded-2xl p-4 flex gap-4 items-center"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <img
                    src={item.food.image_url ?? ''}
                    alt={item.food.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-cream font-heading text-lg">{item.food.name}</h3>
                    <p className="text-gold font-semibold">${item.food.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
                      className="w-8 h-8 glass rounded-full flex items-center justify-center text-cream hover:text-gold"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-cream w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
                      className="w-8 h-8 glass rounded-full flex items-center justify-center text-cream hover:text-gold"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-cream font-semibold">${(item.food.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.food.id)}
                      className="text-cream/40 hover:text-red-400 transition-colors mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={clearCart} className="text-cream/40 hover:text-red-400 text-sm transition-colors">
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="glass-strong rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-heading text-cream mb-6">Order Summary</h3>

            {/* Coupon */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code"
                    className="input-lux pl-10 text-sm"
                  />
                </div>
                <button onClick={applyCoupon} className="btn-outline-gold !px-4 text-sm">Apply</button>
              </div>
              {couponError && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
              {appliedCoupon && discount > 0 && (
                <p className="text-green-400 text-xs mt-2">Coupon "{appliedCoupon}" applied — you saved ${discount.toFixed(2)}!</p>
              )}
            </div>

            <div className="space-y-3 text-sm border-t border-gold/10 pt-4">
              <div className="flex justify-between text-cream/60">
                <span>Subtotal</span>
                <span className="text-cream">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-cream/60">
                <span>Tax (8%)</span>
                <span className="text-cream">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Delivery</span>
                <span className="text-cream">{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-heading pt-3 border-t border-gold/10">
                <span className="text-cream">Total</span>
                <span className="gold-text">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { discount, couponCode: appliedCoupon } })}
              className="btn-gold w-full mt-6 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <Link to="/menu" className="btn-ghost w-full mt-2 text-center block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
