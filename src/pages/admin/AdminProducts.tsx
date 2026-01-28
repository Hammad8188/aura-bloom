import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, ProductWithSizes } from '@/hooks/useProducts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, Loader2 } from 'lucide-react';
import ProductDialogDB from '@/components/admin/ProductDialogDB';
import StockDialogDB from '@/components/admin/StockDialogDB';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

const AdminProducts = () => {
  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithSizes | null>(null);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.fragrance_family.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: ProductWithSizes) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleManageStock = (product: ProductWithSizes) => {
    setSelectedProduct(product);
    setStockDialogOpen(true);
  };

  const handleDeleteClick = (product: ProductWithSizes) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct.id);
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const getTotalStock = (product: ProductWithSizes) => {
    return product.product_sizes.reduce((sum, size) => sum + size.stock, 0);
  };

  const getStockStatus = (product: ProductWithSizes) => {
    const total = getTotalStock(product);
    if (total === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (total < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-destructive">Error loading products</p>
        </div>
      </AdminLayout>
    );
  }

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

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <p className="text-muted-foreground">
            {searchQuery ? 'No products found' : 'No products yet. Add your first product!'}
          </p>
        </div>
      ) : (
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
              {filteredProducts.map((product) => {
                const status = getStockStatus(product);
                const prices = product.product_sizes.map(s => Number(s.price));
                const priceRange = prices.length > 1
                  ? `$${Math.min(...prices)} - $${Math.max(...prices)}`
                  : prices.length === 1 ? `$${prices[0]}` : 'N/A';

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image_url || '/placeholder.svg'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{product.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.fragrance_family}</TableCell>
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
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ProductDialogDB
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={selectedProduct}
        onCreate={createProduct.mutate}
        onUpdate={updateProduct.mutate}
        isLoading={createProduct.isPending || updateProduct.isPending}
      />

      <StockDialogDB
        open={stockDialogOpen}
        onOpenChange={setStockDialogOpen}
        product={selectedProduct}
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
