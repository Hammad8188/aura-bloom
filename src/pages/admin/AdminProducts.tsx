import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { products as initialProducts } from '@/data/products';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductDialog from '@/components/admin/ProductDialog';
import StockDialog from '@/components/admin/StockDialog';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.fragranceFamily.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleManageStock = (product: Product) => {
    setSelectedProduct(product);
    setStockDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(prev =>
        prev.map(p => (p.id === selectedProduct.id ? { ...p, ...productData } as Product : p))
      );
      toast({
        title: 'Product Updated',
        description: `${productData.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        brand: 'NOIR ESSENCE',
        images: ['/placeholder.svg'],
        occasion: ['day'],
        fragrancePyramid: {
          top: [{ name: 'Top Note', description: 'Opening' }],
          heart: [{ name: 'Heart Note', description: 'Middle' }],
          base: [{ name: 'Base Note', description: 'Foundation' }],
        },
        longevity: 7,
        sillage: 6,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      } as Product;
      setProducts(prev => [newProduct, ...prev]);
      toast({
        title: 'Product Added',
        description: `${productData.name} has been added successfully.`,
      });
    }
  };

  const handleUpdateStock = (productId: string, sizes: { size: string; stock: number }[]) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            sizes: p.sizes.map(s => {
              const updated = sizes.find(us => us.size === s.size);
              return updated ? { ...s, stock: updated.stock } : s;
            }),
          };
        }
        return p;
      })
    );
    toast({
      title: 'Stock Updated',
      description: 'Product stock has been updated successfully.',
    });
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      toast({
        title: 'Product Deleted',
        description: `${selectedProduct.name} has been removed.`,
        variant: 'destructive',
      });
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const getTotalStock = (product: Product) => {
    return product.sizes.reduce((sum, size) => sum + size.stock, 0);
  };

  const getStockStatus = (product: Product) => {
    const total = getTotalStock(product);
    if (total === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (total < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="font-serif text-2xl">Products</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>
          <Button className="gold-gradient text-primary-foreground" onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead>Total Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const status = getStockStatus(product);
                const priceRange = product.sizes.length > 1
                  ? `$${Math.min(...product.sizes.map(s => s.price))} - $${Math.max(...product.sizes.map(s => s.price))}`
                  : `$${product.sizes[0].price}`;

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.fragranceFamily}</TableCell>
                    <TableCell>{priceRange}</TableCell>
                    <TableCell>{getTotalStock(product)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border shadow-lg z-50">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleManageStock(product)}>
                            <Package className="h-4 w-4 mr-2" /> Manage Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(product)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <ProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <StockDialog
        open={stockDialogOpen}
        onOpenChange={setStockDialogOpen}
        product={selectedProduct}
        onSave={handleUpdateStock}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteProduct}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
