import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="brand">JunkJournalKit</Link>
        <div className="nav-links">
          <Link to="/store">Shop</Link>
          <Link to="/cart">Cart ({count})</Link>
        </div>
      </div>
    </nav>
  );
}
