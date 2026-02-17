import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard</h2>

        <button style={styles.button} onClick={() => navigate("/book-resource")}>
          Book Resource
        </button>

        <br /><br />

        <button style={styles.button} onClick={() => navigate("/bookings")}>
          My Bookings
        </button>

        <br /><br />

        <button style={styles.button} onClick={() => navigate("/staff-approvals")}>
          Staff Approvals
        </button>

        <br /><br />

        <button style={styles.button} onClick={() => navigate("/admin-approvals")}>
          Admin Approvals
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
