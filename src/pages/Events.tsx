import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { supabase, type EventItem } from '@/lib/supabase';
import { PageHeader, FadeIn } from '@/components/UI';

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    supabase.from('events').select('*').eq('is_active', true).then(({ data }) => setEvents(data ?? []));
  }, []);

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Celebrate life's special moments at ALLBEE RESTAURANT with bespoke event packages."
        image="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <FadeIn key={event.id} delay={i * 0.1}>
                <motion.div className="card-lux group" whileHover={{ y: -8 }}>
                  <div className="relative overflow-hidden h-56">
                    <img src={event.image_url ?? ''} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-gold-gradient text-royal text-xs font-bold px-3 py-1 rounded-full capitalize">
                      {event.event_type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-cream mb-2">{event.title}</h3>
                    <p className="text-sm text-cream/50 leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-cream/40 mb-4">
                      <span className="flex items-center gap-1"><Users size={14} /> Up to {event.capacity} guests</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Flexible'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-heading text-2xl">${event.price.toLocaleString()}</span>
                      <Link to="/reservation" className="text-sm font-button text-gold border border-gold/30 rounded-full px-4 py-1.5 hover:bg-gold hover:text-royal transition-all flex items-center gap-1">
                        Book Event <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
