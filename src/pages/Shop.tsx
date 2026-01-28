import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Heart, Grid3X3, List, SlidersHorizontal, Search, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product, FragranceFamily, Gender, Occasion, SortOption } from '@/types';

const Shop = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<FragranceFamily[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.fragranceFamily.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      result = result.filter(p => selectedGenders.includes(p.gender));
    }

    // Fragrance family filter
    if (selectedFamilies.length > 0) {
      result = result.filter(p => selectedFamilies.includes(p.fragranceFamily));
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => p.occasion.some(o => selectedOccasions.includes(o)));
    }

    // Price filter
    result = result.filter(p => {
      const minPrice = Math.min(...p.sizes.map(s => s.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popularity
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedGenders, selectedFamilies, selectedOccasions, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const toggleFilter = <T,>(arr: T[], item: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    setter(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenders([]);
    setSelectedFamilies([]);
    setSelectedOccasions([]);
    setPriceRange([0, 500]);
    setSortBy('popularity');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-medium mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fragrances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="font-medium mb-3">Gender</h3>
        <div className="space-y-2">
          {(['men', 'women', 'unisex'] as Gender[]).map(gender => (
            <label key={gender} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() => toggleFilter(selectedGenders, gender, setSelectedGenders)}
              />
              <span className="capitalize">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance Family */}
      <div>
        <h3 className="font-medium mb-3">Fragrance Family</h3>
        <div className="space-y-2">
          {(['floral', 'woody', 'oriental', 'fresh', 'citrus', 'oud'] as FragranceFamily[]).map(family => (
            <label key={family} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedFamilies.includes(family)}
                onCheckedChange={() => toggleFilter(selectedFamilies, family, setSelectedFamilies)}
              />
              <span className="capitalize">{family}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h3 className="font-medium mb-3">Occasion</h3>
        <div className="space-y-2">
          {(['day', 'night', 'office', 'party', 'casual', 'special'] as Occasion[]).map(occasion => (
            <label key={occasion} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedOccasions.includes(occasion)}
                onCheckedChange={() => toggleFilter(selectedOccasions, occasion, setSelectedOccasions)}
              />
              <span className="capitalize">{occasion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={500}
          step={10}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-secondary-foreground mb-2">Our Collection</h1>
          <p className="text-secondary-foreground/70">Discover your signature scent from our luxury collection</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-primary/10">
              <div className="flex items-center gap-2">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <h2 className="font-serif text-xl mb-6">Filters</h2>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden sm:flex border border-primary/20">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6' 
                : 'space-y-4'
              }>
                {paginatedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    onAddToCart={() => addToCart(product, product.sizes[0])}
                    onAddToWishlist={() => addToWishlist(product)}
                    isWishlisted={isInWishlist(product.id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(i + 1)}
                    className="hidden sm:inline-flex"
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isWishlisted: boolean;
}

const ProductCard = ({ product, viewMode, onAddToCart, onAddToWishlist, isWishlisted }: ProductCardProps) => {
  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-muted/30 luxury-border group">
        <Link to={`/product/${product.id}`} className="w-32 h-32 flex-shrink-0 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground capitalize mb-2">
            {product.fragranceFamily} • {product.gender}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">${product.sizes[0].price}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={onAddToWishlist}>
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button size="sm" onClick={onAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-muted/30 luxury-border mb-3">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background h-8 w-8"
          onClick={onAddToWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
        </Button>

        {(product.isNew || product.isBestSeller || product.isLimitedEdition) && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground">
            {product.isNew ? 'NEW' : product.isBestSeller ? 'BEST SELLER' : 'LIMITED'}
          </span>
        )}

        <Link to={`/product/${product.id}`}>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button size="sm" className="w-full gold-gradient text-primary-foreground text-xs" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>

      <Link to={`/product/${product.id}`}>
        <h3 className="font-serif text-sm group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground capitalize mb-1">{product.fragranceFamily}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${product.sizes[0].price}</span>
          <div className="flex items-center">
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
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Shop;
