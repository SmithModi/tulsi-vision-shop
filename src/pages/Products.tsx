
import { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { mockProducts, brands, categories } from '@/data/mockData';
import { Product } from '@/context/CartContext';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

// Define product colors and sizes for filtering
const productColors = [
  { label: 'Black', value: 'black' },
  { label: 'Brown', value: 'brown' },
  { label: 'Gold', value: 'gold' },
  { label: 'Silver', value: 'silver' },
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
];

const productSizes = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search suggestions state
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const initialBrand = searchParams.get('brand') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialColor = searchParams.get('color') || 'all';
  const initialSize = searchParams.get('size') || 'all';
  
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  
  const { wishlist, toggleWishlist } = useWishlist();

  // Close suggestions when clicking outside
  useOnClickOutside(searchRef, () => setShowSuggestions(false));

  useEffect(() => {
    // Initialize with mock products
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    // Generate search suggestions
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      const suggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
        .slice(0, 5); // Limit suggestions to 5 items
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    // Filter products based on selected filters and search query
    let filtered = [...products];
    
    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(
        product => product.brand.toLowerCase() === selectedBrand
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );
    }
    
    // Filter by color (simulated with random selection since we don't have actual color data)
    if (selectedColor !== 'all') {
      // Fix the type error by ensuring numeric comparison
      filtered = filtered.filter(product => {
        const productId = parseInt(product.id, 10);
        const colorIndex = productColors.findIndex(c => c.value === selectedColor);
        return productId % productColors.length === colorIndex;
      });
    }
    
    // Filter by size (simulated with random selection since we don't have actual size data)
    if (selectedSize !== 'all') {
      // Fix the type error by ensuring numeric comparison
      filtered = filtered.filter(product => {
        const productId = parseInt(product.id, 10);
        const sizeIndex = productSizes.findIndex(s => s.value === selectedSize);
        return productId % productSizes.length === sizeIndex;
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (selectedBrand !== 'all') params.set('brand', selectedBrand);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedColor !== 'all') params.set('color', selectedColor);
    if (selectedSize !== 'all') params.set('size', selectedSize);
    setSearchParams(params, { replace: true });
  }, [products, selectedBrand, selectedCategory, selectedColor, selectedSize, searchQuery, setSearchParams]);

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    toast({
      title: "Product found",
      description: `Showing results for ${product.name}`,
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setSearchQuery('');
  };

  const isProductWishlisted = (product: Product) => {
    return wishlist.some(item => item.id === product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-10 md:py-16 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-medium mb-6 animate-fade-in">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in">
                Discover our collection of premium eyewear from the world's most prestigious brands.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main content with filters and products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                
                <div className="relative" ref={searchRef}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 w-[200px]"
                  />
                  {searchQuery && (
                    <button 
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  
                  {/* Mobile search suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 rounded-md shadow-lg max-h-60 overflow-auto">
                      {searchSuggestions.map((product) => (
                        <div 
                          key={product.id}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                          onClick={() => handleSuggestionClick(product)}
                        >
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* No results message for mobile */}
                  {showSuggestions && searchQuery.length >= 2 && searchSuggestions.length === 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 rounded-md shadow-lg p-3">
                      <p className="text-sm text-muted-foreground">No products match your search</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Filters Section - Left Side */}
              <div className={`w-full lg:w-1/4 xl:w-1/5 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </h3>
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-tulsi hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <Accordion type="single" collapsible defaultValue="brand" className="space-y-4">
                    {/* Brand Filter */}
                    <AccordionItem value="brand" className="border-none">
                      <AccordionTrigger className="py-2 px-0">
                        <span className="text-base font-medium">Brand</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div 
                              key={brand.value} 
                              className={`py-1.5 px-3 cursor-pointer rounded-md transition-colors ${
                                selectedBrand === brand.value ? 'bg-tulsi/10 text-tulsi' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                              }`}
                              onClick={() => handleBrandChange(brand.value)}
                            >
                              {brand.label}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Category Filter */}
                    <AccordionItem value="category" className="border-none">
                      <AccordionTrigger className="py-2 px-0">
                        <span className="text-base font-medium">Category</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div 
                              key={category.value} 
                              className={`py-1.5 px-3 cursor-pointer rounded-md transition-colors ${
                                selectedCategory === category.value ? 'bg-tulsi/10 text-tulsi' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                              }`}
                              onClick={() => handleCategoryChange(category.value)}
                            >
                              {category.label}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Color Filter */}
                    <AccordionItem value="color" className="border-none">
                      <AccordionTrigger className="py-2 px-0">
                        <span className="text-base font-medium">Color</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <div className="space-y-2">
                          {productColors.map((color) => (
                            <div 
                              key={color.value} 
                              className={`py-1.5 px-3 cursor-pointer rounded-md transition-colors ${
                                selectedColor === color.value ? 'bg-tulsi/10 text-tulsi' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                              }`}
                              onClick={() => handleColorChange(color.value)}
                            >
                              {color.label}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Size Filter */}
                    <AccordionItem value="size" className="border-none">
                      <AccordionTrigger className="py-2 px-0">
                        <span className="text-base font-medium">Size</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <div className="space-y-2">
                          {productSizes.map((size) => (
                            <div 
                              key={size.value} 
                              className={`py-1.5 px-3 cursor-pointer rounded-md transition-colors ${
                                selectedSize === size.value ? 'bg-tulsi/10 text-tulsi' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                              }`}
                              onClick={() => handleSizeChange(size.value)}
                            >
                              {size.label}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              {/* Products Grid - Right Side */}
              <div className="w-full lg:w-3/4 xl:w-4/5">
                {/* Desktop Search and Sort Bar */}
                <div className="hidden lg:flex items-center justify-between mb-8">
                  <div className="relative" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 pr-10 w-[300px]"
                    />
                    {searchQuery && (
                      <button 
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* Desktop search suggestions */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 rounded-md shadow-lg max-h-80 overflow-auto">
                        {searchSuggestions.map((product) => (
                          <div 
                            key={product.id}
                            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer flex items-start gap-3"
                            onClick={() => handleSuggestionClick(product)}
                          >
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                              <p className="text-sm font-medium text-tulsi">
                                ₹{(product.price / 100).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* No results message for desktop */}
                    {showSuggestions && searchQuery.length >= 2 && searchSuggestions.length === 0 && (
                      <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 rounded-md shadow-lg p-4">
                        <p className="text-muted-foreground">No products match your search</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="font-normal">Newest First</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Newest First</DropdownMenuItem>
                        <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                        <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                        <DropdownMenuItem>Popularity</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Products Grid with 3x3 Layout */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        isWishlisted={isProductWishlisted(product)}
                        onWishlistToggle={toggleWishlist}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
