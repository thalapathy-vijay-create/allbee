import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AdminLogin() {
  const { signIn, profile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    // Check if user is admin
    setTimeout(() => {
      if (profile?.is_admin) {
        navigate('/admin');
      } else {
        navigate('/admin');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-royal via-charcoal to-royal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-10 max-w-md w-full relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-royal" />
          </div>
          <h1 className="text-2xl font-heading gold-text mb-2">Admin Access</h1>
          <p className="text-cream/50 text-sm">Secure login for ALLBEE administrators</p>
        </div>

        {error && (
          <div className="glass border border-red-400/30 rounded-xl p-3 mb-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Admin Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-lux" placeholder="admin@allbee.com" required />
          </div>
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-lux pl-12" placeholder="••••••••" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? 'Verifying...' : <>Access Dashboard <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gold/10 text-center">
          <Link to="/" className="text-sm text-cream/50 hover:text-gold transition-colors">← Back to website</Link>
        </div>
      </motion.div>
    </div>
  );
}
