import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Clock, ChevronRight, Send, Shield, Truck, CreditCard, Leaf } from "lucide-react";
import Home from "../screens/Home";
import Store from "../screens/Store";
import Cart from "../screens/Cart";
import Practitioners from "../screens/Practitioners";
import Suppliers from "../screens/Suppliers"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto bg-gradient-to-b from-white to-green-50">
      {/* Curved top edge */}
      <div className="w-full h-12 bg-white rounded-b-[50%] shadow-sm mb-8"></div>
      
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-5">
              <Leaf className="text-green-600 mr-2 h-6 w-6" />
              <h3 className="font-bold text-xl text-gray-800">AyurLanka</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted source for authentic traditional medical products in Sri Lanka, promoting wellness through ancient wisdom and modern science.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"></path><path d="M21 3l-8.5 8.5M9.5 11.5L21 23"></path></svg>
              </a>
              <a href="#" className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
       {/* Quick Links */}
<div className="col-span-1">
  <h3 className="font-bold text-lg text-gray-800 mb-5 pb-2 border-b border-green-200">Quick Links</h3>
  <ul className="space-y-3">
    {[
      { name: "Home", path: "/home" },
      { name: "Store", path: "/store" },
      { name: "Cart", path: "/cart" },
      { name: "Practitioners", path: "/practitioners" },
      { name: "Suppliers", path: "/suppliers" }, // Use hyphens or camelCase, not spaces
    ].map(({ name, path }) => (
      <li key={name}>
        <Link
          to={path}
          className="text-gray-600 hover:text-green-600 transition-all duration-200 flex items-center group"
        >
          <ChevronRight className="h-4 w-4 mr-2 text-green-500 transform group-hover:translate-x-1 transition-transform" />
          <span className="group-hover:translate-x-1 transition-transform">{name}</span>
        </Link>
      </li>
    ))}
  </ul>
</div>

          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg text-gray-800 mb-5 pb-2 border-b border-green-200">Categories</h3>
            <ul className="space-y-3">
              {[
                {name: "Traditional Remedies", icon: <div className="h-6 w-6 mr-3 bg-green-100 rounded-md flex items-center justify-center text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 15V3h4"></path><path d="M5 15V3H1"></path><path d="M12 3v12"></path><path d="M16 21H8a1 1 0 0 1-1-1v-4h10v4a1 1 0 0 1-1 1Z"></path></svg></div>},
                {name: "Traditional Skincare", icon: <div className="h-6 w-6 mr-3 bg-green-100 rounded-md flex items-center justify-center text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17a5 5 0 0 0 5-5c0-1.7-1-3-2.2-4.8S12 2 12 2s-1.6 3.4-2.8 5.2S7 10.3 7 12a5 5 0 0 0 5 5Z"></path><path d="M12 17v3"></path></svg></div>},
                {name: "Healing Teas", icon: <div className="h-6 w-6 mr-3 bg-green-100 rounded-md flex items-center justify-center text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div>},
                {name: "Leaves, Seeds & Roots", icon: <div className="h-6 w-6 mr-3 bg-green-100 rounded-md flex items-center justify-center text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.8 4.8a8 8 0 0 0 0 11.4"></path><path d="m18 3-4.5 4.5"></path><path d="M18 21V8"></path><path d="M18 15 7 4"></path></svg></div>}
              ].map((category) => (
                <li key={category.name}>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-all duration-200 flex items-center group">
                    {category.icon}
                    <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg text-gray-800 mb-5 pb-2 border-b border-green-200">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start group hover:bg-green-50 p-2 rounded-lg transition-all duration-200">
                <MapPin className="text-green-600 mr-3 h-5 w-5 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-gray-600">123 Ayurveda Lane, Colombo, Sri Lanka</p>
              </div>
              <div className="flex items-center group hover:bg-green-50 p-2 rounded-lg transition-all duration-200">
                <Phone className="text-green-600 mr-3 h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-600">+94 769 781 845</p>
              </div>
              <div className="flex items-center group hover:bg-green-50 p-2 rounded-lg transition-all duration-200">
                <Mail className="text-green-600 mr-3 h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-600">info@ayurlanka.lk</p>
              </div>
              <div className="flex items-center group hover:bg-green-50 p-2 rounded-lg transition-all duration-200">
                <Clock className="text-green-600 mr-3 h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-600">Open: 9am - 6pm (Mon-Sat)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-12 shadow-sm transform hover:shadow-md transition-all duration-300 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute w-36 h-36 rounded-full bg-green-200 opacity-20 -top-16 -right-16"></div>
          <div className="absolute w-24 h-24 rounded-full bg-green-200 opacity-20 -bottom-10 -left-10"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
              <h3 className="font-bold text-xl text-gray-800 mb-3">Join Our Sri Lankan Traditional Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Subscribe to receive ancient wisdom, exclusive discounts, and Sri Lankan Traditional health tips directly to your inbox.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full py-3 px-5 border border-green-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-14 bg-white shadow-sm"
                />
                <button className="absolute right-1 top-1 bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md">
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            {icon: <Shield className="h-6 w-6" />, text: "100% Authentic Products", subtext: "Certified quality"},
            {icon: <Truck className="h-6 w-6" />, text: "Island-wide Delivery", subtext: "Fast & reliable"},
            {icon: <CreditCard className="h-6 w-6" />, text: "Secure Payment", subtext: "Multiple options"}
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center group hover:shadow-md hover:bg-green-50 transition-all duration-300">
              <div className="mr-4 p-3 bg-green-100 rounded-full text-green-600 group-hover:bg-green-200 transition-all duration-300">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{benefit.text}</h4>
                <p className="text-sm text-gray-500">{benefit.subtext}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-100 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-gray-500 text-sm">
            <p>© {currentYear} <span className="text-green-600 font-medium">AyurLanka</span>. All rights reserved.</p>
          </div>
          
        
          
          <div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-all duration-200 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-all duration-200 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-all duration-200 text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;