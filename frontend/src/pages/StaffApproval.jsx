import React from "react";
import Layout from "../components/Layout";
import { styles } from "../styles";

const StaffApproval = ({ bookings, setBookings }) => {
  const handleApprove = (index) => {
    const updated = [...bookings];
    updated[index].status = "PENDING_ADMIN";
    setBookings(updated);
  };

  const handleReject = (index) => {
    const updated = [...bookings];
    updated[index].status = "REJECTED";
    setBookings(updated);
  };

  const pending = bookings.filter(
    (b) => b.status === "PENDING_STAFF"
  );

  return (
    <Layout>
      <h2>Staff Approval</h2>

      {pending.length === 0 ? (
        <p>No pending student requests.</p>
      ) : (
        pending.map((b, i) => (
          <div key={i} style={styles.card}>
            <h3>{b.resource}</h3>
            <p>
              {b.date} at {b.time}
            </p>
            <p>Status: {b.status}</p>

            <button
              style={styles.button}
              onClick={() => handleApprove(i)}
            >
              Approve
            </button>

            <button
              style={{ ...styles.button, background: "red" }}
              onClick={() => handleReject(i)}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </Layout>
  );
};

export default StaffApproval;
