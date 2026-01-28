import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Heart className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
          <h1 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">Save your favorite fragrances for later.</p>
          <Button asChild className="gold-gradient text-primary-foreground">
            <Link to="/shop">Explore Collection</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8">My Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map(({ product }) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted/30 mb-3">
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-background/80" onClick={() => removeFromWishlist(product.id)}>
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                </Button>
              </div>
              <h3 className="font-serif text-sm">{product.name}</h3>
              <p className="text-sm mb-2">${product.sizes[0].price}</p>
              <Button size="sm" className="w-full" onClick={() => addToCart(product, product.sizes[0])}>
                <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
