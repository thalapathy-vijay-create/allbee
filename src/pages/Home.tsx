import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Star, Award, UtensilsCrossed, Calendar, ArrowRight, Quote } from 'lucide-react';
import { supabase, type Food, type Review, type GalleryItem } from '@/lib/supabase';
import { useCart } from '@/lib/cart';
import { SectionTitle, FadeIn, FoodCard } from '@/components/UI';

export default function Home() {
  const [specials, setSpecials] = useState<Food[]>([]);
  const [bestSellers, setBestSellers] = useState<Food[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    (async () => {
      const [{ data: sp }, { data: bs }, { data: rv }, { data: gl }] = await Promise.all([
        supabase.from('foods').select('*').eq('is_special', true).limit(4),
        supabase.from('foods').select('*').eq('is_best_seller', true).limit(8),
        supabase.from('reviews').select('*').eq('is_approved', true).limit(6),
        supabase.from('gallery_items').select('*').order('sort_order').limit(6),
      ]);
      setSpecials(sp ?? []);
      setBestSellers(bs ?? []);
      setReviews(rv ?? []);
      setGallery(gl ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img
            src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="ALLBEE Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal/60 via-royal/50 to-royal" />
        </motion.div>

        {/* Floating gold orbs */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-gold rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-gold rounded-full animate-float-slow opacity-40" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-gold rounded-full animate-float opacity-50" />

        <motion.div
          className="relative text-center px-6 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.4em] uppercase text-gold/80 mb-6 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Michelin-Level Fine Dining
          </motion.p>
          <motion.h1
            className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-cream mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ALLBEE
            <span className="block gold-text text-3xl md:text-5xl mt-2">RESTAURANT</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Where culinary artistry meets luxury hospitality. Experience a symphony of flavors crafted by world-class chefs.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Link to="/reservation" className="btn-gold flex items-center justify-center gap-2">
              <Calendar size={18} />
              Book a Table
            </Link>
            <Link to="/menu" className="btn-outline-gold flex items-center justify-center gap-2">
              Explore Menu
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="bg-charcoal border-y border-gold/10 py-12">
        <div className="container-lux px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Award, value: '15+', label: 'Years of Excellence' },
            { icon: Star, value: '4.9', label: 'Customer Rating' },
            { icon: UtensilsCrossed, value: '120+', label: 'Signature Dishes' },
            { icon: Calendar, value: '50K+', label: 'Happy Guests' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <stat.icon className="text-gold mb-3" size={28} />
                <p className="text-3xl md:text-4xl font-heading text-cream">{stat.value}</p>
                <p className="text-sm text-cream/50 mt-1">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Chef Introduction */}
      <section className="section-padding">
        <div className="container-lux grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 rounded-3xl translate-x-4 translate-y-4" />
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Head Chef"
                className="relative rounded-3xl w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 left-6 glass-strong rounded-2xl px-6 py-4">
                <p className="text-gold text-sm tracking-wider uppercase">Executive Chef</p>
                <p className="text-cream text-xl font-heading">Marcus Aurelius</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm tracking-[0.3em] uppercase text-gold/70 mb-4">Meet Our Chef</p>
            <h2 className="text-4xl md:text-5xl font-heading text-cream mb-6">
              A Visionary in <span className="gold-text">Culinary Art</span>
            </h2>
            <div className="luxury-divider mb-6 !mx-0" />
            <p className="text-cream/60 leading-relaxed mb-4">
              With over two decades of experience in Michelin-starred kitchens across Paris, Tokyo, and New York,
              Chef Marcus Aurelius brings a philosophy of culinary excellence to every plate.
            </p>
            <p className="text-cream/60 leading-relaxed mb-8">
              His approach combines classical French techniques with bold global flavors, creating dishes that
              are both visually stunning and deeply satisfying. Each creation tells a story of passion, precision, and artistry.
            </p>
            <Link to="/about" className="btn-outline-gold inline-flex items-center gap-2">
              Discover Our Story
              <ChevronRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="section-padding bg-gradient-to-b from-royal to-charcoal">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Today's Special"
            title="Chef's Signature Selection"
            subtitle="Handcrafted dishes that represent the pinnacle of our culinary artistry, available for a limited time."
          />
          {!loading && specials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specials.map((food, i) => (
                <FadeIn key={food.id} delay={i * 0.1}>
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
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Guest Favorites"
            title="Best Sellers"
            subtitle="The most loved dishes by our discerning guests, crafted to perfection."
          />
          {!loading && bestSellers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((food, i) => (
                <FadeIn key={food.id} delay={i * 0.08}>
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
          )}
        </div>
      </section>

      {/* Offers Banner */}
      <section className="px-6 md:px-12 lg:px-20 py-10">
        <div className="container-lux">
          <FadeIn>
            <div className="glass-strong rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent" />
              <div className="relative grid md:grid-cols-2 items-center gap-8 p-8 md:p-12">
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-gold mb-3">Exclusive Offer</p>
                  <h3 className="text-3xl md:text-4xl font-heading text-cream mb-4">
                    20% Off Your First Order
                  </h3>
                  <p className="text-cream/60 mb-6">
                    Use code <span className="text-gold font-semibold">WELCOME20</span> at checkout and indulge in our finest dishes at a special price.
                  </p>
                  <Link to="/offers" className="btn-gold inline-flex items-center gap-2">
                    View All Offers
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-7xl font-heading gold-text">20%</div>
                  <p className="text-cream/50 mt-2">Off first order</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-padding bg-gradient-to-b from-royal to-charcoal">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Testimonials"
            title="What Our Guests Say"
            subtitle="Real experiences from our valued guests who have savored the ALLBEE difference."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.1}>
                <div className="card-lux p-6 h-full">
                  <Quote className="text-gold/30 mb-4" size={32} />
                  <p className="text-cream/70 leading-relaxed mb-6 italic">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cream font-medium">{review.name}</p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={14} className="text-gold fill-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container-lux">
          <SectionTitle
            eyebrow="A Glimpse Inside"
            title="Our Gallery"
            subtitle="Step into a world of elegance and ambiance at ALLBEE RESTAURANT."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.08}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={item.image_url}
                    alt={item.title ?? ''}
                    loading="lazy"
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-cream text-sm font-medium">{item.title}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-outline-gold inline-flex items-center gap-2">
              View Full Gallery
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="container-lux">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/261047/pexels-photo-261047.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Reserve"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-royal/70 flex flex-col items-center justify-center text-center px-6">
                <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Reserve Your Experience</p>
                <h3 className="text-3xl md:text-5xl font-heading text-cream mb-6">
                  A Table Awaits You
                </h3>
                <p className="text-cream/60 max-w-lg mb-8">
                  Book your table today and embark on a culinary journey like no other. Every reservation is an invitation to excellence.
                </p>
                <Link to="/reservation" className="btn-gold inline-flex items-center gap-2">
                  <Calendar size={18} />
                  Reserve Now
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
