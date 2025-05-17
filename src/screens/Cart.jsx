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
    <div className="p-6 max-w-4xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-6">🛍 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">
          Cart's empty. Go stack some traditional goods 🛒
        </p>
      ) : (
        <>
          <ul className="space-y-4 mb-36">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="bg-white rounded-lg shadow flex p-4 items-center gap-4"
              >
                <img
                  src={item.imgPath}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#4F9469] font-semibold">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-red-500 text-sm hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="fixed bottom-5 left-10 right-10 bg-[#52540A] text-white flex rounded-2xl justify-between items-center px-20 py-3 shadow-[0_-2px_20px_rgba(0,0,0,0.1)] z-50 backdrop-blur-lg">
            <span className="text-lg font-bold tracking-wide">
              Total: Rs. {totalAmount.toLocaleString()}
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-[#52540A] px-6 py-2 rounded-xl text-sm hover:cursor-pointer transition-all font-medium tracking-wide"
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
