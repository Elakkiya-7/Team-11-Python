import React from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const StaffDashboard = () => {
  return (
    <>
      <Navbar role="staff" />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Staff Dashboard</h2>
          <p>Approve or reject student bookings.</p>
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;
