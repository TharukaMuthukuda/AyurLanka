import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Product from "../components/Product";
import ProductModal from "../components/ProductModal";
import ChatScreen from "./ChatScreen";

const categoryNames = {
  1: "Traditional Remedies",
  2: "Traditional Skincare",
  3: "Healing Potions",
  4: "Raw Products",
};

// Category icons mapping
const categoryIcons = {
  1: "medication",
  2: "spa",
  3: "local_cafe",
  4: "eco",
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Add document head link for material icons
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/products");
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle ESC key press to close sidebar
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [showSidebar]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showSidebar && window.innerWidth < 768) {
        const sidebar = document.getElementById('category-sidebar');
        const menuButton = document.getElementById('menu-toggle-button');
        
        if (sidebar && !sidebar.contains(e.target) && menuButton && !menuButton.contains(e.target)) {
          setShowSidebar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showSidebar]);

  // Filter products based on category and search query (name only)
  const filteredProducts = products
    .filter(p => selectedCategory ? p.category === selectedCategory : true)
    .filter(p => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(query);
    });

  // Handle category selection and mobile sidebar close
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ChatScreen />
      
      <main className="flex flex-col md:flex-row flex-grow relative">
        {/* Mobile Menu Toggle Button */}
        <button
          id="menu-toggle-button"
          onClick={toggleSidebar}
          className="md:hidden fixed z-30 top-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle category menu"
        >
          <span className="material-icons">
            {showSidebar ? "close" : "menu"}
          </span>
        </button>
        
        {/* Overlay for mobile */}
        {showSidebar && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setShowSidebar(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Sidebar Categories - Now with sticky positioning */}
        <aside 
          id="category-sidebar"
          className={`
            fixed md:sticky top-0 md:top-4 z-25 h-screen md:h-[calc(100vh-2rem)]
            bg-white shadow-xl md:shadow-md
            transition-all duration-300 ease-in-out
            overflow-y-auto md:overflow-auto
            ${showSidebar ? 'left-0' : '-left-80 md:left-0'} 
            w-72 md:w-72 md:block
            md:border-r border-gray-100
            rounded-lg md:self-start
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <span className="material-icons text-white">dashboard</span>
                </div>
                <h2 className="font-semibold text-xl text-gray-800">Categories</h2>
              </div>
              
              {/* Close button - Mobile only */}
              <button 
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Close menu"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            {/* Category Navigation */}
            <nav className="space-y-3">
              <button
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedCategory === null
                    ? "bg-green-500 text-white shadow-md hover:bg-green-600" 
                    : "bg-white hover:bg-gray-100 shadow-sm border border-gray-100"
                }`}
                onClick={() => handleCategorySelect(null)}
              >
                <div className="flex items-center">
                  <span className="material-icons mr-3 text-xl">
                    {selectedCategory === null ? "check_circle" : "apps"}
                  </span>
                  <span className="font-medium">All Products</span>
                </div>
              </button>
              
              {Object.entries(categoryNames).map(([catNum, catName]) => (
                <button
                  key={catNum}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedCategory === Number(catNum) 
                      ? "bg-green-500 text-white shadow-md hover:bg-green-600" 
                      : "bg-white hover:bg-gray-100 shadow-sm border border-gray-100"
                  }`}
                  onClick={() => handleCategorySelect(Number(catNum))}
                >
                  <div className="flex items-center">
                    <span className="material-icons mr-3 text-xl">
                      {selectedCategory === Number(catNum) ? "check_circle" : categoryIcons[catNum]}
                    </span>
                    <span className="font-medium">{catName}</span>
                  </div>
                </button>
              ))}
            </nav>
            
            {/* Help Section */}
            <div className="mt-12 p-4 bg-green-100 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">Need Help?</h3>
              <p className="text-sm text-green-700 mb-3">Contact our ayurvedic specialists for personalized recommendations.</p>
              <button className="w-full py-2 px-4 bg-white text-green-700 rounded-lg shadow-sm font-medium hover:bg-green-50 transition">
                Contact Us
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto flex flex-col">
            {/* Hero Banner */}
            <Post
              imgSrc={"/storeCard.png"}
              heading={"Fit your every ayurvedic need"}
              subText={"Explore our curated categories to find products faster."}
            />
            
            {/* Search Bar and Mobile Categories - Now in its own section */}
            <div className="sticky top-0 z-10 bg-white py-4 shadow-sm rounded-lg my-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-green-500">search</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 px-4 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <span className="material-icons">close</span>
                    </button>
                  )}
                </div>
                
                {/* Categories Dropdown - Mobile */}
                <div className="relative md:hidden">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center justify-between w-full px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-green-200 transition"
                  >
                    <div className="flex items-center">
                      <span className="material-icons mr-2 text-green-500">
                        category
                      </span>
                      <span>{selectedCategory ? categoryNames[selectedCategory] : "All Categories"}</span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-green-500 transition-transform ${showCategoryDropdown ? "transform rotate-180" : ""}`} 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {showCategoryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                      <button
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                          selectedCategory === null ? "bg-green-50 text-green-700" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(null);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        <span className="material-icons mr-3 text-green-500">
                          apps
                        </span>
                        All Categories
                      </button>
                      
                      {Object.entries(categoryNames).map(([catNum, catName]) => (
                        <button
                          key={catNum}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                            selectedCategory === Number(catNum) ? "bg-green-50 text-green-700" : ""
                          }`}
                          onClick={() => {
                            setSelectedCategory(Number(catNum));
                            setShowCategoryDropdown(false);
                          }}
                        >
                          <span className="material-icons mr-3 text-green-500">
                            {categoryIcons[catNum]}
                          </span>
                          {catName}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Category Title with Result Count */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold flex items-center">
                <span className="material-icons text-green-500 mr-2">
                  {selectedCategory ? categoryIcons[selectedCategory] || "category" : "apps"}
                </span>
                {selectedCategory
                  ? categoryNames[selectedCategory]
                  : "All Products"}
              </h1>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </div>
            </div>
            
            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center h-64 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="material-icons text-red-500 text-4xl mb-2">error_outline</span>
                  <p>{error}</p>
                  <button 
                    onClick={fetchProducts} 
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
                  >
                    <span className="material-icons mr-1">refresh</span>
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center h-64 flex items-center justify-center flex-col gap-4">
                <span className="material-icons text-gray-300 text-6xl">search_off</span>
                <p className="text-gray-500">No products found{searchQuery ? " matching \"" + searchQuery + "\"" : ""}</p>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
                  >
                    <span className="material-icons mr-1">refresh</span>
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer transition transform hover:scale-105 hover:shadow-lg"
                  >
                    <Product
                      imgSrc={product.imgPath}
                      name={product.name}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 text-center py-4 text-sm font-semibold text-gray-400 w-full mt-auto bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          
          
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Store;