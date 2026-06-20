import React from "react";
import { Link } from "react-router-dom";
import "../styles/banner.css";

const benefits = [
  { value: "24h", label: "Fast dispatch" },
  { value: "4.8", label: "Customer rating" },
  { value: "7d", label: "Easy returns" },
];

const Banner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-eyebrow">Curated deals, delivered fast</span>
        <h1>Upgrade your everyday shopping with CBNK.</h1>
        <p>
          Discover quality products, sharp prices, and a smoother checkout
          experience built for modern shoppers.
        </p>

        <div className="hero-actions">
          <Link to="/shop" className="btn">
            Shop collection
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn more
          </Link>
        </div>

        <div className="hero-stats" aria-label="ShopNest highlights">
          {benefits.map((benefit) => (
            <div className="hero-stat" key={benefit.label}>
              <strong>{benefit.value}</strong>
              <span>{benefit.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-showcase" aria-hidden="true">
        <div className="showcase-card showcase-main">
          <img src="/ShopNestLogo.png" alt="" />
          <span>Premium picks</span>
          <strong>New season essentials</strong>
        </div>
        <div className="showcase-card showcase-side">
          <span>Secure checkout</span>
          <strong>Trusted payments</strong>
        </div>
        <div className="showcase-card showcase-side">
          <span>Fresh arrivals</span>
          <strong>Updated weekly</strong>
        </div>
      </div>
    </section>
  );
};

export default Banner;
