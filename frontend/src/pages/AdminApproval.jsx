import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const AdminApproval = () => {
  const [bookings, setBookings] = useState([
    { id: 1, student: "John", resource: "Lab 1", status: "PENDING_ADMIN" },
  ]);

  const approve = (id) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "APPROVED" } : b
      )
    );
  };

  const reject = (id) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "REJECTED" } : b
      )
    );
  };

  return (
    <>
      <Navbar role="admin" />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Admin Approvals</h2>

          {bookings.map((b) => (
            <div key={b.id}>
              <p>{b.student} - {b.resource}</p>
              <button onClick={() => approve(b.id)}>Approve</button>
              <button onClick={() => reject(b.id)}>Reject</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminApproval;
