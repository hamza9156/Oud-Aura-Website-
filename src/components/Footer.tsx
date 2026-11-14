import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  'Shop': [
    { label: 'All Perfumes', to: '/products' },
    { label: 'Men\'s Collection', to: '/products?gender=men' },
    { label: 'Women\'s Collection', to: '/products?gender=women' },
    { label: 'Unisex', to: '/products?gender=unisex' },
    { label: 'Best Sellers', to: '/products?category=best-sellers' },
    { label: 'New Arrivals', to: '/products?category=new-arrivals' },
  ],
  'Brands': [
    { label: 'Dior', to: '/products?brand=Dior' },
    { label: 'Chanel', to: '/products?brand=Chanel' },
    { label: 'Tom Ford', to: '/products?brand=Tom+Ford' },
    { label: 'Creed', to: '/products?brand=Creed' },
    { label: 'Lattafa', to: '/products?brand=Lattafa' },
    { label: 'All Brands', to: '/products' },
  ],
  'Help': [
    { label: 'About Us', to: '#' },
    { label: 'Contact', to: '#' },
    { label: 'FAQs', to: '#' },
    { label: 'Shipping Policy', to: '#' },
    { label: 'Returns & Exchange', to: '#' },
    { label: 'Privacy Policy', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-luxury-dark border-t border-luxury-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="font-cinzel text-luxury-gold text-2xl font-bold tracking-[0.2em]">OUD</div>
              <div className="text-luxury-ivory/30 text-[9px] tracking-[0.4em] uppercase">& AURA</div>
            </div>
            <p className="text-luxury-ivory/50 text-sm leading-relaxed mb-6">
              Pakistan's premier destination for authentic luxury perfumes. We curate the world's finest fragrances, from iconic houses to beloved Arabic oud collections.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-luxury-ivory/50">
                <Phone size={14} className="text-luxury-gold/50 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-luxury-ivory/50">
                <Mail size={14} className="text-luxury-gold/50 flex-shrink-0" />
                <span>hello@oudandaura.pk</span>
              </div>
              <div className="flex items-center gap-3 text-luxury-ivory/50">
                <MapPin size={14} className="text-luxury-gold/50 flex-shrink-0" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 border border-luxury-border flex items-center justify-center text-luxury-ivory/40 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-luxury-gold text-[10px] tracking-widest uppercase font-semibold mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-luxury-ivory/50 text-sm hover:text-luxury-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-luxury-ivory/30 text-xs">
            © 2026 OUD & AURA. All rights reserved. Luxury Perfume Boutique Pakistan.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-luxury-ivory/20 text-xs">We accept</span>
            <div className="flex gap-2">
              {['Visa', 'MC', 'JCB', 'COD'].map(m => (
                <span key={m} className="border border-luxury-border/50 text-luxury-ivory/30 text-[9px] px-2 py-0.5 rounded">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
