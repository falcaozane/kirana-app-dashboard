// src/app/page.tsx
'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Store, Star, Truck, BarChart, Phone,
  ShoppingBag, CreditCard, Gift, TrendingUp, Users, Clock
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-pattern bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center"
          >
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 space-y-8"
            >
              <h1 className="text-4xl lg:text-6xl font-bold">
                Your Local Stores, <br/>
                <span className="text-yellow-300">Digitally Connected</span>
              </h1>
              <p className="text-xl opacity-90">
                Empowering local kirana stores with modern technology while keeping the personal touch intact
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" className="hover:scale-105 transition">
                  Find Stores
                </Button>
                <Button size="lg" variant="default" className="hover:scale-105 bg-indigo-600 transition text-white border-2 border-white">
                  Register Store
                </Button>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 mt-10 lg:mt-0"
            >
              <div className="relative w-full h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&h=400&q=80"
                alt="Kirana Store App"
                fill
                className="object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
              />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Stores", color: "text-blue-600" },
              { number: "50,000+", label: "Users", color: "text-green-600" },
              { number: "100,000+", label: "Orders", color: "text-yellow-600" },
              { number: "25+", label: "Cities", color: "text-purple-600" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold mb-4"
            >
              For Store Owners
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Transform your traditional store into a digital powerhouse with our comprehensive suite of tools
            </motion.p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Store,
                title: "Digital Storefront",
                description: "Create a beautiful digital presence with an easy-to-manage store profile and product catalog",
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: BarChart,
                title: "Business Analytics",
                description: "Make data-driven decisions with detailed insights into sales, inventory, and customer behavior",
                color: "text-green-600",
                bgColor: "bg-green-50"
              },
              {
                icon: Users,
                title: "Customer Management",
                description: "Build lasting relationships with customer profiles, loyalty programs, and personalized offers",
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              },
              {
                icon: ShoppingBag,
                title: "Inventory Management",
                description: "Track stock levels in real-time, set alerts, and automate reordering processes",
                color: "text-yellow-600",
                bgColor: "bg-yellow-50"
              },
              {
                icon: Gift,
                title: "Promotions & Offers",
                description: "Create and manage special offers, discounts, and loyalty rewards to drive sales",
                color: "text-red-600",
                bgColor: "bg-red-50"
              },
              {
                icon: Clock,
                title: "Time-Saving Operations",
                description: "Streamline daily operations with automated order processing and inventory management",
                color: "text-indigo-600",
                bgColor: "bg-indigo-50"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
              >
                <Card className="hover:shadow-lg transition-shadow h-full overflow-hidden group">
                  <CardContent className="p-6">
                    <div className={`rounded-full w-12 h-12 ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            What Our Users Say
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                quote: "This app has transformed my small store into a digital business. My customers love the convenience!",
                author: "Rajesh Kumar",
                role: "Store Owner",
                image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                rating: 5
              },
              {
                quote: "I can now easily find and order from my favorite local stores. The delivery tracking is fantastic!",
                author: "Priya Sharma",
                role: "Customer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                rating: 5
              },
              {
                quote: "The analytics tools have helped me understand my business better and grow my customer base.",
                author: "Amit Patel",
                role: "Store Owner",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-1">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 mb-10 lg:mb-0"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Experience Seamless Shopping<br/>with Our Mobile App
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Find nearby stores with real-time availability",
                  "Track your orders in real-time",
                  "Easy payment and reward points",
                  "Get exclusive app-only offers"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="bg-black rounded-xl p-2 hover:opacity-80 transition">
                  <Image 
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                    alt="Download on App Store" 
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </button>
                <button className="bg-black rounded-xl p-2 hover:opacity-80 transition">
                  <Image 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Play Store" 
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </button>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 relative"
            >
              <div className="relative w-[300px] h-[600px] mx-auto">
                <Image 
                  src="/kirana-store.jpg"
                  alt="Mobile App"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl lg:text-4xl font-bold mb-8"
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 text-gray-600"
            >
              Join our growing community of local stores and customers. Get started in minutes!
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="flex gap-4 justify-center"
            >
              <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                Download App
              </Button>
              <Button size="lg" variant="outline">
                Register Your Store
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}