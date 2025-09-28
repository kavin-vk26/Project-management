import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#1e90ff", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>Dashboard</Link>
      <Link to="/profile" style={{ color: "#fff" }}>Profile</Link>
    </nav>
  );
};

export default Navbar;
