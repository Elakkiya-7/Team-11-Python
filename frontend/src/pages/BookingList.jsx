import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const BookingList = () => {
  const [bookings] = useState([
    {
      id: 1,
      resource: "Lab 1",
      date: "2026-03-01",
      status: "PENDING_STAFF",
    },
    {
      id: 2,
      resource: "Classroom",
      date: "2026-03-03",
      status: "APPROVED",
    },
  ]);

  return (
    <>
      <Navbar role="student" />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>My Bookings</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Resource</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td style={styles.td}>{b.resource}</td>
                  <td style={styles.td}>{b.date}</td>
                  <td style={styles.td}>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingList;
