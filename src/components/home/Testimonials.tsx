import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { testimonials } from '@/data/products';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-widest">TESTIMONIALS</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover why thousands of customers trust NOIR ESSENCE for their luxury fragrance needs
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-muted/30 p-8 md:p-12 text-center luxury-border">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-xl md:text-2xl italic mb-6 text-foreground/90">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Product */}
                    {testimonial.productName && (
                      <p className="text-sm text-primary mb-4">
                        Purchased: {testimonial.productName}
                      </p>
                    )}

                    {/* Author */}
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 pt-12 border-t border-primary/10">
          {[
            { number: '10,000+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '50+', label: 'Countries Shipped' },
            { number: '100%', label: 'Authentic Products' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-2xl md:text-3xl gold-text-gradient">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
