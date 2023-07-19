import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/auth">Login / Register </Link>
      <Link to="/create">Create Recipes</Link>
      <Link to="/saved">Saved Recipes</Link>
    </div>
  )
}

export default Navbar