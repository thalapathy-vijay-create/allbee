import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signUp(form.email, form.password, form.fullName, form.phone);
    setLoading(false);
    if (error) setError(error);
    else navigate('/');
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-6 py-10">
      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-10 max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading gold-text mb-2">Create Account</h1>
          <p className="text-cream/50 text-sm">Join the ALLBEE experience</p>
        </div>

        {error && (
          <div className="glass border border-red-400/30 rounded-xl p-3 mb-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-lux pl-12" placeholder="Your full name" required />
            </div>
          </div>
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-lux pl-12" placeholder="your@email.com" required />
            </div>
          </div>
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Phone</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-lux pl-12" placeholder="+1 555 000 0000" required />
            </div>
          </div>
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-lux pl-12 pr-12" placeholder="••••••••" required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? 'Creating account...' : <>Create Account <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-cream/50 text-sm mt-6">
          Already have an account? <Link to="/login" className="text-gold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
