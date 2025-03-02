
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              <div className="w-10 h-10 relative overflow-hidden rounded-full bg-tulsi flex items-center justify-center">
                <img 
                  src="/lovable-uploads/140c8e07-969c-45c3-8fb5-b5431651e3a9.png"
                  alt="Tulsi Optic"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="ml-2 text-xl font-playfair font-medium">Tulsi Optic</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-4 pr-4">
              Delivering premium eyewear with a focus on quality, style, and customer satisfaction. Your vision is our priority.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?brand=montblanc" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Montblanc
                </Link>
              </li>
              <li>
                <Link to="/products?category=sunglasses" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link to="/products?category=prescription" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Prescription Glasses
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-muted-foreground hover:text-tulsi text-sm transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-tulsi mr-3 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Opposite Jagnath Temple, Dr Yagnik Road, Yagnik Road, Rajkot, Gujarat 360001
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-tulsi mr-3" />
                <a href="tel:9925792612" className="text-sm text-muted-foreground hover:text-tulsi transition-colors">
                  9925792612
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-tulsi mr-3" />
                <a href="mailto:tulsioptical_rajkot@yahoo.com" className="text-sm text-muted-foreground hover:text-tulsi transition-colors">
                  tulsioptical_rajkot@yahoo.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Tulsi Optic. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-tulsi transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-tulsi transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
