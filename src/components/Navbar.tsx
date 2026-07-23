import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, ChevronDown, Globe } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { useLanguage, type Language } from '@/lib/language';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/offers', label: 'Offers' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ta', label: 'தமிழ்', flag: 'TA' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  { code: 'ar', label: 'العربية', flag: 'AR' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { totalItems } = useCart();
  const { user, profile, signOut } = useAuth();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-lux px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-heading font-bold gold-text tracking-wide">
              ALLBEE
            </span>
            <span className="hidden md:inline text-xs tracking-[0.3em] text-gold/50 uppercase font-body">
              Restaurant
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-body transition-colors duration-300 relative group ${
                  location.pathname === link.to ? 'text-gold' : 'text-cream/70 hover:text-gold'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-cream/60 hover:text-gold transition-colors text-sm"
              >
                <Globe size={16} />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 glass rounded-xl py-2 min-w-[140px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gold/10 transition-colors ${
                          lang === l.code ? 'text-gold' : 'text-cream/70'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-cream/70 hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-royal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-1 text-cream/70 hover:text-gold transition-colors"
                >
                  <User size={20} />
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 glass rounded-xl py-2 min-w-[180px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-2 border-b border-gold/10">
                        <p className="text-sm text-cream font-medium">{profile?.full_name || 'Member'}</p>
                        <p className="text-xs text-gold/60">{profile?.loyalty_tier || 'Silver'} Member</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors">
                        My Profile
                      </Link>
                      <Link to="/profile?tab=orders" className="block px-4 py-2 text-sm text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors">
                        My Orders
                      </Link>
                      <Link to="/loyalty" className="block px-4 py-2 text-sm text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors">
                        Loyalty Rewards
                      </Link>
                      {profile?.is_admin && (
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gold hover:bg-gold/10 transition-colors">
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-outline-gold text-sm">
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-cream/70 hover:text-gold"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-royal/95 backdrop-blur-xl pt-24 pb-8 overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block py-3 text-lg font-body border-b border-gold/10 transition-colors ${
                      location.pathname === link.to ? 'text-gold' : 'text-cream/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!user && (
                <Link to="/login" className="btn-gold mt-4 text-center">
                  Login / Register
                </Link>
              )}
              <Link to="/careers" className="block py-3 text-lg text-cream/80 border-b border-gold/10">
                Careers
              </Link>
              <div className="flex gap-3 mt-4">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      lang === l.code ? 'bg-gold text-royal' : 'glass text-cream/70'
                    }`}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
