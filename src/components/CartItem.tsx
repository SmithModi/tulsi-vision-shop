
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const increaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          </div>
          <p className="text-lg font-medium text-tulsi">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0 sm:ml-8">
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg mr-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={decreaseQuantity}
            className="h-8 w-8 rounded-l-lg"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="px-3 py-1">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={increaseQuantity}
            className="h-8 w-8 rounded-r-lg"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-red-500 dark:text-red-400 h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
