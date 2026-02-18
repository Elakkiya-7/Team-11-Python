import React from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const heroStyle = {
    textAlign: "center",
    padding: "80px 20px 60px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "0 0 40px 40px",
    marginBottom: "60px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
  };

  const cardContainerStyle = {
    ...styles.grid,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  };

  const enhancedCardStyle = {
    ...styles.dashboardCard,
    position: "relative",
    overflow: "hidden"
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <div style={heroStyle}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎓</div>
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "16px",
          fontWeight: "800",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          Campus Resource Management
        </h1>
        <p style={{ 
          fontSize: "20px",
          opacity: "0.95",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          Book and manage campus resources efficiently with our smart booking system
        </p>
      </div>

      <div style={cardContainerStyle}>
        <div 
          style={{
            ...enhancedCardStyle,
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "white"
          }}
          onClick={() => navigate("/login/student")}
          className="dashboard-card"
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>👨‍🎓</div>
          <h2 style={{ fontSize: "28px", marginBottom: "12px", fontWeight: "700" }}>Student</h2>
          <p style={{ fontSize: "16px", opacity: "0.95", lineHeight: "1.5" }}>
            Book labs, classrooms, and event halls for your academic needs
          </p>
        </div>

        <div 
          style={{
            ...enhancedCardStyle,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white"
          }}
          onClick={() => navigate("/login/staff")}
          className="dashboard-card"
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>👨‍🏫</div>
          <h2 style={{ fontSize: "28px", marginBottom: "12px", fontWeight: "700" }}>Staff</h2>
          <p style={{ fontSize: "16px", opacity: "0.95", lineHeight: "1.5" }}>
            Review and approve student booking requests efficiently
          </p>
        </div>

        <div 
          style={{
            ...enhancedCardStyle,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white"
          }}
          onClick={() => navigate("/login/admin")}
          className="dashboard-card"
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>👨‍💼</div>
          <h2 style={{ fontSize: "28px", marginBottom: "12px", fontWeight: "700" }}>Administrator</h2>
          <p style={{ fontSize: "16px", opacity: "0.95", lineHeight: "1.5" }}>
            Complete control over resources, users, and final approvals
          </p>
        </div>
      </div>

      <div style={{ 
        textAlign: "center", 
        padding: "60px 20px",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <h3 style={{ fontSize: "32px", marginBottom: "24px", color: "#2d3748" }}>
          Why Choose Our System?
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginTop: "40px"
        }}>
          <div style={{ padding: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚡</div>
            <h4 style={{ fontSize: "18px", marginBottom: "8px", color: "#2d3748" }}>Fast & Easy</h4>
            <p style={{ color: "#718096", fontSize: "14px" }}>Book resources in seconds</p>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔒</div>
            <h4 style={{ fontSize: "18px", marginBottom: "8px", color: "#2d3748" }}>Secure</h4>
            <p style={{ color: "#718096", fontSize: "14px" }}>Role-based access control</p>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
            <h4 style={{ fontSize: "18px", marginBottom: "8px", color: "#2d3748" }}>Smart</h4>
            <p style={{ color: "#718096", fontSize: "14px" }}>Real-time availability</p>
          </div>
        </div>
      </div>

      <style>
        {`
          .dashboard-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dashboard-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
