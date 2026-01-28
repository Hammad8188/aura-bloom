import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const AdminSettings = () => (
  <AdminLayout>
    <h1 className="font-serif text-2xl mb-6">Settings</h1>
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader><CardTitle>General</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Store Name</Label><Input defaultValue="NOIR ESSENCE" /></div>
          <div><Label>Contact Email</Label><Input defaultValue="hello@noiressence.com" /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Payment Methods</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><span>Cash on Delivery</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span>Credit Card (Stripe)</span><Switch defaultChecked /></div>
        </CardContent>
      </Card>
      <Button className="gold-gradient text-primary-foreground">Save Changes</Button>
    </div>
  </AdminLayout>
);

export default AdminSettings;
