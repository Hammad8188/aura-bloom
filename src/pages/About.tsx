import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary text-sm tracking-widest">OUR STORY</span>
          <h1 className="font-serif text-4xl md:text-5xl text-secondary-foreground mt-2 mb-4">
            About NOIR ESSENCE
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            A legacy of luxury, crafted with passion and precision since 2009.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"
                alt="Perfume crafting"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl mb-6">The Art of Perfumery</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2009 in the heart of New York, NOIR ESSENCE began with a simple vision: 
                  to create fragrances that transcend the ordinary and become an extension of one's identity.
                </p>
                <p>
                  Our master perfumers blend centuries-old techniques with modern innovation, 
                  sourcing only the finest ingredients from around the world – from the lavender 
                  fields of Provence to the sandalwood forests of India.
                </p>
                <p>
                  Each fragrance in our collection tells a unique story, meticulously crafted 
                  over months of development and refinement. We believe that true luxury lies 
                  in the details, and every note, every nuance is carefully considered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                description: 'We never compromise on ingredients. Only the finest, ethically sourced materials find their way into our creations.',
                icon: '✨',
              },
              {
                title: 'Authenticity',
                description: 'Every fragrance is a genuine expression of artistry, crafted by master perfumers with decades of experience.',
                icon: '🎨',
              },
              {
                title: 'Sustainability',
                description: 'We are committed to eco-conscious practices, from sustainable sourcing to recyclable packaging.',
                icon: '🌿',
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-8 bg-background luxury-border">
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl">Our Journey</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { year: '2009', event: 'NOIR ESSENCE founded in New York City' },
              { year: '2012', event: 'Launched our signature Midnight Noir collection' },
              { year: '2015', event: 'Expanded to international markets' },
              { year: '2018', event: 'Opened flagship boutique on Fifth Avenue' },
              { year: '2021', event: 'Introduced sustainable packaging initiative' },
              { year: '2024', event: 'Celebrating 15 years of luxury craftsmanship' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="font-serif text-2xl text-primary w-20 flex-shrink-0">{item.year}</div>
                <div className="flex-1 pb-8 border-l-2 border-primary/20 pl-6 relative">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />
                  <p className="text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-secondary-foreground mb-4">
            Experience the NOIR ESSENCE Difference
          </h2>
          <p className="text-secondary-foreground/70 mb-8 max-w-xl mx-auto">
            Discover your signature scent from our luxury collection.
          </p>
          <Button asChild className="gold-gradient text-primary-foreground">
            <Link to="/shop">Explore Our Collection</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
