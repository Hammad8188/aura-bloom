import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const AdminDashboard = () => (
  <AdminLayout>
    <h1 className="font-serif text-2xl mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { title: 'Revenue', value: '$12,450', icon: DollarSign, change: '+12%' },
        { title: 'Orders', value: '156', icon: ShoppingCart, change: '+8%' },
        { title: 'Customers', value: '2,450', icon: Users, change: '+15%' },
        { title: 'Products', value: '15', icon: Package, change: '0%' },
      ].map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card><CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">View recent orders in the Orders section.</p></CardContent></Card>
  </AdminLayout>
);

export default AdminDashboard;
