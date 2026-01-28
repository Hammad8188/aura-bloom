import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm tracking-widest mb-6">
              LUXURY FRAGRANCES
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-secondary-foreground mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Where Luxury{' '}
            <span className="gold-text-gradient">Meets</span>{' '}
            Fragrance
          </h1>

          <p 
            className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-xl animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Discover our curated collection of exceptional perfumes, 
            each crafted to tell a unique story of sophistication and elegance.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-8 text-base"
            >
              <Link to="/shop">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 px-8 text-base"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-secondary-foreground/10 animate-fade-in-up"
            style={{ animationDelay: '1s' }}
          >
            {[
              { number: '50+', label: 'Unique Scents' },
              { number: '10K+', label: 'Happy Customers' },
              { number: '5★', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="font-serif text-2xl md:text-3xl gold-text-gradient">{stat.number}</div>
                <div className="text-sm text-secondary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-fade-in" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
