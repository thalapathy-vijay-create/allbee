import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Plus } from 'lucide-react';
import { supabase, type Review } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { PageHeader, FadeIn } from '@/components/UI';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { user, profile } = useAuth();

  useEffect(() => {
    supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false }).then(({ data }) => setReviews(data ?? []));
  }, []);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';

  const submitReview = async () => {
    if (!user || !newReview.comment) return;
    const { data } = await supabase.from('reviews').insert({
      user_id: user.id,
      name: profile?.full_name ?? 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      is_approved: true,
    }).select().single();
    if (data) {
      setReviews([data as Review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
      setShowForm(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Reviews"
        subtitle="Hear from our guests about their ALLBEE experience."
        image="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          {/* Rating summary */}
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-6xl font-heading gold-text">{avgRating}</p>
                <div className="flex gap-1 justify-center md:justify-start mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} className={i < Math.round(parseFloat(avgRating)) ? 'text-gold fill-gold' : 'text-cream/20'} />
                  ))}
                </div>
                <p className="text-cream/50 text-sm mt-2">Based on {reviews.length} reviews</p>
              </div>
              <button onClick={() => setShowForm(!showForm)} className="btn-gold flex items-center gap-2">
                <Plus size={18} /> Write a Review
              </button>
            </div>
          </FadeIn>

          {/* Review form */}
          {showForm && (
            <motion.div className="glass-strong rounded-2xl p-6 mb-10" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              {!user ? (
                <p className="text-cream/50 text-center">Please <a href="/login" className="text-gold">login</a> to write a review.</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gold/70 mb-2 block">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setNewReview({ ...newReview, rating: n })}>
                          <Star size={24} className={n <= newReview.rating ? 'text-gold fill-gold' : 'text-cream/20'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gold/70 mb-2 block">Your Review</label>
                    <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} className="input-lux min-h-[100px] resize-none" placeholder="Share your experience..." />
                  </div>
                  <button onClick={submitReview} className="btn-gold">Submit Review</button>
                </div>
              )}
            </motion.div>
          )}

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.05}>
                <div className="card-lux p-6 h-full">
                  <Quote className="text-gold/30 mb-4" size={28} />
                  <p className="text-cream/70 leading-relaxed mb-6 italic">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cream font-medium">{review.name}</p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={12} className="text-gold fill-gold" />
                        ))}
                      </div>
                    </div>
                    {review.photo_url && <img src={review.photo_url} alt="" className="w-12 h-12 rounded-lg object-cover" />}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
