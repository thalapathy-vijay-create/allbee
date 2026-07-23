import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase, type GalleryItem } from '@/lib/supabase';
import { PageHeader, FadeIn } from '@/components/UI';

const categories = ['all', 'interior', 'exterior', 'kitchen', 'food', 'events'];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('gallery_items').select('*').order('sort_order').then(({ data }) => setItems(data ?? []));
  }, []);

  const filtered = active === 'all' ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="A visual journey through ALLBEE RESTAURANT — our spaces, our cuisine, our moments."
        image="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-body capitalize whitespace-nowrap transition-all ${
                  active === cat ? 'bg-gold-gradient text-royal font-semibold' : 'glass text-cream/60 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(item.image_url)}
                >
                  <img src={item.image_url} alt={item.title ?? ''} loading="lazy" className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-cream font-medium">{item.title}</p>
                      <p className="text-xs text-gold/70 capitalize">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-royal/95 backdrop-blur-xl flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-cream/60 hover:text-gold" onClick={() => setLightbox(null)}>
              <X size={28} />
            </button>
            <motion.img
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-full rounded-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
