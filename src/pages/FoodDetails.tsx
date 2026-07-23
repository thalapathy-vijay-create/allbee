import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, Star, Clock, Flame, ChevronLeft, Check } from 'lucide-react';
import { supabase, type Food, type Review } from '@/lib/supabase';
import { useCart } from '@/lib/cart';
import { FoodCard, FadeIn, SectionTitle } from '@/components/UI';

export default function FoodDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [food, setFood] = useState<Food | null>(null);
  const [related, setRelated] = useState<Food[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addItem, wishlist, toggleWishlist } = useCart();

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data: f } = await supabase.from('foods').select('*').eq('slug', slug).maybeSingle();
      if (f) {
        setFood(f as Food);
        const [{ data: rel }, { data: rv }] = await Promise.all([
          supabase.from('foods').select('*').eq('category_id', (f as Food).category_id).neq('id', f.id).limit(4),
          supabase.from('reviews').select('*').eq('food_id', f.id).eq('is_approved', true),
        ]);
        setRelated(rel ?? []);
        setReviews(rv ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  const handleAdd = () => {
    if (food) {
      addItem(food, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-heading text-cream mb-4">Dish Not Found</h1>
          <Link to="/menu" className="btn-gold">Back to Menu</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(food.id);

  return (
    <div className="pt-20">
      <div className="container-lux px-6 md:px-12 lg:px-20 py-10">
        {/* Breadcrumb */}
        <Link to="/menu" className="inline-flex items-center gap-1 text-cream/50 hover:text-gold transition-colors mb-8 text-sm">
          <ChevronLeft size={16} />
          Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={food.image_url ?? ''}
                alt={food.name}
                className="w-full h-[500px] object-cover"
              />
              {food.is_special && (
                <span className="absolute top-4 left-4 bg-gold-gradient text-royal text-sm font-bold px-4 py-2 rounded-full">
                  Chef's Special
                </span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${food.is_veg ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm text-cream/60">{food.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading text-cream mb-4">{food.name}</h1>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <Star size={18} className="text-gold fill-gold" />
                <span className="text-cream font-medium">{food.rating.toFixed(1)}</span>
                <span className="text-cream/40 text-sm">({reviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-cream/60">
                <Clock size={16} />
                <span className="text-sm">{food.prep_time} min</span>
              </div>
              <div className="flex items-center gap-1 text-cream/60">
                <Flame size={16} />
                <span className="text-sm">{food.calories} cal</span>
              </div>
            </div>
            <p className="text-cream/60 leading-relaxed mb-6">{food.description}</p>

            <div className="text-4xl font-heading gold-text mb-6">${food.price.toFixed(2)}</div>

            {/* Ingredients */}
            {food.ingredients && food.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm tracking-wider uppercase text-gold/70 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map((ing, i) => (
                    <span key={i} className="glass px-3 py-1.5 rounded-full text-sm text-cream/70">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-heading text-gold">{food.calories}</p>
                <p className="text-xs text-cream/50 mt-1">Calories</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-heading text-gold">{food.prep_time}</p>
                <p className="text-xs text-cream/50 mt-1">Minutes</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-heading text-gold">{food.rating.toFixed(1)}</p>
                <p className="text-xs text-cream/50 mt-1">Rating</p>
              </div>
            </div>

            {/* Quantity & Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3 glass rounded-full px-2 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream hover:text-gold transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-cream font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream hover:text-gold transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="btn-gold flex-1 flex items-center justify-center gap-2"
              >
                {added ? <Check size={18} /> : <Plus size={18} />}
                {added ? 'Added!' : `Add to Cart — $${(food.price * quantity).toFixed(2)}`}
              </button>
              <button
                onClick={() => toggleWishlist(food.id)}
                className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all ${
                  isWishlisted ? 'text-gold border-gold/40' : 'text-cream/60 hover:text-gold'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-gold' : ''} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-20">
            <SectionTitle eyebrow="Guest Feedback" title="Customer Reviews" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <FadeIn key={review.id} delay={i * 0.1}>
                  <div className="card-lux p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-cream/70 text-sm leading-relaxed mb-4 italic">"{review.comment}"</p>
                    <p className="text-cream font-medium text-sm">{review.name}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Related Foods */}
        {related.length > 0 && (
          <div className="mt-20">
            <SectionTitle eyebrow="You May Also Like" title="Related Dishes" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((f, i) => (
                <FadeIn key={f.id} delay={i * 0.1}>
                  <FoodCard
                    image={f.image_url ?? ''}
                    name={f.name}
                    price={f.price}
                    description={f.description ?? ''}
                    rating={f.rating}
                    isVeg={f.is_veg}
                    isSpecial={f.is_special}
                    onClick={() => (window.location.href = `/food/${f.slug}`)}
                    onAdd={() => addItem(f)}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
