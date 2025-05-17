import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { v4 as uuidv4 } from "uuid";

const CheckoutModal = ({ cartItems, totalAmount, onClose }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    telephone_1: "",
    telephone_2: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { customer_name, telephone_1, address } = formData;
    if (!customer_name || !telephone_1 || !address) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

const generatePDF = (orderId) => {
  const doc = new jsPDF();

  const currentDate = new Date().toLocaleDateString();

  doc.setFontSize(18);
  doc.setTextColor("#2E7D32");
  doc.text("AyurLanka", 14, 15);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Order Receipt", 14, 25);

  doc.setFontSize(12);
  doc.text(`Order No: ${orderId}`, 14, 35);
  doc.text(`Order Date: ${currentDate}`, 14, 41);  // Added this line
  doc.text(`Customer: ${formData.customer_name}`, 14, 47);
  doc.text(`Tel 1: ${formData.telephone_1}`, 14, 53);
  doc.text(`Tel 2: ${formData.telephone_2 || "-"}`, 14, 59);
  doc.text(`Address: ${formData.address}`, 14, 65);

  doc.setTextColor("#52540A");
  doc.setFontSize(13);
  doc.text("Dispatch within 24 hours guaranteed!", 14, 73);

  const tableColumn = ["Item", "Qty", "Price", "Total"];
  const tableRows = [];

  cartItems.forEach((item) => {
    const row = [
      item.name,
      item.quantity.toString(),
      `Rs. ${item.price.toLocaleString()}`,
      `Rs. ${(item.price * item.quantity).toLocaleString()}`,
    ];
    tableRows.push(row);
  });

  autoTable(doc, {
    startY: 80,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Delivery Fee: Rs. 400`, 14, finalY);
  doc.text(
    `Grand Total: Rs. ${(totalAmount + 400).toLocaleString()}`,
    14,
    finalY + 6
  );

  doc.setTextColor("#52540A");
  doc.text(
    "Cash-on-Delivery: Pay only when you get the product.",
    14,
    finalY + 16
  );

  doc.save(`order_${orderId}.pdf`);
};


  const handleSubmit = async () => {
    if (!validateForm()) return;

    const deliveryFee = 400;
    const grandTotal = totalAmount + deliveryFee;
    const generatedOrderId = uuidv4();

    const payload = {
      order_id: generatedOrderId,
      ...formData,
      order_summary: cartItems.map((item) => ({
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        total: Number(item.price) * Number(item.quantity) + Number(deliveryFee),
        imgPath: item.imgPath || "",
      })),
      delivery_fee: deliveryFee,
      grand_total: grandTotal,
    };

    try {
      const res = await axios.post("http://localhost:8000/add-order", payload);
      console.log("📦 Backend Response:", res.data);

      const orderId = res.data?.order_id || generatedOrderId;

      try {
        generatePDF(orderId);
      } catch (pdfError) {
        console.error("🧨 PDF Generation Failed:", pdfError);
      }

      alert("✅ Order placed!! We'll get back to you shortly 🧾");
      onClose();
    } catch (error) {
      console.error("🚫 Order Submit Failed:", error);
      alert("💀 Order failed, try again later homie!");
    }
  };

  const deliveryFee = 400;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-4xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-[#4F9469]">
          🧾 Billing Details
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            name="customer_name"
            placeholder="Full Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="telephone_1"
            placeholder="Telephone 1"
            onChange={handleChange}
            className="input"
          />
          <input
            name="telephone_2"
            placeholder="Telephone 2"
            onChange={handleChange}
            className="input"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="input col-span-2"
          />
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold mb-2">🛍 Order Summary</h3>
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee.toLocaleString()}</span>
          </div>
          <div className="text-right font-bold text-lg text-[#B29150] mt-2">
            Total: Rs. {grandTotal.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1 italic">
            🚚 All orders are dispatched within 24 hours
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#B29150] text-white px-6 py-2 rounded-xl hover:bg-[#967634] hover:cursor-pointer"
          >
            🛒 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
