import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="w-full px-8 py-4 bg-[#f5fff9] shadow-lg border-b border-green-200 flex justify-between items-center font-['Epilogue']">
      
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
        <Leaf className="text-green-700 h-6 w-6 animate-pulse" />
        <span className="text-2xl font-bold text-green-900 tracking-wide">
          AyurLanka
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8 items-center text-green-900 text-[15px] font-medium">
        {[
          { name: "Home", to: "/home" },
          { name: "Store", to: "/store" },
          { name: "Cart", to: "/cart" },
          { name: "Practitioners", to: "/practitioners" },
        ].map(({ name, to }) => (
          <li key={name} className="relative group">
            <Link
              to={to}
              className="hover:text-[#43766C] transition-colors duration-300"
            >
              {name}
            </Link>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#4C956C] group-hover:w-full transition-all duration-300 rounded-full"></span>
          </li>
        ))}

        {/* Suppliers Button */}
        <li>
          <Link to="/suppliers">
            <button className="bg-[#43766C] text-white px-5 py-1.5 rounded-full text-sm shadow hover:bg-[#345e53] transition duration-300">
              Suppliers
            </button>
          </Link>
        </li>

        {/* Sign Out */}
        <li>
          <button
            onClick={handleSignOut}
            className="hover:opacity-80 transition duration-300"
            title="Sign Out"
          >
            <img src="/signOut.png" alt="Sign Out" className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
