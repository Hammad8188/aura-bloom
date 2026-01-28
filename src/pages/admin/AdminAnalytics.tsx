import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminAnalytics = () => (
  <AdminLayout>
    <h1 className="font-serif text-2xl mb-6">Analytics</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <Card><CardHeader><CardTitle>Sales Overview</CardTitle></CardHeader><CardContent><div className="h-64 flex items-center justify-center text-muted-foreground">Chart placeholder - Connect to real data for live charts</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Top Products</CardTitle></CardHeader><CardContent><div className="h-64 flex items-center justify-center text-muted-foreground">Chart placeholder - Connect to real data for live charts</div></CardContent></Card>
    </div>
  </AdminLayout>
);

export default AdminAnalytics;
