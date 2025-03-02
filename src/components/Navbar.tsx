
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 relative overflow-hidden rounded-full bg-tulsi flex items-center justify-center">
            <img 
              src="/lovable-uploads/140c8e07-969c-45c3-8fb5-b5431651e3a9.png" 
              alt="Tulsi Optic" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="ml-2 text-xl font-playfair font-medium">Tulsi Optic</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-tulsi ${
              isActive('/') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-tulsi ${
              isActive('/about') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className={`text-sm font-medium transition-colors hover:text-tulsi ${
              isActive('/products') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-tulsi ${
              isActive('/contact') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/wishlist" className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-tulsi text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto rounded-full" size="icon">
                  <Avatar className="w-9 h-9 border border-muted">
                    <AvatarFallback className="bg-tulsi-50 text-tulsi">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Signed in as {user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="font-medium">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden space-x-4">
          <Link to="/cart" className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-tulsi text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-white dark:bg-zinc-900 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-5 space-y-5">
          <Link
            to="/"
            className={`text-lg py-2 font-medium ${
              isActive('/') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-lg py-2 font-medium ${
              isActive('/about') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className={`text-lg py-2 font-medium ${
              isActive('/products') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`text-lg py-2 font-medium ${
              isActive('/contact') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            Contact Us
          </Link>
          <Link
            to="/wishlist"
            className={`text-lg py-2 font-medium flex items-center space-x-2 ${
              isActive('/wishlist') ? 'text-tulsi' : 'text-foreground/80'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
          </Link>
          
          <div className="pt-5 border-t border-gray-200 dark:border-zinc-800">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border border-muted">
                    <AvatarFallback className="bg-tulsi-50 text-tulsi">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link to="/profile" className="block py-2 text-foreground/80">
                  My Profile
                </Link>
                <Link to="/orders" className="block py-2 text-foreground/80">
                  My Orders
                </Link>
                <Button onClick={signOut} variant="outline" className="w-full justify-start mt-4">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/signin">
                  <Button className="w-full bg-tulsi hover:bg-tulsi-dark">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
