import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth';
import { CartProvider } from '@/lib/cart';
import { LanguageProvider } from '@/lib/language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import FoodDetails from '@/pages/FoodDetails';
import About from '@/pages/About';
import Reservation from '@/pages/Reservation';
import Gallery from '@/pages/Gallery';
import Events from '@/pages/Events';
import Offers from '@/pages/Offers';
import Reviews from '@/pages/Reviews';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Careers from '@/pages/Careers';
import FAQ from '@/pages/FAQ';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Loyalty from '@/pages/Loyalty';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderSuccess from '@/pages/OrderSuccess';
import TrackOrder from '@/pages/TrackOrder';
import OrderOnline from '@/pages/OrderOnline';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
          <Route path="/food/:slug" element={<PageWrapper><FoodDetails /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/reservation" element={<PageWrapper><Reservation /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
          <Route path="/offers" element={<PageWrapper><Offers /></PageWrapper>} />
          <Route path="/reviews" element={<PageWrapper><Reviews /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
          <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/loyalty" element={<PageWrapper><Loyalty /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
          <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
          <Route path="/track-order" element={<PageWrapper><TrackOrder /></PageWrapper>} />
          <Route path="/order-online" element={<PageWrapper><OrderOnline /></PageWrapper>} />
          <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Loader />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
