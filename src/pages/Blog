import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase, type Blog } from '@/lib/supabase';
import { PageHeader, FadeIn } from '@/components/UI';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    supabase.from('blogs').select('*').eq('is_published', true).order('created_at', { ascending: false }).then(({ data }) => setBlogs(data ?? []));
  }, []);

  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle="Food articles, recipes, and restaurant news from the ALLBEE team."
        image="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="section-padding">
        <div className="container-lux">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <FadeIn key={blog.id} delay={i * 0.1}>
                <motion.div className="card-lux group" whileHover={{ y: -8 }}>
                  <div className="relative overflow-hidden h-52">
                    <img src={blog.image_url ?? ''} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs text-gold">{blog.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-cream/40 mb-3">
                      <Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}
                      <span className="text-gold/30">•</span>
                      <span>{blog.author}</span>
                    </div>
                    <h3 className="text-lg font-heading text-cream mb-2 group-hover:text-gold transition-colors">{blog.title}</h3>
                    <p className="text-sm text-cream/50 leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <button className="text-sm text-gold flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </button>
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
