
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/context/CartContext';
import { mockProducts } from '@/data/mockData';
import { Heart, ShoppingCart, Star, Truck, ArrowLeft, RotateCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

// Define product colors and sizes for selection
const productColors = [
  { label: 'Black', value: 'black' },
  { label: 'Brown', value: 'brown' },
  { label: 'Gold', value: 'gold' },
  { label: 'Silver', value: 'silver' },
];

const productSizes = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productColors[0].value);
  const [selectedSize, setSelectedSize] = useState(productSizes[1].value);
  
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // Fetch product details
  useEffect(() => {
    setLoading(true);
    // Simulate API fetch with a timeout
    const timer = setTimeout(() => {
      if (id) {
        const foundProduct = mockProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${product.name} to cart`);
    }
  };
  
  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-spin">
            <RotateCw className="h-8 w-8 text-tulsi" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-playfair font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products">
              <Button className="bg-tulsi hover:bg-tulsi/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const isWishlisted = isInWishlist(product.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-playfair font-medium mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, index) => (
                    <Star key={index} className={`h-4 w-4 ${index < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(42 reviews)</span>
              </div>
              
              <div className="text-2xl font-medium text-tulsi mb-6">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">COLOR</h3>
                <div className="flex gap-3">
                  {productColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.value ? 'border-tulsi' : 'border-transparent'
                      }`}
                    >
                      <span 
                        className={`block w-full h-full rounded-full border border-gray-200 bg-${color.value === 'silver' ? 'gray-200' : color.value === 'gold' ? 'yellow-500' : color.value}`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">SIZE</h3>
                <div className="flex gap-3">
                  {productSizes.map(size => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size.value
                          ? 'border-tulsi bg-tulsi/5 text-tulsi'
                          : 'border-gray-200 dark:border-gray-700 hover:border-tulsi/50'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex border rounded-md">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-tulsi hover:bg-tulsi/90 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={`px-4 ${isWishlisted ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-tulsi" />
                  <span>Free shipping on orders over ₹10,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 text-tulsi" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
