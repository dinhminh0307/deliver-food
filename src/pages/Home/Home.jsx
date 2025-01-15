import React, { useState } from "react";
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
      scrollbarWidth: "none", // Hide scrollbar for Firefox
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
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
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
    { id: "activities", name: "Activities" },
  ];

  // Sample Product Data
  const products = [
    { id: 1, category: "foods", image: "https://via.placeholder.com/150", description: "Smartphone XYZ", price: 699 },
    { id: 2, category: "games", image: "https://via.placeholder.com/150", description: "Gaming Laptop", price: 1200 },
    { id: 3, category: "activities", image: "https://via.placeholder.com/150", description: "Smart Watch ABC", price: 199 },
    { id: 4, category: "movies", image: "https://via.placeholder.com/150", description: "DSLR Camera", price: 799 },
  ];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("foods");

  // Filter products based on selected category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div style={styles.container}>
      {/* Browse By Category */}
      <div style={styles.section}>
        <h2>Browse By Category</h2>
        <div style={styles.categoryContainer}>
          {categories.map(category => (
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

      {/* Best Selling Products */}
      <div style={styles.section}>
        <div style={styles.exploreHeader}>
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products</h2>
        </div>
        <div style={styles.productGrid}>
          {filteredProducts.map(product => (
            <ProductItem
              key={product.id}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
