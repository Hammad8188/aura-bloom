import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { orders } from '@/data/orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Order } from '@/types';
import OrderDetailDialog from '@/components/admin/OrderDetailDialog';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl mb-6">Orders</h1>
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewOrder(order)}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.items.length} item(s)</TableCell>
                <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {order.paymentMethod === 'cod' ? 'COD' : 'Card'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewOrder(order);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={selectedOrder}
      />
    </AdminLayout>
  );
};

export default AdminOrders;
