
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation would go here
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
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
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in">
                We're here to help you find the perfect eyewear. Reach out to us with any questions or inquiries.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-playfair font-medium mb-8">
                  Get in Touch
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-tulsi" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Our Location</h3>
                      <p className="text-muted-foreground">
                        Opposite Jagnath Temple, Dr Yagnik Road<br />
                        Yagnik Road, Rajkot, Gujarat 360001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-tulsi" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:9925792612" className="hover:text-tulsi transition-colors">
                          9925792612
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-tulsi" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:tulsioptical_rajkot@yahoo.com" className="hover:text-tulsi transition-colors">
                          tulsioptical_rajkot@yahoo.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-tulsi/10 rounded-2xl flex items-center justify-center mr-4">
                      <Clock className="w-5 h-5 text-tulsi" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Working Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="animate-fade-in">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-playfair font-medium mb-6">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(+91) 1234567890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-2 block">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-tulsi hover:bg-tulsi-dark text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-3xl shadow-sm h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6746264738504!2d70.79914811495909!3d22.29151298532494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca2970ef6547%3A0xf6b3b45e9b8be27e!2sTulsi%20Optic!5e0!3m2!1sen!2sin!4v1684296734227!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tulsi Optic Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
