
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-20 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h5 className="text-tulsi font-medium mb-3 animate-fade-in">Our Story</h5>
              <h1 className="text-4xl md:text-5xl font-playfair font-medium mb-6 animate-fade-in">
                About Tulsi Optic
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
                A legacy of premium eyewear and exceptional service, dedicated to enhancing your vision with style and quality since our establishment.
              </p>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1543050047-17cdabbc2d0f?auto=format&fit=crop&q=80&w=2000"
                  alt="Our store interior"
                  className="absolute z-10 w-[85%] h-[85%] object-cover rounded-2xl shadow-xl"
                  style={{ 
                    left: '50%', 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-[15%] right-[5%] w-20 h-20 bg-tulsi-100 rounded-full opacity-70"></div>
                <div className="absolute bottom-[10%] left-[10%] w-12 h-12 bg-tulsi-300 rounded-full opacity-60"></div>
                
                {/* Background gradient circle */}
                <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-tulsi-50 to-tulsi-100 rounded-full opacity-50"
                  style={{ 
                    left: '60%', 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}></div>
              </div>
              
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
                  Our Vision & Mission
                </h2>
                <p className="text-lg mb-6 leading-relaxed">
                  At Tulsi Optic, we believe that quality eyewear is an essential tool for not just seeing the world, but experiencing it to its fullest. Our mission is to provide our customers with premium eyewear solutions that combine functionality, comfort, and style.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                  We are dedicated to offering personalized service, expert advice, and a curated selection of the finest brands in the industry. Every pair of glasses we sell is a testament to our commitment to quality and customer satisfaction.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-tulsi hover:bg-tulsi-dark text-white">
                    <Link to="/products">
                      Explore Our Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide our business and ensure we deliver the best experience to our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up">
                <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-tulsi" />
                </div>
                <h3 className="text-xl font-medium mb-3">Quality Excellence</h3>
                <p className="text-muted-foreground">
                  We are committed to offering only the highest quality eyewear products that meet our stringent standards for durability, comfort, and style.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-tulsi" />
                </div>
                <h3 className="text-xl font-medium mb-3">Customer Satisfaction</h3>
                <p className="text-muted-foreground">
                  We prioritize our customers' needs and satisfaction, providing personalized service, expert advice, and after-sales support to ensure an exceptional experience.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-tulsi" />
                </div>
                <h3 className="text-xl font-medium mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  We believe in building long-term relationships with our customers through consistent service, transparent practices, and products that stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="bg-tulsi-50 dark:bg-tulsi-900/20 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
                  Visit Our Store
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience our collection in person and receive expert advice from our team of specialists. We're here to help you find the perfect eyewear.
                </p>
                <Button asChild size="lg" className="bg-tulsi hover:bg-tulsi-dark text-white">
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
