import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <nav
      className="navbar navbar-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <div className="logo-text">Time Spent Gaming</div>
        </a>
      </div>
    </nav>
  );
}
