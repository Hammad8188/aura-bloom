import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Truck, Check } from 'lucide-react';

type CheckoutStep = 'info' | 'shipping' | 'payment';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, deliveryCharge, discountAmount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('info');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const subtotal = cartTotal;
  const discount = discountAmount > 0 ? (subtotal * discountAmount) / 100 : 0;
  const shipping = deliveryOption === 'express' ? 25 : deliveryCharge;
  const total = subtotal - discount + shipping;

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: 'info', label: 'Information' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ];

  const handleSubmit = () => {
    // Generate order number
    const orderNumber = `NE-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    navigate('/order-confirmation', { state: { orderNumber, total } });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, i) => (
            <div key={step.key} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep === step.key
                    ? 'bg-primary text-primary-foreground'
                    : steps.findIndex(s => s.key === currentStep) > i
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {steps.findIndex(s => s.key === currentStep) > i ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:block ml-2 text-sm">{step.label}</span>
              {i < steps.length - 1 && <div className="w-12 h-px bg-border mx-4" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {currentStep === 'info' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-2xl">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <h2 className="font-serif text-2xl pt-6">Shipping Address</h2>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button 
                  className="w-full gold-gradient text-primary-foreground"
                  onClick={() => setCurrentStep('shipping')}
                >
                  Continue to Shipping
                </Button>
              </div>
            )}

            {currentStep === 'shipping' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-2xl">Shipping Method</h2>
                <RadioGroup value={deliveryOption} onValueChange={(v) => setDeliveryOption(v as 'standard' | 'express')}>
                  <div className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer ${deliveryOption === 'standard' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="cursor-pointer">Standard Delivery</Label>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge}`}</span>
                  </div>
                  <div className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer ${deliveryOption === 'express' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="cursor-pointer">Express Delivery</Label>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">$25.00</span>
                  </div>
                </RadioGroup>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep('info')}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1 gold-gradient text-primary-foreground"
                    onClick={() => setCurrentStep('payment')}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-2xl">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'cod' | 'card')}>
                  <div className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                        <p className="text-sm text-muted-foreground">Secure payment via Stripe</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-sm">
                    <div>
                      <Label>Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep('shipping')}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1 gold-gradient text-primary-foreground"
                    onClick={handleSubmit}
                  >
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-6 luxury-border sticky top-24">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize.size}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.selectedSize.size}</p>
                    </div>
                    <span className="text-sm">${(item.selectedSize.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-primary/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t border-primary/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
