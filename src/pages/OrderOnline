import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, MapPin } from 'lucide-react';
import { supabase, type Food } from '@/lib/supabase';
import { useCart } from '@/lib/cart';
import { FoodCard, FadeIn } from '@/components/UI';

export default function OrderOnline() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [scheduleLater, setScheduleLater] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    supabase.from('foods').select('*').eq('is_available', true).eq('is_best_seller', true).limit(12).then(({ data }) => setFoods(data ?? []));
  }, []);

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="container-lux">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl md:text-5xl font-heading text-cream mb-4">Order Online</h1>
          <p className="text-cream/50 max-w-xl">Choose delivery or pickup, schedule your order, and enjoy ALLBEE at home.</p>
        </motion.div>

        {/* Order options */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => setOrderType('delivery')}
            className={`p-6 rounded-2xl text-left transition-all border ${orderType === 'delivery' ? 'border-gold bg-gold/10' : 'glass border-transparent hover:border-gold/30'}`}
          >
            <MapPin size={24} className={orderType === 'delivery' ? 'text-gold' : 'text-cream/60'} />
            <h3 className="text-lg font-heading text-cream mt-3 mb-1">Delivery</h3>
            <p className="text-sm text-cream/50">Get it delivered to your doorstep in 30-45 min</p>
          </button>
          <button
            onClick={() => setOrderType('pickup')}
            className={`p-6 rounded-2xl text-left transition-all border ${orderType === 'pickup' ? 'border-gold bg-gold/10' : 'glass border-transparent hover:border-gold/30'}`}
          >
            <UtensilsCrossed size={24} className={orderType === 'pickup' ? 'text-gold' : 'text-cream/60'} />
            <h3 className="text-lg font-heading text-cream mt-3 mb-1">Pickup</h3>
            <p className="text-sm text-cream/50">Ready in 15-20 min — skip the wait</p>
          </button>
        </div>

        {/* Schedule */}
        <div className="glass rounded-2xl p-4 mb-10 flex items-center gap-4">
          <Clock size={20} className="text-gold" />
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={scheduleLater} onChange={(e) => setScheduleLater(e.target.checked)} className="w-5 h-5 accent-gold" />
            <span className="text-cream/70 text-sm">Schedule for later</span>
          </label>
          {scheduleLater && (
            <input type="datetime-local" className="input-lux !w-auto" />
          )}
        </div>

        {/* Foods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food, i) => (
            <FadeIn key={food.id} delay={i * 0.05}>
              <FoodCard
                image={food.image_url ?? ''}
                name={food.name}
                price={food.price}
                description={food.description ?? ''}
                rating={food.rating}
                isVeg={food.is_veg}
                isSpecial={food.is_special}
                onClick={() => (window.location.href = `/food/${food.slug}`)}
                onAdd={() => addItem(food)}
              />
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/menu" className="btn-outline-gold inline-flex">View Full Menu</Link>
        </div>
      </div>
    </div>
  );
}
