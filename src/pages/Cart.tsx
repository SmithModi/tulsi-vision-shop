
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();

  // Calculate subtotal and tax
  const subtotal = totalPrice;
  const tax = subtotal * 0.05; // 5% tax
  const shipping = totalItems > 0 ? 999 : 0; // ₹999 shipping or free if cart is empty
  const grandTotal = subtotal + tax + shipping;

  const generateReceipt = () => {
    const doc = new jsPDF();
    
    // Set up the document
    doc.setFontSize(20);
    doc.text("Order Receipt", 105, 20, { align: "center" });
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });
    
    // Add company details
    doc.setFontSize(12);
    doc.text("Tulsi Ayurveda", 20, 40);
    doc.setFontSize(10);
    doc.text("123 Wellness Street, Ayurveda City", 20, 45);
    doc.text("Email: contact@tulsiayurveda.com", 20, 50);
    doc.text("Phone: +91 98765 43210", 20, 55);
    
    // Add a horizontal line
    doc.line(20, 60, 190, 60);
    
    // Item table headers
    doc.setFontSize(10);
    doc.text("Item", 20, 70);
    doc.text("Brand", 90, 70);
    doc.text("Qty", 130, 70);
    doc.text("Price", 150, 70);
    doc.text("Total", 175, 70);
    
    // Add a horizontal line
    doc.line(20, 73, 190, 73);
    
    // Item details
    let y = 80;
    items.forEach((item, index) => {
      // Truncate name if too long
      const displayName = item.product.name.length > 30 
        ? item.product.name.substring(0, 30) + "..." 
        : item.product.name;
        
      doc.text(displayName, 20, y);
      doc.text(item.product.brand, 90, y);
      doc.text(item.quantity.toString(), 130, y);
      doc.text(formatPrice(item.product.price).replace("₹", ""), 150, y);
      doc.text(formatPrice(item.product.price * item.quantity).replace("₹", ""), 175, y);
      
      y += 8;
      
      // Add page if needed
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Add a horizontal line
    doc.line(20, y, 190, y);
    y += 10;
    
    // Order summary
    doc.text("Subtotal:", 140, y);
    doc.text(formatPrice(subtotal).replace("₹", ""), 175, y);
    y += 7;
    
    doc.text("Tax (5%):", 140, y);
    doc.text(formatPrice(tax).replace("₹", ""), 175, y);
    y += 7;
    
    doc.text("Shipping:", 140, y);
    doc.text(shipping > 0 ? formatPrice(shipping).replace("₹", "") : "Free", 175, y);
    y += 7;
    
    // Add a horizontal line
    doc.line(140, y, 190, y);
    y += 7;
    
    // Grand total
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Grand Total:", 140, y);
    doc.text(formatPrice(grandTotal).replace("₹", ""), 175, y);
    doc.setFont(undefined, 'normal');
    
    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.text("Thank you for shopping with Tulsi Ayurveda!", 105, y, { align: "center" });
    
    // Save the PDF with a name
    doc.save("Tulsi_Ayurveda_Receipt.pdf");
    
    // Show success message
    toast.success("Receipt downloaded successfully!");
  };

  const handleCheckout = () => {
    generateReceipt();
    // Here you would typically handle the actual checkout process
    // For now, we'll just clear the cart after generating the receipt
    clearCart();
    toast.success("Order placed successfully!");
  };

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
                
                <Button 
                  className="w-full mt-6 bg-tulsi hover:bg-tulsi/90"
                  onClick={handleCheckout}
                >
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
