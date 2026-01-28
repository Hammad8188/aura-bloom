import AdminLayout from '@/components/admin/AdminLayout';
import { reviews } from '@/data/products';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const AdminReviews = () => (
  <AdminLayout>
    <h1 className="font-serif text-2xl mb-6">Reviews</h1>
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.customerName}</TableCell>
              <TableCell><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'fill-primary text-primary' : 'text-muted'}`} />)}</div></TableCell>
              <TableCell className="max-w-xs truncate">{r.content}</TableCell>
              <TableCell className="capitalize">{r.status}</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </AdminLayout>
);

export default AdminReviews;
