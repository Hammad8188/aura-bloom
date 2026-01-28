import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getBestSellers, getNewArrivals, getLimitedEdition } from '@/data/products';

const FeaturedCollections = () => {
  const [activeTab, setActiveTab] = useState<'bestSellers' | 'newArrivals' | 'limited'>('bestSellers');

  const collections = {
    bestSellers: { title: 'Best Sellers', products: getBestSellers(4) },
    newArrivals: { title: 'New Arrivals', products: getNewArrivals(4) },
    limited: { title: 'Limited Edition', products: getLimitedEdition(4) },
  };

  const currentCollection = collections[activeTab];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-widest">DISCOVER</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 mb-4">Featured Collections</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our carefully curated collections of luxury fragrances
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {Object.entries(collections).map(([key, { title }]) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'outline'}
              className={activeTab === key ? 'gold-gradient text-primary-foreground' : ''}
              onClick={() => setActiveTab(key as typeof activeTab)}
            >
              {title}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCollection.products.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden bg-muted/30 mb-4">
                {/* Badge */}
                {(product.isNew || product.isBestSeller || product.isLimitedEdition) && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground">
                    {product.isNew ? 'NEW' : product.isBestSeller ? 'BESTSELLER' : 'LIMITED'}
                  </span>
                )}

                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="gold-gradient text-primary-foreground">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{product.fragranceFamily}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">${product.sizes[0].price}</span>
                  {product.sizes[0].originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.sizes[0].originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
