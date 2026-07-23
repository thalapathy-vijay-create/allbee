import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export function SectionTitle({ eyebrow, title, subtitle, center = true }: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <p className="text-sm tracking-[0.3em] uppercase text-gold/70 mb-3 font-body">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-heading text-cream mb-4">{title}</h2>
      {center && <div className="luxury-divider mb-4" />}
      {subtitle && (
        <p className={`text-cream/50 max-w-2xl ${center ? 'mx-auto' : ''} leading-relaxed`}>{subtitle}</p>
      )}
    </motion.div>
  );
}

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, y = 30, className = '' }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

type FoodCardProps = {
  image: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  isVeg: boolean;
  isSpecial?: boolean;
  onClick?: () => void;
  onAdd?: () => void;
};

export function FoodCard({ image, name, price, description, rating, isVeg, isSpecial, onClick, onAdd }: FoodCardProps) {
  return (
    <motion.div
      className="card-lux group cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal via-transparent to-transparent" />
        {isSpecial && (
          <span className="absolute top-3 left-3 bg-gold-gradient text-royal text-xs font-bold px-3 py-1 rounded-full">
            Chef's Special
          </span>
        )}
        <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-400' : 'bg-red-400'}`} />
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-heading text-cream group-hover:text-gold transition-colors">{name}</h3>
          <span className="text-gold font-semibold text-lg">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-cream/50 line-clamp-2 mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gold/70">
            <span className="text-gold">★</span> {rating.toFixed(1)}
          </div>
          {onAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="text-sm font-button text-gold border border-gold/30 rounded-full px-4 py-1.5 hover:bg-gold hover:text-royal transition-all"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  image?: string;
};

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-royal/80" />
        </div>
      )}
      {!image && <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-royal" />}
      <div className="absolute inset-0 bg-gradient-to-b from-royal/40 via-transparent to-royal" />
      <motion.div
        className="relative text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-heading text-cream mb-4">{title}</h1>
        <div className="luxury-divider mb-4" />
        {subtitle && <p className="text-cream/60 max-w-xl mx-auto">{subtitle}</p>}
      </motion.div>
    </div>
  );
}
