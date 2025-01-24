import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUsers, faChartPie, faEnvelope, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("CUSTOMERS");
  const navigate = useNavigate();

  const menuItems = [
    { id: "PRODUCT", icon: faTachometerAlt, label: "PRODUCT" },
    { id: "CUSTOMERS", icon: faUsers, label: "CUSTOMERS" },
    { id: "ANALYTICS", icon: faChartPie, label: "ANALYTICS" },
  ];

  const settingsItems = [
    { id: "MESSAGES", icon: faEnvelope, label: "MESSAGES" },
    { id: "SETTING", icon: faCog, label: "SETTING" },
    { id: "HELP_CENTRE", icon: faQuestionCircle, label: "HELP CENTRE" },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
    navigate(`/${id.toLowerCase()}`);
  };

  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: "#1c1c1c",
      color: "#ffffff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "15px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
    activeItem: {
      backgroundColor: "#4a4a4a",
    },
    icon: {
      marginRight: "10px",
    },
    settingsTitle: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#a0a0a0",
      margin: "20px 0 10px 20px",
      textTransform: "uppercase",
    },
  };

  return (
    <div style={styles.sidebar}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.menuItem,
            ...(activeItem === item.id ? styles.activeItem : {}),
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <FontAwesomeIcon icon={item.icon} style={styles.icon} />
          {item.label}
        </div>
      ))}

      <div style={styles.settingsTitle}>SETTINGS</div>

      {settingsItems.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.menuItem,
            ...(activeItem === item.id ? styles.activeItem : {}),
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <FontAwesomeIcon icon={item.icon} style={styles.icon} />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
