import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Star, BarChart3, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0">
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="font-serif text-lg">NOIR ESSENCE</Link>
          <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                location.pathname === link.path ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Link to="/admin" className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" /> Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-background p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
