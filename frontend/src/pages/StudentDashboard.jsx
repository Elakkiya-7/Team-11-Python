import React from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const StudentDashboard = () => {
  return (
    <>
      <Navbar role="student" />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Student Dashboard</h2>
          <p>Book and manage your resources.</p>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
