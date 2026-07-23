import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
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
          <h1 className="text-3xl font-heading gold-text mb-2">Welcome Back</h1>
          <p className="text-cream/50 text-sm">Sign in to your ALLBEE account</p>
        </div>

        {error && (
          <div className="glass border border-red-400/30 rounded-xl p-3 mb-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-lux pl-12" placeholder="your@email.com" required />
            </div>
          </div>
          <div>
            <label className="text-sm text-gold/70 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-lux pl-12 pr-12" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-cream/60">
              <input type="checkbox" className="accent-gold" /> Remember me
            </label>
            <a href="#" className="text-gold/70 hover:text-gold">Forgot password?</a>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-cream/50 text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-gold hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
