import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const ProductShowcase = () => {
  const { addToWishlist, isInWishlist, addToCart } = useCart();
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-primary text-sm tracking-widest">OUR COLLECTION</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">Signature Fragrances</h2>
          </div>
          <Link 
            to="/shop" 
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            View All →
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden bg-background luxury-border mb-4 hover-lift">
                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-background"
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product);
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`} 
                  />
                </Button>

                {/* Badge */}
                {(product.isNew || product.isBestSeller || product.isLimitedEdition) && (
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground">
                    {product.isNew ? 'NEW' : product.isBestSeller ? 'BEST SELLER' : 'LIMITED'}
                  </span>
                )}

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button 
                    size="sm" 
                    className="w-full gold-gradient text-primary-foreground text-xs"
                    onClick={() => addToCart(product, product.sizes[0])}
                  >
                    Add to Cart - ${product.sizes[0].price}
                  </Button>
                </div>
              </div>

              {/* Info */}
              <Link to={`/product/${product.id}`}>
                <h3 className="font-serif text-sm md:text-base group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground capitalize mb-1">
                  {product.fragranceFamily} • {product.gender}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${product.sizes[0].price}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-primary' : 'text-muted'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
