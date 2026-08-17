import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingCart, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-surface-900 dark:bg-surface-950 text-surface-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PriceKart</span>
            </div>
            <p className="text-sm text-surface-400 leading-relaxed">
              {t('app.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/search', label: t('nav.search') },
                { to: '/compare', label: t('nav.compare') },
                { to: '/offers', label: t('nav.offers') },
                { to: '/stores', label: t('nav.stores') },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-surface-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Stores</h4>
            <ul className="space-y-2 text-sm text-surface-400">
              <li>Reliance Smart</li>
              <li>DMart</li>
              <li>More Supermarket</li>
              <li>Spar Hypermarket</li>
              <li>Metro Cash & Carry</li>
              <li>Local Kirana Stores</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-surface-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@pricekart.in
              </li>
              <li>Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <hr className="border-surface-800 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <p>© {currentYear} PriceKart Karnataka. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-surface-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-surface-300">Terms of Service</Link>
            <Link to="/about" className="hover:text-surface-300">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
