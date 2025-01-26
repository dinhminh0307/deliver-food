import React, { useState, useEffect } from "react";
import ProductItem from "../../components/forms/ProductItem";

const Home = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px",
    },
    section: {
      marginBottom: "40px",
    },
    categoryContainer: {
      display: "flex",
      overflowX: "auto",
      gap: "20px",
      padding: "10px 0",
      whiteSpace: "nowrap",
      scrollbarWidth: "none",
    },
    categoryCard: {
      display: "inline-block",
      flexShrink: 0,
      textAlign: "center",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      cursor: "pointer",
      minWidth: "150px",
    },
    categorySelected: {
      backgroundColor: "#f44",
      color: "#fff",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
    },
    exploreHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#f44",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  // Categories
  const categories = [
    { id: "foods", name: "Foods" },
    { id: "games", name: "Games" },
    { id: "movies", name: "Movies" },
  ];

  // State management
  const [selectedCategory, setSelectedCategory] = useState("foods");
  const [products, setProducts] = useState([]);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/product/get?page=0&size=10&type=${selectedCategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.content)
          setProducts(data.content);
        } else {
          const errorText = await response.text();
          alert("Failed to fetch products: " + errorText);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={styles.container}>
      {/* Browse By Category */}
      <div style={styles.section}>
        <h2>Browse By Category</h2>
        <div style={styles.categoryContainer}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                ...styles.categoryCard,
                ...(selectedCategory === category.id ? styles.categorySelected : {}),
              }}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={styles.section}>
        <div style={styles.exploreHeader}>
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products</h2>
        </div>
        <div style={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))
          ) : (
            <p>No products available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
