import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const AdminApproval = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch all pending bookings
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("bookings/");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`bookings/${id}/`, {
        status: status,
      });

      fetchBookings(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2>Admin Booking Approval</h2>

        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Student</th>
              <th>Resource</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.userId}</td>
                <td>{b.resourceId}</td>
                <td>{b.bookingDate}</td>
                <td>{b.status}</td>

                <td>
                  {b.status === "PENDING" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(b.id, "APPROVED")
                        }
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(b.id, "REJECTED")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminApproval;
