import { Button } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userId");
    navigate("/auth");
  }

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create Recipes</Link>
      <Link to="/saved">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login / Register </Link>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}
    </div>
  );
};

export default Navbar;
