import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-royal border-t border-gold/15 mt-20">
      {/* Newsletter */}
      <div className="section-padding !py-16">
        <div className="container-lux text-center">
          <h3 className="text-3xl md:text-4xl font-heading text-cream mb-3">
            Join Our <span className="gold-text">Inner Circle</span>
          </h3>
          <p className="text-cream/50 mb-8 max-w-xl mx-auto">
            Subscribe for exclusive offers, new menu reveals, and invitations to private tasting events.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="input-lux flex-1"
              required
            />
            <button type="submit" className="btn-gold flex items-center justify-center gap-2">
              <Send size={16} />
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gold/10" />

      {/* Main footer */}
      <div className="section-padding !py-16">
        <div className="container-lux grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="text-gold" size={28} />
              <span className="text-2xl font-heading font-bold gold-text">ALLBEE</span>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed mb-6">
              A world-class dining destination where fine dining meets luxury hospitality. Every plate is a masterpiece.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/40 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-gold mb-5 font-body">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/menu', label: 'Menu' },
                { to: '/reservation', label: 'Reservations' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/events', label: 'Events' },
                { to: '/offers', label: 'Offers' },
                { to: '/loyalty', label: 'Loyalty Program' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream/50 text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-gold mb-5 font-body">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/50">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>1 Royal Avenue, Luxury District, City 00100</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+1 (555) 100-2000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold shrink-0" />
                <span>reservations@allbee.com</span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-cream/40 mb-1">Opening Hours</p>
              <p className="text-sm text-cream/50">Mon–Sun: 12:00 PM – 11:00 PM</p>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-gold mb-5 font-body">Information</h4>
            <ul className="space-y-3 text-sm">
              {['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Cookie Policy', 'FAQ', 'Careers'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'FAQ' ? '/faq' : item === 'Careers' ? '/careers' : '#'}
                    className="text-cream/50 hover:text-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gold/10 py-6">
        <div className="container-lux px-6 md:px-12 text-center">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} ALLBEE RESTAURANT. All rights reserved. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
