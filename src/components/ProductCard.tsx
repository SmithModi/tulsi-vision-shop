
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (product: Product) => void;
};

const ProductCard = ({ product, isWishlisted = false, onWishlistToggle }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  return (
    <div
      className="product-card animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-tulsi text-tulsi' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-lg font-medium text-tulsi mb-4">₹{product.price.toLocaleString()}</p>
          
          <div className="mt-auto">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-tulsi hover:bg-tulsi-dark text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
