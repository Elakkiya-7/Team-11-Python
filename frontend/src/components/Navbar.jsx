import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";

const Navbar = () => (
  <div style={styles.navbar}>
    <h2 style={{ margin: 0 }}>Campus Resource Management</h2>

    <div>
      <Link to="/" style={{ color: "white", marginRight: 20 }}>
        Home
      </Link>
      <Link to="/register" style={{ color: "white" }}>
        Register
      </Link>
    </div>
  </div>
);

export default Navbar;
