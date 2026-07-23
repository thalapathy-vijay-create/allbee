import { motion } from 'framer-motion';
import { Award, Eye, Target, Users, UtensilsCrossed, Star, Trophy } from 'lucide-react';
import { SectionTitle, FadeIn, PageHeader } from '@/components/UI';

const achievements = [
  { icon: Trophy, value: '3', label: 'Michelin Stars' },
  { icon: Award, value: '15+', label: 'Years of Excellence' },
  { icon: Users, value: '50K+', label: 'Guests Served' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
];

const awards = [
  { year: '2024', title: 'Best Fine Dining Restaurant', org: 'Culinary Excellence Awards' },
  { year: '2023', title: 'Restaurant of the Year', org: 'Luxury Hospitality Guild' },
  { year: '2022', title: 'Best Chef of the Year', org: 'International Chef Association' },
  { year: '2021', title: 'Excellence in Service', org: 'World Dining Awards' },
];

const chefTeam = [
  { name: 'Marcus Aurelius', role: 'Executive Chef', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sofia Rossi', role: 'Pastry Chef', image: 'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Kenji Tanaka', role: 'Sushi Master', image: 'https://images.pexels.com/photos/3814448/pexels-photo-3814448.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Isabella Moreau', role: 'Sommelier', image: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function About() {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="A legacy of culinary excellence and luxury hospitality."
        image="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Story */}
      <section className="section-padding">
        <div className="container-lux grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-sm tracking-[0.3em] uppercase text-gold/70 mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-heading text-cream mb-6">A Journey of <span className="gold-text">Culinary Passion</span></h2>
            <div className="luxury-divider mb-6 !mx-0" />
            <p className="text-cream/60 leading-relaxed mb-4">
              Founded in 2009, ALLBEE RESTAURANT began as a vision to create a dining destination that would redefine fine dining.
              What started as a small bistro has evolved into a world-class restaurant recognized by critics and guests alike.
            </p>
            <p className="text-cream/60 leading-relaxed mb-4">
              Our philosophy is simple: source the finest ingredients, prepare them with precision and artistry,
              and serve them in an atmosphere of unparalleled elegance. Every detail, from the table settings to the
              lighting, has been carefully curated to create an unforgettable experience.
            </p>
            <p className="text-cream/60 leading-relaxed">
              Today, ALLBEE stands as a testament to the power of culinary passion and hospitality excellence.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 rounded-3xl translate-x-4 translate-y-4" />
              <img src="https://images.pexels.com/photos/261047/pexels-photo-261047.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Restaurant" className="relative rounded-3xl w-full h-[450px] object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-b from-royal to-charcoal">
        <div className="container-lux grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-10 h-full">
              <Target size={32} className="text-gold mb-4" />
              <h3 className="text-2xl font-heading text-cream mb-4">Our Mission</h3>
              <p className="text-cream/60 leading-relaxed">
                To create extraordinary dining experiences that delight the senses, nourish the soul, and create lasting memories.
                We are committed to culinary innovation, impeccable service, and the highest standards of quality in everything we do.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="glass-strong rounded-3xl p-10 h-full">
              <Eye size={32} className="text-gold mb-4" />
              <h3 className="text-2xl font-heading text-cream mb-4">Our Vision</h3>
              <p className="text-cream/60 leading-relaxed">
                To be recognized globally as the pinnacle of fine dining — a destination where culinary artistry meets luxury hospitality,
                and where every guest embarks on a journey of taste, elegance, and discovery.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-lux">
          <SectionTitle eyebrow="Our Numbers" title="Achievements" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-strong rounded-2xl p-8 text-center">
                  <a.icon size={32} className="text-gold mx-auto mb-4" />
                  <p className="text-4xl font-heading text-cream">{a.value}</p>
                  <p className="text-sm text-cream/50 mt-2">{a.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding bg-gradient-to-b from-royal to-charcoal">
        <div className="container-lux">
          <SectionTitle eyebrow="Recognition" title="Awards & Honors" />
          <div className="space-y-4 max-w-3xl mx-auto">
            {awards.map((award, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                    <Trophy size={28} className="text-royal" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-heading text-cream">{award.title}</h4>
                    <p className="text-sm text-cream/50">{award.org}</p>
                  </div>
                  <span className="text-gold font-heading text-2xl">{award.year}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Team */}
      <section className="section-padding">
        <div className="container-lux">
          <SectionTitle eyebrow="The Team" title="Meet Our Chefs" subtitle="The masterminds behind every exquisite dish." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefTeam.map((chef, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div className="card-lux group" whileHover={{ y: -8 }}>
                  <div className="relative overflow-hidden h-72">
                    <img src={chef.image} alt={chef.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal to-transparent" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-heading text-cream">{chef.name}</h3>
                    <p className="text-sm text-gold/70">{chef.role}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
