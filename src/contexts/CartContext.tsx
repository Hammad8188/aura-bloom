import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product, ProductSize, WishlistItem } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string, size: ProductSize) => void;
  cartTotal: number;
  cartCount: number;
  deliveryCharge: number;
  discountCode: string;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_DISCOUNT_CODES: Record<string, number> = {
  'NOIR10': 10,
  'LUXURY20': 20,
  'WELCOME15': 15,
  'VIP25': 25,
};

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_DELIVERY = 10;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const cartTotal = items.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY;

  const addToCart = useCallback((product: Product, size: ProductSize, quantity: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize.size === size.size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize: size, quantity }];
    });

    toast({
      title: 'Added to Cart',
      description: `${product.name} (${size.size}) has been added to your cart.`,
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize.size === size)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems(prev => prev.map(item => 
      item.product.id === productId && item.selectedSize.size === size
        ? { ...item, quantity }
        : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.product.id === product.id)) {
        return prev;
      }
      toast({
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  }, [wishlist]);

  const moveToCart = useCallback((productId: string, size: ProductSize) => {
    const wishlistItem = wishlist.find(item => item.product.id === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product, size);
      removeFromWishlist(productId);
    }
  }, [wishlist, addToCart, removeFromWishlist]);

  const applyDiscountCode = useCallback((code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (VALID_DISCOUNT_CODES[upperCode]) {
      setDiscountCode(upperCode);
      setDiscountAmount(VALID_DISCOUNT_CODES[upperCode]);
      toast({
        title: 'Discount Applied',
        description: `${VALID_DISCOUNT_CODES[upperCode]}% discount has been applied!`,
      });
      return true;
    }
    toast({
      title: 'Invalid Code',
      description: 'The discount code you entered is not valid.',
      variant: 'destructive',
    });
    return false;
  }, []);

  const removeDiscount = useCallback(() => {
    setDiscountCode('');
    setDiscountAmount(0);
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      wishlist,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      moveToCart,
      cartTotal,
      cartCount,
      deliveryCharge,
      discountCode,
      discountAmount,
      applyDiscountCode,
      removeDiscount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
