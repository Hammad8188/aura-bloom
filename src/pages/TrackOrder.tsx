import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { getOrderByNumber } from '@/data/orders';
import { Package, CheckCircle } from 'lucide-react';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<ReturnType<typeof getOrderByNumber>>(undefined);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setOrder(getOrderByNumber(orderNumber));
    setSearched(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8 text-center">Track Your Order</h1>
        <div className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <Input placeholder="Enter order number (e.g., NE-2024-001)" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
            <Button onClick={handleSearch} className="gold-gradient text-primary-foreground">Track</Button>
          </div>
        </div>
        {searched && (order ? (
          <div className="max-w-lg mx-auto bg-muted/30 p-6 luxury-border">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
              </div>
            </div>
            <div className="space-y-4">
              {order.timeline.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium capitalize">{t.status}</p>
                    <p className="text-sm text-muted-foreground">{new Date(t.date).toLocaleString()}</p>
                    {t.note && <p className="text-sm">{t.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Order not found. Try: NE-2024-001</p>
        ))}
      </div>
    </Layout>
  );
};

export default TrackOrder;
