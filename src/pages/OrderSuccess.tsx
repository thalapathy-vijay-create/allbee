import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, MapPin, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId } = (location.state ?? {}) as { orderId?: string };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="glass-strong rounded-3xl p-10 max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Check size={48} className="text-royal" strokeWidth={3} />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-heading text-cream mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Order Placed Successfully!
        </motion.h2>

        <motion.p
          className="text-cream/60 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank you for your order. We're preparing your delicious meal.
        </motion.p>

        {orderId && (
          <motion.p
            className="text-gold text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Order ID: {orderId.slice(0, 8).toUpperCase()}
          </motion.p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/track-order" className="btn-gold flex items-center justify-center gap-2">
            <MapPin size={18} /> Track Order
          </Link>
          <button className="btn-outline-gold flex items-center justify-center gap-2" onClick={() => window.print()}>
            <Download size={18} /> Download Invoice
          </button>
        </div>

        <Link to="/menu" className="btn-ghost mt-4 inline-flex items-center gap-2">
          <ShoppingBag size={16} /> Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
