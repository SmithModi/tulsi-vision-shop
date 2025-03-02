
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductCardProps = {
  product: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (product: Product) => void;
};

// Sample colors and sizes for products
const productColors = [
  { name: 'Black', value: 'black' },
  { name: 'Brown', value: 'brown' },
  { name: 'Gold', value: 'gold' },
];

const productSizes = [
  { name: 'Small', value: 'small' },
  { name: 'Medium', value: 'medium' },
  { name: 'Large', value: 'large' },
];

const ProductCard = ({ product, isWishlisted = false, onWishlistToggle }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(productColors[0].value);
  const [selectedSize, setSelectedSize] = useState(productSizes[1].value);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add product with selected color and size
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize
    };
    
    addToCart(productWithOptions);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  const handleColorSelect = (e: React.MouseEvent, color: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };

  const handleSizeSelect = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
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
          
          {/* Color Selection */}
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-2">Color:</div>
            <div className="flex gap-2">
              {productColors.map((color) => (
                <button
                  key={color.value}
                  onClick={(e) => handleColorSelect(e, color.value)}
                  className={`w-6 h-6 rounded-full border ${
                    selectedColor === color.value ? 'ring-2 ring-tulsi ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Size:</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button 
                  variant="outline" 
                  className="w-full text-left justify-between h-8 text-sm"
                  size="sm"
                >
                  {productSizes.find(s => s.value === selectedSize)?.name || 'Select Size'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[180px]">
                {productSizes.map((size) => (
                  <DropdownMenuItem
                    key={size.value}
                    onClick={(e) => handleSizeSelect(e as unknown as React.MouseEvent, size.value)}
                    className={selectedSize === size.value ? "bg-muted" : ""}
                  >
                    {size.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-auto">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-tulsi hover:bg-tulsi-dark text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
