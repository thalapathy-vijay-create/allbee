import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Check, Home, Trees, Crown, Users2, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { PageHeader } from '@/components/UI';

const tableTypes = [
  { value: 'indoor', label: 'Indoor', icon: Home, desc: 'Elegant indoor seating with ambient lighting' },
  { value: 'outdoor', label: 'Outdoor', icon: Trees, desc: 'Al fresco dining in our garden terrace' },
  { value: 'vip', label: 'VIP', icon: Crown, desc: 'Exclusive VIP lounge with premium service' },
  { value: 'family', label: 'Family', icon: Users2, desc: 'Spacious family dining area' },
  { value: 'private', label: 'Private Dining', icon: Lock, desc: 'Intimate private room for special occasions' },
];

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
];

export default function Reservation() {
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: profile?.full_name ?? '',
    email: user?.email ?? '',
    phone: profile?.phone ?? '',
    date: '',
    time: '',
    guests: 2,
    tableType: 'indoor',
    specialRequest: '',
  });

  const update = (key: string, value: string | number) => setForm((p) => ({ ...p, [key]: value }));

  const canProceed = () => {
    if (step === 1) return form.date && form.time;
    if (step === 2) return form.guests > 0 && form.tableType;
    if (step === 3) return form.name && form.email && form.phone;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from('reservations').insert({
      user_id: user?.id ?? null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      reservation_date: form.date,
      reservation_time: form.time,
      guest_count: form.guests,
      table_type: form.tableType,
      special_request: form.specialRequest,
      status: 'pending',
    });
    setSubmitting(false);
    if (!error) setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="glass-strong rounded-3xl p-10 max-w-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Check size={40} className="text-royal" />
          </motion.div>
          <h2 className="text-3xl font-heading text-cream mb-3">Reservation Confirmed!</h2>
          <p className="text-cream/60 mb-6">
            We look forward to welcoming you, {form.name}. A confirmation has been sent to {form.email}.
          </p>
          <div className="glass rounded-2xl p-6 text-left mb-6 space-y-2">
            <div className="flex justify-between"><span className="text-cream/50">Date</span><span className="text-cream">{form.date}</span></div>
            <div className="flex justify-between"><span className="text-cream/50">Time</span><span className="text-cream">{form.time}</span></div>
            <div className="flex justify-between"><span className="text-cream/50">Guests</span><span className="text-cream">{form.guests}</span></div>
            <div className="flex justify-between"><span className="text-cream/50">Table Type</span><span className="text-cream capitalize">{form.tableType}</span></div>
          </div>
          <button onClick={() => { setConfirmed(false); setStep(1); }} className="btn-outline-gold">
            Make Another Reservation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Table Reservation"
        subtitle="Book your table for an unforgettable dining experience."
        image="https://images.pexels.com/photos/261047/pexels-photo-261047.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux max-w-3xl">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
            {['Date & Time', 'Table Type', 'Your Details'].map((label, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-gold' : step === i + 1 ? 'text-cream' : 'text-cream/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border ${
                    step > i + 1 ? 'bg-gold text-royal border-gold' : step === i + 1 ? 'border-gold text-gold' : 'border-cream/20'
                  }`}>
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  <span className="text-sm hidden md:inline">{label}</span>
                </div>
                {i < 2 && <div className={`w-8 md:w-16 h-px mx-1 md:mx-2 ${step > i + 1 ? 'bg-gold' : 'bg-cream/20'}`} />}
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-heading text-cream mb-6">Choose Date & Time</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gold/70 mb-2">
                        <Calendar size={16} /> Select Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => update('date', e.target.value)}
                        className="input-lux"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gold/70 mb-2">
                        <Clock size={16} /> Select Time
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => update('time', slot)}
                            className={`py-2.5 rounded-xl text-sm font-body transition-all ${
                              form.time === slot
                                ? 'bg-gold-gradient text-royal font-semibold'
                                : 'glass text-cream/60 hover:text-gold'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-heading text-cream mb-6">Select Table Type & Guests</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gold/70 mb-2">
                        <Users size={16} /> Number of Guests
                      </label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => update('guests', Math.max(1, form.guests - 1))} className="w-10 h-10 glass rounded-full text-cream hover:text-gold">-</button>
                        <span className="text-2xl font-heading text-cream w-12 text-center">{form.guests}</span>
                        <button onClick={() => update('guests', Math.min(20, form.guests + 1))} className="w-10 h-10 glass rounded-full text-cream hover:text-gold">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gold/70 mb-3 block">Table Type</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tableTypes.map((t) => (
                          <button
                            key={t.value}
                            onClick={() => update('tableType', t.value)}
                            className={`p-4 rounded-xl text-left transition-all border ${
                              form.tableType === t.value
                                ? 'border-gold bg-gold/10'
                                : 'glass border-transparent hover:border-gold/30'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-1">
                              <t.icon size={20} className={form.tableType === t.value ? 'text-gold' : 'text-cream/60'} />
                              <span className="text-cream font-medium">{t.label}</span>
                            </div>
                            <p className="text-xs text-cream/50">{t.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-heading text-cream mb-6">Your Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gold/70 mb-2 block">Full Name</label>
                      <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-lux" placeholder="Your full name" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gold/70 mb-2 block">Email</label>
                        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-lux" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="text-sm text-gold/70 mb-2 block">Phone</label>
        <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-lux" placeholder="+1 555 000 0000" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gold/70 mb-2 block">Special Requests (Optional)</label>
                      <textarea
                        value={form.specialRequest}
                        onChange={(e) => update('specialRequest', e.target.value)}
                        className="input-lux min-h-[100px] resize-none"
                        placeholder="Any dietary requirements, occasion, or seating preferences..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gold/10">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`btn-ghost ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                Back
              </button>
              {step < 3 ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitting}
                  className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Confirming...' : 'Confirm Reservation'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
