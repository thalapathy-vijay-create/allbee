import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { PageHeader, FadeIn } from '@/components/UI';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '1 Royal Avenue, Luxury District, City 00100' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 100-2000' },
    { icon: Mail, label: 'Email', value: 'reservations@allbee.com' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sun: 12:00 PM – 11:00 PM' },
  ];

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello."
        image="https://images.pexels.com/photos/261047/pexels-photo-261047.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <FadeIn>
            <h2 className="text-3xl font-heading text-cream mb-6">Get in Touch</h2>
            <div className="luxury-divider mb-8 !mx-0" />
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                    <info.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gold/70 uppercase tracking-wider">{info.label}</p>
                    <p className="text-cream/70 mt-1">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/15551002000" className="mt-8 inline-flex items-center gap-2 btn-outline-gold">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden h-64 glass">
              <iframe
                title="Restaurant Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.5%2C-0.1%2C51.52&layer=mapnik"
                className="w-full h-full opacity-80"
                loading="lazy"
              />
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-heading text-cream mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gold/70 mb-2 block">Your Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-lux" required />
                </div>
                <div>
                  <label className="text-sm text-gold/70 mb-2 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-lux" required />
                </div>
                <div>
                  <label className="text-sm text-gold/70 mb-2 block">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-lux min-h-[120px] resize-none" required />
                </div>
                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                  <Send size={18} /> {sent ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
