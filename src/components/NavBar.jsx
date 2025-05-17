import { Link, useNavigate } from "react-router-dom";

const Navbar = ({setUser}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    console.log("User signed out, storage wiped clean");
    setUser(null); 
    navigate('/');
  };

  return (
    <nav className="bg-feelBlue text-black bg-[#F7FAFA] w-screen px-10 py-3 flex justify-between items-center border-b-1 border-[#c9c9c9]">
      <Link to="/home">
        <p className="text-lg font-bold text-green-900">AyurLanka</p>
      </Link>
      <ul className="flex space-x-10 pr-20">
        <li>
          <Link to="/suppliers">
            <button className="bg-[#52540A] text-white py-1 w-[10em] text-sm font-[Epilogue] rounded hover:cursor-pointer">
              Suppliers
            </button>
          </Link>
        </li>
        <li className="pt-0.5">
          <Link to="/home" className="hover:text-gangstaGold text-sm">
            Home
          </Link>
        </li>
        <li className="pt-0.5">
          <Link to="/store" className="hover:text-gangstaGold text-sm">
            Store
          </Link>
        </li>
        <li className="pt-0.5">
          <Link to="/cart" className="hover:text-gangstaGold text-sm">
            Cart
          </Link>
        </li>
        <li className="pt-0.5">
          <Link to="/practitioners" className="hover:text-gangstaGold text-sm">
            Practitioners
          </Link>
        </li>
        <li className="items-center justify-center w-5 h-5">
          <button
            onClick={handleSignOut}
            className="items-center justify-center hover:cursor-pointer pt-0.5"
          >
            <img src="/signOut.png" alt="Sign Out" className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
