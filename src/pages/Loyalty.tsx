import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Star, Award, Gift, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { PageHeader, FadeIn } from '@/components/UI';

const tiers = [
  { name: 'Silver', icon: Star, minPoints: 0, perks: ['5% off on orders', 'Birthday treat', 'Priority support'] },
  { name: 'Gold', icon: Award, minPoints: 500, perks: ['10% off on orders', 'Free dessert monthly', 'Early access to events', 'Priority reservations'] },
  { name: 'Platinum', icon: Crown, minPoints: 2000, perks: ['15% off on orders', 'Free appetizer monthly', 'Private dining discount', 'Concierge service', 'Exclusive tasting events'] },
];

const rewards = [
  { points: 100, title: 'Free Dessert', desc: 'Any dessert from our menu' },
  { points: 300, title: '$10 Off', desc: 'On your next order' },
  { points: 500, title: 'Free Main Course', desc: 'Select main courses' },
  { points: 1000, title: 'Private Dining for 2', desc: 'Complimentary private dinner' },
  { points: 2000, title: 'Chef\'s Table Experience', desc: 'Exclusive 7-course tasting menu' },
];

export default function Loyalty() {
  const { user, profile } = useAuth();
  const currentTier = profile?.loyalty_tier ?? 'Silver';
  const currentPoints = profile?.loyalty_points ?? 0;

  return (
    <div>
      <PageHeader
        title="Loyalty Program"
        subtitle="Earn points, unlock tiers, and enjoy exclusive rewards with every visit."
        image="https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Current status */}
      <div className="section-padding !pb-10">
        <div className="container-lux">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <div className="relative">
                <Crown size={40} className="text-gold mx-auto mb-4" />
                {user ? (
                  <>
                    <p className="text-sm tracking-wider uppercase text-gold/70 mb-2">Your Current Tier</p>
                    <h2 className="text-4xl font-heading gold-text mb-2">{currentTier}</h2>
                    <p className="text-3xl font-heading text-cream mb-4">{currentPoints} Points</p>
                    <div className="max-w-md mx-auto">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gold-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (currentPoints / 2000) * 100)}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-cream/40 mt-2">{2000 - currentPoints} points to Platinum</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-heading text-cream mb-3">Join Our Loyalty Program</h2>
                    <p className="text-cream/60 mb-6 max-w-lg mx-auto">Sign up to start earning points with every order and unlock exclusive rewards.</p>
                    <Link to="/register" className="btn-gold inline-flex">Join Now</Link>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Tiers */}
      <div className="section-padding !pt-10">
        <div className="container-lux">
          <h3 className="text-2xl font-heading text-cream mb-8 text-center">Membership Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div className={`glass-strong rounded-3xl p-8 h-full ${currentTier === tier.name ? 'border-gold ring-1 ring-gold/30' : ''}`}>
                  <div className="text-center mb-6">
                    <tier.icon size={36} className="text-gold mx-auto mb-3" />
                    <h4 className="text-2xl font-heading text-cream">{tier.name}</h4>
                    <p className="text-sm text-cream/50">{tier.minPoints}+ points</p>
                  </div>
                  <ul className="space-y-3">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-cream/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="section-padding bg-gradient-to-b from-royal to-charcoal">
        <div className="container-lux">
          <h3 className="text-2xl font-heading text-cream mb-8 text-center">Redeem Your Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card-lux p-6">
                  <Gift size={28} className="text-gold mb-3" />
                  <h4 className="text-lg font-heading text-cream mb-1">{reward.title}</h4>
                  <p className="text-sm text-cream/50 mb-4">{reward.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-heading text-xl">{reward.points} pts</span>
                    <button disabled={!user || currentPoints < reward.points} className="text-sm font-button text-gold border border-gold/30 rounded-full px-4 py-1.5 hover:bg-gold hover:text-royal transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      Redeem
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Referral */}
      <div className="section-padding">
        <div className="container-lux">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <Users size={40} className="text-gold mx-auto mb-4" />
              <h3 className="text-3xl font-heading text-cream mb-3">Refer & Earn</h3>
              <p className="text-cream/60 max-w-lg mx-auto mb-6">Invite friends to ALLBEE and earn 100 points for each friend who makes their first order.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input readOnly value="ALLBEE-REF-XXXX" className="input-lux flex-1 text-center" />
                <button className="btn-gold flex items-center justify-center gap-2">
                  Copy Link <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
