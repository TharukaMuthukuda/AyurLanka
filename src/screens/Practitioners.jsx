import React, { useState, useEffect } from "react";
import Practitioner from "../components/Practitioner";
import ChatScreen from "./ChatScreen";

const Practitioners = () => {
  const [practitioners, setPractitioners] = useState([]);
  const doccuArray = ["/dr/d1.png", "/dr/d2.png", "/dr/d3.png"];
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
    fetchPractitioners();
  }, []);
  return (
    <>
      <ChatScreen />
      <div className="flex flex-col items-center justify-center my-10 w-[100vw]">
        <p className="text-lg font-bold text-black mt-10 mb-3">
          Certified Practitioners
        </p>
        <div className="flex flex-col items-center justify-center">
          {practitioners &&
            practitioners.map((practitioner, i) => (
              <Practitioner
                key={i}
                docaImg={doccuArray[i % doccuArray.length]}
                name={practitioner.name}
                specialities={practitioner.specialities}
                tel={practitioner.contact}
              />
            ))}
        </div>

        <div className="mt-10 border-t border-gray-200 text-center py-4 text-sm font-semibold text-gray-400 w-[100vw]">
          All rights reserved by AyurLanka
        </div>
      </div>
    </>
  );
};

export default Practitioners;
