
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Premium Eyewear",
      description: "Experience quality craftsmanship with our collection of high-end frames and lenses."
    },
    {
      title: "Expert Consultation",
      description: "Our specialists provide personalized guidance to help you find the perfect eyewear."
    },
    {
      title: "Authentic Brands",
      description: "Shop with confidence knowing all our products are 100% authentic and certified."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
                Why Choose Tulsi Optic
              </h2>
              <p className="text-lg text-muted-foreground">
                We've been providing quality eyewear and exceptional service to our customers for years. Here's what makes us different.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6 text-tulsi" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="bg-tulsi-50 dark:bg-tulsi-900/20 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:max-w-xl mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">
                    Ready to Find Your Perfect Pair?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Browse our extensive collection of premium eyewear and find the perfect pair that matches your style and needs.
                  </p>
                  <Button asChild size="lg" className="bg-tulsi hover:bg-tulsi-dark text-white">
                    <Link to="/products">
                      Explore All Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="w-full md:w-1/3 h-64 relative">
                  <img
                    src="https://images.unsplash.com/photo-1584036553516-bf83210aa16c?auto=format&fit=crop&q=80&w=1974"
                    alt="Premium eyewear collection"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
