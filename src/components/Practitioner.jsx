import React from "react";

const Practitioner = ({ docaImg, name, specialities, tel }) => {
  const handleCall = () => {
    window.location.href = `tel:${tel}`;
  };
  return (
    <div className="flex flex-row justify-between items-center w-[60vw] rounded-lg p-2 mt-2">
      <div className="flex flex-row justify-center gap-2 my-2">
        <div className="items-center justify-center">
          <img src={docaImg} alt="Doctor image" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-md font-semibold text-black">Dr. {name}</p>
          <p className="text-[#4F9469] text-sm">Contact: {tel}</p>
          <p className="text-[#4F9469] text-sm">Specialities: {specialities}</p>
        </div>
      </div>
      <button onClick={handleCall} className="items-center text-center bg-[#E8F2ED] py-1 px-8 rounded-2xl text-sm hover:cursor-pointer font-semibold text-[#0D1C12]">
        Contact
      </button>
    </div>
  );
};

export default Practitioner;
