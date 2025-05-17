import { useState, useEffect } from "react";
import Home from "./screens/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import Navbar from "./components/NavBar";
import Store from "./screens/Store";
import Cart from "./screens/Cart";
import Practitioners from "./screens/Practitioners";
import Suppliers from "./screens/Suppliers";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <>
      {user && <Navbar setUser={setUser} />}

      <Routes>
        <Route
          path="/"
          element={
            !user ? <AuthScreen setUser={setUser} /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practitioners"
          element={
            <ProtectedRoute>
              <Practitioners />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
