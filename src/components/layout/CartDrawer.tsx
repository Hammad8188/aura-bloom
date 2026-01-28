import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const CartDrawer = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
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

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyDiscountCode(promoInput.trim());
      setPromoInput('');
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-background flex flex-col">
        <SheetHeader className="border-b border-primary/10 pb-4">
          <SheetTitle className="font-serif text-xl">Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Discover our luxury fragrances and find your signature scent.</p>
            <Button asChild className="gold-gradient text-primary-foreground" onClick={closeCart}>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(item => (
                <div 
                  key={`${item.product.id}-${item.selectedSize.size}`}
                  className="flex gap-4 p-3 bg-muted/30 rounded-sm"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.selectedSize.size}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize.size)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-primary/20">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
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
            </div>

            <div className="border-t border-primary/10 pt-4 space-y-4">
              {/* Promo Code */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-primary/10 px-3 py-2 rounded-sm">
                  <span className="text-sm">
                    <span className="font-medium">{discountCode}</span> - {discountAmount}% off
                  </span>
                  <Button variant="ghost" size="sm" onClick={removeDiscount} className="h-6 px-2 text-xs">
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 text-sm">
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
                <div className="flex justify-between text-lg font-medium pt-2 border-t border-primary/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button asChild className="w-full gold-gradient text-primary-foreground" onClick={closeCart}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={closeCart}>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
