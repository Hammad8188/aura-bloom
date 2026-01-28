import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, wishlist, toggleCart } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/10">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-center py-2 text-xs text-muted-foreground border-b border-primary/5">
            <span>Free shipping on orders over $150 | Use code WELCOME15 for 15% off</span>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-primary/10"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-start">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider">
                NOIR <span className="gold-text-gradient">ESSENCE</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground hidden md:block">
                WHERE LUXURY MEETS FRAGRANCE
              </span>
            </Link>

            {/* Desktop nav - all links on right */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-primary"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              <Link to="/wishlist" className="relative">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:text-primary"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-primary/10 animate-fade-in">
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for perfumes, notes, or collections..."
                    className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-primary/10 rounded-none focus:outline-none focus:border-primary transition-colors"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-28" />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Header;
