import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Crown, Percent } from 'lucide-react';
import { supabase, type Coupon } from '@/lib/supabase';
import { PageHeader, FadeIn } from '@/components/UI';

export default function Offers() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    supabase.from('coupons').select('*').eq('is_active', true).then(({ data }) => setCoupons(data ?? []));
  }, []);

  return (
    <div>
      <PageHeader
        title="Offers"
        subtitle="Exclusive deals and special offers for our valued guests."
        image="https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          {/* Featured offer */}
          <FadeIn>
            <div className="glass-strong rounded-3xl p-10 mb-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <div className="relative">
                <Crown size={40} className="text-gold mx-auto mb-4" />
                <h3 className="text-3xl md:text-4xl font-heading text-cream mb-3">Membership Rewards</h3>
                <p className="text-cream/60 max-w-xl mx-auto mb-6">Join our loyalty program and unlock exclusive member-only offers, birthday treats, and priority reservations.</p>
                <a href="/loyalty" className="btn-gold inline-flex">Explore Loyalty Program</a>
              </div>
            </div>
          </FadeIn>

          {/* Coupons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon, i) => (
              <FadeIn key={coupon.id} delay={i * 0.1}>
                <motion.div className="glass-strong rounded-2xl overflow-hidden" whileHover={{ y: -5 }}>
                  <div className="bg-gold-gradient p-6 text-center relative">
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-royal rounded-full -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-royal rounded-full -translate-y-1/2" />
                    {coupon.discount_type === 'percentage' ? (
                      <Percent size={32} className="text-royal mx-auto mb-2" />
                    ) : (
                      <Tag size={32} className="text-royal mx-auto mb-2" />
                    )}
                    <p className="text-4xl font-heading text-royal">
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `$${coupon.discount_value}`}
                    </p>
                    <p className="text-royal/70 text-sm uppercase tracking-wider">Off</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-gold font-button font-bold text-lg tracking-wider">{coupon.code}</code>
                      <button
                        onClick={() => navigator.clipboard?.writeText(coupon.code)}
                        className="text-xs text-cream/50 hover:text-gold transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-cream/60 mb-3">{coupon.description}</p>
                    <div className="flex items-center gap-2 text-xs text-cream/40">
                      <Clock size={14} />
                      {coupon.min_order > 0 && <span>Min order: ${coupon.min_order}</span>}
                      {coupon.expires_at && <span>Expires: {new Date(coupon.expires_at).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
