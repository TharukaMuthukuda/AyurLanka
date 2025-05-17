import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthScreen = ({ setUser }) => {
  // const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const accessToken = user.accessToken;

      console.log("✅ Logged in as:", user.displayName);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);

      setUser(user);
      setTimeout(() => navigate("/home"), 100);
    } catch (err) {
      console.error("Login failed homie:", err.message);
    }
  };
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="w-1/2 h-screen">
        <img
          src="/authBg.png"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-1/2 h-screen bg-white flex flex-col items-start pl-5">
        <div className="flex flex-col text-left font-[Epilogue] mt-20">
          <p className="text-lg font-extrabold text-black">AyurLanka</p>
          <p className="text-6xl font-extrabold tracking-[-2px] leading-[65px] text-[#2C3A4B]">
            Embrace ayurveda,
          </p>
          <p className="text-6xl font-extrabold tracking-[-2px] leading-[65px] text-[#2C3A4B]">
            embrace life.
          </p>
        </div>
        <div className="flex flex-col items-start justify-end mb-[50px] h-full">
          {/* <button
            onClick={handleGoogleLogin}
            className="bg-[#52540A] text-white py-2 w-[30em] font-[Epilogue] rounded "
          >
            Register
          </button> */}
          <button
            onClick={handleGoogleLogin}
            className="bg-[#52540A] text-white py-2 w-[30em] font-[Epilogue] rounded mt-4 hover:cursor-pointer"
          >
            Sign In with Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
