import AdminLayout from '@/components/admin/AdminLayout';
import { customers } from '@/data/orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminCustomers = () => (
  <AdminLayout>
    <h1 className="font-serif text-2xl mb-6">Customers</h1>
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.totalOrders}</TableCell>
              <TableCell>${c.totalSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </AdminLayout>
);

export default AdminCustomers;
