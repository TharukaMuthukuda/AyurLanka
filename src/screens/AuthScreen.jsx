import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthScreen = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const accessToken = user.accessToken;
      
      console.log("✅ Logged in as:", user.displayName);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      
      setUser(user);
      
      // Animate transition to home page
      setTimeout(() => navigate("/home"), 800);
    } catch (err) {
      console.error("Login failed:", err.message);
      setIsLoading(false);
    }
  };
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="flex h-screen w-screen font-[Poppins] bg-[#f7fdf9]">
      {/* Left - Image with enhanced overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.2 }}
        className="w-1/2 h-full relative overflow-hidden"
      >
        <img
          src="/authBg.png"
          alt="Sri Lankan Ayurvedic herbs and treatments"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00000040] via-[#04512030] to-[#f7fdf9]"></div>
        
        {/* Cultural elements overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.7, duration: 1.3 }}
          className="absolute bottom-10 left-10 text-white"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-1 bg-[#F9E076]"></div>
            <p className="text-sm italic font-light">හෙළ ඔසු - The science of Ancient Sri Lankans</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Right - Enhanced Login Section */}
      <div className="w-1/2 h-full flex flex-col justify-between px-12 py-16 bg-[#f7fdf9]">
        {/* Branding with improved animations */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3D8361] to-[#68B984] flex items-center justify-center">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#3D8361] to-[#68B984] bg-clip-text text-transparent">
              AyurLanka
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-12"
          >
            <h1 className="text-5xl font-extrabold text-[#2C3A4B] leading-tight tracking-tight">
              Embrace Sri Lankan<br />
              <span className="text-[#3D8361]">Traditional Medicine.</span>
            </h1>
            
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-6 text-lg text-[#476B5F] font-medium"
            >
              Discover healing wisdom from the pearl of the Indian Ocean 
              <span className="ml-2">🌿</span>
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-6 flex items-center space-x-3"
          >
            <div className="w-10 h-0.5 bg-[#3D8361]"></div>
            <p className="text-sm text-[#476B5F]">Connect to your wellness journey</p>
          </motion.div>
        </div>
        
        {/* Login Button with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#E9C46A80] to-transparent"></div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="relative w-full py-4 rounded-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3D8361] to-[#68B984] transition-all duration-300 group-hover:scale-105"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('/pattern.png')] bg-repeat"></div>
            
            <div className="relative flex items-center justify-center">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="mr-3"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                  </motion.div>
                  <span className="text-white font-medium text-lg">Sign In with Google</span>
                </>
              )}
            </div>
          </button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.7, duration: 1 }}
            className="text-center text-sm text-[#476B5F] mt-4"
          >
            Experience the wisdom of centuries in modern wellness
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;