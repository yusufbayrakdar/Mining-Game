import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./index.css";

function YsNavbar() {
  const [currentPage, setCurrentPage] = useState("welcome");
  return (
    <Navbar className="YsNavbar">
      <div className="headerButtons">
        <Nav className="mr-auto">
          <Link
            className={`App-link ${
              currentPage === "welcome" ? "currentNav" : ""
            }`}
            to="/welcome"
            onClick={() => {
              setCurrentPage("welcome");
            }}
          >
            <i className="fas fa-home navbarIcon" />
            Ana Sayfa
          </Link>
          <Link
            className={`App-link ${
              currentPage === "contacts" ? "currentNav" : ""
            }`}
            to="/contacts"
            onClick={() => {
              setCurrentPage("contacts");
            }}
          >
            <i className="far fa-address-book navbarIcon" />
            Müşteriler
          </Link>
          <Link
            className={`App-link ${
              currentPage === "sales" ? "currentNav" : ""
            }`}
            to="/sales"
            onClick={() => {
              setCurrentPage("sales");
            }}
          >
            <i className="fas fa-coins navbarIcon" />
            Satışlar
          </Link>
          <Link
            className={`App-link ${
              currentPage === "materials" ? "currentNav" : ""
            }`}
            to="/materials"
            onClick={() => {
              setCurrentPage("materials");
            }}
          >
            <i className="fas fa-cube navbarIcon" />
            Malzemeler
          </Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default YsNavbar;
