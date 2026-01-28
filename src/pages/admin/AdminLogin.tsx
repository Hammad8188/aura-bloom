import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl mb-2">NOIR ESSENCE</h1>
          <p className="text-muted-foreground">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@noiressence.com" /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <Button type="submit" className="w-full gold-gradient text-primary-foreground">Sign In</Button>
          <p className="text-center text-xs text-muted-foreground">Demo mode - click Sign In to continue</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
