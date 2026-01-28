import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types';
import { Package, User, MapPin, Phone, Mail, CreditCard, Truck, Calendar } from 'lucide-react';

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const OrderDetailDialog = ({ open, onOpenChange, order }: OrderDetailDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order {order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status & Date */}
          <div className="flex items-center justify-between">
            <Badge className={statusColors[order.status]}>{order.status.toUpperCase()}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {order.customer.email}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {order.customer.phone}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>{order.customer.address.street}</p>
                  <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}</p>
                  <p>{order.customer.address.country}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-background flex-shrink-0">
                    <img
                      src={item.product.images[0] || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.selectedSize.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment & Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Method
              </h3>
              <p className="text-sm">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
              </p>
            </div>
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery Option
              </h3>
              <p className="text-sm capitalize">{order.deliveryOption} Delivery</p>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>{order.deliveryCharge === 0 ? 'FREE' : `$${order.deliveryCharge.toFixed(2)}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          {order.timeline.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold">Order Timeline</h3>
                <div className="space-y-3">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                        index === order.timeline.length - 1 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground/30'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">{event.status}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleString()}
                          </span>
                        </div>
                        {event.note && (
                          <p className="text-sm text-muted-foreground mt-1">{event.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
