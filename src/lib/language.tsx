import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi' | 'ar';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    reservation: 'Reservation',
    gallery: 'Gallery',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    cart: 'Cart',
    order: 'Order Online',
    reviews: 'Reviews',
    offers: 'Offers',
    events: 'Events',
    blog: 'Blog',
    careers: 'Careers',
    loyalty: 'Loyalty Program',
    trackOrder: 'Track Order',
    bookTable: 'Book a Table',
    addToCart: 'Add to Cart',
    viewMenu: 'View Menu',
    explore: 'Explore',
  },
  ta: {
    home: 'முகப்பு',
    menu: 'மெனு',
    about: 'எங்களை பற்றி',
    reservation: 'முன்பதிவு',
    gallery: 'கேலரி',
    contact: 'தொடர்பு',
    login: 'உள்நுழைய',
    register: 'பதிவு செய்ய',
    cart: 'வண்டி',
    order: 'ஆன்லைன் ஆர்டர்',
    reviews: 'விமர்சனங்கள்',
    offers: 'சலுகைகள்',
    events: 'நிகழ்வுகள்',
    blog: 'வலைப்பதிவு',
    careers: 'வேலைவாய்ப்பு',
    loyalty: 'விசுவாச திட்டம்',
    trackOrder: 'ஆர்டர் கண்காணிப்பு',
    bookTable: 'மேசை முன்பதிவு',
    addToCart: 'வண்டியில் சேர்',
    viewMenu: 'மெனு பார்',
    explore: 'ஆராயுங்கள்',
  },
  hi: {
    home: 'होम',
    menu: 'मेनू',
    about: 'हमारे बारे में',
    reservation: 'आरक्षण',
    gallery: 'गैलरी',
    contact: 'संपर्क',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    cart: 'कार्ट',
    order: 'ऑनलाइन ऑर्डर',
    reviews: 'समीक्षाएं',
    offers: 'ऑफर',
    events: 'कार्यक्रम',
    blog: 'ब्लॉग',
    careers: 'करियर',
    loyalty: 'लॉयल्टी प्रोग्राम',
    trackOrder: 'ऑर्डर ट्रैक',
    bookTable: 'टेबल बुक करें',
    addToCart: 'कार्ट में जोड़ें',
    viewMenu: 'मेनू देखें',
    explore: 'एक्सप्लोर',
  },
  ar: {
    home: 'الرئيسية',
    menu: 'القائمة',
    about: 'من نحن',
    reservation: 'الحجز',
    gallery: 'المعرض',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'تسجيل',
    cart: 'السلة',
    order: 'طلب أونلاين',
    reviews: 'التقييمات',
    offers: 'العروض',
    events: 'الفعاليات',
    blog: 'المدونة',
    careers: 'الوظائف',
    loyalty: 'برنامج الولاء',
    trackOrder: 'تتبع الطلب',
    bookTable: 'احجز طاولة',
    addToCart: 'أضف إلى السلة',
    viewMenu: 'عرض القائمة',
    explore: 'استكشف',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
