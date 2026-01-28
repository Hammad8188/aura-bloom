import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order, OrderStatus } from '@/types';
import { Package, User, MapPin, Phone, Mail, CreditCard, Truck, Calendar, Printer } from 'lucide-react';

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const OrderDetailDialog = ({ open, onOpenChange, order, onStatusChange }: OrderDetailDialogProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.orderNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .header h1 { font-size: 28px; font-weight: bold; letter-spacing: 4px; margin-bottom: 8px; }
            .header p { color: #666; }
            .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .section { margin-bottom: 24px; }
            .section-title { font-weight: 600; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: #666; }
            .customer-info { background: #f9f9f9; padding: 16px; border-radius: 8px; }
            .customer-info p { margin-bottom: 4px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            .items-table th { background: #f5f5f5; font-weight: 600; }
            .items-table td:last-child, .items-table th:last-child { text-align: right; }
            .summary { margin-left: auto; width: 300px; }
            .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .summary-row.total { border-top: 2px solid #333; font-weight: bold; font-size: 18px; margin-top: 8px; padding-top: 16px; }
            .footer { margin-top: 60px; text-align: center; color: #666; font-size: 12px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NOIR ESSENCE</h1>
            <p>Luxury Perfumery</p>
          </div>
          
          <div class="invoice-info">
            <div>
              <strong>Invoice #:</strong> ${order.orderNumber}<br>
              <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
              <strong>Status:</strong> ${order.status.toUpperCase()}
            </div>
            <div style="text-align: right;">
              <strong>Payment:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}<br>
              <strong>Delivery:</strong> ${order.deliveryOption.charAt(0).toUpperCase() + order.deliveryOption.slice(1)}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Bill To</div>
            <div class="customer-info">
              <p><strong>${order.customer.name}</strong></p>
              <p>${order.customer.email}</p>
              <p>${order.customer.phone}</p>
              <p>${order.customer.address.street}</p>
              <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}</p>
              <p>${order.customer.address.country}</p>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Order Items</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.product.name}</td>
                    <td>${item.selectedSize.size}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span>${order.deliveryCharge === 0 ? 'FREE' : '$' + order.deliveryCharge.toFixed(2)}</span>
            </div>
            ${order.discount > 0 ? `
              <div class="summary-row" style="color: green;">
                <span>Discount</span>
                <span>-$${order.discount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <span>Total</span>
              <span>$${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for shopping with NOIR ESSENCE</p>
            <p>For questions, contact support@noiressence.com</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-xl flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order {order.orderNumber}
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={handlePrint} className="mr-6">
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6" ref={printRef}>
          {/* Order Status & Date */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Status:</span>
              <Select value={order.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-36 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusColors[option.value].split(' ')[0]}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge className={statusColors[order.status]}>{order.status.toUpperCase()}</Badge>
            </div>
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
