import React from "react";
import Navbar from "./Navbar";
import { styles } from "../styles";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div style={styles.page}>
      <div style={styles.container}>{children}</div>
    </div>
  </>
);

export default Layout;
