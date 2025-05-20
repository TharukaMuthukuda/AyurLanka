import React, { useEffect, useState } from "react";
import CheckoutModal from "../components/CheckoutModal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-green-900">🛍 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Cart's empty. Go stack some traditional goods 🛒
        </p>
      ) : (
        <>
          <ul className="space-y-4 mb-10 flex-1">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex p-4 items-center gap-4"
              >
                <img
                  src={item.imgPath}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-green-200"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-green-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#4F9469] font-semibold">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-red-500 text-sm hover:underline hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Smooth and spaced-out checkout bar */}
          <div className="w-full bg-[#4F9469] text-white flex justify-between items-center gap-10 px-12 py-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <span className="text-xl font-bold tracking-wide whitespace-nowrap">
              Total: Rs. {totalAmount.toLocaleString()}
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-[#4F9469] px-10 py-3 rounded-xl text-base font-semibold hover:bg-green-100 transition-all duration-300 hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showModal && (
        <CheckoutModal
          cartItems={cartItems}
          totalAmount={totalAmount}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Cart;
