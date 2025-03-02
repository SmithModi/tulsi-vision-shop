
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '@/context/CartContext';
import { mockProducts } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    // Get 4 featured products
    const featured = mockProducts.slice(0, 4);
    setProducts(featured);
  }, []);

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Explore our collection of premium eyewear, handpicked for superior quality and style.
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/products" className="flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isWishlisted={isInWishlist(product.id)}
              onWishlistToggle={() => handleWishlistToggle(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
