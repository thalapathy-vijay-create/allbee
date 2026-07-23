import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase, type Food, type Category } from '@/lib/supabase';
import { useCart } from '@/lib/cart';
import { PageHeader, FoodCard, FadeIn } from '@/components/UI';

export default function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      const [{ data: f }, { data: c }] = await Promise.all([
        supabase.from('foods').select('*').eq('is_available', true),
        supabase.from('categories').select('*').eq('is_active', true).order('sort_order'),
      ]);
      setFoods(f ?? []);
      setCategories(c ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = foods;
    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) result = result.filter((f) => f.category_id === cat.id);
    }
    if (vegOnly) result = result.filter((f) => f.is_veg);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.name.toLowerCase().includes(q) || (f.description ?? '').toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [foods, categories, activeCategory, vegOnly, search, sortBy]);

  return (
    <div>
      <PageHeader
        title="Our Menu"
        subtitle="Explore a curated selection of dishes crafted with the finest ingredients and culinary mastery."
        image="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Search & Filters */}
      <div className="sticky top-16 z-30 glass-strong py-4 px-6">
        <div className="container-lux flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes..."
              className="input-lux pl-12"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold">
                <X size={18} />
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-3 rounded-xl text-sm font-body transition-all ${
                vegOnly ? 'bg-green-500/20 border border-green-400/40 text-green-300' : 'glass text-cream/60'
              }`}
            >
              Veg Only
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-lux !w-auto cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-6 md:px-12 lg:px-20 pt-8 pb-4">
        <div className="container-lux flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-body whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-gold-gradient text-royal font-semibold'
                : 'glass text-cream/60 hover:text-gold'
            }`}
          >
            All Dishes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-body whitespace-nowrap transition-all ${
                activeCategory === cat.slug
                  ? 'bg-gold-gradient text-royal font-semibold'
                  : 'glass text-cream/60 hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="section-padding !pt-8">
        <div className="container-lux">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card-lux h-80 animate-pulse">
                  <div className="h-56 bg-white/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <SlidersHorizontal size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-cream/50">No dishes match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <>
              <p className="text-cream/40 text-sm mb-6">{filtered.length} dishes found</p>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeCategory + vegOnly + sortBy}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {filtered.map((food, i) => (
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
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
