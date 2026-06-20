import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/product.css";

const categoryDetails = {
  electronics: {
    title: "Electronics",
    description:
      "Smart devices, audio gear, and tech essentials selected for everyday convenience.",
    aliases: ["electronics", "gadgets", "tech"],
  },
  fashion: {
    title: "Fashion",
    description:
      "Fresh apparel, style staples, and wearable picks for a sharper daily rotation.",
    aliases: ["fashion", "clothing", "apparel"],
  },
  home: {
    title: "Home",
    description:
      "Furniture, decor, and comfort-focused finds that make your space easier to love.",
    aliases: ["home", "furniture", "decor"],
  },
  accessories: {
    title: "Accessories",
    description:
      "Finishing touches, carry essentials, and compact upgrades for every outfit or setup.",
    aliases: ["accessories", "accessory"],
  },
};

const normalize = (value) => value?.trim().toLowerCase() || "";

const CategoryPage = ({ category }) => {
  const details = categoryDetails[category];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchTerm = normalize(search);

    return products.filter((product) => {
      const productCategory = normalize(product.category);
      const matchesCategory = details.aliases.includes(productCategory);
      const matchesSearch = normalize(product.name).includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [details.aliases, products, search]);

  return (
    <div className="shop-container category-page">
      <section className={`category-hero category-hero-${category}`}>
        <div>
          <span className="section-kicker">Shop by category</span>
          <h2>{details.title}</h2>
          <p>{details.description}</p>
        </div>
        <Link to="/shop" className="btn btn-secondary">
          All products
        </Link>
      </section>

      <div className="category-toolbar">
        <input
          type="text"
          placeholder={`Search ${details.title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {loading ? (
        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="product-card product-skeleton" key={item}>
              <div className="skeleton-image" />
              <div className="skeleton-content">
                <span />
                <strong />
                <em />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <h3>No {details.title.toLowerCase()} products found</h3>
          <p>Try a different search or browse the full CBNK collection.</p>
          <Link to="/shop" className="btn">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
