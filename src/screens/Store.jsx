import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Product from "../components/Product";
import ProductModal from "../components/ProductModal"; // 🧠 import modal component
import ChatScreen from "./ChatScreen";

const imageArray = [
  "/products/p1.png",
  "/products/p2.png",
  "/products/p3.png",
  "/products/p4.png",
  "/products/p5.png",
];

const categoryNames = {
  1: "Traditional Remedies",
  2: "Traditional Skincare",
  3: "Healing Teas",
  4: "Leaves, Seeds & Roots",
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // 🧠 modal state

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/products");
      const data = await res.json();
      console.log("💥 Products:", data);
      setProducts(data);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <>
      <ChatScreen />
      <div className="flex flex-row items-center justify-center w-screen">
        <div className="fixed top-30 left-5 flex flex-col items-start">
          <div className="flex flex-row items-center justify-start mb-4">
            <img
              src="/menu.png"
              alt="categories"
              className="w-[24px] h-[24px]"
            />
            <p className="text-sm pt-0.5">Categories</p>
          </div>
          {Object.entries(categoryNames).map(([catNum, catName]) => (
            <button
              key={catNum}
              className="text-md pb-2 hover:cursor-pointer"
              onClick={() => setSelectedCategory(Number(catNum))}
            >
              {catName}
            </button>
          ))}
          <button
            className="text-md pt-2 hover:cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            Show All
          </button>
        </div>

        <div className="w-[80vw] justify-center items-center flex flex-col">
          <Post
            imgSrc={"/storeCard.png"}
            heading={"Fit your every ayurvedic need"}
            subText={"Explore our curated categories to find products faster."}
          />
          <p className="text-lg font-bold text-black transform translate-y-[-20px]">
            {selectedCategory
              ? categoryNames[selectedCategory]
              : "All Products"}
          </p>
          <div className="flex flex-row w-[70vw] gap-5 flex-wrap">
            {filteredProducts.map((product, i) => (
              <div
                key={i}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <Product
                  imgSrc={product.imgPath}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-gray-200 text-center py-4 text-sm font-semibold text-gray-400 w-[100vw]">
            All rights reserved by AyurLanka
          </div>
        </div>

        {/* 💥 Modal section */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </>
  );
};

export default Store;
