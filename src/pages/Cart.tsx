
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();

  // Calculate subtotal and tax
  const subtotal = totalPrice;
  const tax = subtotal * 0.05; // 5% tax
  const shipping = totalItems > 0 ? 999 : 0; // ₹999 shipping or free if cart is empty
  const grandTotal = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-playfair font-medium mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                You haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-tulsi hover:bg-tulsi/90">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Cart Items ({totalItems})</h2>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="text-sm flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">Brand: {item.product.brand}</p>
                          <p className="text-lg font-medium text-tulsi">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="flex items-center border rounded-md mt-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <p className="text-sm font-medium mt-2">
                            Total: {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span className="text-tulsi">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-tulsi hover:bg-tulsi/90">
                  Proceed to Checkout
                </Button>
                
                <Link to="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
