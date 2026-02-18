import React from "react";
import { styles } from "../styles";

const DashboardCard = ({ title, desc, onClick }) => (
  <div
    style={{
      ...styles.dashboardCard,
      transition: "0.3s",
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow =
        "0 12px 25px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 6px 15px rgba(0,0,0,0.1)";
    }}
  >
    <h3 style={{ marginBottom: "10px" }}>{title}</h3>
    <p style={{ color: "#555" }}>{desc}</p>
  </div>
);

export default DashboardCard;
