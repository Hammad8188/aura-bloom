import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

const Account = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8">My Account</h1>
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-8 p-6 bg-muted/30 luxury-border">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl">Welcome, Guest</h2>
              <p className="text-sm text-muted-foreground">Sign in to view your orders and manage your account</p>
            </div>
          </div>
          <div className="space-y-4">
            <div><Label>Email</Label><Input type="email" placeholder="your@email.com" /></div>
            <div><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
            <Button className="w-full gold-gradient text-primary-foreground">Sign In</Button>
            <p className="text-center text-sm text-muted-foreground">Demo mode - authentication not connected</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
