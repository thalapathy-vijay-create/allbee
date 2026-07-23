import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Briefcase, MapPin, Clock, DollarSign, Check } from 'lucide-react';
import { supabase, type Career } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { PageHeader, FadeIn } from '@/components/UI';

export default function Careers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selected, setSelected] = useState<Career | null>(null);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '', resumeUrl: '' });
  const { user, profile } = useAuth();

  useEffect(() => {
    supabase.from('careers').select('*').eq('is_active', true).then(({ data }) => setCareers(data ?? []));
  }, []);

  const apply = async () => {
    if (!user || !selected) return;
    const { error } = await supabase.from('applicants').insert({
      career_id: selected.id,
      user_id: user.id,
      name: form.name || profile?.full_name || '',
      email: form.email || user.email || '',
      phone: form.phone,
      cover_letter: form.coverLetter,
      resume_url: form.resumeUrl,
    });
    if (!error) {
      setApplied(true);
      setTimeout(() => { setApplied(false); setSelected(null); }, 2500);
    }
  };

  return (
    <div>
      <PageHeader
        title="Careers"
        subtitle="Join the ALLBEE family and be part of a world-class dining experience."
        image="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-6">
            {careers.map((career, i) => (
              <FadeIn key={career.id} delay={i * 0.05}>
                <div className="card-lux p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading text-cream">{career.title}</h3>
                      <p className="text-sm text-gold/70">{career.department}</p>
                    </div>
                  </div>
                  <p className="text-sm text-cream/50 leading-relaxed mb-4">{career.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-cream/40 mb-4">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {career.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {career.job_type}</span>
                    {career.salary_range && <span className="flex items-center gap-1"><DollarSign size={14} /> {career.salary_range}</span>}
                  </div>
                  <button onClick={() => setSelected(career)} className="btn-outline-gold text-sm">
                    Apply Now
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Apply modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] bg-royal/80 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="glass-strong rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {applied ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-royal" />
                  </div>
                  <h3 className="text-2xl font-heading text-cream mb-2">Application Submitted!</h3>
                  <p className="text-cream/50">We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-heading text-cream mb-2">Apply for {selected.title}</h3>
                  <p className="text-cream/50 text-sm mb-6">{selected.department}</p>
                  {!user ? (
                    <div className="text-center py-8">
                      <p className="text-cream/50 mb-4">Please login to apply.</p>
                      <a href="/login" className="btn-gold">Login</a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input value={form.name || profile?.full_name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="input-lux" />
                        <input value={form.email || user?.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="input-lux" />
                      </div>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="input-lux" />
                      <textarea value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} placeholder="Cover letter..." className="input-lux min-h-[100px] resize-none" />
                      <div>
                        <label className="text-sm text-gold/70 mb-2 flex items-center gap-2"><Upload size={14} /> Resume URL</label>
                        <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="Link to your resume" className="input-lux" />
                      </div>
                      <button onClick={apply} className="btn-gold w-full">Submit Application</button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
