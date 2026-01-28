import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || { orderNumber: 'NE-DEMO123', total: 0 };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>

          <h1 className="font-serif text-3xl mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been received and is being processed.
          </p>

          <div className="bg-muted/30 p-6 luxury-border mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="font-serif text-2xl text-primary mb-4">{orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              Order Total: <span className="font-medium text-foreground">${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-sm">
              <Mail className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium">Confirmation Email Sent</p>
                <p className="text-sm text-muted-foreground">Check your inbox for order details</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-sm">
              <Package className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium">Track Your Order</p>
                <p className="text-sm text-muted-foreground">Use your order number to track delivery</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/track-order">Track Order</Link>
            </Button>
            <Button asChild className="gold-gradient text-primary-foreground">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
