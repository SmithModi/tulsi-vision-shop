
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted,
  onWishlistToggle
}) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  
  // Fallback image in case the primary image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={imageError ? fallbackImage : product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImageError(true)}
          />
          <button 
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              onWishlistToggle(product);
            }}
            className="absolute top-3 right-3 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-sm hover:scale-110 transition-all duration-300"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3">Brand: {product.brand}</p>
        </Link>
        
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-tulsi">
            {formatPrice(product.price)}
          </p>
          <Button 
            onClick={() => addToCart(product)}
            size="sm"
            className="bg-tulsi hover:bg-tulsi/90"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
