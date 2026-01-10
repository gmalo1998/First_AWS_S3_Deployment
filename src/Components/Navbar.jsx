import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = React.memo(() =>{
    const {count}=useSelector((state)=>state.counter);

  return (
    <nav className="navbar">
      <div className="logo">MyShop</div>

      <ul className="menu">
        <li>Home</li>
        <li>Products</li>
      </ul>

      <div className="cart">
        🛒
        <span className="cart-count">{count}</span>
      </div>
    </nav>
  );
});

export default Navbar;
