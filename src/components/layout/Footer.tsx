import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-2">Join the NOIR ESSENCE World</h3>
            <p className="text-secondary-foreground/70 mb-6">
              Subscribe to receive exclusive offers, early access to new releases, and luxury fragrance tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary-foreground/10 border-primary/30 text-secondary-foreground placeholder:text-secondary-foreground/50"
              />
              <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold tracking-wider">
                NOIR <span className="gold-text-gradient">ESSENCE</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm mb-6">
              Crafting exceptional fragrances that capture the essence of luxury. 
              Each scent tells a unique story of sophistication and elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Shop All', 'Best Sellers', 'New Arrivals', 'Limited Edition', 'Gift Sets'].map(link => (
                <li key={link}>
                  <Link 
                    to="/shop" 
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-lg mb-4">Help & Support</h4>
            <ul className="space-y-2">
              {[
                { name: 'FAQ', path: '/faq' },
                { name: 'Shipping & Returns', path: '/shipping' },
                { name: 'Track Order', path: '/track-order' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms & Conditions', path: '/terms' },
              ].map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>123 Luxury Avenue, Fifth Floor<br />New York, NY 10001</span>
              </li>
              <li>
                <a 
                  href="tel:+1-555-ESSENCE" 
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>+1 (555) ESSENCE</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@noiressence.com" 
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>hello@noiressence.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© 2024 NOIR ESSENCE. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-6 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
