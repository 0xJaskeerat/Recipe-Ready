import { Button } from "antd";
import React from "react";
import styled from 'styled-components'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  &.ant-btn {
    border-radius: 50px;

    @media (max-width: 480px) {
      width: 80px;
      height: 30px;
    }
  
    @media (min-width: 481px) and (max-width: 768px) {
      width: 100px;
      height: 36px;
    }
  
    width: 130px;
    height: 40px;
    background-color: #090580;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      color: #090580 !important;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #090580;
  text-decoration: none;

  @media (max-width: 480px) {
    font-size: 15px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 20px;
  }

  font-size: 25px;
  margin: 0 20px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/create">Create Recipes</StyledLink>
      {!cookies.access_token ? (
        <StyledLink to="/auth">Login / Register </StyledLink>
      ) : (
        <>
          <StyledLink to="/saved">Saved Recipes</StyledLink>
          <StyledButton onClick={logout}>Logout</StyledButton>
        </>
      )}

    </div>
  );
};

export default Navbar;
