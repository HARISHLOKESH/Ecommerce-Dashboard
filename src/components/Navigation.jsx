import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', label: ' Home' },
    { path: '/products', label: ' Products' },
    { path: '/cart', label: '🛒 Cart' },
    { path: '/checkout', label: ' Checkout' }
  ];

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;