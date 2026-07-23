import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PageHeader, FadeIn } from '@/components/UI';

const faqs = [
  { q: 'How do I make a reservation?', a: 'You can book a table through our Reservation page. Select your preferred date, time, number of guests, and table type, then fill in your details to confirm.' },
  { q: 'What are your opening hours?', a: 'We are open Monday through Sunday, from 12:00 PM to 11:00 PM. Last seating is at 10:00 PM.' },
  { q: 'Do you offer vegetarian and vegan options?', a: 'Yes, we have an extensive vegetarian and vegan menu. Our chefs are happy to accommodate dietary requirements — please mention them when making a reservation.' },
  { q: 'Can I order food online for delivery?', a: 'Absolutely! Visit our Order Online page to choose delivery or pickup. You can also schedule orders for a later time.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery for online orders. In-house, we accept all major cards and cash.' },
  { q: 'Do you have a loyalty program?', a: 'Yes! Our loyalty program rewards you with points for every order, which can be redeemed for discounts and exclusive perks. Visit our Loyalty Program page to learn more.' },
  { q: 'Can I host a private event at ALLBEE?', a: 'We offer bespoke event packages for weddings, corporate dinners, birthdays, and more. Visit our Events page or contact us for a customized proposal.' },
  { q: 'Is there a dress code?', a: 'We recommend smart casual or elegant attire. We want all our guests to feel comfortable while maintaining the refined atmosphere of our restaurant.' },
  { q: 'Do you offer gift cards?', a: 'Yes, gift cards are available in various denominations. Contact us for more details.' },
  { q: 'What is your cancellation policy for reservations?', a: 'Reservations can be cancelled or modified up to 4 hours before the scheduled time with no penalty.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle="Find answers to the most commonly asked questions."
        image="https://images.pexels.com/photos/261047/pexels-photo-261047.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="glass rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <span className="text-cream font-medium">{faq.q}</span>
                    <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-gold" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-cream/60 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
