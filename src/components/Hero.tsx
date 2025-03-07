
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&q=80&w=2000";
  
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="md:pr-12 animate-fade-in">
            <h5 className="text-tulsi font-medium mb-2 opacity-90">Premium Eyewear Collection</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium leading-tight mb-6">
              See the World Through Quality Lenses
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover our collection of premium eyewear that combines style, comfort, and the highest quality materials for optimal vision.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-tulsi hover:bg-tulsi-dark text-white">
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About Tulsi Optic</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] animate-fade-in">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Main Image - Updated to an elegant optical-themed image */}
                <img
                  src={imageError ? fallbackImage : "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=2000"}
                  alt="Elegant eyewear collection"
                  className="absolute z-10 w-[85%] h-[85%] object-cover rounded-2xl shadow-xl"
                  style={{ 
                    left: '50%', 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}
                  onError={() => setImageError(true)}
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-[15%] right-[5%] w-20 h-20 bg-tulsi-100 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[10%] w-12 h-12 bg-tulsi-300 rounded-full opacity-60"></div>
                
                {/* Background gradient circle */}
                <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-tulsi-50 to-tulsi-100 rounded-full opacity-50"
                  style={{ 
                    left: '60%', 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
