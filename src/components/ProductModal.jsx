import React, { useState } from "react";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white flex rounded-2xl shadow-2xl p-6 w-[90vw] max-w-4xl">
        {/* Left: Product Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={product.imgPath}
            alt={product.name}
            className="w-[250px] h-[250px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right: Details */}
        <div className="w-1/2 px-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0D1C12]">
              {product.name}
            </h2>
            <p className="text-[#4F9469] text-lg font-semibold mt-2">
              Rs. {product.price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-16 px-2 py-1 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#4F9469]"
              />
            </div>
            <p className="text-sm text-gray-600 mt-6">{product.description}</p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-white rounded-lg hover:cursor-pointer transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const item = { ...product, quantity: parseInt(quantity) };
                localStorage.setItem("cart", JSON.stringify([...cart, item]));
                console.log("🛒 Saved to Cart:", item);
                onClose();
              }}
              className="px-6 py-2 bg-[#4F9469] text-white rounded-lg hover:bg-[#3d7655] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
