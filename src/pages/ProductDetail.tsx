import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById, getRelatedProducts, getReviewsByProductId } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Heart, Minus, Plus, Star, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductSize } from '@/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product?.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const reviews = getReviewsByProductId(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, quantity);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-muted/30 luxury-border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden ${
                    selectedImage === i ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Badge */}
            {(product.isNew || product.isBestSeller || product.isLimitedEdition) && (
              <span className="inline-block px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground mb-4">
                {product.isNew ? 'NEW ARRIVAL' : product.isBestSeller ? 'BEST SELLER' : 'LIMITED EDITION'}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-serif">${selectedSize?.price || product.sizes[0].price}</span>
              {selectedSize?.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${selectedSize.originalPrice}
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border transition-colors ${
                      selectedSize?.size === size.size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-primary/20 hover:border-primary'
                    } ${size.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={size.stock === 0}
                  >
                    <span className="block font-medium">{size.size}</span>
                    <span className="text-sm">${size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}
            {selectedSize && (
              <p className={`text-sm mb-6 ${selectedSize.stock < 10 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {selectedSize.stock > 0 ? (
                  selectedSize.stock < 10 ? `Only ${selectedSize.stock} left in stock!` : 'In Stock'
                ) : 'Out of Stock'}
              </p>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-primary/20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(q => q + 1)}
                  className="rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="flex-1 gold-gradient text-primary-foreground"
                onClick={handleAddToCart}
                disabled={!selectedSize || selectedSize.stock === 0}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => addToWishlist(product)}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-primary text-primary' : ''}`} />
              </Button>
            </div>

            {/* Fragrance Pyramid */}
            <div className="bg-muted/30 p-6 mb-6 luxury-border">
              <h3 className="font-serif text-lg mb-4">Fragrance Notes</h3>
              <div className="space-y-4">
                {[
                  { title: 'Top Notes', notes: product.fragrancePyramid.top, color: 'bg-primary/10' },
                  { title: 'Heart Notes', notes: product.fragrancePyramid.heart, color: 'bg-primary/20' },
                  { title: 'Base Notes', notes: product.fragrancePyramid.base, color: 'bg-primary/30' },
                ].map((layer) => (
                  <div key={layer.title}>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{layer.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.notes.map((note) => (
                        <span key={note.name} className={`px-3 py-1 text-sm ${layer.color} rounded-full`}>
                          {note.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium mb-2">Longevity</p>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-full rounded-full ${
                        i < product.longevity ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{product.longevity}/10</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Sillage</p>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-full rounded-full ${
                        i < product.sillage ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{product.sillage}/10</p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-primary/10 pt-6">
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-medium">Description</h3>
                {showFullDescription ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {showFullDescription && (
                <p className="text-muted-foreground mt-4 animate-fade-in">{product.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 pt-12 border-t border-primary/10">
          <h2 className="font-serif text-2xl mb-8">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-muted/30 luxury-border">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                      />
                    ))}
                    {review.verified && (
                      <span className="text-xs text-primary flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.customerName} • {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-primary/10">
            <h2 className="font-serif text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-muted/30 mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-serif text-sm group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm">${p.sizes[0].price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
