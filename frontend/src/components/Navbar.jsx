import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <h3 style={{ margin: 0 }}>Campus Resource System</h3>

      <div>
        {role === "student" && (
          <>
            <button onClick={() => navigate("/book-resource")}>
              Book
            </button>
            <button onClick={() => navigate("/bookings")}>
              My Bookings
            </button>
          </>
        )}

        {role === "staff" && (
          <button onClick={() => navigate("/staff-approvals")}>
            Staff Approvals
          </button>
        )}

        {role === "admin" && (
          <button onClick={() => navigate("/admin-approvals")}>
            Admin Approvals
          </button>
        )}

        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    width: "100%",
    padding: "15px 30px",
    background: "#1e1e2f",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Navbar;
