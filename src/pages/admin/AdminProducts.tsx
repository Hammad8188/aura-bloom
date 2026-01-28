import AdminLayout from '@/components/admin/AdminLayout';
import { products } from '@/data/products';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminProducts = () => (
  <AdminLayout>
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-serif text-2xl">Products</h1>
      <Button className="gold-gradient text-primary-foreground">Add Product</Button>
    </div>
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.slice(0, 10).map((product) => (
            <TableRow key={product.id}>
              <TableCell className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded" />
                {product.name}
              </TableCell>
              <TableCell className="capitalize">{product.fragranceFamily}</TableCell>
              <TableCell>${product.sizes[0].price}</TableCell>
              <TableCell>{product.sizes[0].stock}</TableCell>
              <TableCell><Badge variant="secondary">Active</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </AdminLayout>
);

export default AdminProducts;
