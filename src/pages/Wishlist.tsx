
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const Wishlist = () => {
  const { items: wishlistItems, removeFromWishlist, clearWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-playfair font-medium mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                You haven't added any products to your wishlist yet.
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-medium">Your Wishlist</h1>
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-sm"
            >
              Clear Wishlist
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map(product => (
              <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white dark:bg-zinc-800 p-2 rounded-full text-red-500 shadow-sm hover:scale-110 transition-all duration-300"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
                
                <div className="p-5">
                  <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">Brand: {product.brand}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium text-tulsi">
                      ₹{(product.price / 100).toLocaleString('en-IN')}
                    </p>
                    <Button 
                      onClick={() => {
                        addToCart(product);
                        removeFromWishlist(product.id);
                      }}
                      size="sm"
                      className="bg-tulsi hover:bg-tulsi/90 flex items-center gap-1"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
