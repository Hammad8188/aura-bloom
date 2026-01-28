import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BrandStory = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
                    alt="Perfume crafting"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=600"
                    alt="Luxury ingredients"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600"
                    alt="Premium bottles"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600"
                    alt="Fragrance laboratory"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-6 hidden lg:block">
              <div className="text-center">
                <div className="font-serif text-4xl">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-12">
            <span className="text-primary text-sm tracking-widest">OUR STORY</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-2 mb-6">
              Crafting Excellence Since 2009
            </h2>
            <div className="space-y-4 text-secondary-foreground/80">
              <p>
                Born from a passion for olfactory artistry, NOIR ESSENCE represents the 
                pinnacle of luxury fragrance. Our master perfumers blend centuries-old 
                techniques with innovative approaches to create scents that transcend time.
              </p>
              <p>
                Each fragrance in our collection is a masterpiece, crafted using only the 
                finest ingredients sourced from around the globe – from French lavender fields 
                to Indian sandalwood forests, and rare oud from the Middle East.
              </p>
              <p>
                We believe that a fragrance is more than just a scent; it's an expression of 
                identity, a memory captured in a bottle, and a statement of refined taste.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 my-8">
              {[
                { title: 'Premium Quality', desc: '100% authentic ingredients' },
                { title: 'Handcrafted', desc: 'Small batch production' },
                { title: 'Eco-Conscious', desc: 'Sustainable packaging' },
                { title: 'Expert Curated', desc: 'Master perfumers\' selection' },
              ].map((feature, i) => (
                <div key={i} className="border-l-2 border-primary pl-4">
                  <h4 className="font-medium text-secondary-foreground">{feature.title}</h4>
                  <p className="text-sm text-secondary-foreground/60">{feature.desc}</p>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="gold-gradient text-primary-foreground">
              <Link to="/about">Discover Our Heritage</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
