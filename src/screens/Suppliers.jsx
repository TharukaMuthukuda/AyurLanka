import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import tenderAnimation from "../../src/assets/ayurlanka-suppliers.json";
import ChatScreen from "./ChatScreen";

const Suppliers = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    body: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/submit-supplier", {
        name: formData.name,
        telephone: formData.telephone,
        inquiry: formData.body,
      });
      alert("Tender submitted successfully! 💼🌿");
      setFormData({ name: "", telephone: "", body: "" });
    } catch (err) {
      console.error("Error submitting tender:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
    <div className="w-screen h-screen items-center flex flex-col mt-10">
      <div className="w-[30vw] h-[10vh]">
        <Lottie animationData={tenderAnimation} loop={true} />
      </div>
      <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-[#0D1C12] mb-4 text-center">
          Become a Supplier for AyurLanka
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We're currently accepting tenders for high-quality Sri Lankan Traditional Medicinal products
          and raw materials. Fill out the form below and we'll be in touch with
          you.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inquiry/Type of Products
            </label>
            <input
              type="text"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="e.g. Herbal Oils, Dried Herbs"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#52540A] text-white py-2 rounded hover:bg-[#3b7655]"
          >
            Submit Tender
          </button>
        </form>
      </div>
    </div>
    <ChatScreen />
    </>
  );
};

export default Suppliers;
