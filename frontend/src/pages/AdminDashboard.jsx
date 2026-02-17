import React from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const AdminDashboard = () => {
  return (
    <>
      <Navbar role="admin" />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Admin Dashboard</h2>
          <p>Final approval of resource bookings.</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
