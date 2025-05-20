import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Product from "../components/Product";
import Practitioner from "../components/Practitioner";
import { useNavigate } from "react-router-dom";
import ChatScreen from "./ChatScreen";
//arr
const imageArray = [
  "/products/p1.png",
  "/products/p4.png",
  "/products/p2.png",
  "/products/p3.png",
  "/products/p5.png",
];
const doccuArray = ["/dr/d1.png", "/dr/d2.png", "/dr/d3.png"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const navigate = useNavigate();

  const handleViewAllPractitioners = () => {
    console.log("Navigating to practitioners");
    navigate("/practitioners");
  };
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

  const fetchPractitioners = async () => {
    try {
      const res = await fetch("http://localhost:8000/practitioners");
      const data = await res.json();
      console.log("💥 doccu:", data);
      setPractitioners(data);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchPractitioners();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#F7FAFA] w-screen">
        <div className="transform translate-y-10">
          <Post
            imgSrc={"/homeCard.jpg"}
            heading={"Discover The Ancient Wisdom of Sri Lankan Wellness"}
            subText={
              "Explore Our Curated Selection of Traditional Herbal Remedies and Wellness Products, Crafted with Centuries-Old Knowledge."
            }
          />
        </div>
        {/* <ChatScreen /> */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-black transform translate-y-[-20px]">
            Featured Products
          </p>
          <div className="flex flex-row items-center justify-center gap-5">
            {products &&
              products.slice(0,4).map((product, i) => (
                <div onClick={() => navigate("/store")}>
                  <Product
                    key={i}
                    imgSrc={imageArray[i % imageArray.length]}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              ))}
          </div>
        </div>
        <p className="text-lg font-bold text-black mt-10 mb-3">
          Step-by-step guide to purchase
        </p>
        <div className="flex flex-col items-start justify-center max-w-[1/2] ">
          <div className="flex flex-row justify-center gap-2 my-2">
            <div className="items-center justify-center">
              <img src="/steps/s1.png" alt="step01" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold text-black">
                Discover Products
              </p>
              <p className="text-[#4F9469] text-sm">
                Browse through our range of products, each with detailed
                descriptions and benefits.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 my-2">
            <div className="items-center justify-center">
              <img src="/steps/s2.png" alt="step01" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold text-black">Select and Add</p>
              <p className="text-[#4F9469] text-sm">
                Select your desired quantity for each product, and add them to
                your cart.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 my-2">
            <div className="items-center justify-center">
              <img src="/steps/s1.png" alt="step01" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold text-black">
                Review Your Cart
              </p>
              <p className="text-[#4F9469] text-sm">
                Review your cart, ensuring all items and quantities are correct
                before proceeding.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 my-2">
            <div className="items-center justify-center">
              <img src="/steps/s1.png" alt="step01" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold text-black">
                Complete Your Purchase
              </p>
              <p className="text-[#4F9469] text-sm">
                Enter your shipping details and preferred payment method to
                complete the purchase.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 my-2">
            <div className="items-center justify-center">
              <img src="/steps/s1.png" alt="step01" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold text-black">
                Receive Your Order
              </p>
              <p className="text-[#4F9469] text-sm">
                Receive your products conveniently delivered to your doorstep.
                Track your order with our dedicated tracking service.
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg font-bold text-black mt-10 mb-3">
          Certified Practitioners
        </p>
        <div className="flex flex-col items-center justify-center">
          {practitioners &&
            practitioners
              .slice(0, 3)
              .map((practitioner, i) => (
                <Practitioner
                  key={i}
                  docaImg={doccuArray[i % doccuArray.length]}
                  name={practitioner.name}
                  specialities={practitioner.specialities}
                  tel={practitioner.contact}
                />
              ))}
          <button
            onClick={handleViewAllPractitioners}
            className="border text-[#0D1C12] py-1 w-[10em] text-sm font-[Epilogue] rounded hover:cursor-pointer mt-5"
          >
            View All
          </button>
        </div>
        
      </div>
      <ChatScreen />
    </>
  );
};

export default Home;
