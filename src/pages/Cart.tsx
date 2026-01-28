import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
    deliveryCharge,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscount,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const subtotal = cartTotal;
  const discount = discountAmount > 0 ? (subtotal * discountAmount) / 100 : 0;
  const total = subtotal - discount + deliveryCharge;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
          <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Discover our luxury fragrances and find your signature scent.
          </p>
          <Button asChild className="gold-gradient text-primary-foreground">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize.size}`}
                className="flex gap-4 p-4 bg-muted/30 luxury-border"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-serif hover:text-primary transition-colors">{item.product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.selectedSize.size}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.product.id, item.selectedSize.size)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-primary/20">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-medium">${(item.selectedSize.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center text-sm text-primary hover:underline">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-6 luxury-border sticky top-24">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>

              {/* Promo Code */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-primary/10 px-3 py-2 rounded-sm mb-4">
                  <span className="text-sm">
                    <span className="font-medium">{discountCode}</span> - {discountAmount}% off
                  </span>
                  <Button variant="ghost" size="sm" onClick={removeDiscount} className="h-6 px-2 text-xs">
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      applyDiscountCode(promoInput);
                      setPromoInput('');
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount ({discountAmount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge.toFixed(2)}`}</span>
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free delivery on orders over $150
                  </p>
                )}
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-primary/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button asChild className="w-full mt-6 gold-gradient text-primary-foreground">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
