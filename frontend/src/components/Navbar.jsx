import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const categories = [
    { label: "Electronics", path: "/electronics" },
    { label: "Fashion", path: "/fashion" },
    { label: "Home", path: "/home-category" },
    { label: "Accessories", path: "/accessories" },
  ];

  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );
  const isCategoryActive = categories.some(
    (category) => category.path === location.pathname,
  );

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img src="/ShopNestLogo.png" alt="CBNK" className="navbar-logo" />
          <span>CBNK</span>
        </Link>
      </div>

      <button
        className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-menu ${menuOpen ? "is-open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" onClick={closeMenu} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={closeMenu}>
              Shop
            </NavLink>
          </li>
          <li className="navbar-category">
            <button
              className={`category-trigger ${
                isCategoryActive ? "is-active" : ""
              } ${categoryOpen ? "open" : ""}`}
              type="button"
              aria-haspopup="true"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              Categories
              <span className="chevron" />
            </button>

            <div className={`category-menu ${categoryOpen ? "show" : ""}`}>
              {categories.map((category) => (
                <NavLink
                  key={category.path}
                  to={category.path}
                  onClick={closeMenu}
                >
                  {category.label}
                </NavLink>
              ))}
            </div>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          {user?.role === "admin" && (
            <li>
              <NavLink to="/admin" onClick={closeMenu}>
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          <NavLink
            to="/cart"
            className="navbar-cart"
            aria-label={`Cart with ${totalCartItems} item${
              totalCartItems === 1 ? "" : "s"
            }`}
            onClick={closeMenu}
          >
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
            <span className="cart-label">Cart</span>
            {totalCartItems > 0 && (
              <span className="cart-count">{totalCartItems}</span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/profile"
                className="navbar-user"
                onClick={closeMenu}
              >
                <span className="user-avatar" aria-hidden="true">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="user-meta">
                  <span className="user-label">Account</span>
                  <span className="user-name">{user.name}</span>
                </span>
              </NavLink>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-login" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <button
          className="navbar-scrim"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
